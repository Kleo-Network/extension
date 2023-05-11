import type { KleoCore } from "./core";

export class KleoSynchronizer {
  readonly #core: KleoCore;

  constructor(core: KleoCore) {
    this.#core = core;
  }

  public async sync() {
    console.log("start-sync");
    await this.#core.guard.sync();
    await this.#core.prompt.sync();
    console.log("end-sync");
  }
}
