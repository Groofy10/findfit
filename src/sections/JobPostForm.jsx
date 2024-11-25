import InputForm from "../components/inputs/InputForm";
import SubmitButton from "../components/buttons/SubmitButton";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Textarea } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as apiClient from "../api-client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextAreaInput from "../components/inputs/TextAreaInput";

const schema = Yup.object().shape({
  name: Yup.string().required("Job Name is required"),
  salary: Yup.number()
    .positive("Salary must be a number")
    .required("Salary is required"),
  description: Yup.string().required("Job Description is required"),
});

const JobPostForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const mutation = useMutation({
    mutationKey: ["postJob"],
    mutationFn: apiClient.postJob,
    onSuccess: async (data) => {
      window.location.reload();
      //queryClient.invalidateQueries("companyJobPost");
      showToast({ message: data.message, type: "success" });
    },
    onError: async (data) => {
      showToast({ message: data.message, type: "error" });
    },
  });

  const postData = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col text-lg py-2 gap-4 justify-start ">
      <form onSubmit={handleSubmit(postData)} className="flex flex-col gap-4">
        <div className="   ">
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
                  label="Job Name"
                  placeholder="Enter your job name"
                  errorMessage={errors.name?.message}
                  isInvalid={!!errors.name}
                  isRequired
                ></InputForm>
              );
            }}
          />
        </div>
        <div className="">
          <Controller
            control={control}
            name="salary"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <InputForm
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  type="number"
                  label="Salary"
                  placeholder="Enter your salary"
                  errorMessage={errors.salary?.message}
                  isInvalid={!!errors.salary}
                  isRequired
                ></InputForm>
              );
            }}
          />
        </div>

        <div className="">
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
                  label="Job Description"
                  labelPlacement="outside"
                  placeholder="Enter Description"
                  errorMessage={errors.description?.message}
                  isInvalid={!!errors.description}
                  isRequired
                ></TextAreaInput>
              );
            }}
          />
        </div>

        <div className="">
          <SubmitButton onSubmit={handleSubmit}></SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default JobPostForm;
