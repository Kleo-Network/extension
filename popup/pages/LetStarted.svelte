<script lang="ts">
	import  { push } from 'svelte-spa-router';
	import { fly } from 'svelte/transition';
	import flyTransition from 'popup/transitions/fly';
	import { _ } from 'popup/i18n';
	import {createNextSeedAccount} from "popup/backend/popup"
	import requestAPI, { HTTP_METHOD } from "popup/backend/api";

	let inviteCode = '';

	const createNewAccount = async () => {
		const isInviteCodeValid = await checkInviteCode();
		console.log(isInviteCodeValid);
		if(isInviteCodeValid){
			await createNextSeedAccount("account 1");
			push('/');
		}
		// console.log("this should create a new account?");
	};

	const checkInviteCode =async () => {
		const apiUrl = `/organizations/invite?inviteCode=${inviteCode}`;
		return await requestAPI(apiUrl, HTTP_METHOD.GET);
	}
</script>

<main in:fly={flyTransition.in}>
	
	<h1>
		{$_('start.title')}
	</h1>
	<h3>
		{$_('start.subt_title')}
	</h3>
	<div>
		<input type="text" bind:value={inviteCode} />
	</div>
	<div>
		
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
