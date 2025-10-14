"use client";
import { SnackbarProvider } from "@/component/SnackbarContext";
import { store } from "../redux/store";
import { useEffect, useState } from "react";
import BootLoader from "../component/BootLoader";
import { Provider } from "react-redux";
const Providers = ({ children }) => {
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    // Hide loader after 1.2 seconds
    const t = setTimeout(() => setShowBoot(false), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <BootLoader show={showBoot} logoText="Nangor" />
          {children}
      </SnackbarProvider>
    </Provider>
  );
};

export default Providers;