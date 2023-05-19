<script lang="ts">
	import { scale } from "svelte/transition";
	import { _ } from "popup/i18n";
	import { onMount } from "svelte";
	import { push } from "svelte-spa-router";
	import { closePopup } from "popup/mixins/popup";
	import Toggle from "../components/Toggle.svelte";

	import { userResponseConnection } from "popup/backend/popup";

	const url = new URL(window.location.href);

	

	
	const questions = [
		{
			index: "COINMARKETCAP",
			times: 2,
			days: 30,
			default: true,
			selected: true,
		},
		{
			index: "WALLET",
			times: 2,
			days: 365,
			default: false,
			selected: false,
		},
		{
			index: "BINANCE",
			times: 2,
			days: 200,
			default: true,
			selected: true,
		},
		{
			index: "TWITTER | WATCHERGURU",
			times: 2,
			days: 30,
			default: false,
			selected: false,
		},
	];
	const hanldeOnConfirm = async () => {
		await userResponseConnection(true);
		
		if (url.searchParams.has("type")) {
			await closePopup();
		}

		push("/");
	};
	const hanldeOnReject = async () => {
		await userResponseConnection(false);

		if (url.searchParams.has("type")) {
			await closePopup();
		}
		push("/");
	};
</script>

<main in:scale>
	<h1>Title</h1>

	<div>
		<h2>
			{$_('connect.question.0')}
			<mark> Domain </mark>
			{$_('connect.question.1')}
		</h2>

		{#each questions as quest, index}
		<div class="block">
			<p class="defined">
				Titled <b>{quest.index}</b> more than
				<b>{quest.times} times</b> last <b>{quest.days} days</b>
			</p>

			<Toggle checked={quest.selected} on:toggle={() =>
			{questions[index].selected = !(questions[index].selected); console.log("questions",questions);	}} />
		</div>
		{/each}
	</div>
	<div class="btn-wrap">
		<button class="primary" on:click="{hanldeOnConfirm}">
			{$_('connect.btns.conf')}
		</button>
		<button on:click="{hanldeOnReject}">{$_('connect.btns.reject')}</button>
	</div>
</main>

<style lang="scss">
	@import "../styles/mixins";
	.defined {
		width: 80%;
	}
	.block {
		cursor: pointer;
		padding: 3px;
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
		background-color: var(--background-color);
		height: 100vh;
		text-align: center;

		justify-content: space-between;

		@include flex-left-column;
	}
	h1 {
		@include fluid-font(320px, 720px, 20px, 30px);
		@include text-shorten;
	}
	h2 {
		@include fluid-font(320px, 720px, 15px, 20px);
	}
	img {
		margin: 16px;
		display: auto;
	}
	div,
	h1 {
		max-width: 500px;
		width: calc(100vw - 30px);
		padding-left: 10px;
		padding-right: 10px;
	}
	div {
		&.btn-wrap {
			max-width: 400px;
			min-width: 290px;
			width: 100%;
			margin-block-start: 2vh;
			@include flex-between-row;

			& > button {
				margin: 5px;
			}
		}
	}
</style>