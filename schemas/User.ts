/* eslint-disable @typescript-eslint/unbound-method */
import { list } from "@keystone-6/core";
import {
  checkbox,
  password,
  relationship,
  text,
} from "@keystone-6/core/fields";
import { permissions, rules } from "../access";

export const User = list({
  access: {
    operation: {
      create: () => true,
      update: rules.canManageUsers,
      delete: permissions.canManageUsers,
    },
    filter: {
      query: rules.canManageUsers,
      update: rules.canManageUsers,
      delete: permissions.canManageUsers,
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true,
    }),
    password: password({ validation: { isRequired: true } }),
    products: relationship({ ref: "Product.author", many: true }),
    order: relationship({ ref: "Order.user", many: true }),
    cart: relationship({
      ref: "Cart.user",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
    role: relationship({ ref: "Role.assignedTo", many: false }),
    isReadable: checkbox(),
    isUpdatable: checkbox(),
    isDeletable: checkbox(),
  },
  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  ui: {
    listView: {
      initialColumns: ["name", "products"],
    },
  },
});
