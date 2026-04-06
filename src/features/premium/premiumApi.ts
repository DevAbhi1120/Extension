const BASE = 'https://your-backend.example.com';

export async function verifyPaymentOnServer(payload: Record<string, string>) {
  const token = await chrome.storage.local.get('deviceToken');

  const response = await fetch(`${BASE}/verify-payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.deviceToken}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) return false;
  const body = (await response.json()) as { premium: boolean };
  return body.premium;
}

export async function checkPremiumStatus() {
  const token = await chrome.storage.local.get('deviceToken');
  const response = await fetch(`${BASE}/check-premium`, {
    headers: { Authorization: `Bearer ${token.deviceToken}` }
  });
  if (!response.ok) return false;
  const body = (await response.json()) as { premium: boolean };
  return body.premium;
}
