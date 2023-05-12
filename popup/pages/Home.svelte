<script lang="ts">
	import { onMount } from "svelte";
	import { _ } from "popup/i18n";
	import { link, push } from "svelte-spa-router";



	  import TopBar from "../components/TopBar.svelte";
	 import BottomTabs from "../components/BottomTabs.svelte";


	const recentTransactions = [
	{
		"domain": "www.dappradar.com",
		"url": "https://testnet-zkevm.polygonscan.com/tx/0x6efc2c738d6c7765fa4fd701a78e7093597b2f7d9acc366a8263afc64f109876"
	},{
		"domain": "www.opensea.io",
		"url": "https://testnet-zkevm.polygonscan.com/tx/0x4b13a584e46d04ad661fe579a8756a9a9857e1cfa9686b9d5c07908894461c64"
	},
	{
		"domain": "www.binance.com",
		"url": "https://testnet-zkevm.polygonscan.com/tx/0xec7c82fd79bcc6bde186188c3aab56dbe304e28dd42e38ccaca568ff0efb7bde"
	},
	{
		"domain": "www.okx.com",
		"url": "https://testnet-zkevm.polygonscan.com/tx/0x277dd6551cee7a150402da6b32399e3c0eacb4ddaf1556a8352336049a167237"
	},
	{
		"domain": "nftmarketplace.com",
		"url": "https://testnet-zkevm.polygonscan.com/tx/0xcdc3bcf14ad5d64aeda361de7f7cb402d81c239589b3e043dec05a914dfbcd82"
	}];


</script>

<section>
	<TopBar refresh view lock on:refresh={() => console.log("hello")} />

	<main>
		<div class="bar-wrapper">
			
		</div>
		<div class="balance">100 $KLEO</div>
		<div class="btns">
			<button
				class="action"
				
			>
				{$_("home.btns.send")}
			</button>
		</div>
		<div class="wrapper">
			<h2>Connected Sites</h2>
			{#each recentTransactions as tx}
			<div class="block" on:click={() => push(`/detail`)}>
				<p>Connected to <a href="google.com">{tx.domain}</a></p>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6 icon_block"
				>
					<path
						fill-rule="evenodd"
						d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
		{/each}
			
			
		</div>
	</main>
	<BottomTabs />
</section>

<style lang="scss">
	@import "../styles/mixins";
	h2 {
		font-size: 12pt;
	}
	.icon_block {
		font-size: 13px;
		width: 20px;
	}
	.block {
		cursor: pointer;
		padding: 12px;
		margin: 3px;
		font-size: 16px !important;
		width: 300px;
		border: solid 2px var(--card-color);
		background-color: var(--card-color);
		box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
			rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

		@include flex-between-row;
		@include border-radius(8px);
		&.loading {
			@include loading-gradient(
				var(--background-color),
				var(--card-color)
			);
		}
		&.disabled {
			cursor: unset;
			opacity: 0.6;
		}
		&.disabled:hover {
			border-color: var(--card-color);
		}
		&:hover {
			border-color: var(--primary-color);
		}
	}
	main {
		height: calc(100vh - 86px);
		z-index: 3;

		@include flex-center-top-column;
	}

	img {
		position: fixed;
		max-width: 900px;
		width: 130vw;
		margin: 0% auto;
		left: auto;
		right: auto;
		top: -47px;
		opacity: 0.5;
	}
	div.wrapper {
		margin-top: 10px;
		padding-left: 10px;
		padding-right: 10px;

		min-width: 290px;
		max-width: 320px;
		width: fit-content;

		flex-wrap: wrap;

		display: flex;
		justify-content: flex-start;

		overflow-y: scroll;
	}
	section {
		background-color: var(--background-color);
		@include flex-center-top-column;
	}
	button.action {
		min-width: 120px;
		line-height: 30px;
	}
	button.add {
		min-width: 290px;
		color: var(--primary-color);
		margin-block-start: 5px;
		margin-block-end: 5px;

		&:hover {
			color: var(--background-color);
		}
	}
	div.balance {
		max-width: 500px;
		font-size: 30px;
		margin-block-end: 20px;
	}
	div.bar-wrapper {
		max-width: 500px;

		@include flex-center-column;
	}
	:global(button.add > svg > path) {
		fill: var(--primary-color) !important;
	}
	:global(button.add:hover > svg > path) {
		fill: var(--background-color) !important;
	}
</style>
