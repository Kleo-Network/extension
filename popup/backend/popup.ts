import { Message } from "lib/streem/message";
import { MTypePopup } from "lib/streem/stream-keys";
import { warpMessage } from "lib/utils/warp-message";
import { updateState } from "./store-update";
import type { WalletState } from "types/account";

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

export async function createNextSeedAccount(name: string) {
  const data = await new Message({
    type: MTypePopup.CREATE_ACCOUNT_BY_SEED,
    payload: {
      name
    }
  }).send();
  console.log("data from create account", data);

  const state = warpMessage(data);
  console.log("state from create account", state);
  updateState(state);
  return state;
}

export async function getState() {
  const data = await Message.signal(
    MTypePopup.GET_WALLET_STATE
  ).send();
  const state = warpMessage(data) as WalletState;
  updateState(state);
  return state;
}

export async function logoutWallet() {
  const data = await Message.signal(MTypePopup.LOG_OUT).send();
  const state = warpMessage(data);
  updateState(state);
  return state;
}
