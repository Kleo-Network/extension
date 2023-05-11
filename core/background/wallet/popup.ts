import type { StreamResponse } from "types/stream";
import type { KleoCore } from "./core";
import { TabsMessage } from "lib/streem/tabs-message";
import { MTypeTab } from "lib/streem/stream-keys";
import { Runtime } from "lib/runtime";

export class KleoPopup {
  readonly #core: KleoCore;

  constructor(core: KleoCore) {
    this.#core = core;

  }

  public updateStatus() {

    if (this.#core.guard.isEnable && this.#core.guard.isReady) {
      this.#subscribe();
    } else {
      this.#unsubscribe();
    }

    new TabsMessage({
      type: MTypeTab.LOCK_STAUS,
      payload: {
        isEnable: this.#core.guard.isEnable,
      },
    }).send();
  }

  public async logout(sendResponse: StreamResponse) {
    await this.#core.guard.logout();
    this.updateStatus();
    sendResponse({
      resolve: this.#core.state,
    });
  }

  public initPopup(sendResponse: StreamResponse) {
    sendResponse({
      resolve: this.#core.state,
    });
  }

  

  public async unlock(password: string, sendResponse: StreamResponse) {
    try {
      this.#core.guard.setPassword(password);
    
      this.updateStatus();

      return sendResponse({
        resolve: this.#core.state,
      });
    } catch (err) {
      return sendResponse({
        reject: err.message,
      });
    }
  }


  #subscribe() {
    
  }

  #unsubscribe() {
    Runtime.alarms.clearAll();
  }
}
