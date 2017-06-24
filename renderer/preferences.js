import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
const { app } = remote;
import { defaultPreferences } from './reducers/preferences';

const PREF_PATH = path.join(app.getPath('userData'), 'preferences.json');
const writePrefs = prefs => fs.writeFileSync(PREF_PATH, JSON.stringify(prefs), 'utf8');
const readPrefs = () => JSON.parse(fs.readFileSync(PREF_PATH, { encoding: 'utf8' }));

export const getAllPreferences = () => {
  try {
    return {
      ...defaultPreferences,
      ...readPrefs(),
    };
  }
  catch (e) {
    return defaultPreferences;
  }
};

export const getPreference = key => getAllPreferences()[key];

export const connectPreferences = store => {
  store.subscribe(() => {
    writePrefs(store.getState().preferences);
  });
};
