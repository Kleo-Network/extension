import App from "./App.svelte";
import { Runtime } from "lib/runtime";
import { Fields } from "config/fields";

let app = new App({
	target: document.body,
});


export default app;
