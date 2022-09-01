/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { KeystoneContext } from "@keystone-6/core/types";
import stripe from "../lib/stripe";

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

  const cartItems = user.cart.filter((cartItem) => cartItem.product);

  if (!cartItems.length) {
    throw new Error("You have no items in your cart");
  }
  const total = cartItems.reduce((acc: number, cartItem) => {
    return acc + cartItem.product.price * cartItem.quantity;
  }, 0);

  const charge = await stripe.paymentIntents
    .create({
      amount: total,
      currency: "usd",
      receipt_email: user.email,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Error processing payment");
    });

  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product.name,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: {
        connect: {
          id: cartItem.product.photo.id,
        },
      },
    };
    return orderItem;
  });

  const order = await context.query.Order.createOne({
    data: {
      user: { connect: { id: user.id } },
      items: { create: orderItems },
      total: charge.amount,
      charge: charge.id,
    },
  });

  const cartItemsIds = cartItems.map((cartItem) => cartItem.id);
  // delete cart items
  await context.query.Cart.deleteMany({
    where: {
      ids: cartItemsIds,
    },
  });
  return order;
};

export default checkout;
