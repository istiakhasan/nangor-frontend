// app/routes/_index.jsx (or wherever your Home component is)
import Footer from "../component/Footer";
import HeaderTop from "../component/HeaderTop";
import Banner from "../component/HomeTopBanner";
import MenuBar from "../component/MenuBar";
import ProductSection from "../component/ProductSection";
import ProductTab from "../component/ProductTab";
import ShopByCategory from "../component/ShopByCategory";
import SubscriptionSection from "../component/SubscriptionSection";
import TopSearchBar from "../component/TopSearchBar";
import BottomMenuBar from "../component/BottomMenuBar"; // Import the new component
import { Suspense } from "react";

export default function Home({ searchParams }) {
  return (
    <Suspense fallback={<>Loading Products....</>} className="">
      {/* <div className="hidden md:block">
        <HeaderTop />
      </div> */}
      <div className="sticky top-0 z-50 bg-white">
        <TopSearchBar />
      </div>
      <div className="hidden md:block">
        <MenuBar />
      </div>
      <Banner />
      <ProductSection searchParams={searchParams} />
      <ShopByCategory />
      <ProductTab />
      <SubscriptionSection />
      <Footer />
      <BottomMenuBar /> {/* Add the bottom menu bar here */}
    </Suspense>
  );
}