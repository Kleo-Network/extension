import { KleoConnect } from "./connect";
import { KleoCore } from "./core";
import { KleoPopup } from "./popup";
import { KleoSynchronizer } from "./synchronizer";

import { Runtime } from "lib/runtime";

export class KleoBackground {
  readonly #core = new KleoCore();
  public readonly popup = new KleoPopup(this.#core);
  public readonly synchronizer = new KleoSynchronizer(this.#core);
  public readonly connect = new KleoConnect(this.#core);

  public async sync() {
    Runtime.runtime.onInstalled.addListener(async (event) => {
      await this.synchronizer.sync();
      if (event.reason !== "update") {
        this.#core.prompt.openTab();
      }
    });

    await this.synchronizer.sync();

    // if (this.#core.guard.isReady) {
      Runtime.runtime.onInstalled.removeListener(() => null);
    //}
  }
}
