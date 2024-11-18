import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Progress } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const { Dragger } = Upload;

const UploadFile = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["upload"],
    mutationFn: apiClient.analyzeCV,
    onSuccess: async (data, variables) => {
      message.success(`${variables.name} file analyzed successfully.`);
      showToast({ message: data.message, type: "success" });
      queryClient.invalidateQueries(["cvLink"]);
      queryClient.invalidateQueries("jobLists");
      setUploadProgress(100); // Set to 100% once analysis is complete
      setIsAnalyzing(false); // Stop progress bar once analysis is done
      refetch();
    },
    onError: async (error, variables) => {
      message.error(`${variables.name} file analysis failed.`);
      showToast({ message: error.message, type: "error" });
      setIsAnalyzing(false); // Stop progress bar if there's an error
    },
  });

  const uploadProps = {
    name: "file",
    multiple: false,
    customRequest: ({ file, onSuccess, onError, onProgress }) => {
      // Simulate the upload progress
      const simulateUploadProgress = () => {
        let percent = 0;
        const interval = setInterval(() => {
          percent += 1;
          setUploadProgress(percent);
          onProgress({ percent });
          if (percent >= 100) {
            clearInterval(interval);
            setIsAnalyzing(true);
            mutation.mutate(file, {
              onSuccess: () => {
                onSuccess("Ok");
              },
              onError: (error) => {
                onError(error);
              },
            });
          }
        }, 50); // Adjust the speed of simulated upload
      };

      simulateUploadProgress();
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      <Dragger {...uploadProps}>
        <div class="flex flex-col items-center justify-center py-16">
          <svg
            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Upload your CV in PDF format.
          </p>
        </div>
      </Dragger>
    </div>
  );
};

export default UploadFile;
