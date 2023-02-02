# Shareed - KeystoneJS Backend for Shareed E-Commerce

## About

Shareed is an e-commerce platform that allows users to buy and sell second-hand items. For the frontend is used Next.js and for the backend Keystone.js. The project is deployed free on Vercel and Heroku.

## Built With

- [Next.js](https://nextjs.org/) - React Framework used in KeystoneJS to build the frontend
- [Keystone.js](https://keystonejs.com/) - KeystoneJS is a flexible and powerful headless CMS and web application framework built on Node.js and GraphQL.
- [Typescript](https://www.typescriptlang.org/) - For type safety
- [PostgreSQL](https://www.postgresql.org/) (on ElephantSQL)
- [Prisma](https://www.prisma.io/) (PostgreSQL)
- [Mailjet](https://www.mailjet.com/) (for sending emails)
- [Cloudinary](https://cloudinary.com/) (for image uploads)
- [Stripe](https://stripe.com/) (for payments)
- [Render](https://shareed-backedn.onrender.com/) (for hosting the backend)

## Live Demo

The backend is deployed right now on the Heroku free tier. Live demo: [https://shareed-backedn.onrender.com/](https://shareed-backedn.onrender.com/).

Demo credentials:

```sh
email: testmail@gmail.com
password: password1
```

The Heroku backend is connected to a PostgreSQL database on [ElephantSQL](https://www.elephantsql.com/).

## Screenshots

Admin Homepage
![](https://res.cloudinary.com/dkxixe3yr/image/upload/v1663843287/shareed/gif/SCR-20220922-hlg_mmeies.png)

### CORS issue

The biggest problem I've encountered was the CORS issue. The frontend sends requests to the backend and KeystoneJS backend send session cookies. The problem is that the frontend is deployed on Vercel and the backend runs on Heroku. The Heroku app is on a different domain than the Vercel app.

The solution with proxy [CORS Anywhere]() is not working for me because the proxy is not sending the session cookies. The solution was to use [cors](https://www.npmjs.com/package/cors) package on the backend and to set the `credentials` option to `true`, and `origin` to `true`. But also session cookies must be set to `sameSite: 'none'` and `secure: true`. This way the cookies are sent to the frontend and the session is maintained.

`Secure:` must be set to `true` when the `sameSite` is set to `none`. This way the browser will not send the cookies to the frontend if the frontend is not on HTTPS. You can read more about this [here](https://web.dev/samesite-cookies-explained/).

```js
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in?
  secret: process.env.COOKIE_SECRET,
  sameSite: "none",
  secure: true,
};
```

## Getting Started

To get a local copy up and running follow these simple example steps.

1.  Clone the repo

```sh
git clone https://github.com/thedevmian/shareed_backend.git
```

2.  Install NPM packages

```sh
yarn install
```

3.  Create a `.env` file in the root directory and add the following environment variables:

```sh
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_API_FOLDER=
DATABASE_URL=
FRONTEND_URL=
MAILJET_API_KEY=
MAILJET_API_SECRET=
STRIPE_SECRET_KEY=
COOKIE_SECRET=
```

4.  Run the app

```sh
yarn dev
```
