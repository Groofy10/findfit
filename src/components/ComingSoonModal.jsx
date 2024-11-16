import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { BsPersonWorkspace, BsBuildingsFill } from "react-icons/bs";
import { AiOutlineHourglass } from "react-icons/ai";

export default function ComingSoonModal({ jobList, applyJob }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 p-10">
                <div className="text-center">
                  <AiOutlineHourglass className="h-12 w-12 text-gray-400 mx-auto animate-pulse" />

                  <p className="text-lg text-gray-500 mt-4">
                    This feature is coming soon!
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    We are working hard to bring this feature to you. Stay
                    tuned!
                  </p>
                </div>
              </ModalHeader>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
