import { list } from "@keystone-6/core";
import { integer, relationship, text } from "@keystone-6/core/fields";

export const OrderItem = list({
  // TODO add access control
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
