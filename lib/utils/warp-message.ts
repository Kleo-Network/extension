import type { SendResponseParams } from "types/stream";

export function warpMessage(msg: SendResponseParams): any {
  if (!msg) {
    return null;
  }
  if (msg.reject) {
    throw new Error(String(msg.reject));
  }
  console.log("message from warp-message", msg);
  return msg.resolve;
}
