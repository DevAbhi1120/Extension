import { Crown } from 'lucide-react';
import { verifyPaymentOnServer } from './premiumApi';

const RAZORPAY_KEY = 'rzp_test_your_key_here';

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function PremiumButton() {
  const startCheckout = () => {
    if (!window.Razorpay) {
      alert('Unable to load Razorpay SDK');
      return;
    }

    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY,
      amount: 4900,
      currency: 'INR',
      name: 'AuraTab Premium',
      description: 'One-time unlock',
      handler: async (response: Record<string, string>) => {
        const valid = await verifyPaymentOnServer(response);
        if (valid) {
          await chrome.storage.sync.set({ premium: true });
          alert('Premium activated 🎉');
        }
      }
    });

    rzp.open();
  };

  return (
    <button className="glass-card flex items-center gap-2 px-3 py-2 text-sm" onClick={startCheckout}>
      <Crown size={16} /> Unlock Premium ₹49
    </button>
  );
}
