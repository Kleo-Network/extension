import type { KleoBackground } from "background/wallet/bg-kleo";
import { MTypePopup, MTypeTab } from "lib/streem/stream-keys";
import { Runtime } from "lib/runtime";

export function startBackground(core: KleoBackground) {
  console.log("startBackground is working?");
  Runtime.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log("BACKGROUND STARTED LISTENINT")
    if (sender.id !== Runtime.runtime.id) {
      sendResponse(null);
      return true;
    }
    switch (msg.type) { 
      case MTypeTab.CONNECT_APP:
        console.log("msg", msg);
        console.log("sendRsp", sendResponse);
        core.connect.openPopupConnect(msg.payload, sendResponse);
        return true;
  
      case MTypePopup.USER_RESPONSE_DAPP:
        console.log("user response on popup payload", msg);
        console.log("response of user response dapp payload", sendResponse)
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
