import type { Params } from "./zilliqa";

export interface SendResponseParams {
  resolve?: unknown;
  reject?: unknown;
}
export type StreamResponse = (params: SendResponseParams) => void;

export interface ProxyContentType {
  params: Params;
  method: string;
  uuid: string;
}
