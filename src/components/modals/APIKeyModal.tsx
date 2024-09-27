import { Modal, ModalOverlay, ModalContent, Text } from "@chakra-ui/react";

import { Column } from "../../utils/chakra";
import { APIKeyInputs } from "../utils/APIKeyInput";

export function APIKeyModal() {
  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      size="3xl"
      isCentered={true}
      motionPreset="none"
    >
      <ModalOverlay />
      <ModalContent>
        <Column mainAxisAlignment="center" crossAxisAlignment="center" height="500px">
          <APIKeyInputs />
          <Text mt={5} width="80%" textAlign="center" fontSize="md">
            API key is stored in the Browser with LocalStorage.
          </Text>
        </Column>
      </ModalContent>
    </Modal>
  );
}
