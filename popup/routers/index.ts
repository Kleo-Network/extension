
import { wrap } from 'svelte-spa-router/wrap';
import { routerGuard } from "./guard";

import Home from "../pages/Home.svelte";
import Connect from "../pages/Connect.svelte";
import Start from "../pages/LetStarted.svelte";
import Detail from "../pages/Detail.svelte";
import History from "../pages/History.svelte";
import Settings from "../pages/Settings.svelte";


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
  }),
  '/detail': wrap({
    component: Detail,
    conditions: [
      routerGuard
    ]
  }),
  '/history': wrap({
    component: History,
    conditions: [
      routerGuard
    ]
  }),
  '/settings': wrap({
    component: Settings,
    conditions: [
      routerGuard
    ]
  })
}