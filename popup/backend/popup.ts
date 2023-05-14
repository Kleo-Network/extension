import { Message } from "lib/streem/message";
import { MTypePopup } from "lib/streem/stream-keys";
import { warpMessage } from "lib/utils/warp-message";
import { updateState } from "./store-update";

export async function userResponseConnection(confirmed: boolean) {
  const data = await new Message({
    type: MTypePopup.USER_RESPONSE_DAPP,
    payload: {
      confirmed,
    },
  }).send();
  console.log("new data", data);
  const state = warpMessage(data);
  updateState(state);
  return state;
}

export async function logoutWallet() {
  const data = await Message.signal(MTypePopup.LOG_OUT).send();
  const state = warpMessage(data);
  updateState(state);
  return state;
}
