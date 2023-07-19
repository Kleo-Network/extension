import { get } from "svelte/store";
import { push } from "svelte-spa-router";

 import guardStore from "popup/store/guard";
import websiteStore from "app/store/connect";


export const routerGuard = (e: { location: string }) => {
   const guard = get(guardStore);
   const website = get(websiteStore);
   if(!guard.isReady){
      push("/start")
   }
   else if(website.confirmApp){
     push("/connect")
   }
   else if(e.location != "/" && guard.isEnable && guard.isReady){
    push(e.location)
   }
   else if(guard.isEnable && guard.isReady){
    push("/");
   }

   console.log("location from guard.ts", location);
   console.log("e", e);
  
  return true;

};
