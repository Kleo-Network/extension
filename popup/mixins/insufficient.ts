import type Big from "big.js";

export function isInsufficientFunds(
  balance: string | Big = "0",
  value: string | Big = "0"
) {
  return BigInt(String(balance)) > BigInt(String(value));
}
