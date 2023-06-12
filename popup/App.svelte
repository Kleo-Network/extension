<script lang="ts">
  import Tailwindcss from "./Tailwind.svelte";
  import Router from "svelte-spa-router";
  import { onMount } from "svelte";
  import routes from "./routers";
  import { setupI18n } from "popup/i18n";

  import { ToastContainer, FlatToast } from "svelte-toasts";

  let loaded = false;

  onMount(async () => {
    await setupI18n({
      withLocale: "en",
    });
    loaded = true;
  });
</script>

<Tailwindcss />
{#if loaded}
  <Router {routes} />
{/if}
<ToastContainer placement="bottom-center" let:data>
  <FlatToast {data} />
</ToastContainer>

<style lang="scss">
  @import "./styles/general";
</style>
