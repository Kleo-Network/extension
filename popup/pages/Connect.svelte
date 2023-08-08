<script lang="ts">
  import { scale } from "svelte/transition";
  import { _ } from "popup/i18n";
  import { push } from "svelte-spa-router";
  import { closePopup } from "popup/mixins/popup";
  import { userResponseConnection } from "popup/backend/popup";
  import  { ConnectStates } from "../utils/interfaces.svelte";
  import AccordionGroup from "./AccordionGroup.svelte";
  import type { formData } from "types/account";

  const url = new URL(window.location.href);
  const appInfo = {
    domain: "domain",
    title: "title",
    icon: "icon",
    uuid: "someuuid"
  }

  export let questions: formData[] = [
    {
      header: "Are you a developer?",
      default: true,
      subMenu: [
        {
          index: "github.com",
          times: 2,
          days: 30,
          default: true,
          state: ConnectStates.SELECTED,
        },
        {
          index: "gmail.com",
          times: 2,
          days: 365,
          default: false,
          state: ConnectStates.SELECTED,
        },
        {
          index: "BINANCE",
          times: 2,
          days: 200,
          default: true,
          state: ConnectStates.SELECTED,
        },
        {
          index: "TWITTER | WATCHERGURU",
          times: 2,
          days: 30,
          default: false,
          state: ConnectStates.SELECTED,
        },
        {
          index: "BINANCE",
          times: 2,
          days: 200,
          default: true,
          state: ConnectStates.SELECTED,
        },
        {
          index: "TWITTER | WATCHERGURU",
          times: 2,
          days: 30,
          default: false,
          state: ConnectStates.SELECTED,
        },
      ],
    },
    {
      header: "Are you a developer?",
      default: true,
      subMenu: [
        {
          index: "aish",
          times: 2,
          days: 30,
          default: true,
          state: ConnectStates.SELECTED,
        },
        {
          index: "WALLET",
          times: 2,
          days: 365,
          default: false,
          state: ConnectStates.SELECTED,
        },
        {
          index: "BINANCE",
          times: 2,
          days: 200,
          default: true,
          state: ConnectStates.SELECTED,
        },
        {
          index: "TWITTER | WATCHERGURU",
          times: 2,
          days: 30,
          default: false,
          state: ConnectStates.SELECTED,
        },
        {
          index: "BINANCE",
          times: 2,
          days: 200,
          default: true,
          state: ConnectStates.SELECTED,
        },
        {
          index: "TWITTER | WATCHERGURU",
          times: 2,
          days: 30,
          default: false,
          state: ConnectStates.SELECTED,
        },
      ],
    },
    {
      header: "Are you a developer?",
      default: true,
      subMenu: [
        {
          index: "aish",
          times: 2,
          days: 30,
          default: true,
          state: ConnectStates.SELECTED,
        },
        {
          index: "WALLET",
          times: 2,
          days: 365,
          default: false,
          state: ConnectStates.SELECTED,
        },
        {
          index: "BINANCE",
          times: 2,
          days: 200,
          default: true,
          state: ConnectStates.SELECTED,
        },
        {
          index: "TWITTER | WATCHERGURU",
          times: 2,
          days: 30,
          default: false,
          state: ConnectStates.SELECTED,
        },
        {
          index: "BINANCE",
          times: 2,
          days: 200,
          default: true,
          state: ConnectStates.SELECTED,
        },
        {
          index: "TWITTER | WATCHERGURU",
          times: 2,
          days: 30,
          default: false,
          state: ConnectStates.SELECTED,
        },
      ],
    },
  ];
  const handleOnConfirm = async () => {
    await userResponseConnection({"form": questions, "click": true, ...appInfo});

    if (url.searchParams.has("type")) {
      await closePopup();
    }

    push("/");
  };
  const handleOnReject = async () => {
    await userResponseConnection({"form": questions, "click": false, ...appInfo});

    if (url.searchParams.has("type")) {
      await closePopup();
    }
    push("/");
  };
</script>

<main in:scale>
  <AccordionGroup questions={questions} isReadOnly={false} />
  <div class="btn-wrap">
    <button class="primary" on:click={handleOnConfirm}>
      {$_("connect.btns.conf")}
    </button>
    <button on:click={handleOnReject}>{$_("connect.btns.reject")}</button>
  </div>
</main>

<style lang="scss">
  @import "../styles/mixins";

  main {
    margin: 20px 10px;
    font-family: "RobotoLight";
    text-align: center;
    background-color: var(--background-color);
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
