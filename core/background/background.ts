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
        //core.apps.addConfirm(msg.payload, sendResponse);
        return true;
  
      case MTypePopup.USER_RESPONSE_DAPP:
        console.log("this is being called sir?", msg);
        core.connect.confirm(msg.payload.confirmed, sendResponse);
        //core.apps.userResponse(msg.payload, sendResponse);
        return true;
      default:
        sendResponse(null);
        return true;
    }
  });
}
