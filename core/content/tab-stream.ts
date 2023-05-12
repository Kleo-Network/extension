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
    console.log("listener is working?");
  }

  async #listener(msg: ReqBody) {
    if (!msg) return null;

    msg.domain = window.document.domain;

    switch (msg.type) {
     
      case MTypeTab.CONNECT_APP:
        console.log("send connect APP?");
        await new Message(msg).send();
        break;
      default:
        break;
    }
  }


  
}
