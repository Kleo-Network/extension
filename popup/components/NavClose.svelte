<script lang="ts">
	import { pop } from 'svelte-spa-router';
	import CloseIcon from './Close.svelte';

  export let title: string;
</script>

<nav>
  <h1>
    {title}
  </h1>
  <div on:click={pop}>
    <CloseIcon />
  </div>
</nav>

<style lang="scss">
  @import "../styles/mixins";
  h1 {
    color: var(--text-color);
    font-size: 22px;
		margin-block-start: 0.4em;
		margin-block-end: 0.4em;
  }
  nav {
    @include flex-around-row;
    max-width: 900px;
    align-items: center;
    box-shadow: 0 0px 5px rgb(0 0 0 / 0.2);
    background-color: var(--card-color);;

  }
</style>
