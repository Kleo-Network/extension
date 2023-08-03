import type { StreamResponse } from "types/stream";
import type { KleoCore } from "./core";
import type { AppConnect } from 'types/account';
import { TabsMessage } from "lib/streem/tabs-message";
import { MTypeTab } from "lib/streem/stream-keys";
import { History } from "background/services/history";
export class KleoConnect {
    readonly #core: KleoCore;
    public history = new History();
    constructor(core: KleoCore) {
        this.#core = core;
    }
    public async addAccountFromSeed(seed: Uint8Array, name: string) {
      // create new account using seed
      return "account";
    }
  
    public async confirm(app: AppConnect, sendResponse: StreamResponse){
        console.log("confirm has been called from wallet/connect.ts");
        
        const result = await this.history.indexKeyword(app.form.data);
        
        await new TabsMessage({
          type: MTypeTab.RESPONSE_TO_DAPP,
          payload: {
            "indexData": {
              result
            }
          }
        }).send();
        await this.#core.connect.add(app);
        sendResponse({
          resolve: this.#core.state
        });
    }
    public async openPopupConnect(app: AppConnect, sendResponse: StreamResponse){

        const isConnected = this.#core.connect.isConnected(app.domain);
        console.log("open popup connected from from connect.ts", isConnected);
        
        if(isConnected) {
            await new TabsMessage({
            type: MTypeTab.RESPONSE_TO_DAPP,
            payload:{
                uuid: "uuid", 
                connect: "connect"
            }
        }).send();
        }
        else {
        await this.#core.connect.addConfirm(app);
        sendResponse({
            resolve: {
              app
            }
          });
        await this.#core.prompt.open();
        }
        console.log("this", this.#core.prompt);
       
       
    }
}