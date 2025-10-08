/* eslint-disable @next/next/no-img-element */
import { getBaseUrl } from "../helpers/config/envConfig";
// import { getBaseUrl } from "@/helpers/config/envConfig";
async function getProducts(page = 1, limit = 2) {
  const res = await fetch(
    `${getBaseUrl()}/products?limit=${limit}&page=${page}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
const NewProducts = async () => {
  const products = await getProducts();
  return (
    <div className="">
      <div className="sidebar-widget product-sidebar mb-[10px] p-30 bg-grey border-radius-10">
        <h5 className="section-title style-1 mb-[20px]">New products</h5>
        {products?.data?.map((product) => (
          <div key={product?.id} className="single-post clearfix">
            <div className="image">
              <img src={product?.images[0]?.url} alt="#" />
            </div>
            <div className="content">
              <h5>
                <a href="shop-product-detail.html">{product?.name}</a>
              </h5>
              <p className="price mb-0 mt-5">{product?.salePrice}</p>
              <div className="product-rate">
                <div className="product-rating" style={{ width: "90%" }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
