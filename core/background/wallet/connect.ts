import type { StreamResponse } from "types/stream";
import type { KleoCore } from "./core";
import type { AppConnect } from 'types/app-connect';
import { TabsMessage } from "lib/streem/tabs-message";
import { MTypeTab } from "lib/streem/stream-keys";

export class KleoConnect {
    readonly #core: KleoCore;

    constructor(core: KleoCore) {
        this.#core = core;
    }

    public async openPopupConnect(app: AppConnect, sendResponse: StreamResponse){
        console.log("open poppup");
        const isConnected = this.#core.connect.isConnected(app.domain);
        console.log("is connected?", isConnected);
        
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