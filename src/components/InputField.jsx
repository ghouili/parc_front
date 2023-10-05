import React from "react";

const InputField = ({ type, label, name, value, onChange, placeholder, disabled }) => {
  return (
    <div className="">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
        sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
      />
    </div>
  );
};

export default InputField;
