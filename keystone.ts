import "dotenv/config";
import { config } from "@keystone-6/core";
import { BaseKeystoneTypeInfo, KeystoneContext } from "@keystone-6/core/types";
import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";

import sendPasswordResetEmail from "./lib/mail";
import {
  Cart,
  Order,
  OrderItem,
  Product,
  ProductImage,
  User,
  Role,
} from "./schemas";
import { extendGraphqlSchema } from "./mutations";
import { extendExpressApp } from "./api/extendExpressApp";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "id name email role { isAdmin }",
  passwordResetLink: {
    sendToken: ({ identity, token }) => {
      sendPasswordResetEmail(identity, token);
    },
  },
});

const session = statelessSessions({
  secret: process.env.COOKIE_SECRET ?? "",
  maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  sameSite: "none",
  secure: true,
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: true,
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      },
      port: parseInt(process.env.PORT!) || 3000,
      maxFileSize: 200 * 1024 * 1024,
      healthCheck: true,
      extendExpressApp: extendExpressApp,
    },
    db: {
      provider: "postgresql",
      url:
        process.env.DATABASE_URL ||
        "postgres://postgres:postgres@localhost:5432/postgres",
      onConnect: (db: KeystoneContext<BaseKeystoneTypeInfo>): Promise<void> => {
        const onDbConnectInfo = (): Promise<void> => {
          console.log(`Connected to database:`, db);
          console.log("session:", session);
          return Promise.resolve();
        };
        return onDbConnectInfo();
      },
      useMigrations: false,
    },
    ui: {
      isAccessAllowed: (context: KeystoneContext<BaseKeystoneTypeInfo>) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        !!context.session?.data?.role?.isAdmin,
      publicPages: ["/signin", "/no-access"],
    },
    graphql: {
      playground: "apollo",
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
    extendGraphqlSchema: extendGraphqlSchema,

    session,
  })
);
