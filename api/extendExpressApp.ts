import stripe from "../lib/stripe";

export const extendExpressApp = (app: Express): void => {
  app.post("/api/create-payment-intent", async (req, res) => {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "pln",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

  app.get("/api/checkout", async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "pln",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
};
