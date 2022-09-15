import { ListAccessArgs } from "./types";

export function accessControl({ session }: ListAccessArgs) {
  return !!session;
}
