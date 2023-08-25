
import assert from "assert";
import { Aes } from "lib/crypto/aes";
import { BrowserStorage, buildObject } from "lib/storage";
import { Fields } from "config/fields";
import * as ethUtil from 'ethereumjs-util';
import { Buffer } from 'buffer';

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

  #userAddress = '';

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

  public async enableAccount(){
    this.#isEnable = true;
  }
  public async readyAccount(){
    this.#isReady = true;
  }

  // public async updateImported(decryptImported: object[]) {
  //     this.checkSession();
  //     const encryptImported = Aes.encrypt(JSON.stringify(decryptImported), 'hash');

  //     await BrowserStorage.set(
  //       buildObject(Fields.PRIVATE_KEY_ENCRYPTED, encryptImported)
  //     );
  //    this.#encryptImported = encryptImported;
  // }
  public async createArweaveWallet(){
    // const arweave = Arweave.init({});
    // arweave.wallets.generate().then((key) => {
      // console.log("arweave wallet key generation", key);
      // {
      //     "kty": "RSA",
      //     "n": "3WquzP5IVTIsv3XYJjfw5L-t4X34WoWHwOuxb9V8w...",
      //     "e": ...
  // });
    
  }

  public getpublicKey(){
    return this.#userAddress;
  }

  public async storeKey(privateKey: string){
    const privateKeyEncrypted = Aes.encrypt(privateKey, 'hash');
    this.#privateExtendedKey = privateKeyEncrypted;
    this.#isEnable = true;
    this.#isReady = true;
    await BrowserStorage.set(buildObject(Fields.PRIVATE_KEY_ENCRYPTED, privateKeyEncrypted));

    const privateKeyBuffer = Buffer.from(privateKey.slice(2), 'hex');

    // Generate public key
    const publicKeyBuffer = ethUtil.privateToPublic(privateKeyBuffer);
    const publicKey = '0x' + publicKeyBuffer.toString('hex');
    this.#userAddress = publicKey;
    await BrowserStorage.set(buildObject(Fields.PUBLIC_KEY, publicKey));
  }

  public state() {
    return {
      isEnable: this.#isEnable,
      isReady: this.#isReady,
    };
  }

  public async sync() {
    this.#isEnable = Boolean(await BrowserStorage.get(Fields.PRIVATE_KEY_ENCRYPTED));
    this.#isReady = Boolean(await BrowserStorage.get(Fields.PRIVATE_KEY_ENCRYPTED));

  }

  public decryptPrivateKey(content: string) {
    return Aes.decrypt(content, 'hash');
  }
}
