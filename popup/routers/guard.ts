import { get } from "svelte/store";
import { push } from "svelte-spa-router";

 import guardStore from "popup/store/guard";
import websiteStore from "app/store/connect";


export const routerGuard = (e: { location: string }) => {
   const guard = get(guardStore);
   const website = get(websiteStore);
   console.log("this is website store," ,website);
   console.log('this is guard store', guard);
   if(!guard.isReady){
      push("/start")
   }
   else if(website.confirmApp){
     push("/connect")
   }
   else{
    push("/");
   }
  
  return true;

};
