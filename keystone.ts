import "dotenv/config";
import { config } from "@keystone-6/core";
import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";

import ProductImage from "./schemas/ProductImage";
import Product from "./schemas/Product";
import User from "./schemas/User";
import Order from "./schemas/Order";
import OrderItem from "./schemas/OrderItem";
import Cart from "./schemas/Cart";
import Role from "./schemas/Role";
import sendPasswordResetEmail from "./lib/mail";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "id name email role { isAdmin }",
  passwordResetLink: {
    sendToken: async ({ identity, token }) => {
      await sendPasswordResetEmail(identity, token);
    },
  },
});

const session = statelessSessions({
  secret: process.env.COOKIE_SECRET!,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
});



export default withAuth(
  config({
    server: {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        optionsSuccessStatus: 204,
      },
      port: parseInt(process.env.PORT!) || 3000,
      maxFileSize: 200 * 1024 * 1024,
      healthCheck: true,
    },
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres",
      onConnect: async () => {
        console.log("Connected to db");
      },
      useMigrations: false,
    },
    ui: {
      isAccessAllowed: async (context) => !!context.session?.data?.role?.isAdmin,
      publicPages: ["/signin", "/no-access"],
    },
    graphql: {
      playground: true,
      apolloConfig: {
        introspection: true,
      },
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        optionsSuccessStatus: 204,
        preflightContinue: false,
      }
    },
    lists: {
      Product,
      ProductImage,
      User,
      Order,
      OrderItem,
      Cart,
      Role,
    },
    session,
  })
);
