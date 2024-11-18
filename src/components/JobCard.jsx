import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import ApplyModal from "./ApplyModal";
import { FaMoneyBillAlt, FaUsers } from "react-icons/fa";

export default function JobCard({
  jobList,
  recruiter,
  applyJob,
  applied,
  viewApplicant,
}) {
  return (
    <Card className="w-full bg-white shadow-md transition-shadow duration-300 rounded-lg">
      <CardHeader className="flex gap-3 p-4">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-gray-800">
              {jobList.companyName}
            </p>
            <p className="text-md text-green-600 flex items-center gap-1">
              <FaMoneyBillAlt />
              {jobList.salary.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
              /Month
            </p>
          </div>
          <p className="text-md text-gray-600">{jobList.name}</p>
        </div>
      </CardHeader>
      <Divider />

      <CardBody className="p-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          {(jobList.jobDescription &&
            jobList.jobDescription.substring(0, 150)) ||
            "No Description"}
          ...
        </p>
      </CardBody>
      <Divider />

      <CardFooter className="p-4 flex items-center gap-3 justify-end">
        {recruiter && (
          <>
            <Button
              color="primary"
              className="text-white"
              size="sm"
              onClick={() => viewApplicant(jobList._id)}
            >
              View Applicants
            </Button>
            <p className="ms-auto text-xs text-gray-500 flex items-center gap-1">
              <FaUsers /> {jobList.totalApplicants} Applicants
            </p>
          </>
        )}

        {!recruiter && !applied && (
          <ApplyModal jobList={jobList} applyJob={applyJob}></ApplyModal>
        )}

        {applied && (
          <Button color="primary" className="text-white" size="sm" disabled>
            Pending
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
