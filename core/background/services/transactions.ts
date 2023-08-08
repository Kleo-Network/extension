import { Runtime } from "lib/runtime";
import type { AppConnect } from "types/account";
import { BrowserStorage, buildObject } from "lib/storage";
import { Fields } from "config/fields";
import { Aes } from "lib/crypto/aes";

enum PermaStorage {
    Arweave, 
    IPFS
}
export class storage {
     #storage: PermaStorage; 
     #lastEntry: JSON;

    constructor() {
        this.#storage = PermaStorage.Arweave;
    }
    private async getPrivateKey(){
        const privateKeyEncrypted = await BrowserStorage.get(Fields.PRIVATE_KEY_ENCRYPTED) as string;
        const privateKey =  Aes.decrypt(privateKeyEncrypted, 'hash');
        return privateKey;
    }
    private async getArweave(){
        
    }
    
    async encryptData(data){
        return Aes.encrypt(data, await this.getPrivateKey());
    }
    async decryptData(data){
        return Aes.decrypt(data, await this.getPrivateKey());
    }

    public async getTransactions(){

    }
    public async uploadArweave(){

    }
}