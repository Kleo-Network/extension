
import { wrap } from 'svelte-spa-router/wrap';
import { routerGuard } from "./guard";

import Home from "../pages/Home.svelte";
import Connect from "../pages/Connect.svelte";
import Start from "../pages/LetStarted.svelte";
export default {
  '/start': wrap({
    component: Start,
    conditions:[
      routerGuard
    ]
  }),
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