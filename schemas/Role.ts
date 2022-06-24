import { list } from '@keystone-6/core';
import {
  relationship, text, timestamp, checkbox,
} from '@keystone-6/core/fields';

const Role = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    assignedTo: relationship({
      ref: 'User.role',
      many: true,
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
    createdAt: timestamp(),
    updatedAt: timestamp({
      db: {
        updatedAt: true,
      },
    }),
    isAdmin: checkbox({
      defaultValue: false,
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
    canManageProducts: checkbox({
      defaultValue: false,
      label: 'Can a user update and delete products?',
    }),
    canManageOrders: checkbox({
      defaultValue: false,
      label: 'Can a user update and delete orders?',
    }),
    canManageUsers: checkbox({
      defaultValue: false,
      label: 'Can a user update and delete users?',
    }),
    canManageCarts: checkbox({
      defaultValue: false,
      label: 'Can a user update and delete carts?',
    }),
    canManageImages: checkbox({
      defaultValue: false,
      label: 'Can a user update and delete images?',
    }),
    canManageRoles: checkbox({
      defaultValue: false,
      label: 'Can a user update and delete roles?',
    }),
    canSeeOthersUsers: checkbox({
      defaultValue: false,
      label: 'Can a user see other users?',
    }),
  },
  access: {
    operation: {
      create: () => true,
      update: () => true,
      delete: () => true,
      query: () => true,
    },
  },
});

export default Role;
