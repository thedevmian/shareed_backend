import "dotenv/config";
import { config } from "@keystone-6/core";
import { BaseKeystoneTypeInfo, KeystoneContext } from "@keystone-6/core/types";
import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";
import sendPasswordResetEmail from "./lib/mail";
import { Cart, Order, OrderItem, Product, ProductPhoto, User, Role } from "./schemas";

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
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: "*",
        credentials: true,
        allowedHeaders: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      },
      port: parseInt(process.env.PORT!) || 3000,
      maxFileSize: 200 * 1024 * 1024,
      healthCheck: true,
    },
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres",
      onConnect: (db: KeystoneContext<BaseKeystoneTypeInfo>): Promise<void> => {
        const onDbConnectInfo = (): Promise<void> => {
          console.log(`Connected to database:`, db);
          return Promise.resolve();
        };
        return onDbConnectInfo();
      },
      useMigrations: false,
    },
    ui: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      isAccessAllowed: (context: KeystoneContext<BaseKeystoneTypeInfo>) =>
        !!context.session?.data?.role?.isAdmin,
      publicPages: ["/signin", "/no-access"],
    },
    graphql: {
      playground: "apollo",
    },
    lists: {
      Product,
      ProductPhoto,
      User,
      Order,
      OrderItem,
      Cart,
      Role,
    },
    session,
  })
);
