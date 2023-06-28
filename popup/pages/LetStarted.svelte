<script lang="ts">
	import  { push } from 'svelte-spa-router';
	import { fly } from 'svelte/transition';
	import flyTransition from 'popup/transitions/fly';
	import { _ } from 'popup/i18n';
	import guardStore from "popup/store/guard";

	const createNewAccount = async () => {
		console.log("this should create a new account?");
		const store = {
			isReady: true, 
			isEnable: true
		};
		guardStore.set(store);
		push('/');
	};
</script>

<main in:fly={flyTransition.in}>
	
	<h1>
		{$_('start.title')}
	</h1>
	<h3>
		{$_('start.subt_title')}
	</h3>
	<div>
		<button
			class="btn secondary"
		>
			{$_('start.btn_restore')}
	</button>
		<button
			on:click={createNewAccount}
			class="btn primary"
		>
			{$_('start.btn_create')}
	</button>
	</div>
</main>

<style lang="scss">
	@import "../styles/mixins";

	button {
		 margin-right: 10px;
	}
	img {
		max-width: 500px;
    width: calc(100vw - 90px);
	}

	h1 {
		color: var(--text-color);
		@include fluid-font(320px, 1024px, 22px, 55px);
	}

	h3 {
		color: var(--text-color);
		@include fluid-font(320px, 1024px, 16px, 30px);
	}

	main {
		background-color: var(--background-color);
		height: 100vh;

		@include flex-center-column;

		& > div {
			@include flex-between-row;
			width: 100%;
			max-width: 290px;

			a {
				margin: 10px;
			}
		}
	}
</style>
