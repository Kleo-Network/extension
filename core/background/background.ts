import type { KleoBackground } from "background/wallet/bg-kleo";
import { MTypePopup, MTypeTab } from "lib/streem/stream-keys";
import { Runtime } from "lib/runtime";

export function startBackground(core: KleoBackground) {

  Runtime.runtime.onMessage.addListener((msg, sender, sendResponse) => {

    if (sender.id !== Runtime.runtime.id) {
      sendResponse(null);
      return true;
    }
    switch (msg.type) { 
      case MTypeTab.CONNECT_APP:
        core.connect.openPopupConnect(msg.payload, sendResponse);
        return true;
  
      case MTypePopup.CREATE_ACCOUNT_BY_SEED:
        console.log("background call");  
        core.account.createAccountBySeed(msg.payload.name, sendResponse);
        return true;
      case MTypePopup.USER_RESPONSE_DAPP:
        core.connect.confirm(msg.payload, sendResponse);
        return true;

      case MTypePopup.GET_WALLET_STATE:
        core.popup.initPopup(sendResponse);
        return true;

      default:
        sendResponse(null);
        return true;
    }
  });
}
