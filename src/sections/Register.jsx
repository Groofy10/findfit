import { Controller } from "react-hook-form";
import InputForm from "../components/inputs/InputForm";
import SubmitButton from "../components/buttons/SubmitButton";
import SelectInput from "../components/inputs/SelectInput";
import PasswordInput from "../components/inputs/PasswordInput";
import DateInput from "../components/inputs/DateInput";
import { Input } from "antd";

const Register = ({ control, handleSubmit, errors }) => {
  return (
    <div className="flex flex-col text-lg p-2 mt-4 gap-3 ">
      <div className="w-full m-auto">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="text"
                label="Name"
                placeholder="Enter your name"
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>
      <div className="w-full m-auto">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="email"
                label="Email"
                placeholder="Enter your email"
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>
      <div className="w-full m-auto">
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <SelectInput
                onChange={onChange}
                selected={value}
                onBlur={onBlur}
                ref={ref}
                errorMessage={errors.gender?.message}
                isInvalid={!!errors.gender}
                isRequired
              ></SelectInput>
            );
          }}
        />
      </div>
      <div className="w-full m-auto">
        <Controller
          control={control}
          name="dob"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                type="date"
                label="Birth Date"
                isInvalid={!!errors.dob}
                errorMessage={errors.dob?.message}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>
      <div className="w-full m-auto">
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="text"
                label="Address"
                placeholder="Enter your address"
                errorMessage={errors.address?.message}
                isInvalid={!!errors.address}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>
      <div className="w-full m-auto">
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="tel"
                label="Phone Number"
                placeholder="Enter your phone"
                errorMessage={errors.phoneNumber?.message}
                isInvalid={!!errors.phoneNumber}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>
      <div className="w-full m-auto">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="password"
                label="Password"
                placeholder="Enter your password"
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>
      <div className="w-full m-auto">
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                errorMessage={errors.confirmPassword?.message}
                isInvalid={!!errors.confirmPassword}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>

      <div className="w-full lg:w-1/2 m-auto py-1">
        <SubmitButton onSubmit={handleSubmit} label="Register"></SubmitButton>
      </div>
    </div>
  );
};

export default Register;
