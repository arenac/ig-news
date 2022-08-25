import { GetServerSideProps } from "next";

import styles from "./home.module.scss";

import Title from "../components/Title";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

interface Props {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: Props) {
  return (
    <>
      <Title title="home | ig.news" />

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, welcome!</span>

          <h1>
            News about the <span>React</span> world.
          </h1>

          <p>
            Get access to all publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve("price_1LZo5JBGnvmzmUkj9EK5fSHL", {
    expand: ["product"],
  });

  console.log(price);

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
  };
};
