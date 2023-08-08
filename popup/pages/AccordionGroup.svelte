<script lang="ts">
  import { scale } from "svelte/transition";
  import { onMount } from "svelte";
  import Toggle from "../components/Toggle.svelte";
  import Accordion from "../components/Accordion.svelte";
  import  { ConnectStates, type AccordionData } from "../utils/interfaces.svelte";


  export let isReadOnly = false;

  export let questions: AccordionData[] = [];

  onMount(() => {
    questions = questions.map((ques, idx) => ({
      ...ques,
      expanded: idx === 0,
    }));
  });

  const handleAccordionClick = (clickedIdx: number): void => {
    questions = questions.map((item, idx) => {
      if (idx === clickedIdx) {
        return { ...item, expanded: !item.expanded };
      } else {
        return { ...item, expanded: false };
      }
    });
  };
</script>

<main in:scale>
  <div>
    {#each questions as quest, idx}
      <Accordion expanded={quest.expanded}>
        <div
          slot="header"
          class="header"
          on:click|stopPropagation={() => handleAccordionClick(idx)}
        >
          <h3>{quest.header}</h3>
          {#if !isReadOnly}
            <Toggle
              checked={quest.subMenu.some((item) => item.state === ConnectStates.SELECTED)}
              on:toggle={() => {
                const isAnySelected = quest.subMenu.some(
                  (item) => item.state === ConnectStates.SELECTED
                );
                quest.subMenu = quest.subMenu.map((item) => ({
                  ...item,
                  state: isAnySelected ? ConnectStates.DISABLED : ConnectStates.SELECTED,
                }));
              }}
            />
          {/if}
        </div>
        <div slot="body" class="body">
          {#each quest.subMenu as node}
            <div
              class="block"
              data-selected={node.state}
              data-disabled={isReadOnly}
              on:click={() => {
                if (!isReadOnly) {
                  node.state = node.state === ConnectStates.SELECTED ? ConnectStates.DISABLED : ConnectStates.SELECTED;
                }
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
</main>

<style lang="scss">
  @import "../styles/mixins";

  main {
    margin: 10px;
    font-family: "RobotoLight";
    text-align: center;
    background-color: var(--background-color);
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
      font-family: "RobotoMedium";
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

    &[data-disabled="true"] {
      cursor: default;
    }

    .defined {
      padding: 0;
      width: 100%;
      .name {
        width: 100%;
        text-align: center;
        padding: 5px;
        text-transform: uppercase;
        box-shadow: 0 0px 5px rgb(0 0 0 / 0.2);
        font-family: "RobotoMedium";
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
    &[data-disabled="false"]:hover {
      transform: scale(1.05);
    }

    &[data-selected="selected"] {
      .name {
        background-color: var(--background-darker-color);
        color: white;
        border: none;

        &::after {
          content: "✓";
          position: absolute;
          padding: 5px;
          background-color: var(--success-color);
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
    &[data-selected="deselected"] {
      .name {
        background-color: var(--background-darker-color);
        color: white;
        border: none;

        &::after {
          content: "✕";
          position: absolute;
          padding: 5px;
          background-color: var(--danger-color);
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
    &[data-selected="disabled"]:hover .overlay {
      visibility: visible;
    }

    &[data-disabled="true"]:hover {
      
      .overlay {
        visibility: hidden;
      }
    }
  }
</style>
