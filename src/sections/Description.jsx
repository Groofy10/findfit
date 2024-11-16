import { Textarea } from "@nextui-org/input";
import NavigationButton from "../components/buttons/NavigationButton";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import TextAreaInput from "../components/inputs/TextAreaInput";

const Description = ({ control, clickNext, clickPrev }) => {
  return (
    <>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <TextAreaInput
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              ref={ref}
              variant="flat"
              radius="sm"
              minRows={7}
              defaultValue={value}
              errorMessage="Description is required"
              placeholder="Enter Description"
              isRequired
            ></TextAreaInput>
          );
        }}
      />
      <NavigationButton
        clickNext={clickNext}
        clickPrev={clickPrev}
      ></NavigationButton>
    </>
  );
};

export default Description;
