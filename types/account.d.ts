import type { AppConnect } from 'types/app-connect';

export interface GuardType {
  isEnable: boolean;
  isReady: boolean;
}
export interface Websites {
  confirmApp?: AppConnect;
  connections: AppConnect[];
}
export type Params = string[] | number [] | (string | string[] | number[])[];
export interface WalletState {
  popup: boolean;
  guard: GuardType;
  history: boolean;
  websiteStore: Websites;
}
export interface InpageWallet {
  hex: string;
}

export interface formData {
   data: { 
    header: string; 
    default: boolean;
     selected: boolean;
      subMenu: { 
        index: string; 
        times: number; 
        days: number; 
        default: boolean; 
        selected: boolean; 
      }[]; 
    }[]; 
      click: boolean; 
    
}