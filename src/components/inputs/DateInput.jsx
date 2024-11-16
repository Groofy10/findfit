import React from "react";
import { DatePicker } from "@nextui-org/react";

const DateInput = React.forwardRef(
  (
    {
      onChange,
      onBlur,
      value,
      label,
      isReadOnly,
      isRequired,
      isInvalid,
      errorMessage,
    },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col gap-2">
        <div className="flex w-full flex-wrap mb-1  gap-4 text-left">
          <DatePicker
            selected={value}
            ref={ref}
            labelPlacement="outside"
            size="md"
            variant="flat"
            showMonthAndYearPickers
            onChange={onChange}
            onBlur={onBlur}
            isInvalid={isInvalid}
            isReadOnly={isReadOnly}
            isRequired={isRequired}
            className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          ></DatePicker>
        </div>
        {isInvalid && errorMessage && (
          <p className="text-red-500 text-sm w-full text-left max-md:mt-1">
            {errorMessage}
          </p> // Display error message below the input
        )}
      </div>
    );
  }
);

export default DateInput;
