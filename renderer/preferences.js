const PREF_KEY = 'preferences';

export const readPreferences = () => {
  try {
    return JSON.parse(window.localStorage.getItem(PREF_KEY));
  }
  catch (e) {
    return {};
  }
};

const writePrefs = prefs => window.localStorage.setItem(PREF_KEY, JSON.stringify(prefs));

export const getPreference = (key, def) => {
  const prefs = readPreferences();
  if (prefs[key] === undefined) { return def; }
  else { return prefs[key]; }
};

export const connectPreferences = store => {
  store.subscribe(() => {
    writePrefs(store.getState().preferences);
  });
};
