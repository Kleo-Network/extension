import type { KleoCore } from "./core";
import type { StreamResponse } from "types/stream";
import { randomBytes } from 'lib/crypto/random';
import { Buffer } from 'buffer';
import requestAPI, { HTTP_METHOD } from "app/backend/api";

export class KleoAccount {
    readonly #core: KleoCore;

    constructor(core: KleoCore) {
        this.#core = core;
    }
    public async createAccountBySeed(name: string, sendResponse?: StreamResponse) {
      try {
        const privateKey = "0x" + new Buffer(randomBytes(32)).toString('hex');
        console.log("what kind of hell is this?",privateKey);
        // await this.#core.guard.createArweaveWallet();
        await this.#core.guard.storeKey(privateKey);
        
        await this.createNewUser(this.#core.guard.getpublicKey());
        
        sendResponse({
          resolve: this.#core.state
        });
      } catch (err) {
        sendResponse({
          reject: err.message
        });
      }
    }

    public async createNewUser(userAddress) {
      try {
        const apiUrl = "/users";
        await requestAPI(apiUrl, HTTP_METHOD.POST, {
          publicAddress: userAddress,
        });
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
   
  

}