import { Controller } from "react-hook-form";
import InputForm from "../components/inputs/InputForm";
import SubmitButton from "../components/buttons/SubmitButton";
import { Button } from "@nextui-org/react";
import TextAreaInput from "../components/inputs/TextAreaInput";

const EditCompanyForm = ({
  control,
  handleSubmit,
  errors,
  isReadOnly,
  isEdit,
  setIsEdit,
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
              type="text"
              label="Description"
              placeholder="Enter your description"
              errorMessage={errors.description?.message}
              isInvalid={!!errors.description}
              isReadOnly={isReadOnly}
              isRequired
              className="h-[8rem] resize-none"
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
              isReadOnly={isReadOnly}
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
              isReadOnly={isReadOnly}
              isRequired
            />
          )}
        />
      </div>

      <div className="col-span-2 text-center">
        {isEdit ? (
          <div className="flex gap-2 justify-center">
            <Button
              color="primary"
              size="md"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button color="danger" size="md" onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button color="primary" size="md" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditCompanyForm;
