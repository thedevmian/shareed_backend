import {
  integer, relationship,
} from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

const Cart = list({
  // TODO add access control
  fields: {
    user: relationship({ ref: 'User.cart', many: true }),
    product: relationship({ ref: 'Product', many: true }),
    quantity: integer({
      validation: { isRequired: true, min: 0 },
    }),
  },
  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  ui: {
    listView: {
      initialColumns: ['user', 'product', 'quantity'],
    },
  },
});

export default Cart;
