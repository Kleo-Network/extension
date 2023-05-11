import { inject } from "./inject";
import { startStream } from "./stream";

export function startBrowserContent() {
  startStream();
  inject("inpage.js");
}
