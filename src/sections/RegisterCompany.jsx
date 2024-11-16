import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import CompanyForm from "../sections/CompanyForm";
import { useState } from "react";
import { Button } from "@nextui-org/react";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  description: Yup.string().required("Description is required"),
  industry: Yup.string().required("Industry is required"),
  location: Yup.string().required("Location is required"),
  website: Yup.string().required("Website is required"),
});

const RegisterCompany = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const [addCompany, setAddCompany] = useState(false);
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Register a company
  const mutation = useMutation({
    mutationFn: apiClient.registerCompany,
    onSuccess: async (data) => {
      await queryClient.refetchQueries();
      showToast({ message: data.message, type: "success" });
      navigate("/company");
    },
    onError: async (data) => {
      showToast({ message: data.message, type: "error" });
    },
  });

  const postData = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="flex flex-col justify-content items-center min-h-screen bg-slate-100 ">
        {addCompany ? (
          <div className="w-[85%] h-auto flex lg:text-2xl flex-col bg-white shadow-2xl py-8 px-4 rounded-lg">
            <h1 className="font-semibold text-center mb-8">Company Profile</h1>
            <form action="" onSubmit={handleSubmit(postData)} className="">
              <CompanyForm
                control={control}
                handleSubmit={handleSubmit(postData)}
                errors={errors}
                isReadOnly={false}
                addCompany={addCompany}
                company={null}
              ></CompanyForm>
            </form>
          </div>
        ) : (
          <div className="w-[85%] h-[85vh] flex items-center lg:text-2xl flex-col bg-white shadow-2xl justify-center text-center py-8 px-4 rounded-lg">
            <div className="p-3">
              <p className="font-semibold pb-3">
                You are not belong to any Company
              </p>
              <Button
                color="primary"
                className="text-white"
                onClick={() => setAddCompany(true)}
              >
                Register your company
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterCompany;
