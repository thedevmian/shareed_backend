import {
  integer,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from "@keystone-6/core/fields";
import { graphql, list } from "@keystone-6/core";

export const Order = list({
  // TODO add access control

  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.ID,
        resolve(item) {
          return `Order ${item.id}`;
        },
      }),
    }),
    total: integer(),
    user: relationship({ ref: "User.order" }),
    items: relationship({ ref: "OrderItem.order", many: true }),
    orderDate: timestamp({
      defaultValue: {
        kind: "now",
      },
    }),
    charge: text(),
    status: select({
      options: [
        { label: "PAYMENT_PENDING", value: "PAYMENT_PENDING" },
        { label: "PAYMENT_INCOMPLETE", value: "PAYMENT_INCOMPLETE" },
        { label: "PAYMENT_COMPLETE", value: "PAYMENT_COMPLETE" },
        { label: "PAYMENT_FAILED", value: "PAYMENT_FAILED" },
      ],
      defaultValue: "PAYMENT_INCOMPLETE",
    }),
  },
});
