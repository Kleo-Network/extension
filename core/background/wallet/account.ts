import type { KleoCore } from "./core";
import type { StreamResponse } from "types/stream";
import { randomBytes } from 'lib/crypto/random';
import { isValidChecksumAddress, unpadBuffer, BN } from 'ethereumjs-util'
import { Buffer } from 'buffer';

export class KleoAccount {
    readonly #core: KleoCore;

    constructor(core: KleoCore) {
        this.#core = core;
    }
    public async createAccountBySeed(name: string, sendResponse?: StreamResponse) {
      try {
       
        console.log("what kind of hell is this?");
        const privateKey = "0x" + new Buffer(randomBytes(32)).toString('hex');
        console.log("what kind of hell is this?",privateKey);

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