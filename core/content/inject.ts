import { Runtime } from "lib/runtime";

const { document } = globalThis;

export function inject(name: string) {
  // Create new script tag in the document head.
  const container = document.head || document.documentElement;
  const scriptTag = document.createElement("script");
  const src = Runtime.extension.getURL(`/${name}`);

  scriptTag.setAttribute("async", "false");
  scriptTag.src = src;
  container.insertBefore(scriptTag, container.children[0]);
  container.removeChild(scriptTag);
}
