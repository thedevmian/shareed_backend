import { list } from '@keystone-6/core';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { relationship, text } from '@keystone-6/core/fields';

const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
  apiKey: process.env.CLOUDINARY_API_KEY!,
  apiSecret: process.env.CLOUDINARY_API_SECRET!,
  folder: process.env.CLOUDINARY_API_FOLDER,
};

const ProductPhoto = list({
  // TODO: add access control
  fields: {
    image: cloudinaryImage({
      cloudinary,
    }),
    altText: text(),
    product: relationship({ ref: 'Product.photo', many: true }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'product'],
    },
  },

});

export default ProductPhoto;
