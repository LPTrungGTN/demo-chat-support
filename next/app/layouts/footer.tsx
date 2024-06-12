import type { NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <footer
      className="fixed bottom-0 left-0 w-full bg-slate-50  shadow text-center p-5 "
      style={{ height: "7vh" }}
    >
      <a href="#">GTN Vietnam (c) 2023</a>
    </footer>
  );
};

export default Footer;
