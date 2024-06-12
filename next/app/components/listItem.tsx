import React from "react";
import Link from "next/link";
type ListItemProps = {
  url: string;
  currentRoute: string;
  children: React.ReactNode;
  onClick: () => void;
};

const ListItem: React.FC<ListItemProps> = ({
  url,
  currentRoute,
  children,
  onClick,
}) => {
  const active = currentRoute === url;
  return (
    <li className="my-2">
      <Link href={url}>
        <button
          onClick={onClick}
          className={` ${
            active ? " underline italic  text-black" : "text-slate-400"
          } text-l  hover:underline hover:italic hover:text-black focus:underline focus:italic  focus:text-black
                    cursor-pointer`}
        >
          {children}
        </button>
      </Link>
    </li>
  );
};

export default ListItem;
