/* eslint-disable @typescript-eslint/unbound-method */
import { list } from "@keystone-6/core";
import { integer, relationship, text } from "@keystone-6/core/fields";
import { accessControl, rules } from "../access";

export const OrderItem = list({
  access: {
    operation: {
      create: accessControl,
    },
    filter: {
      query: rules.canManageOrderItems,
      update: rules.canManageOrderItems,
      delete: rules.canManageOrderItems,
    },
  },
  fields: {
    name: text({
      validation: { isRequired: true },
    }),
    order: relationship({ ref: "Order.items", many: true }),
    photo: relationship({ ref: "ProductImage", many: true }),
    quantity: integer({
      validation: { isRequired: true, min: 1 },
    }),
    price: integer(),
  },
  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  ui: {
    listView: {
      initialColumns: ["order", "quantity"],
    },
  },
});
