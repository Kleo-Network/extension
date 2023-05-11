import { KleoBackground } from "background/wallet/bg-kleo";
import { startBackground } from "./background";


(async function () {
  const core = new KleoBackground();

  await core.sync();

  startBackground(core);
})();
