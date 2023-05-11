import { Handler } from "./handler";
import { Kleo } from "./kleo";

export const handler = Object.freeze(new Handler());
export const KleoMain = Object.freeze(
    new Kleo(handler.stream, handler.subject)
);
handler.initialized();
window["kleo"] = KleoMain;
