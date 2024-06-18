import { NextPage } from "next";
import React, { ChangeEvent, KeyboardEvent } from "react";

interface Props {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  type: string;
  value: string;
}
const FormInput: NextPage<Props> = ({
  label,
  onChange,
  onKeyDown,
  type,
  value,
}) => {
  return (
    <div className="flex items-center py-auto gap-26 pt-4">
      <label htmlFor="input" className="w-32">
        {label}
      </label>
      <input
        id="input"
        type={type}
        className=" h-35 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default FormInput;
