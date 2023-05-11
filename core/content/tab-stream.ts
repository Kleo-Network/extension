import type { ProxyContentType } from "types/stream";

import { Message, ReqBody } from "lib/streem/message";
import { MTypeTab, MTypeTabContent } from "lib/streem/stream-keys";
import { TabStream } from "lib/streem/tab-stream";
import { ContentMessage } from "lib/streem/secure-message";
import { warpMessage } from "lib/utils/warp-message";

export class ContentTabStream {
  readonly #stream: TabStream;


  public get stream() {
    return this.#stream;
  }

  constructor() {
    this.#stream = new TabStream(MTypeTabContent.CONTENT);
    this.#stream.listen((msg) => this.#listener(msg));
    this.onSyncAll();
  }

  async #listener(msg: ReqBody) {
    if (!msg) return null;

    msg.domain = window.document.domain;

    switch (msg.type) {
      case MTypeTab.KLEO_CONNECTIONS:
        await new Message(msg).send();
        break;
      case MTypeTab.GET_WALLET_DATA:
        await this.onSyncAll();
        break;
      case MTypeTab.ADDRESS_CHANGED:
        await new Message(msg).send();
        break;
      case MTypeTab.CONNECT_APP:
        await new Message(msg).send();
        break;
      case MTypeTab.DISCONNECT_APP:
        await new Message(msg).send();
        break;
      case MTypeTab.CALL_TO_SIGN_TX:
        await new Message(msg).send();
        break;
      case MTypeTab.SIGN_MESSAGE:
        await new Message(msg).send();
        break;
      default:
        break;
    }
  }

  async onSyncAll() {
    // Get the some data { address, net, nodeURL }.
    const recipient = MTypeTabContent.INJECTED;

    try {
      const data = await Message.signal(MTypeTab.GET_WALLET_DATA).send();
      const wallet = warpMessage(data);


      if (wallet) {
        new ContentMessage({
          type: MTypeTab.GET_WALLET_DATA,
          payload: wallet,
        }).send(this.#stream, recipient);
      }

     
    } catch (err) {
      console.error(err);
    }
  }

  
}
