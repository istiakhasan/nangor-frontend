"use client";
import { SnackbarProvider } from "@/component/SnackbarContext";
import { persistor, store } from "../redux/store";
import { useEffect, useState } from "react";
import BootLoader from "../component/BootLoader";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
const Providers = ({ children }) => {
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    // Hide loader after 1.2 seconds
    const t = setTimeout(() => setShowBoot(false), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <SnackbarProvider>
        <BootLoader show={showBoot} logoText="Nangor" />
          {children}
      </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;