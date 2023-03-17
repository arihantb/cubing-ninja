import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from './localStorageManagement';

/**
 * Loads the timer settings from the local storage.
 * @param {object} currentTimerSettings the current timer settings.
 */
const _loadTimerSettings = async currentTimerSettings => {
  const timerSettings = await loadFromLocalStorage('timerSettings');

  if (timerSettings === null || Object.keys(timerSettings).length === 0) {
    await saveToLocalStorage(
      'timerSettings',
      JSON.stringify(currentTimerSettings),
    );

    return currentTimerSettings;
  }

  return timerSettings;
};

export const loadSettings = async settings => {
  return {
    timerSettings: JSON.parse(await _loadTimerSettings(settings.timerSettings)),
  };
};
