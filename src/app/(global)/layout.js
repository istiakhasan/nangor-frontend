import { Suspense } from "react";
import Footer from "../../component/Footer";
import HeaderTop from "../../component/HeaderTop";
import MenuBar from "../../component/MenuBar";
import SubscriptionSection from "../../component/SubscriptionSection";
import TopSearchBar from "../../component/TopSearchBar";
import BottomMenuBar from "../../component/BottomMenuBar";

const GlobalLayout = ({ children }) => {
  return (
   <Suspense fallback={<div>Loading cart...</div>}>
      <div className="">
        <div className="hidden md:block">
          <HeaderTop />
        </div>
        <TopSearchBar />
        <MenuBar />
        {children}
        <SubscriptionSection />
        <Footer />
      </div>
      <BottomMenuBar />
    </Suspense>
  );
};

export default GlobalLayout;
