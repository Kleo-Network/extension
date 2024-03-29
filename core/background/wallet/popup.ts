import type { StreamResponse } from "types/stream";
import type { KleoCore } from "./core";
import { TabsMessage } from "lib/streem/tabs-message";
import { MTypeTab } from "lib/streem/stream-keys";
import { Runtime } from "lib/runtime";
import { History } from "background/services/history";
export class KleoPopup {
  readonly #core: KleoCore;
  public his = new History();

  constructor(core: KleoCore) {
    this.#core = core;

  }

  
  public updateStatus() {

    if (this.#core.guard.isEnable && this.#core.guard.isReady) {
      this.#subscribe();
    } else {
      this.#unsubscribe();
    }

  }

  public async logout(sendResponse: StreamResponse) {
    //await this.#core.guard.logout();
    this.updateStatus();
    sendResponse({
      resolve: this.#core.state,
    });
  }

  public initPopup(sendResponse: StreamResponse) {
    this.#core.guard.sync();
    console.log("check history from where? if imported do not import", this.#core.state);
    sendResponse({
      resolve: this.#core.state,
    });
  }

  

  // public async unlock(password: string, sendResponse: StreamResponse) {
  //   try {
  //     this.#core.guard.setPassword(password);
    
  //     this.updateStatus();

  //     return sendResponse({
  //       resolve: this.#core.state,
  //     });
  //   } catch (err) {
  //     return sendResponse({
  //       reject: err.message,
  //     });
  //   }
  // }


  #subscribe() {
    
  }

  #unsubscribe() {
    Runtime.alarms.clearAll();
  }
}
