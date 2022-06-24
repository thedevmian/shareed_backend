import { list } from '@keystone-6/core';
import {
  integer, relationship, select, text, timestamp,
} from '@keystone-6/core/fields';

const Product = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({ validation: { isRequired: true }, ui: { displayMode: 'textarea' } }),
    price: integer({ validation: { isRequired: true, min: 0 } }),
    photo: relationship({ ref: 'ProductImage.product', many: true }),
    select: select({
      options: [
        { label: 'UNAVAILABLE', value: 'unavailable' },
        { label: 'AVAILABLE', value: 'available' },
        { label: 'SOLD OUT', value: 'soldout' },
        { label: 'DRAFT', value: 'draft' },
      ],
      defaultValue: 'published',
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    collections: select({
      options: [
        { label: 'New', value: 'new' },
        { label: 'Men', value: 'men' },
        { label: 'Women', value: 'women' },
      ],
      defaultValue: 'new',
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    publishDate: timestamp(),
    author: relationship({
      ref: 'User.products',
    }),
  },
});

export default Product;
