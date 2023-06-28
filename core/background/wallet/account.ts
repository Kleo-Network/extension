import type { KleoCore } from "./core";
import type { StreamResponse } from "types/stream";

export class KleoAccount {
    readonly #core: KleoCore;

    constructor(core: KleoCore) {
        this.#core = core;
    }
    public async createAccountBySeed(name: string, sendResponse?: StreamResponse) {
      try {
        const seed = this.#core.guard.seed;
        console.log("seed", seed);
        // create account on ethereum
        // create account on polygon 
        // create account on rootstock
        // create account on aptos
        
        sendResponse({
          resolve: this.#core.state
        });
      } catch (err) {
        sendResponse({
          reject: err.message
        });
      }
    }
   
  

}