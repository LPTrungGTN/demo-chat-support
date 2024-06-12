import type { NextPage } from "next";

interface Props {
  label: string;
  onClick: () => void;
}

const Button: NextPage<Props> = ({ label, onClick }) => {
  return (
    <button
      className="w-full  bg-blue-100 hover:bg-blue-300 text-black py-4 px-12 rounded"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
