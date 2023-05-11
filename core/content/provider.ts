import type { Params } from "types/account";

function json(method: string, params: Params) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      method,
      params,
      id: 1,
      jsonrpc: "2.0",
    }),
  };
}

export async function httpProvider(
  http: string,
  method: string,
  params: Params
) {
  const request = json(method, params);
  const responce = await fetch(http, request);
  const data = await responce.json();

  return data;
}
