<script lang="ts">
  import { scale } from "svelte/transition";
  import { _ } from "popup/i18n";
  import { push } from "svelte-spa-router";
  import { closePopup } from "popup/mixins/popup";
  import Toggle from "../components/Toggle.svelte";
  import Accordion, {
    createAccordionContext,
  } from "../components/Accordion.svelte";

  import { userResponseConnection } from "popup/backend/popup";

  const url = new URL(window.location.href);

  const questions = [
    {
      header: "Are you a developer?",
      default: true,
      selected: true,
      subMenu: [
        {
          index: "aish",
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
      ],
    },
    {
      header: "Are you a developer?",
      default: true,
      selected: true,
      subMenu: [
        {
          index: "aish",
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
      ],
    },
    {
      header: "Are you a developer?",
      default: true,
      selected: true,
      subMenu: [
        {
          index: "aish",
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
      ],
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

  createAccordionContext();
</script>

<main in:scale>
  <h1>Title</h1>

  <div>
    <h2>
      {$_("connect.question.0")}
      <mark> Domain </mark>
      {$_("connect.question.1")}
    </h2>

    {#each questions as quest}
      <Accordion>
        <div slot="header" class="header">
          <h3>{quest.header}</h3>
          <Toggle
            checked={quest.selected}
            on:toggle={() => {
              quest.selected = !quest.selected;
              quest.subMenu.forEach((item) => (item.selected = quest.selected));
            }}
          />
        </div>
        <div slot="body" class="body">
          {#each quest.subMenu as node}
            <div
              class="block"
              data-selected={node.selected}
              on:click={() => {
                node.selected = !node.selected;
              }}
            >
              <div class="defined">
                <div class="name">{node.index}</div>
                <div class="innerDiv">
                  <div>Opened</div>
                  <div class="times"><b>{node.times}</b> times in</div>
                  <div class="days"><b>{node.days}</b> days</div>
                </div>
              </div>
              <span class="overlay">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="check-icon"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
            </div>
          {/each}
        </div>
      </Accordion>
    {/each}
  </div>
  <div class="btn-wrap">
    <button class="primary" on:click={hanldeOnConfirm}>
      {$_("connect.btns.conf")}
    </button>
    <button on:click={hanldeOnReject}>{$_("connect.btns.reject")}</button>
  </div>
</main>

<style lang="scss">
  @import "../styles/mixins";

  main {
    margin: 10px;
    font-family: "RobotoLight";
  }
  .header {
    border-left: 5px solid var(--background-darker-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 5px auto;
    background: white;
    padding: 0.5rem;
    font-size: 12pt;
    line-height: 30pt;
    border-radius: 5px;

    h3 {
      margin: 0;
      font-family: 'RobotoMedium';
    }
  }

  .body {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }

  .block {
    position: relative;
    cursor: pointer;
    font-size: 16px !important;
    overflow-y: hidden;
    background-color: #fff;
    padding: 0;
    width: 100%;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

    @include flex-center-top-column;
    @include border-radius(8px);

    .defined {
      padding: 0;
      width: 100%;
      .name {
        width: 100%;
        text-align: center;
        padding: 5px;
        text-transform: uppercase;
        box-shadow: 0 0px 5px rgb(0 0 0 / 0.2);
        font-family: 'RobotoMedium';
      }

      .innerDiv {
        font-size: 10pt;
        margin: 0.5rem;
        gap: 2px;
        display: flex;
        flex-direction: column;

        b {
          font-family: "Bold";
          color: #000;
        }
      }
    }
    &:hover {
      transform: scale(1.05);
    }

    &[data-selected="true"] {
      .name {
        background-color: var(--background-darker-color);
        color: white;
        border: none;

        &::after {
          content: "✓";
          position: absolute;
          padding: 5px;
          background-color: #2feb4f;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          line-height: 14px;
          bottom: 5px;
          right: 5px;
          -webkit-animation: zoom-in 0.2s;
          animation: zoom-in 0.2s;

          @keyframes zoom-in {
            0% {
              transform: scale(0, 0);
            }
            100% {
              transform: scale(1, 1);
            }
          }
        }
      }
    }
    .overlay {
      background: rgba(109, 107, 105, 0.5);
      font-size: 22px;
      margin-top: 1rem;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100%;
      @include flex-center-column;
      visibility: hidden;
      .check-icon {
        width: 32px;
        height: 32px;
      }
    }

    &[data-selected="false"]:hover .overlay {
      visibility: visible;
    }
  }
  main {
    background-color: var(--background-color);
    height: 100vh;
    text-align: center;

    justify-content: space-between;

    @include flex-center-column;
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
