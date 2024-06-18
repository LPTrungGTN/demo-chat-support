"use client";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { ToastContainer } from "react-toastify";

import { AppProvider } from "@/app/contexts/AppContext";
import Footer from "@/app/layouts/footer";
import Header from "@/app/layouts/header";
export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasAccessToken, setHasAccessToken] = useState<string>("");
  return (
    <AppProvider>
      <Header
        hasAccessToken={hasAccessToken}
        setHasAccessToken={setHasAccessToken}
      />
      <div className=" w-full" style={{ height: "85vh" }}>
        {hasAccessToken ? (
          <div className="pt-20 pb-20 h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
            {children}
          </div>
        ) : (
          <div className="col-span-12">{children}</div>
        )}
        <ToastContainer position="top-center" />
      </div>
      <Footer />
    </AppProvider>
  );
}
