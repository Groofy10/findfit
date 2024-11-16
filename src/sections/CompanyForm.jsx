import { Controller } from "react-hook-form";
import { Textarea } from "@nextui-org/input";
import InputForm from "../components/inputs/InputForm";
import SubmitButton from "../components/buttons/SubmitButton";
import TextAreaInput from "../components/inputs/TextAreaInput";

const CompanyForm = ({
  control,
  handleSubmit,
  errors,
  company,
  isReadOnly,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6 p-4">
      <div className="col-span-1">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputForm
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              ref={ref}
              type="text"
              label="Name"
              placeholder="Enter your company name"
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
              isReadOnly={isReadOnly}
              isRequired
            />
          )}
        />
      </div>

      <div className="col-span-1">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputForm
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              ref={ref}
              type="email"
              label="Email"
              placeholder="Enter your company email"
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
              isReadOnly={isReadOnly}
              isRequired
            />
          )}
        />
      </div>

      <div className="col-span-2">
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextAreaInput
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              ref={ref}
              label="Description"
              placeholder="Enter your Description"
              className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 h-[8rem] resize-none"
              errorMessage={errors.description?.message}
              isInvalid={!!errors.description}
              isReadOnly={isReadOnly}
              isRequired
            />
          )}
        />
      </div>

      <div className="col-span-1">
        <Controller
          control={control}
          name="industry"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputForm
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              ref={ref}
              type="text"
              label="Industry"
              placeholder="Enter your company's industry"
              errorMessage={errors.industry?.message}
              isInvalid={!!errors.industry}
              isRequired
            />
          )}
        />
      </div>

      <div className="col-span-1">
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputForm
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              ref={ref}
              type="text"
              label="Location"
              placeholder="Enter your location"
              errorMessage={errors.location?.message}
              isInvalid={!!errors.location}
              isReadOnly={isReadOnly}
              isRequired
            />
          )}
        />
      </div>

      <div className="col-span-1">
        <Controller
          control={control}
          name="website"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputForm
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              ref={ref}
              type="text"
              label="Website"
              placeholder="Enter your website"
              errorMessage={errors.website?.message}
              isInvalid={!!errors.website}
              isRequired
            />
          )}
        />
      </div>

      <div className="col-span-2 text-center">
        <SubmitButton onSubmit={handleSubmit}></SubmitButton>
      </div>
    </div>
  );
};

export default CompanyForm;
