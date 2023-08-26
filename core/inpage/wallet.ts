import type { TabStream } from "lib/streem/tab-stream";
import type { InpageWallet } from "types/account";
import type { Subject } from "lib/streem/subject";
import { uuidv4 } from "lib/crypto/uuid";
import { MTypeTab, MTypeTabContent } from "lib/streem/stream-keys";
import { getFavicon } from "./favicon";
import { ContentMessage } from "lib/streem/secure-message";

export class Wallet {
  #stream: TabStream;
  #subject: Subject;

  #isConnect = false;
  #isEnable = false;
  #http: string | null;
  #defaultAccount: {} | null = null;

  public txns = new Set<string>();

  public get isConnect() {
    return this.#isConnect;
  }

  public get isEnable() {
    return this.#isEnable;
  }

  public get defaultAccount() {
    return this.#defaultAccount;
  }

  public get http() {
    return this.#http;
  }

  constructor(stream: TabStream, subject: Subject) {
    this.#stream = stream;
    this.#subject = subject;
  }


  public async connect({orgId}): Promise<any> {
    const type = MTypeTab.CONNECT_APP;
    const recipient = MTypeTabContent.CONTENT;
    const uuid = uuidv4();
    const title = "Kleo Connect";
    const domain = window.document.domain;
    const icon = getFavicon();
    const payload = {
      title,
      domain,
      icon,
      uuid,
      orgId
    };

    new ContentMessage({
      type,
      payload,
    }).send(this.#stream, recipient);

    return new Promise((resolve) => {
      const obs = this.#subject.on((msg) => {
        this.#defaultAccount = msg;
        obs();
        return resolve(msg);
      });
    });
  }

  
}
