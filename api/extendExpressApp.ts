/* eslint-disable @typescript-eslint/no-unsafe-argument */
import bodyParser from "body-parser";
import { calculateOrderAmount } from "../lib/calculateOrderAmount";
import stripe from "../lib/stripe";
import type { Request, Response, Express } from "express";

// express.bodyParser() is no longer bundled as part of express. You need to install it separately before loading:
const jsonParser = bodyParser.json();

export const extendExpressApp = (app: Express): void => {
  app.post(
    "/api/create-payment-intent",
    jsonParser,
    async (req: Request, res: Response) => {
      const userBag = req.body;

      if (!userBag) {
        res.status(400).send("No user bag found");
        return;
      }

      const amount = calculateOrderAmount(userBag);

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "pln",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    }
  );
};
