"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken && accessToken !== "undefined") {
      router.push("/attendance/create");
    } else {
      router.push("/login");
    }
  }, []);

  return <div></div>;
}

export default Home;
