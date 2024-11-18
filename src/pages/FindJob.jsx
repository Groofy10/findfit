import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadFile from "../components/UploadFile";
import JobCard from "../components/JobCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Button } from "@nextui-org/react";
import PdfModal from "../components/PdfModal";
import { AiOutlineHourglass } from "react-icons/ai";
import SubmitButton from "../components/buttons/SubmitButton";

const FindJob = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(Array(15).fill(null));

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

  const questions = [
    "You are easily stressed.",
    "You often feel overwhelmed by tasks.",
    "You prefer working in a team rather than alone.",
    "You find it difficult to focus on tasks.",
    "You enjoy problem-solving challenges.",
    "You are highly organized and plan ahead.",
    "You are motivated by financial rewards.",
    "You are open to taking risks in your work.",
    "You prefer a structured work environment.",
    "You are comfortable working under pressure.",
    "You value work-life balance.",
    "You find it easy to adapt to new situations.",
    "You like working on creative tasks.",
    "You prefer detailed, technical tasks over big-picture thinking.",
    "You are driven by a sense of purpose in your work.",
  ];

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

  const itemsPerPage = 3;
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

  const handleStepNext = () => setStep(step + 1);
  const handleStepPrev = () => setStep(step - 1);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  return (
    <div className="justify-content mx-auto my-5 flex flex-col w-[90%] md:p-11 p-4 rounded-lg md:gap-10 bg-white h-full gap-4">
      {step === 1 && (
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
          <SubmitButton label="Next" onSubmit={handleStepNext}></SubmitButton>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col text-black gap-4 mx-auto text-center">
          <h1 className="lg:text-2xl md:text-xl font-bold text-center">
            Questions
          </h1>
          <p className="text-sm md:text-left">
            Answer the following questions honestly to help us provide better
            job recommendations.
          </p>
          <form className="flex flex-col gap-6">
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <p>{questions[index]}</p>
                <div className="flex gap-4 justify-center">
                  {["Disagree", "Neutral", "Agree"].map((option, optIndex) => (
                    <label key={optIndex} className="flex items-center gap-2 g">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={answers[index] === option}
                        onChange={() => handleAnswerChange(index, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </form>
          <div className="flex justify-end gap-3 width-[50%]">
            <SubmitButton label="Back" onSubmit={handleStepPrev}></SubmitButton>
            <SubmitButton
              label="Submit"
              onSubmit={handleStepNext}
              disabled={answers.some((ans) => ans === null)}
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4">
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
          <div className="flex w-full py-4 gap-5 flex-wrap justify-center">
            {data && data.recommendation === true ? (
              <h1 className="lg:text-xl md:text-xl font-bold text-center text-blue-700 mb-5">
                Your Personalized Job Portal Recommendations
              </h1>
            ) : (
              <h1 className="lg:text-xl md:text-xl font-bold text-center">
                All Job Portals
              </h1>
            )}
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
                    <JobCard
                      jobList={jobList}
                      key={index}
                      applyJob={applyJob}
                    />
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
      )}
    </div>
  );
};

export default FindJob;
