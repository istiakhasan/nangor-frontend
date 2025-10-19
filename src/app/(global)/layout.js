import { Suspense } from "react";
import Footer from "../../component/Footer";
import HeaderTop from "../../component/HeaderTop";
import MenuBar from "../../component/MenuBar";
import SubscriptionSection from "../../component/SubscriptionSection";
import TopSearchBar from "../../component/TopSearchBar";
import BottomMenuBar from "../../component/BottomMenuBar";
import BootLoader from "../../component/BootLoader";
import ShortFooter from "@/component/SortFooter";
const GlobalLayout = ({ children }) => {
  return (
   <Suspense fallback={<BootLoader show={true} logoText="Nangor"/>}>
      <div className="">
        <TopSearchBar />
        <MenuBar />
        {children}
        <SubscriptionSection />
        <ShortFooter />
      </div>
      <BottomMenuBar />
    </Suspense>
  );
};

export default GlobalLayout;
