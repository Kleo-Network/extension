
import { Counter, ModeOfOperation, utils } from 'aes-js';
import assert from 'assert';
import { randomBytes } from 'lib/crypto/random';

export const Cipher = Object.freeze({
  encrypt(content: Uint8Array, key: Uint8Array) {
    assert(Boolean(content), "IncorrectParams");
    assert(Boolean(key), "IncorrectParams");

    const entropy = randomBytes(16);
    const iv = new Counter(entropy);
    const aesCtr = new ModeOfOperation.ctr(key, iv);
    const encrypted = aesCtr.encrypt(content);
    const bytes = utils.utf8.toBytes(
      `${utils.hex.fromBytes(encrypted)}/${utils.hex.fromBytes(entropy)}`
    );

    return bytes;
  },
  decrypt(bytes: Uint8Array, key: Uint8Array) {
    assert(Boolean(bytes), "IncorrectParams");
    assert(Boolean(key), "IncorrectParams");

    const [encrypted, iv] = utils.utf8.fromBytes(bytes).split('/');

    const counter = new Counter(utils.hex.toBytes(iv));
    const aesCtr = new ModeOfOperation.ctr(
      key,
      counter
    );

    return aesCtr.decrypt(utils.hex.toBytes(encrypted));
  }
});