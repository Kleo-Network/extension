<script>
  import { slide } from "svelte/transition";
  import { linear } from "svelte/easing";
  export let expanded = false;


  function handleClick() {
    expanded = !expanded;
  }

</script>

<div class="collapsible">
  <h3>
    <div class="header" aria-expanded={expanded} on:click={handleClick}>
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

  .header {
    width: 100%;
    margin: 10px auto;
    cursor: pointer;
  }

</style>
