import { graphQLSchemaExtension } from "@keystone-6/core";
import { Context } from ".keystone/types";
import addProductToBag from "./addProductToBag";
import checkout from "./checkout";

export const extendGraphqlSchema = graphQLSchemaExtension<Context>({
  typeDefs: `
       type Mutation {
      checkCart(id: ID!): Cart
      addProductToBag(productId: ID!): Cart
      checkout(token: String!): Order
    }
    `,
  resolvers: {
    Mutation: {
      addProductToBag,
      checkout,
    },
  },
});
