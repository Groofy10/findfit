import { Link, useNavigate } from "react-router-dom";
import UploadFile from "../components/UploadFile";
import JobCard from "../components/JobCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Button } from "@nextui-org/react";
import PdfModal from "../components/PdfModal";
import { AiOutlineHourglass } from "react-icons/ai";
import { useState } from "react";

const FindJob = () => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["jobLists"],
    queryFn: apiClient.getAllJobPosts,
  });

  const {
    data: pdf,
    isLoading: isLoadingCV,
    isError: isErrorCV,
  } = useQuery({
    queryKey: ["cvLink"],
    queryFn: apiClient.getCV,
  });

  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["apply"],
    mutationFn: apiClient.applyJob,
    onSuccess: async (data) => {
      showToast({ message: data.message, type: "success" });
      navigate("/applications");
    },
    onError: async (data) => {
      showToast({ message: data.message, type: "error" });
    },
  });

  const applyJob = (jobPostID) => {
    mutation.mutate(jobPostID);
  };

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Paginate job lists
  const totalJobs = data?.jobLists?.length || 0;
  const totalPages = Math.ceil(totalJobs / itemsPerPage);
  const paginatedJobLists =
    data?.jobLists.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageNumberClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="justify-content mx-auto my-5 flex flex-col w-[90%] md:p-11 p-4 rounded-lg md:gap-10 bg-white h-full gap-4">
      {/* Result Analysis Section */}
      <div className="flex gap-6 flex-col">
        <div className="flex flex-col basis-1/2 text-black gap-4 h-full">
          <h1 className="lg:text-2xl md:text-xl font-bold">Analyze CV Here</h1>
          <p className="text-sm md:text-left">
            Leverage the power of AI to analyze your CV and receive personalized
            job portals recommendation.
          </p>
          {pdf && pdf.cvLink && (
            <PdfModal fileUrl={`http://localhost:3000/files/${pdf.cvLink}`} />
          )}
          <UploadFile />
        </div>

        <div className="flex flex-col p-10 gap-2 overflow-y-auto shadow-md bg-white rounded-lg">
          <h1 className="lg:text-xl md:text-xl font-bold text-center text-gray-900">
            Result Analysis
          </h1>
          <div className="flex justify-center items-center mt-2">
            <div className="text-center">
              <AiOutlineHourglass className="h-12 w-12 text-gray-400 mx-auto animate-pulse" />
              <p className="text-lg text-gray-500 mt-4">
                This feature is coming soon!
              </p>
              <p className="text-sm text-gray-400 mt-2">
                We are working hard to bring this feature to you. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex lg:mt-10 mt-3 flex-col gap-4">
        {data && data.recommendation === true ? (
          <h1 className="lg:text-xl md:text-xl font-bold text-center text-blue-700">
            Your Personalized Job Portal Recommendations
          </h1>
        ) : (
          <h1 className="lg:text-xl md:text-xl font-bold text-center">
            All Job Portals
          </h1>
        )}

        <div className="flex w-full py-4 gap-5 flex-wrap justify-center">
          {isError && (
            <div className="w-full">
              <p className="text-red-500 text-md">Error Fetching</p>
            </div>
          )}
          {isSuccess && (
            <>
              {paginatedJobLists.map((jobList, index) => (
                <div
                  key={index}
                  className="w-full shadow-lg rounded-lg transform transition-all hover:scale-[1.01] hover:shadow-xl"
                >
                  <JobCard jobList={jobList} key={index} applyJob={applyJob} />
                </div>
              ))}
            </>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={handlePrevPage}
              className={`px-6 py-2 text-white bg-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:scale-105 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>

            <p className="text-sm font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </p>

            <button
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
              className={`px-9 py-2 text-white bg-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:scale-105 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJob;
