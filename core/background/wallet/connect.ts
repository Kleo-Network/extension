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
        await new TabsMessage({
            type: MTypeTab.RESPONSE_TO_DAPP,
            payload:{
                uuid: "uuid", 
                connect: "connect"
            }
        }).send();
        console.log("this", this.#core.prompt);
        await this.#core.prompt.open();
    }
}