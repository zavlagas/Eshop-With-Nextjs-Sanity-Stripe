import { Product, FooterBanner, HeroBanner } from "../components";
import { getClient } from "../lib/sanity.server";

export const getServerSideProps = async () => {
  const query = '*[_type =="product"]';
  const products = await getClient(true).fetch(query);

  const bannerQuery = '*[_type =="banner"]';
  const bannerData = await getClient(true).fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
};

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export default Home;
