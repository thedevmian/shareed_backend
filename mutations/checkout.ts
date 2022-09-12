/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { KeystoneContext } from "@keystone-6/core/types";

const graphql = String.raw;

const checkout = async (
  root: any,
  { token }: any,
  context: KeystoneContext
) => {
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error("You must be logged in to checkout");
  }
  // query user
  const user = await context.query.User.findOne({
    where: { id: context.session?.itemId },
    query: graphql`
    id
    name
    email
    cart {
        id
      quantity
      product {
        id
        name
        price
        photo(take: 1) {
            id
          image {
            id
            publicUrlTransformed
          }
        }
      }
    }
    `,
  });
  if (!user) {
    throw new Error("User not found");
  }

  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  if (!cartItems.length) {
    throw new Error("You have no items in your cart");
  }
  const total = cartItems.reduce((acc: number, cartItem) => {
    return acc + cartItem.product[0].price * cartItem.quantity;
  }, 0);

  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product[0].name,
      price: cartItem.product[0].price,
      quantity: cartItem.quantity,
      photo: {
        connect: {
          id: cartItem.product[0].photo[0].id,
        },
      },
    };
    return orderItem;
  });

  const order = await context.query.Order.createOne({
    data: {
      user: { connect: { id: user.id } },
      items: { create: orderItems },
      total,
      charge: token,
    },
  });

  const cartItemsIds = cartItems.map((cartItem) => cartItem.id);
  // delete cart items
  cartItemsIds.forEach(async (cartItemId) => {
    await context.query.Cart.deleteOne({
      where: { id: cartItemId },
    });
  });

  return order;
};

export default checkout;
