"use client";
import { useState } from "react";
import Footer from "@/app/layouts/footer";
import Header from "@/app/layouts/header";
import Sidebar from "@/app/layouts/sidebar";
import { AppProvider } from "@/app/contexts/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          <div className="lg:grid lg:grid-cols-12">
            <div className="col-span-2">
              <Sidebar />
            </div>

            <div className="col-span-10 lg:mt-16">
              <div className="pt-16 px-3 lg:px-6 lg:p-8 lg:pl-28 lg:pr-8 flex flex-col item-center">
                {children}
              </div>
            </div>
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
