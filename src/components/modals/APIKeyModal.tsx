import mixpanel from "mixpanel-browser";

import { Modal, ModalOverlay, ModalContent, Link, Text } from "@chakra-ui/react";

import { MIXPANEL_TOKEN } from "../../main";

import { Column } from "../../utils/chakra";
import { isValidAPIKey } from "../../utils/apikey";
import { APIKeyInput } from "../utils/APIKeyInput";

export function APIKeyModal({
  apiKey,
  setApiKey,
}: {
  apiKey: string | null;
  setApiKey: (apiKey: string) => void;
}) {
  const setApiKeyTracked = (apiKey: string) => {
    setApiKey(apiKey);

    if (isValidAPIKey(apiKey)) {
      if (MIXPANEL_TOKEN) mixpanel.track("Entered API Key"); // KPI

      // Hacky way to get the prompt box to focus after the
      // modal closes. Long term should probably use a ref.
      setTimeout(() => window.document.getElementById("promptBox")?.focus(), 50);
    }
  };

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
          <APIKeyInput apiKey={apiKey} setApiKey={setApiKeyTracked} />
          <Text mt={5} width="80%" textAlign="center" fontSize="md">
            API key is stored in the Browser with LocalStorage.
          </Text>
        </Column>
      </ModalContent>
    </Modal>
  );
}
