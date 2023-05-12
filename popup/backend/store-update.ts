import type { WalletState } from "types/account";

import themeStore from "popup/store/theme";
// import guardStore from "popup/store/guard";


export function updateState(state: WalletState) {
  document.body.setAttribute("theme", "light");
  //guardStore.set(state.guard);
  themeStore.set("light");
  console.log("state",state);

}
