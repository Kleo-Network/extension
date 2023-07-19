<script lang="ts">
	import { push } from 'svelte-spa-router';
	import { _ } from 'popup/i18n';

	import BottomTabs from '../components/BottomTabs.svelte';
	import TopBar from '../components/TopBar.svelte';
    import HistoryTron from '../components/HistoryTron.svelte';

	let items = [
		{
			title: "Token Design for $KLEO and why should one get early?",
			url: "https://www.blog.kleo.network/token-design-for-kleo/",
		},
		{
			title: "3500 usd to inr - Google Search",
			url: "https://www.google.com/search?q=3500+usd+to+inr&oq=3500+usd&aqs=chrome.1.0i433i512j0i512l9.4162j1j7&sourceid=chrome&ie=UTF-8",
		},
		{
			title: "Shut Up Ya Kunal - EP29 || Prof. Dilip Mandal || India's Art Landscape amid Societal Shifts - YouTube",
			url: "https://www.youtube.com/watch?v=ntNboku8F4M&t=2014s",
		},
		{
			title: "YouTube",
			url: "https://www.youtube.com/",
		},
		{
			title: "The Kashmir files: Reel VS Real - YouTube",
			url: "https://www.youtube.com/watch?v=sqPqns-AzAg",
		},	
		{
			title: "YouTube",
			url: "https://www.youtube.com/",
		},
		{
			title: "The Kashmir files: Reel VS Real - YouTube",
			url: "https://www.youtube.com/watch?v=sqPqns-AzAg",
		}
	];
</script>

<section>
	<TopBar
		refresh
		lock
	/>
	<main>
		<h2>History</h2>
		{#each items as item, i}
            <HistoryTron title={item.title} url={item.url} />
				
			{/each}

    <button class="btn btn-primary btn-block"> View All </button>
	</main>
	<BottomTabs />
</section>

<style lang="scss">
	@import "../styles/mixins";
    .btn-block
    {
        width: 100%;
    }
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


</style>