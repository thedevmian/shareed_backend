/* eslint-disable @typescript-eslint/unbound-method */
import { list } from "@keystone-6/core";
import {
  integer,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { accessControl, permissions, rules } from "../access";

export const Product = list({
  access: {
    operation: {
      create: accessControl,
      query: () => true,
      update: permissions.canManageProducts,
      delete: rules.canManageProducts,
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({
      validation: { isRequired: true },
      ui: { displayMode: "textarea" },
    }),
    price: integer({ validation: { isRequired: true, min: 0 } }),
    photo: relationship({ ref: "ProductImage.product", many: true }),
    select: select({
      options: [
        { label: "UNAVAILABLE", value: "unavailable" },
        { label: "AVAILABLE", value: "available" },
        { label: "SOLD OUT", value: "soldout" },
        { label: "DRAFT", value: "draft" },
      ],
      defaultValue: "published",
      ui: {
        displayMode: "segmented-control",
      },
    }),
    collections: select({
      options: [
        { label: "New", value: "new" },
        { label: "Men", value: "men" },
        { label: "Women", value: "women" },
      ],
      defaultValue: "new",
      ui: {
        displayMode: "segmented-control",
      },
    }),
    publishDate: timestamp(),
    author: relationship({
      ref: "User.products",
      hooks: {
        resolveInput: ({ context }) => {
          if (!context.session.itemId) {
            throw new Error("You must be logged in to create a product");
          }
          return { connect: { id: context.session.itemId } };
        },
      },
    }),
  },
});
