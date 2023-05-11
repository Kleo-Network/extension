import { MTypeTabContent } from "lib/streem/stream-keys";
import { ContentMessage } from "lib/streem/secure-message";
import { ContentTabStream } from "./tab-stream";
import { Runtime } from "lib/runtime";

export function startStream() {
  const tabStream = new ContentTabStream();

  Runtime.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (sender.id !== Runtime.runtime.id) {
      return null;
    }

    const msg = new ContentMessage(req);

    if (!msg.type || !msg.payload) {
      sendResponse({
        reject: "type and payload is required.",
      });
      return null;
    }

    const type = msg.type;
    const recipient = MTypeTabContent.INJECTED;

    new ContentMessage({
      type,
      payload: msg.payload,
    }).send(tabStream.stream, recipient);

    sendResponse({});
  });
}
