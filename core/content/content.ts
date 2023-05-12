import { inject } from "./inject";
import { startStream } from "./stream";

export function startBrowserContent() {
  console.log("start stream is working???");
  startStream();
  inject("inpage.js");
}
