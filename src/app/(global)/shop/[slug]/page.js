/* eslint-disable @next/next/no-img-element */
import NewProducts from "../../../../component/NewProducts";
import ProductDetailsSection from "../_component/ProductDetailsSection";
const Page = () => {
  return (
    <div className="p-[20px] container mx-auto md:grid grid-cols-5 gap-5">
      <div className="col-span-4">
        <ProductDetailsSection />
      </div>
      <div className="sticky top-[100px] h-fit">
        <NewProducts />
        <div
          className="banner-img wow fadeIn mb-lg-0 animated"
          style={{ visibility: "visible" }}
        >
          <img
            src="https://nest-frontend-v6.vercel.app/assets/imgs/banner/banner-11.png"
            alt="Banner"
          />
          <div className="banner-text">
            <span>Organic</span>
            <h4>
              Save 17% <br />
              on <span className="text-brand">Organic</span>
              <br />
              Juice
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
