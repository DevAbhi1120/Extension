const AD_IDLE_MIN_SECONDS = 60;
const AD_IDLE_MAX_SECONDS = 120;

function getRandomIdleThreshold() {
  return Math.floor(Math.random() * (AD_IDLE_MAX_SECONDS - AD_IDLE_MIN_SECONDS + 1)) + AD_IDLE_MIN_SECONDS;
}

async function notifyNewTabAdEligibility() {
  const threshold = getRandomIdleThreshold();
  chrome.alarms.create('ad-eligibility', { periodInMinutes: 1 });
  const state = await chrome.idle.queryState(threshold);
  await chrome.storage.local.set({ adEligible: state === 'idle', adCheckedAt: Date.now() });
}

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.sync.set({
    theme: 'system',
    searchEngine: 'google',
    performanceMode: false,
    adOptIn: true
  });
  await notifyNewTabAdEligibility();
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'ad-eligibility') {
    await notifyNewTabAdEligibility();
  }
});
