<script lang="ts">
	import Router from "svelte-spa-router";
	import { onMount } from "svelte";
	import routes from "./routers";
	import { setupI18n } from 'popup/i18n';
	let loaded = false;

	onMount(async () => {
		await setupI18n({
			withLocale: 'en'
		});
		loaded = true;
	});
</script>

{#if loaded}
	<Router  {routes} />
{/if}

<style lang="scss">
	@import "./styles/general";
</style>
