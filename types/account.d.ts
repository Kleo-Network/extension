
export interface GuardType {
  isEnable: boolean;
  isReady: boolean;
}
export type Params = string[] | number [] | (string | string[] | number[])[];
export interface WalletState {
  popup: boolean;
  guard: GuardType;
}
export interface InpageWallet {
  hex: string;
}