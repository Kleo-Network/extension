// This string need that sould did't have problem with conflicts.
const app = "kleo";

export const MTypeTabContent = {
  CONTENT: `@/${app}/content-script`,
  INJECTED: `@/${app}/injected-script`,
};

export const MTypePopup = {
  GET_WALLET_STATE: `@/${app}/get-wallet-state`,
  SET_PASSWORD: `@/${app}/popup-set-password`,
  LOG_OUT: `@/${app}/popup-logout`,
  USER_RESPONSE_DAPP: `@/${app}/user-response-connect-dapp`,
  CREATE_ACCOUNT_BY_SEED: `@/${app}/create-account`
};

export const MTypeTab = {
  GET_WALLET_DATA: `@/${app}/injected-get-wallet-data`,
  CONNECT_APP: `@/${app}/request-to-connect-dapp`,
  RESPONSE_TO_DAPP: `@/${app}/response-dapp-connect`,
};
