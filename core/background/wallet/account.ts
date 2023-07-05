import type { KleoCore } from "./core";
import type { StreamResponse } from "types/stream";
import Wallet from 'ethereumjs-wallet'

export class KleoAccount {
    readonly #core: KleoCore;

    constructor(core: KleoCore) {
        this.#core = core;
    }
    public async createAccountBySeed(name: string, sendResponse?: StreamResponse) {
      try {
        console.log("seed", this.#core.guard);
        const EthWallet = Wallet.default.generate();
        
        //console.log("address: " + EthWallet.getAddressString());
        //console.log("privateKey: " + EthWallet.getPrivateKeyString());

        this.#core.guard.storeKey(EthWallet.getPrivateKeyString());
        console.log("private key hashed" , this.#core.guard.privateKeyEncrypted);
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