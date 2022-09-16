/* eslint-disable @typescript-eslint/unbound-method */
import { integer, relationship } from "@keystone-6/core/fields";
import { list } from "@keystone-6/core";
import { accessControl, rules } from "../access";

export const Cart = list({
  access: {
    operation: {
      create: accessControl,
    },
    filter: {
      query: rules.canManageCart,
      update: rules.canManageCart,
      delete: rules.canManageCart,
    },
  },
  fields: {
    user: relationship({ ref: "User.cart", many: true }),
    product: relationship({ ref: "Product", many: true }),
    quantity: integer({
      validation: { isRequired: true, min: 0 },
    }),
  },
  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  ui: {
    listView: {
      initialColumns: ["user", "product", "quantity"],
    },
  },
});
