import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Textarea } from "@nextui-org/react";
import SubmitButton from "../components/buttons/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import TalentCard from "../components/TalentCard";
import { useAppContext } from "../contexts/AppContext";
import { useEffect, useState } from "react";
import { Progress } from "antd";
import TextAreaInput from "../components/inputs/TextAreaInput";

const FindTalent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const { showToast } = useAppContext();
  const [data, setData] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);

  const mutation = useMutation({
    mutationKey: ["findRecommendedTalent"],
    mutationFn: apiClient.findRecommendedTalent,
    onSuccess: (data) => {
      showToast({ message: data.message, type: "success" });
      setData(data.recommendedTalents);
      setProgressPercent(100);
    },
    onError: (error) => {
      showToast({ message: error.message, type: "error" });
      setProgressPercent(100);
    },
  });

  const postData = (data) => {
    setProgressPercent(0);
    mutation.mutate(data);
  };

  const handleBackClick = () => {
    setData([]);
    setProgressPercent(0);
  };

  useEffect(() => {
    let interval;
    if (mutation.isPending) {
      interval = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev < 90) return prev + 10;
          return prev;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [mutation.isPending]);

  return (
    <div className="justify-content mx-auto my-5 flex flex-col w-[90%] md:p-11 p-4 rounded-lg md:gap-10 bg-white gap-4 h-auto">
      <div className="flex gap-6 flex-col pe-4">
        {data && data.length > 0 ? (
          <div className="flex flex-col basis-1/2 p-10 gap-2 overflow-y-auto shadow-xl h-[400px]">
            <p
              className="text-sm text-blue-500 hover:underline cursor-pointer"
              onClick={handleBackClick}
            >
              &laquo; Back
            </p>
            <h1 className="lg:text-xl md:text-xl font-bold text-center">
              Your Talent Recommendation
            </h1>
            <div className="w-full flex flex-col gap-3 py-4">
              {data.map((talentList, index) => (
                <TalentCard
                  talentList={talentList.talent}
                  similarityScore={talentList.similarityScore}
                  key={index}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col basis-1/2 text-black gap-4 h-full">
            <h1 className="lg:text-3xl md:text-xl font-bold">
              Find Your Talent with AI
            </h1>
            <p className="text-sm md:text-left">
              Unlock the power of AI to discover the ideal candidates for your
              team. Simply enter your requirements in the prompt, and let our
              advanced algorithm browse through tailored talent recommendations
              and make the best hire with just a click!
            </p>

            <form onSubmit={handleSubmit(postData)}>
              <Controller
                control={control}
                name="prompt"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextAreaInput
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    ref={ref}
                    variant="flat"
                    minRows={11}
                    radius="sm"
                    label="Prompt"
                    labelPlacement="inside"
                    placeholder="e.g : Our company needs a Machine Learning Engineer with skills in Python, TensorFlow, and 5 years of experience..."
                    errorMessage={errors.description?.message}
                    isInvalid={!!errors.description}
                    isRequired
                    height="h-[18rem]"
                  />
                )}
              />

              {mutation.isPending && (
                <div className="my-2">
                  <Progress percent={progressPercent} size="small" />
                </div>
              )}
              <label
                class="block mb-2 text-sm font-medium mt-5 text-gray-900 dark:text-white"
                for="file_input"
              >
                Upload CV
              </label>

              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
              />
              <p
                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                Upload a ZIP file containing all talent CV in PDF format.
              </p>

              <SubmitButton disabled={mutation.isPending}>Submit</SubmitButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTalent;
