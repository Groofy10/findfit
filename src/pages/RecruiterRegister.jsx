import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import Register from "../sections/Register";
import dateConvert from "../utils/dateConvert";

const schema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name must be alphabetic characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  gender: Yup.string()
    .oneOf(["Male", "Female"], "Gender must be Male or Female")
    .required("Gender is required"),
  dob: Yup.date().required("Birth Date is required"),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string()
    .matches(
      /^(?:\+62|62|08)\d{8,11}$/,
      "Must start with +62, 62, or 08 for valid Indonesia phone number"
    )
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const RecruiterRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: apiClient.recruiterRegister,
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
    const formattedDate = dateConvert(data.dob);
    mutation.mutate({ ...data, dob: formattedDate });
  };
  return (
    <div className="flex flex-col justify-content min-h-screen bg-gradient-to-br from-blue-500 to-gray-300 ">
      <div className="w-[90%] md:w-[50%] lg:w-[35%] lg:text-2xl bg-white shadow-2xl justify-content m-auto text-center py-8 px-4 rounded-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-gray-400 text-transparent bg-clip-text">
            TalentFind
          </span>
        </h1>
        <p className="text-gray-600 mb-4 text-sm">
          Sign up as a{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-gray-400 text-transparent bg-clip-text font-bold">
            Recruiter
          </span>{" "}
          to discover your next job opportunity
        </p>
        <form
          action=""
          onSubmit={handleSubmit(postData)}
          className="h-[300px] overflow-y-auto"
        >
          <Register
            control={control}
            handleSubmit={handleSubmit(postData)}
            errors={errors}
          ></Register>
        </form>
        <p className="text-xs mt-4">
          Already have an account?{" "}
          <Link to="/auth/talent-login" className="text-indigo-700">
            Login
          </Link>
        </p>

        <div className="flex flex-col w-full mt-7 gap-3"></div>
      </div>
    </div>
  );
};

export default RecruiterRegister;
