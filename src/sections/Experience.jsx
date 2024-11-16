import InputForm from "../components/inputs/InputForm";
import { Textarea } from "@nextui-org/input";
import NavigationButton from "../components/buttons/NavigationButton";
import AddButton from "../components/buttons/AddButton";
import { Controller } from "react-hook-form";
import { useForm, useFieldArray } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import { DatePicker } from "antd";
import TextAreaInput from "../components/inputs/TextAreaInput";
const { RangePicker } = DatePicker;

const Experience = ({ control, clickNext, clickPrev, experience }) => {
  const { handleSubmit } = useForm({
    defaultValues: { experience },
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id} className="flex flex-col gap-4">
          {index > 0 && (
            <div className="flex gap-2">
              <h1 className="lg:text-xl md:text-lg font-bold">
                Experience {index + 1}
              </h1>
              <button onClick={() => remove(index)}>
                <BsTrash className="hover:text-red-500 font-bold"></BsTrash>
              </button>
            </div>
          )}

          <Controller
            control={control}
            name={`experiences.${index}.companyName`}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <InputForm
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  type="text"
                  label="Company"
                  placeholder="Enter Company"
                  isRequired
                ></InputForm>
              );
            }}
          />
          <Controller
            control={control}
            name={`experiences.${index}.position`}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <InputForm
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  type="text"
                  label="Position"
                  placeholder="Enter Positition"
                  isRequired
                ></InputForm>
              );
            }}
          />
          <Controller
            control={control}
            name={`experiences.${index}.description`}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextAreaInput
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  variant="flat"
                  radius="sm"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter Description"
                  isRequired
                ></TextAreaInput>
              );
            }}
          />
          <Controller
            control={control}
            name={`experiences.${index}.yearRange`}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <label htmlFor="" className="text-sm">
                    Year Period
                  </label>
                  <RangePicker
                    onChange={onChange}
                    value={value}
                    variant="filled"
                    picker="year"
                    id={{
                      start: "startInput",
                      end: "endInput",
                    }}
                  />
                </>
              );
            }}
          />
        </div>
      ))}

      <div className="flex">
        <AddButton onClick={() => append()}></AddButton>
        <NavigationButton
          clickNext={clickNext}
          clickPrev={clickPrev}
        ></NavigationButton>
      </div>
    </>
  );
};

export default Experience;
