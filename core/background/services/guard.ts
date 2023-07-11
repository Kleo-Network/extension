
import assert from "assert";
import { Aes } from "lib/crypto/aes";
import { BrowserStorage, buildObject } from "lib/storage";
import { Fields } from "config/fields";
import { Common } from "config/common";
import { Cipher } from 'lib/crypto/cipher';
 
export class AuthGuard {
  
  // this property is responsible for control session.  
  #isEnable = false;
  // this property is responsible for control wallet.
  #isReady = false;
  // Imported storage in encrypted.
  #encryptImported?: string;
  // Seed phase storage in encrypted.
  #encryptSeed?: string;
  // Encrypted Private Key
  #privateExtendedKey?: string;

  checkSession() {
    assert(this.#isReady, Fields.WALLET_NOT_READY);
    assert(this.#isEnable, Fields.WALLET_NOT_ENABLED);
  }
  
  get isEnable() {
    return this.#isEnable;
  }

  get isReady() {
    return this.#isReady;
  }


  // public async updateImported(decryptImported: object[]) {
  //     this.checkSession();
  //     const encryptImported = Aes.encrypt(JSON.stringify(decryptImported), 'hash');

  //     await BrowserStorage.set(
  //       buildObject(Fields.PRIVATE_KEY_ENCRYPTED, encryptImported)
  //     );
  //    this.#encryptImported = encryptImported;
  // }

  // public async storeKey(privateKey: string){
  //   const privateKeyEncrypted = Aes.encrypt(privateKey, 'hash');
  //   this.#privateExtendedKey = privateKeyEncrypted;
  //   this.#isEnable = true;
  //   this.#isReady = true;
  //   await BrowserStorage.set(buildObject(Fields.PRIVATE_KEY_ENCRYPTED, privateKeyEncrypted));
  // }

  public state() {
    return {
      isEnable: this.#isEnable,
      isReady: this.#isReady,
    };
  }

  public async sync() {
    this.#isEnable = this.#isEnable;
    this.#isReady = this.#isReady;
  }

  // public decryptPrivateKey(content: string) {
  //   return Aes.decrypt(content, 'hash');
  // }
}
