import type { WalletState } from "types/account";

import themeStore from "popup/store/theme";
import guardStore from "popup/store/guard";
import websiteStore from "popup/store/connect";

export function updateState(state: WalletState) {
  document.body.setAttribute("theme", "light");
  console.log("STATE",state);
  guardStore.set(state.guard);
  themeStore.set("light");
  websiteStore.set(state.websiteStore);
  console.log("state entire store!",state);

}
