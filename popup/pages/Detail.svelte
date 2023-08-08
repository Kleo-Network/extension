<script lang="ts">
  import { _ } from "popup/i18n";

  import NavClose from "../components/NavClose.svelte";
  import  { ConnectStates, type AccordionData } from "../utils/interfaces.svelte";
  import AccordionGroup from "./AccordionGroup.svelte";

  export let questions: AccordionData[] = [
    {
      header: "Are you a developer?",
      default: true,
      subMenu: [
        {
          index: "aish",
          times: 2,
          days: 30,
          default: true,
          state: ConnectStates.DESELECTED,
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
          state: ConnectStates.DESELECTED,
        },
        {
          index: "TWITTER | WATCHERGURU",
          times: 2,
          days: 30,
          default: false,
          state: ConnectStates.DISABLED,
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
          state: ConnectStates.DESELECTED,
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
          state: ConnectStates.DESELECTED,
        },
        {
          index: "WALLET",
          times: 2,
          days: 365,
          default: false,
          state: ConnectStates.DISABLED,
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
</script>

<main>
  <NavClose title={$_("home.detail.title")} />
  <h1>Dappradar.com</h1>
  <AccordionGroup questions={questions} isReadOnly={true} />
</main>

<style lang="scss">
	@import "../styles/mixins";
	main {
		height: 100vh;
		background-color: var(--background-color);
    text-align: center;
	}
	h1 {
    text-align: center;
    margin: 10px;
		@include fluid-font(320px, 1024px, 22px, 55px);
	}

</style>
