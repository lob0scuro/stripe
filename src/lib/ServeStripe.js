import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const getProductsWithPrices = async () => {
  const products = await stripe.products.list({ limit: 100 });

  const productData = await Promise.all(
    products.map(async (product) => {
      const prices = await stripe.prices.list({
        product: product.id,
        limit: 10,
      });
      return {
        ...product,
        prices: prices.data,
      };
    })
  );

  return productData;
};

export default stripe;
