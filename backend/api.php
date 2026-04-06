<?php

declare(strict_types=1);

header('Content-Type: application/json');

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

$secret = 'rzp_live_replace_with_secret';
$token = str_replace('Bearer ', '', $authHeader);

function send_json(array $data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

function assert_token(string $token): void {
    if (strlen($token) < 16) {
        send_json(['error' => 'Unauthorized'], 401);
    }
}

assert_token($token);

$usersFile = __DIR__ . '/premium-users.json';
if (!file_exists($usersFile)) {
    file_put_contents($usersFile, json_encode(new stdClass()));
}
$users = json_decode(file_get_contents($usersFile), true) ?: [];

if ($path === '/verify-payment' && $method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: [];
    $orderId = $body['razorpay_order_id'] ?? '';
    $paymentId = $body['razorpay_payment_id'] ?? '';
    $signature = $body['razorpay_signature'] ?? '';

    if (!$orderId || !$paymentId || !$signature) {
        send_json(['premium' => false, 'error' => 'Missing payment fields'], 400);
    }

    $generatedSignature = hash_hmac('sha256', $orderId . '|' . $paymentId, $secret);
    if (!hash_equals($generatedSignature, $signature)) {
        send_json(['premium' => false, 'error' => 'Signature verification failed'], 400);
    }

    $users[$token] = [
        'premium' => true,
        'payment_id' => $paymentId,
        'verified_at' => gmdate('c')
    ];
    file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));

    send_json(['premium' => true]);
}

if ($path === '/check-premium' && $method === 'GET') {
    $premium = isset($users[$token]) && ($users[$token]['premium'] ?? false) === true;
    send_json(['premium' => $premium]);
}

send_json(['error' => 'Not Found'], 404);
