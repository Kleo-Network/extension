import type { AppConnect } from 'types/app-connect';
import { BrowserStorage, buildObject } from 'lib/storage';
import { Fields } from 'config/fields';
import { NotificationsControl } from './notifications';

export class WebsiteController {
  #identities: AppConnect[] = [];
  #confirm?: AppConnect;

  public get connections() {
    return this.#identities;
  }

  public get confirmApp() {
    return this.#confirm;
  }

  

 
  public isConnected(domain: string) {
    return this.#identities.some((a) => a.domain === domain);
  }

  public async add(connect: AppConnect) {
    

    connect.uuid = undefined;
    this.#identities.push(connect);
    this.#confirm = undefined;

    NotificationsControl.counter(0);

    await BrowserStorage.set(
      buildObject(Fields.CONNECT_LIST, this.connections),
      buildObject(Fields.CONNECT_DAPP, this.confirmApp)
    );
  }

  public async addConfirm(connect: AppConnect) {
    this.#confirm = connect;

    NotificationsControl.counter(1);
    await BrowserStorage.set(
      buildObject(Fields.CONNECT_DAPP, this.confirmApp)
    );
  }
  public async reset() {
    this.#identities = [];
    this.#confirm = undefined;

    await BrowserStorage.set(
      buildObject(Fields.CONNECT_LIST, this.connections),
      buildObject(Fields.CONNECT_DAPP, this.confirmApp),
    );
  }
  public async rejectConfirm() {
    this.#confirm = undefined;

    NotificationsControl.counter(0);
    await BrowserStorage.rm(Fields.CONNECT_DAPP);
  }
  public async sync() {
    const jsonData = await BrowserStorage.get(Fields.CONNECT_LIST);
    const confirm = await BrowserStorage.get(Fields.CONNECT_DAPP);
    try {
      if (confirm) {
        this.#confirm = JSON.parse(String(confirm));

        if (Object.keys(this.#confirm).length > 0) {
          NotificationsControl.counter(1);
        }
      }
    } catch (err) {
      ///
    }

    try {
      this.#identities = JSON.parse(String(jsonData));
    } catch (err) {
      await this.reset();
    }
  }

}
