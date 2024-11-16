import JobCard from "../components/JobCard";
import JobPostForm from "../sections/JobPostForm";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalSpinner from "../components/GlobalSpinner";
import RegisterCompany from "../sections/RegisterCompany";

const JobPost = () => {
  const { data, isError: isErrorJobPost } = useQuery({
    queryKey: ["companyJobPost"],
    queryFn: apiClient.getPostedJob,
  });
  const {
    isError: isErrorCompany,
    data: company,
    isLoading,
  } = useQuery({
    queryKey: ["company"],
    queryFn: apiClient.getCompany,
  });

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const navigate = useNavigate();

  const viewApplicant = (jobPostID) => {
    navigate(`/job-posts/${jobPostID}`);
  };

  // Handle previous and next page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <GlobalSpinner />;
  if (isErrorCompany) return <RegisterCompany />;

  // Calculate the current jobs to be displayed
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = data?.jobLists.slice(indexOfFirstJob, indexOfLastJob);

  // Calculate total pages
  const totalPages = Math.ceil(data?.jobLists.length / itemsPerPage);

  return (
    <div className="justify-content mx-auto my-5 flex flex-col w-[90%] md:p-11 p-4 rounded-lg md:gap-10 bg-white h-full gap-4">
      <div className="flex gap-6 flex-col">
        <div className="flex flex-col text-black gap-4 h-full">
          <h1 className="lg:text-3xl md:text-xl font-bold">
            Post a Job Portal
          </h1>
          <p className="text-sm md:text-left">
            Your Company : <b>{company?.name}</b>
          </p>
          <JobPostForm></JobPostForm>
        </div>

        <div className="flex flex-col basis-1/2 p-10 gap-2 shadow-xl overflow-y-auto h-[400px]">
          <h1 className="lg:text-xl md:text-xl font-bold text-center">
            Your Job Portals
          </h1>
          {data && data.jobLists.length > 0 ? (
            <div className="w-full flex flex-col gap-3 py-4">
              {currentJobs.map((jobList, index) => (
                <JobCard
                  jobList={jobList}
                  key={index}
                  recruiter={true}
                  viewApplicant={viewApplicant}
                ></JobCard>
              ))}
            </div>
          ) : (
            <p className="text-xs md:text-left m-auto text-slate-500">
              No Result yet
            </p>
          )}
          <div className="flex justify-center items-center gap-6 mt-6">
            <button
              className={`px-6 py-2 text-white bg-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:scale-105 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <p className="text-sm font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </p>

            <button
              className={`px-6 py-2 text-white bg-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:scale-105 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
