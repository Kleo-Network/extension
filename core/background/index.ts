import { KleoBackground } from "background/wallet/bg-kleo";
import { startBackground } from "./background";

async function decryptMessage(key, ciphertext) {
  let decrypted = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    key,
    ciphertext
  );

  let dec = new TextDecoder();
  return dec.decode(decrypted);
}

(async function () {
  console.log("getting called?");
  const core = new KleoBackground();

  await core.sync();

  startBackground(core);
  console.log("background is running, right?");
})();
