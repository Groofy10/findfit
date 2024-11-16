import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { BsBriefcase, BsBuilding, BsCurrencyDollar } from "react-icons/bs";

export default function ApplyModal({ jobList, applyJob }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {/* Tombol Apply */}
      <Button
        color="primary"
        className="text-white rounded-md shadow-md"
        size="sm"
        onPress={onOpen}
      >
        Apply
      </Button>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="rounded-lg shadow-lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="bg-blue-100 p-4 rounded-t-lg">
                <div className="flex flex-col items-center gap-2 text-center justify-center w-full">
                  <BsBriefcase className="text-blue-600 text-3xl" />
                  <p className="text-lg font-bold text-gray-800">
                    {jobList.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BsBuilding className="text-blue-400" />
                    <span>{jobList.companyName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-md text-blue-600 font-medium">
                    <span>
                      {jobList.salary.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </span>
                  </div>
                </div>
              </ModalHeader>

              {/* Body Modal */}
              <ModalBody className="p-6 bg-white text-gray-700">
                <p className="text-sm leading-relaxed">
                  {jobList.jobDescription ||
                    "Deskripsi pekerjaan tidak tersedia saat ini. Silakan hubungi perusahaan untuk informasi lebih lanjut."}
                </p>
              </ModalBody>

              {/* Footer Modal */}
              <ModalFooter className="bg-gray-50 p-4 rounded-b-lg flex justify-end">
                <Button
                  color="primary"
                  className="rounded-md shadow-md"
                  onPress={() => {
                    applyJob(jobList._id);
                    onClose();
                  }}
                >
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
