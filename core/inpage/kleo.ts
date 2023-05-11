import type { TabStream } from "lib/streem/tab-stream";
import type { Subject } from "lib/streem/subject";
import { MTypeTab, MTypeTabContent } from "lib/streem/stream-keys";
import { ContentMessage } from "lib/streem/secure-message";
import { uuidv4 } from "lib/crypto/uuid";
import { getFavicon } from "./favicon";

import { Wallet } from './wallet';


export class Kleo {
  public kleo: () => Promise<unknown>;
  public wallet: Wallet;
  constructor(stream: TabStream, subject: Subject) {
    
    this.wallet = new Wallet(stream, subject);

    this.kleo = () => {
      //console.log("stream", stream);
      //console.log("subject", subject);
      const uuid = uuidv4();
      const type = MTypeTab.CONNECT_APP;
      const recipient = MTypeTabContent.CONTENT;
      const title = window.document.title;
      const domain = window.document.domain;
      const icon = getFavicon();
      const payload = {
        title,
        domain,
        icon,
        uuid,
      };
      //console.log("subject", subject);
      new ContentMessage({
        type,
        payload,
      }).send(stream, recipient);

      return new Promise((resolve) => {
        const obs = subject.on((msg) => {
          if (msg.type !== MTypeTab.RESPONSE_TO_DAPP) return;
          if (msg.payload.uuid !== uuid) return;

          var isConnect = Boolean(msg.payload.account);

          obs();
          return resolve(isConnect);
        });
      });
    };
  }
}
