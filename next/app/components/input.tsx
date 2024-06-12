import React from "react";

interface Inputprops {
  label: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<Inputprops> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className=" flex flex-col lg:flex-row lg:justify-between  py-2 lg:pl-0 min-w-[150px]">
      <label className="text-base min-w-[130px] pt-2 ">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className=" border border-gray-500 pt-2 pl-2 pb-1 rounded-md lg:w-full lg:min-w-[150px] lg:max-w-[275px] cursor-pointer "
      />
    </div>
  );
};

export default Input;
