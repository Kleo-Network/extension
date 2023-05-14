import type { Websites } from 'types/account';
import { writable } from 'svelte/store';

export default writable<Websites>({
  connections: []
});
