import { useEffect, useState } from 'react';

export function useIdleAdVisibility(enabled: boolean, isPremium: boolean) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled || isPremium) {
      setVisible(false);
      return;
    }

    const onInteraction = () => setVisible(false);
    const onCheck = async () => {
      const result = await chrome.storage.local.get('adEligible');
      setVisible(Boolean(result.adEligible));
    };

    void onCheck();
    window.addEventListener('mousemove', onInteraction, { passive: true });
    window.addEventListener('keydown', onInteraction);
    const interval = window.setInterval(onCheck, 30000);

    return () => {
      window.removeEventListener('mousemove', onInteraction);
      window.removeEventListener('keydown', onInteraction);
      window.clearInterval(interval);
    };
  }, [enabled, isPremium]);

  return visible;
}
