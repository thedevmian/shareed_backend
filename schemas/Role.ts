import { list } from "@keystone-6/core";
import {
  relationship,
  text,
  timestamp,
  checkbox,
} from "@keystone-6/core/fields";
import { permissions } from "../access";
import { permissionFields } from "./fields";

export const Role = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    assignedTo: relationship({
      ref: "User.role",
      many: true,
      ui: {
        itemView: { fieldMode: "read" },
      },
    }),
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    updatedAt: timestamp({
      db: {
        updatedAt: true,
      },
    }),
    isAdmin: checkbox({
      defaultValue: false,
      ui: {
        itemView: { fieldMode: "read" },
      },
    }),
    ...permissionFields,
  },
  access: {
    operation: {
      create: permissions.canManageRoles,
      update: permissions.canManageRoles,
      delete: permissions.canManageRoles,
      query: permissions.canManageRoles,
    },
  },
  ui: {
    isHidden: (args) => !permissions.canManageRoles(args),
    hideCreate: (args) => !permissions.canManageRoles(args),
    hideDelete: (args) => !permissions.canManageRoles(args),
  },
});
