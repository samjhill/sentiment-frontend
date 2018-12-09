const defaultSettings = {
  showTickers: {
    label: 'Tickers',
    value: false,
  },
  showRedditSentiment: {
    label: 'Reddit Sentiment',
    value: true,
  },
  showNewsFeed: {
    label: 'News Feed',
    value: true,
  },
  showRedditActiveUsers: {
    label: 'Reddit Active Users',
    value: true,
  },
  showSearchTrends: {
    label: 'Search Trends',
    value: true,
  },
  showRedditComments: {
    label: 'Reddit Comments',
    value: false,
  },
};

export const loadSettings = () => {
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
};
