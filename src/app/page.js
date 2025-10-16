// app/routes/_index.jsx
import { Suspense } from "react";
import Footer from "../component/Footer";
import HeaderTop from "../component/HeaderTop";
import Banner from "../component/HomeTopBanner";
import MenuBar from "../component/MenuBar";
import ProductSection from "../component/ProductSection";
import ProductTab from "../component/ProductTab";
import ShopByCategory from "../component/ShopByCategory";
import SubscriptionSection from "../component/SubscriptionSection";
import TopSearchBar from "../component/TopSearchBar";
import BottomMenuBar from "../component/BottomMenuBar";
import BootLoader from "../component/BootLoader";
import AnimatedSection from "../component/AnimatedSection"; // 👈 new client component

export default function Home({ searchParams }) {
  return (
    <Suspense fallback={<BootLoader show={true} logoText="Nangor" />}>
      {/* Sticky search bar */}
      <div className="sticky top-0 z-50 bg-white">
        <TopSearchBar />
      </div>

      {/* Menu */}
      <div className="hidden md:block">
        <MenuBar />
      </div>

      {/* Animated content */}
      <AnimatedSection>
        <Banner />
      </AnimatedSection>

      <div className="container mx-auto space-y-10">
        {/* <AnimatedSection> */}
          <ProductSection searchParams={searchParams} />
        {/* </AnimatedSection> */}

        <AnimatedSection>
          <ShopByCategory />
        </AnimatedSection>

        <AnimatedSection>
          <ProductTab />
        </AnimatedSection>
      </div>

      <AnimatedSection>
        <SubscriptionSection />
      </AnimatedSection>

      <Footer />
      <BottomMenuBar />
    </Suspense>
  );
}
