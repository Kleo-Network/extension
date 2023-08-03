<script context="module">
  import { setContext, getContext } from "svelte";
  import { writable } from "svelte/store";

  const key = {};

  export const getAccordionContext = () => getContext(key);
  export const createAccordionContext = () => {
    const current = writable(null);
    const context = { current };
    setContext(key, context);

    return context;
  };
</script>

<script>
  import { slide } from "svelte/transition";
  import { linear } from "svelte/easing";
  export let expanded = false;

  const { current } = getAccordionContext();
  const currentKey = {};

  createAccordionContext();

  function handleClick() {
    expanded = !expanded;
    if (expanded) $current = currentKey;
  }

  $: if ($current != currentKey) expanded = false;
</script>

<div class="collapsible">
  <h3>
    <div aria-expanded={expanded} on:click={handleClick}>
      <slot name="header" />
    </div>
  </h3>
  {#if expanded}
    <div transition:slide={{ duration: 200, easing: linear }}>
      <slot name="body" />
    </div>
  {/if}
</div>

<style>
  h3 {
    margin: 0;
  }

  div {
    width: 100%;
    margin: 10px auto;
    cursor: pointer;
  }

</style>
