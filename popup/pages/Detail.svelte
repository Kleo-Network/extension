<script lang="ts">
	import { _ } from 'popup/i18n';

	import { Runtime } from 'lib/runtime';

	import NavClose from '../components/NavClose.svelte';

	const intents = [
		{
			title: 'Indexed <i> NFT </i> more than <i> 20 times </i> in last month'
		},
		{
			title: 'Indexed <i> Wallet </i> more than <i> 2 times </i> in 20 days'
		},
		{
			title: 'Indexed <i> Binance </i> more than <i> 11 times </i> in last month'
			
		},
		{
			title: 'Indexed <i> Coinmarketcap </i> more than <i> 20 times </i> in last month'
			
		},
	];
</script>

<main>
	<NavClose title={$_('home.detail.title')}/>
	<h1>
		Dappradar.com 
	</h1>
	<ul class="box">
		{#each intents as intent}
			<li>
				<p>
					<b>Lookup:</b>{@html intent.title}
				</p>

				
			</li> 
		{/each}
		<li>
			<p>
					<b>Intent:</b>	Used to identify if it is a new user, and if they are show them a tutorial video first
				</p>
		</li>
	</ul>
</main>

<style lang="scss">
	@import "../styles/mixins";
	.box {
		background-color: white;
		color: black;
		font-size:14px;
		padding:10px;
		text-align:left;
	}
	main {
		height: 100vh;
		background-color: var(--background-color);
		@include flex-center-top-column;
	}
	h1 {
		@include fluid-font(320px, 1024px, 22px, 55px);
	}
	ul {
		margin: 0;
    padding: 0;
		z-index: 2;
		& > li {
			text-align: center;
		}
		& > li > a {
			cursor: pointer;
			font-family: Demi;
			color: var(--text-color);
			line-height: 30px;
			font-size: 21px;

			&:hover {
				color: var(--primary-color);
			}
		}
	}
	img {
		position: fixed;
		max-width: 900px;
		width: 130vw;
		margin: 15vh auto;
		left: auto;
		right: auto;
		top: -47px;
		opacity: 0.5;
	}
</style>
