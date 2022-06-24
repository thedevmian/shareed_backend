import { list } from '@keystone-6/core';
import { integer, relationship, text } from '@keystone-6/core/fields';

const OrderItem = list({
  // TODO add access control
  fields: {
    order: relationship({ ref: 'Order.items', many: true }),
    photo: relationship({ ref: 'ProductImage', many: true }),
    quantity: integer({
      validation: { isRequired: true, min: 1 },
    }),
    price: integer(),
    name: text({
      validation: { isRequired: true },
    }),
  },
  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  ui: {
    listView: {
      initialColumns: ['order', 'quantity'],
    },
  },
});

export default OrderItem;
