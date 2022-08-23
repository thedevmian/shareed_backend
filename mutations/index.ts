import { graphql, graphQLSchemaExtension } from "@keystone-6/core";
import addProductToBag from "./addProductToBag";

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: `
        type Mutation {
            addProductToBag(productId: ID): Cart
        }
    `,
  resolvers: {
    Mutation: {
      addProductToBag,
    },
  },
});
