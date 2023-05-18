
import App from './App.svelte';
import { getState } from './backend/popup';
import { Runtime } from 'lib/runtime';
import { Fields } from 'config/fields';

let app = {};

getState()
	.then(() => {
		app = new App({
			target: document.body
		});
		const events = Runtime.storage.local['onChanged'];

		if (!events) {
			return null;
		}

		if (events && events.hasListeners && events.hasListeners()) {
			events.removeListener();
		}

		events.addListener(async(event: object) => {
			for (const key in event) {
				if (key.includes(Fields.TRANSACTIONS)) {
					await getState();
				}
			}
		});
	})
	.catch(console.error);

export default app;
