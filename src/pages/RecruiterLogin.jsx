import { Link } from "react-router-dom";
import Login from "../sections/Login";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const RecruiterLogin = () => {
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
    mutationFn: apiClient.recruiterLogin,
    onSuccess: async (data) => {
      await queryClient.refetchQueries();
      showToast({ message: data.message, type: "success" });
      navigate("/company");
    },
    onError: async (data) => {
      showToast({ message: "Invalid Credentials", type: "error" });
    },
  });

  const postData = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="flex flex-col justify-center min-h-screen bg-gradient-to-br from-blue-500 to-gray-300">
      <div className="w-[90%] md:w-[50%] lg:w-[35%] bg-white shadow-xl m-auto text-center py-10 px-8 rounded-xl transition-transform duration-300 hover:scale-105">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-gray-400 text-transparent bg-clip-text">
            TalentFind
          </span>
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          Log in as a{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-gray-400 text-transparent bg-clip-text font-bold">
            Recruiter
          </span>{" "}
          to find the best talent
        </p>

        <form action="" onSubmit={handleSubmit(postData)}>
          <Login
            control={control}
            handleSubmit={handleSubmit(postData)}
            errors={errors}
          ></Login>
        </form>

        <p className="text-gray-500 text-xs mt-6">
          Don’t have an account?{" "}
          <Link
            to="/auth/recruiter-register"
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Login as a{" "}
          <Link
            to="/auth/talent-login"
            className="text-blue-600 hover:underline"
          >
            Talent
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RecruiterLogin;
