import {
  integer, relationship, text, virtual,
} from '@keystone-6/core/fields';
import { graphql, list } from '@keystone-6/core';
import formatMoney from '../lib/formatMoney';

const Order = list({
  // TODO add access control

  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item) {
          return `${formatMoney(item.total)}`;
        },
      }),
    }),
    total: integer(),
    user: relationship({ ref: 'User.order' }),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    charge: text(),
  },
});

export default Order;
