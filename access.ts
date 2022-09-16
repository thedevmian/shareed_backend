import { permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

export function accessControl({ session }: ListAccessArgs) {
  return !!session;
}

const generetedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    ({ session }: ListAccessArgs) => !!session?.data.role[permission],
  ])
);

export const permissions = {
  ...generetedPermissions,
};

export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!accessControl({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { user: { id: { equals: session?.itemId } } } as unknown as boolean;
  },
  canOrder({ session }: ListAccessArgs) {
    if (!accessControl({ session })) {
      return false;
    }
    if (permissions.canManageOrders({ session })) {
      return true;
    }
    return {
      user: { id: { equals: session?.itemId } },
    } as unknown as boolean;
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!accessControl({ session })) {
      return false;
    }
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return {
      order: { some: { user: { id: { equals: session?.itemId } } } },
    } as unknown as boolean;
  },
  canManageCart({ session }: ListAccessArgs) {
    if (!accessControl({ session })) {
      return false;
    }
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return {
      user: { some: { id: { equals: session?.itemId } } },
    } as unknown as boolean;
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!accessControl({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    if (session?.data.role.isAdmin) {
      return true;
    }
    // check if users id is the same as the session id
    return { id: { equals: session?.itemId } } as unknown as boolean;
  },
};
