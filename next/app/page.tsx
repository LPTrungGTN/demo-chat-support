"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken && accessToken === "1") {
      router.push("/admin");
    } else {
      router.push("/login");
    }
  }, []);

  return <div></div>;
}

export default Home;
