import type { Permission } from "./schemas/fields";

export type Session = {
  itemId: string;
  listKey: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: {
      isAdmin: boolean;
    } & {
      [key in Permission]: boolean;
    };
  };
};

export type ListAccessArgs = {
  itemId?: string;
  session?: Session;
};
