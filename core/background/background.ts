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
        console.log("msg", msg);
        console.log("sendRsp", sendResponse);
        //core.apps.addConfirm(msg.payload, sendResponse);
        return true;
  
      case MTypePopup.USER_RESPONSE_DAPP:
        console.log("this is being called sir?", msg.payload.confirmed);
        //core.apps.userResponse(msg.payload, sendResponse);
        return true;
      default:
        sendResponse(null);
        return true;
    }
  });
}
