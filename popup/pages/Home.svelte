<script lang="ts">
  import { _ } from "popup/i18n";
  import { link, push } from "svelte-spa-router";
  import TopBar from "../components/TopBar.svelte";
  import BottomTabs from "../components/BottomTabs.svelte";
  import Account from "../components/Account.svelte";
  import { onMount } from "svelte";
  import requestAPI, { HTTP_METHOD } from "popup/backend/api";

  const user = {
    balance: "35",
    network: "polygon",
    address: "0x01e92439cfe82aa2d75970954445308aa1febbe8",
  };

  let isLoading = true;
  let recentTransactions = [];

  onMount(async () => {
    try {
      const apiUrl = `/connections/user?publicAddress=${user.address}`;
      recentTransactions = await requestAPI(apiUrl, HTTP_METHOD.GET);
    } catch (e) {
    } finally {
      isLoading = false;
    }
  });
</script>

<section>
  <TopBar refresh view lock on:refresh={() => console.log("hello")} />

  <main>
    <div class="bar-wrapper" />
    <div class="balance">{user.balance} $KLEO</div>
    <Account />
    <div class="wrapper">
      <h2>Connected Sites</h2>
      {#if isLoading}
        <div class="loader">Loading...</div>
      {:else}
        {#each recentTransactions as tx}
          <div
            class="block"
            on:click={() =>
              push(`/detail?orgId=${tx.organizationId}&userId=${user.address}`)}
          >
            <p>Connected to <b class="url">{tx.domainUrl}</b></p>

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
      {/if}
    </div>
  </main>
  <BottomTabs />
</section>

<style lang="scss">
  @import "../styles/mixins";

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
      @include loading-gradient(var(--background-color), var(--card-color));
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

	.loader {
      font-size: 1.5rem;
      color: #007bff;
    }
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
    margin-top: 20px;
    margin-block-end: 0px;
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

  .url {
    color: var(--text-color);
    font-size: 15px;
  }
</style>
