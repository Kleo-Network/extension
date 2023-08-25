import type { AppConnect } from 'types/app-connect';

export interface GuardType {
  isEnable: boolean;
  isReady: boolean;
}
export interface Websites {
  confirmApp?: AppConnect;
  connections: AppConnect[];
  userAddress: string;
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
    header: string; 
    default: boolean;
      subMenu: { 
        index: string; 
        times: number; 
        days: number; 
        default: boolean; 
        state: T; 
      }[]; 
    }; 

export interface AppConnect {
  form: formData[];
  domain: string;
  title: string;
  icon: string;
  uuid: string;
  click: boolean;
}