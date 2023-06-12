<script>
  import { cn } from "../../lib/utils";

  export let primary = false;
  export let classes = "";
  let buttonProps = {
    class: [$$restProps.class],
  };
</script>

<button
  class:primary
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:focus
  {...buttonProps}
  class={cn(
    "text-lg rounded-xl px-6 py-4 active:scale-95 transition-all",
    classes
  )}
>
  <slot />
</button>
