import { Suspense } from "react";
import Footer from "../../component/Footer";
import HeaderTop from "../../component/HeaderTop";
import MenuBar from "../../component/MenuBar";
import SubscriptionSection from "../../component/SubscriptionSection";
import TopSearchBar from "../../component/TopSearchBar";
import BottomMenuBar from "../../component/BottomMenuBar";
import BootLoader from "../../component/BootLoader";
const GlobalLayout = ({ children }) => {
  return (
   <Suspense fallback={<BootLoader show={true} logoText="Nangor"/>}>
      <div className="">
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
