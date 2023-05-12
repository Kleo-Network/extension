import { Handler } from "./handler";
import { Kleo } from "./kleo";

export const handler = Object.freeze(new Handler());
console.log("handler.stream", handler.stream);
export const KleoMain = Object.freeze(
    new Kleo(handler.stream, handler.subject)
);
handler.initialized();
console.log("handler.stream", handler.stream);

window["kleo"] = KleoMain;
