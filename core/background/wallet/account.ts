import type { KleoCore } from "./core";
import type { StreamResponse } from "types/stream";
const eth = require('ethereumjs-wallet');

export class KleoAccount {
    readonly #core: KleoCore;

    constructor(core: KleoCore) {
        this.#core = core;
    }
    public async createAccountBySeed(name: string, sendResponse?: StreamResponse) {
      try {
        //const seed = this.#core.guard.seed;

        // create account on ethereum
        console.log("seed", this.#core.guard);
        const EthWallet = Wallet.default.generate();
        console.log("address: " + EthWallet.getAddressString());
        console.log("privateKey: " + EthWallet.getPrivateKeyString());

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