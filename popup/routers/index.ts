
import { wrap } from 'svelte-spa-router/wrap';
import { routerGuard } from "./guard";

import Home from "../pages/Home.svelte";
import Connect from "../pages/Connect.svelte";

export default {
  '/': wrap({
    component: Home,
    conditions: [
      routerGuard
    ]
  }),
  '/connect': wrap({
    component: Connect,
    conditions: [
      routerGuard
    ]
  })
}