<script lang="ts">
  import { scale } from "svelte/transition";
  import { _ } from "popup/i18n";
  import { push } from "svelte-spa-router";
  import { closePopup } from "popup/mixins/popup";
  import { userResponseConnection } from "popup/backend/popup";
  import AccordionGroup from "./AccordionGroup.svelte";
  import type { formData } from "types/account";
  import websiteStore from "popup/store/connect";
  import { onMount } from "svelte";
  import requestAPI, { HTTP_METHOD } from "popup/backend/api";

  export let questions: formData[] = [];
  let isLoading = true;
  let orgData = true;

  const url = new URL(window.location.href);
  const appInfo = {
    domain: "domain",
    title: "title",
    icon: "icon",
    uuid: "someuuid",
  };

  onMount(async () => {
    try {
      const apiUrl = `/organizations?orgId=${$websiteStore.confirmApp["orgId"]}`;
      const orgDataRes = await requestAPI(apiUrl, HTTP_METHOD.GET);
      questions = orgDataRes[0].formData;
      orgData = orgDataRes[0];
    } catch (e) {
    } finally {
      isLoading = false;
    }
  });

  async function createNewConnection() {
    try {
      isLoading = true;
      const apiUrl = "/connections";
      await requestAPI(apiUrl, HTTP_METHOD.POST, {
        userAddress: $websiteStore.confirmApp["userAddress"],
        orgId: orgData["id"],
        connectData: questions,
        domainUrl: orgData["domainUrl"],
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  const handleOnConfirm = async () => {
    await userResponseConnection({ form: questions, click: true, ...appInfo });

    await createNewConnection();

    if (url.searchParams.has("type")) {
      await closePopup();
    }

    push("/");
  };
  const handleOnReject = async () => {
    await userResponseConnection({ form: questions, click: false, ...appInfo });

    if (url.searchParams.has("type")) {
      await closePopup();
    }
    push("/");
  };
</script>

<main in:scale>
  {#if isLoading}
    <div class="loader">Loading...</div>
  {:else}
    <AccordionGroup {questions} isReadOnly={false} />
    <div class="btn-wrap">
      <button class="primary" on:click={handleOnConfirm}>
        {$_("connect.btns.conf")}
      </button>
      <button on:click={handleOnReject}>{$_("connect.btns.reject")}</button>
    </div>
  {/if}
</main>

<style lang="scss">
  @import "../styles/mixins";

  main {
    margin: 20px 10px;
    font-family: "RobotoLight";
    text-align: center;
    background-color: var(--background-color);

    .loader {
      font-size: 1.5rem;
      color: #007bff;
    }
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
  .btn-wrap,
  h1 {
    max-width: 500px;
    padding-left: 10px;
    padding-right: 10px;
  }
  div {
    &.btn-wrap {
      width: 100%;
      margin-block-start: 2vh;
      @include flex-between-row;

      & > button {
        margin: 5px;
      }
    }
  }
</style>
