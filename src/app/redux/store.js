import {configureStore} from '@reduxjs/toolkit';
import {aboutReducer, privacyPolicyModalReducer} from '_features/about';
import {
  algorithmsGridReducer,
  algorithmsModalReducer,
} from '_features/algorithms';
import {
  editScrambleModalReducer,
  homeReducer,
  selectPuzzleModalReducer,
  sortOptionsModalReducer,
} from '_features/home';
import {
  changePasswordModalReducer,
  forgotPasswordModalReducer,
  changeEmailModalReducer,
  changeUsernameModalReducer,
  editProfileReducer,
  navigationDrawerReducer,
  signInSignUpReducer,
  confirmDeleteAccountModalReducer,
} from '_features/layout';
import {patternsGridReducer, patternsModalReducer} from '_features/patterns';
import {settingsReducer, timerSettingsReducer} from '_features/settings';
import {themeReducer} from '_features/theme';
import {
  solvesModalReducer,
  solvesScreenReducer,
  statsScreenReducer,
  stopwatchReducer,
  timerScreenReducer,
} from '_features/timer';

const store = configureStore({
  reducer: {
    about: aboutReducer,
    algorithmsGrid: algorithmsGridReducer,
    algorithmsModal: algorithmsModalReducer,
    changePasswordModal: changePasswordModalReducer,
    changeUsernameModal: changeUsernameModalReducer,
    forgotPasswordModal: forgotPasswordModalReducer,
    changeEmailModal: changeEmailModalReducer,
    editProfile: editProfileReducer,
    confirmDeleteAccountModal: confirmDeleteAccountModalReducer,
    editScrambleModal: editScrambleModalReducer,
    home: homeReducer,
    navigationDrawer: navigationDrawerReducer,
    patternsGrid: patternsGridReducer,
    patternsModal: patternsModalReducer,
    privacyPolicyModal: privacyPolicyModalReducer,
    selectPuzzleModal: selectPuzzleModalReducer,
    settings: settingsReducer,
    signInSignUp: signInSignUpReducer,
    solvesModal: solvesModalReducer,
    solvesScreen: solvesScreenReducer,
    sortOptionsModal: sortOptionsModalReducer,
    statsScreen: statsScreenReducer,
    stopwatch: stopwatchReducer,
    theme: themeReducer,
    timerScreen: timerScreenReducer,
    timerSettings: timerSettingsReducer,
  },
});

export default store;
