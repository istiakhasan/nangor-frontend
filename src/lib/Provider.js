"use client";
import { SnackbarProvider } from "@/component/SnackbarContext";
import { store } from "../redux/store";
import { Provider } from "react-redux";
const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <SnackbarProvider>
          {children}
      </SnackbarProvider>
    </Provider>
  );
};

export default Providers;