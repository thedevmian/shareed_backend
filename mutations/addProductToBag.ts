/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { KeystoneContext } from "@keystone-next/types";

async function addProductToBag(
  productId: { productId: string },
  context: KeystoneContext
): Promise<any> {
  const ses = context.session;
  if (!ses) {
    console.log("No session", ses);
    throw new Error("No session found");
  }

  // find all user's cart items
  const allCartItems = await context.lists.Cart.findMany({
    where: {
      user: { id: session.data.id },
      product: { id: productId },
    },
    resolveFields: "id, quantity",
  });

  return allCartItems;
}

export default addProductToBag;
