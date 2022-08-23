/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { graphql, graphQLSchemaExtension } from "@keystone-6/core";
import { Context } from ".keystone/types";

export const extendGraphqlSchema = graphQLSchemaExtension<Context>({
  typeDefs: `
       type Mutation {
      checkCart(id: ID!): Cart
      addProductToBag(productId: ID!): Cart
    }
    `,
  resolvers: {
    Mutation: {
      checkCart: (root, { id }, context) => {
        const cart = context.query.Cart.findOne({
          where: { id },
          query: "id user { id } product { id } quantity",
        });

        return cart;
      },
      addProductToBag: async (root, { productId }, context) => {
        // check session
        if (!context.session.itemId) {
          throw new Error("Not logged in");
        }

        const cartItem = await context.query.Cart.findMany({
          where: {
            user: {
              some: {
                id: {
                  equals: context.session.itemId,
                },
              },
            },
            product: {
              some: {
                id: {
                  equals: productId,
                },
              },
            },
          },
          query: "id user { id } product { id } quantity",
        });

        const [cartCheck] = cartItem;
        if (cartCheck) {
          return await context.query.Cart.updateOne({
            where: { id: cartCheck.id },
            data: {
              quantity: cartCheck.quantity + 1,
            },
          });
        }

        return await context.query.Cart.createOne({
          data: {
            user: { connect: { id: context.session.itemId } },
            product: { connect: { id: productId } },
            quantity: 1,
          },
        });
      },
    },
  },
});
