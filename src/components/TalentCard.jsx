import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import PdfModal from "../components/PdfModal";
import { FaEnvelope, FaGenderless } from "react-icons/fa";

export default function TalentCard({ talentList, similarityScore }) {
  // Function to determine the color based on similarity score
  const getScoreColor = (score) => {
    if (score <= 50) return "text-red-500";
    if (score <= 80) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <Card className="w-full bg-white shadow-lg rounded-lg border hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex gap-3 items-center">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">{talentList.name}</p>
          <div className="flex items-center gap-2">
            <FaGenderless className="text-gray-500" />
            <p className="text-sm text-gray-600">{talentList.gender}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-blue-500" />
            <p className="text-sm text-blue-500">{talentList.email}</p>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex items-center gap-1">
          <p className="text-lg font-semibold">Similarity Score:</p>
          <p
            className={`text-lg font-semibold ${getScoreColor(
              similarityScore
            )}`}
          >
            {similarityScore}%
          </p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between items-center">
        {talentList.cvFile && (
          <PdfModal
            fileUrl={`http://localhost:3000/files/${talentList.cvFile}`}
            recommendation={true}
          />
        )}
      </CardFooter>
    </Card>
  );
}
