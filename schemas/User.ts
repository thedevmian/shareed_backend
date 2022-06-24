import { list } from '@keystone-6/core';
import { password, relationship, text } from '@keystone-6/core/fields';

const User = list({
  // TODO: add access control

  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    password: password({ validation: { isRequired: true } }),
    products: relationship({ ref: 'Product.author', many: true }),
    order: relationship({ ref: 'Order.user', many: true }),
    cart: relationship({
      ref: 'Cart.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    role: relationship({ ref: 'Role.assignedTo', many: false }),
  },
  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  ui: {
    listView: {
      initialColumns: ['name', 'products'],
    },
  },
});

export default User;
