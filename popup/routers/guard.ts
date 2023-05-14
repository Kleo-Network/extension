import { get } from "svelte/store";
import { push } from "svelte-spa-router";

 import guardStore from "popup/store/guard";
import connectStore from "app/store/connect";


export const routerGuard = (e: { location: string }) => {
   const guard = get(guardStore);
   const connect = get(connectStore);
   console.log("this is router," ,connect.confirmApp);
   if(connect.confirmApp){
     push("/connect")
   }
   else
   {
    push("/");
   }
   //push("/connect");
  // if (!guard.isReady) {
  //   push("/start");
  // }

  // if (guard.isReady && !guard.isEnable) {
  //   push("/lock");
  // }
  
  return true;

};
