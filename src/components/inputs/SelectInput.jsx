import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const SelectInput = React.forwardRef(
  (
    { onChange, onBlur, selected, isRequired, errorMessage, isInvalid },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col lg:gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <select
            id="gender"
            name="gender"
            value={selected}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required={isRequired}
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        {isInvalid && errorMessage && (
          <p className="text-red-500 text-sm w-full text-left max-md:mt-1">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

export default SelectInput;
