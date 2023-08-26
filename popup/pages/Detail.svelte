<script lang="ts">
  import { _ } from "popup/i18n";

  import NavClose from "../components/NavClose.svelte";
  import AccordionGroup from "./AccordionGroup.svelte";
  import { onMount } from "svelte";
  import { querystring } from "svelte-spa-router";
  import requestAPI, { HTTP_METHOD } from "popup/backend/api";

  export let detailData = [];
  let isLoading = true;

  onMount(async () => {
      try {
        const searchParams = new URLSearchParams($querystring);
        const orgId = searchParams.get("orgId");
        const userId = searchParams.get("userId");
        const apiUrl = `/connections/user/${userId}/org/${orgId}`;
        detailData = await requestAPI(apiUrl, HTTP_METHOD.GET);
      } catch (e) {
      } finally {
        isLoading = false;
      }
  });
</script>

<main>
  {#if isLoading}
    <div class="loader">Loading...</div>
  {:else}
    <NavClose title={$_("home.detail.title")} />
    <h1>{detailData.length ? detailData[0].domainUrl: ""}</h1>
    <AccordionGroup questions={detailData[0].connectData} isReadOnly={true} />
  {/if}
</main>

<style lang="scss">
  @import "../styles/mixins";
  main {
    height: 100vh;
    background-color: var(--background-color);
    text-align: center;

    .loader {
      font-size: 1.5rem;
      color: #007bff;
    }
  }
  h1 {
    text-align: center;
    margin: 10px;
    @include fluid-font(320px, 1024px, 22px, 55px);
  }
</style>
