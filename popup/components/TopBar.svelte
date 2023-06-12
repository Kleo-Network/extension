<script lang="ts">
  import { link, location, push } from "svelte-spa-router";
  import { createEventDispatcher } from "svelte";

  import Refresh from "./icons/Refresh.svelte";
  import ExpandIcon from "./icons/Expand.svelte";
  import ViewIcon from "./icons/View.svelte";
  import LockIcon from "./icons/Lock.svelte";

  const dispatch = createEventDispatcher();

  export let refresh = false;
  export let expand = true;
  export let view = false;
  export let lock = false;

  const onRefresh = () => {
    dispatch("refresh");
  };
  const viewOnViewBlock = () => {
    const url = "https://www.google.com";
  };
  const handleOnLock = async () => {
    push("/lock");
  };
</script>

<nav class="flex w-full justify-between items-center px-2">
  <a class="network" class:mainnet={true} href="/network" use:link>
    <span />
  </a>
  <div class="icons-warp flex space-x-2 items-center">
    {#if expand}
      <span class="expand" on:click={() => console.log($location)}>
        <ExpandIcon className="icon" />
      </span>
    {/if}
    {#if refresh}
      <span class="refresh" on:click={onRefresh}>
        <Refresh className="icon" />
      </span>
    {/if}
    {#if view}
      <span class="view" on:click={viewOnViewBlock}>
        <ViewIcon className="icon-view" />
      </span>
    {/if}
    {#if lock}
      <span class="lock" on:click={handleOnLock}>
        <LockIcon className="icon-lock" />
      </span>
    {/if}
  </div>
</nav>

<style lang="scss">
  @import "../styles/mixins";
  nav {
    max-width: 900px;
    height: 36px;
    width: 100%;
    background-color: var(--card-color);
    z-index: 2;

    @include flex-between-row;

    @media screen and (min-width: 899px) {
      @include border-bottom-radius(8px);
    }
  }
  a.network {
    height: 15px;
    width: 15px;

    margin: 11px;

    border-radius: 100%;
    background-color: var(--warning-color);

    &.mainnet {
      background-color: var(--primary-color);
    }
  }
  span {
    cursor: pointer;

    &.lock {
      margin-right: 10px;
    }

    :global(svg.icon > path) {
      fill: var(--muted-color);
    }

    &:hover {
      :global(svg.icon-view > circle) {
        stroke: var(--primary-color);
      }
      :global(svg.icon-view > line) {
        stroke: var(--primary-color);
      }
      :global(svg.icon-view > path) {
        stroke: var(--primary-color);
      }
      :global(svg.icon-lock > path) {
        fill: var(--primary-color);
      }
      :global(svg.icon > path) {
        fill: var(--primary-color);
      }
    }
  }
</style>
