import { Input } from "@nextui-org/react";
import React from "react";

const InputForm = React.forwardRef(
  (
    {
      onChange,
      onBlur,
      type,
      label,
      placeholder,
      value,
      defaultValue,
      isRequired,
      isReadOnly,
      errorMessage,
      isInvalid,
      description,
    },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col lg:gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <input
            onChange={onChange}
            onBlur={onBlur}
            defaultValue={value}
            type={type}
            label={label}
            placeholder={placeholder ?? ""}
            className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required={isRequired ?? false}
            readOnly={isReadOnly}
          />
        </div>
        {isInvalid && errorMessage && (
          <p className="text-red-500 text-sm w-full text-left max-md:mt-3">
            {errorMessage} {/* Display error message below the input */}
          </p>
        )}
      </div>
    );
  }
);

export default InputForm;
