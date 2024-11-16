import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const AuthLogin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-gray-300 p-6">
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-3 text-center">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-gray-400 text-transparent bg-clip-text">
              TalentFind
            </span>
          </h1>
          <p className="text-gray-600 text-base text-center mb-6">
            Select Your Role to Continue Login.
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-blue-600 text-white p-6 flex flex-col items-center justify-center gap-4">
          <Link
            to="/auth/talent-login"
            className="w-full py-3 rounded-xl font-semibold text-center transition-all duration-300 transform hover:bg-blue-700"
          >
            Login as Talent
          </Link>

          <Link
            to="/auth/recruiter-login"
            className="w-full py-3 rounded-xl font-semibold text-center transition-all duration-300 transform hover:bg-blue-700"
          >
            Login as Recruiter
          </Link>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-300">
              Did'nt have an account?{" "}
              <Link to="/auth" className="text-white hover:underline">
                Join here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
