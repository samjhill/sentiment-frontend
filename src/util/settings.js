const defaultSettings = {
  slideshowMode: {
    label: 'Slideshow Mode',
    value: true,
  },
  showTickers: {
    label: 'Show Tickers',
    value: false,
  },
  showRedditSentiment: {
    label: 'Show Reddit Sentiment',
    value: true,
  },
  showNewsFeed: {
    label: 'Show News Feed',
    value: true,
  },
  showRedditActiveUsers: {
    label: 'Show Reddit Active Users',
    value: true,
  },
  showSearchTrends: {
    label: 'Show Search Trends',
    value: true,
  },
  showRedditComments: {
    label: 'Show Reddit Comments',
    value: false,
  },
};

export const loadSettings = async () => {
  // load settings from storage
  const storedSettings = JSON.parse(localStorage.getItem('settings'));

  if (storedSettings) {
    Object.keys(defaultSettings).map(settingName => {
      if (storedSettings[settingName]) {
        defaultSettings[settingName].value = storedSettings[settingName].value;
      }
    });
  }
  return defaultSettings;
};

export const saveSetting = async (key, value) => {
  const settings = await loadSettings();
  settings[key].value = value;
  localStorage.setItem('settings', JSON.stringify(settings));
}
