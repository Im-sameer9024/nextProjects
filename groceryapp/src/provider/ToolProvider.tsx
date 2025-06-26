"use client"

import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/tanstack/tanstack";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const ToolProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={true} />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  );
};

export default ToolProvider;
