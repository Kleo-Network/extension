import type { KleoCore } from "./core";
import type { StreamResponse } from "types/stream";
import { randomBytes } from 'lib/crypto/random';
import { Buffer } from 'buffer';

export class KleoAccount {
    readonly #core: KleoCore;

    constructor(core: KleoCore) {
        this.#core = core;
    }
    public async createAccountBySeed(name: string, sendResponse?: StreamResponse) {
      try {
        const privateKey = "0x" + new Buffer(randomBytes(32)).toString('hex');
        console.log("what kind of hell is this?",privateKey);
      
        await this.#core.guard.storeKey(privateKey);
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