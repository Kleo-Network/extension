<script lang="ts">
	import { push } from 'svelte-spa-router';
	import { _ } from 'popup/i18n';

	import BottomTabs from '../components/BottomTabs.svelte';
	import TopBar from '../components/TopBar.svelte';
    import Jumbotron from '../components/Jumbotron.svelte';
	import Toggle from '../components/Toggle.svelte';
	import {NETWORKS, STORAGE} from 'config/networks';

	let items = [
		{
			title: $_('settings.account.title'),
			description: $_('settings.account.description'),
			link: '/account'
		},
		{
			title: $_('settings.general.title'),
			description: $_('settings.general.description'),
			link: '/general'
		},
		{
			title: $_('settings.contacts.title'),
			description: $_('settings.contacts.description'),
			link: '/contacts'
		},
		{
			title: $_('settings.advanced.title'),
			description: $_('settings.advanced.description'),
			link: '/advanced'
		},
		{
			title: $_('settings.networks.title'),
			description: $_('settings.networks.description'),
			link: '/netwrok'
		},
		{
			title: $_('settings.connections.title'),
			description: $_('settings.connections.description'),
			link: '/connections'
		},
		{
			title: $_('settings.security.title'),
			description: $_('settings.security.description'),
			link: '/security'
		},
		{
			title: $_('settings.about.title'),
			description: $_('settings.about.description'),
			link: '/about'
		}
	];
</script>

<section>
	<TopBar
		refresh
		lock
	/>
	<main>
		<h2>Settings</h2>
		<ul>

			<Jumbotron title="Select Network">
				
			<select>
				{#each NETWORKS as net}
					<option
						value={net}
					>
						{net}
					</option>
				{/each}
			</select>
		
		</Jumbotron>

		<Jumbotron title="Select Storage">
				
			<select>
				{#each STORAGE as st}
					<option
						value={st}
					>
						{st}
					</option>
				{/each}
			</select>
		
		</Jumbotron>
		<Jumbotron
		title="Let Kleo Choose Default?"
		description="Allow Kleo to select the default option for you."
	>
		<div class="right">
			<Toggle checked={true} />
		</div>
	</Jumbotron>
		<Jumbotron
		title="Privacy Policy"
		description="I agree with terms and conditions of Kleo Network"
	>
		<div class="right">
			<Toggle checked={true} />
		</div>
	</Jumbotron>
<Jumbotron
				title="Export Private Key"
			>
				<span
					class="warning"
					
				>
					Copy Private Key
				</span>
			</Jumbotron>
		</ul>
	</main>
	<BottomTabs />
</section>

<style lang="scss">
	@import "../styles/mixins";
	main {
		@include flex-center-top-column;
	}
  section {
		background-color: var(--background-color);
		height: fit-content;
		@include flex-center-top-column;
	}
	ul {
		padding: 0;
    margin: 0;
    overflow-y: scroll;

		height: calc(100vh - 86px);
		max-width: 500px;

		& > li {
			cursor: pointer;
			color: var(--text-color);
			min-width: 290px;

			@include flex-between-row;
		}
	}

	span {
		font-family: Demi;
		margin: auto;
		text-align: center;
		&.disabled {
			cursor: unset !important;
			opacity: 0.5;
		}
		&.warning {
			cursor: pointer;
			font-size: 16px;
			color: var(--primary-color);

			&:hover {
				color: var(--warning-color);
			}
		}
	}
</style>