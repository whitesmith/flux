import mixpanel from "mixpanel-browser";

import { BoxProps } from "@chakra-ui/react";
import { LabeledPasswordInputWithLink } from "./LabeledInputs";
import { useLocalStorage } from "../../utils/lstore";
import {
  API_KEY_LOCAL_STORAGE_KEY,
  FLUX_ANTHROPIC_API_KEY,
  FLUX_GOOGLE_API_KEY,
} from "../../utils/constants";
import { ApiKeyProvider, isValidAPIKey } from "../../utils/apikey";
import { MIXPANEL_TOKEN } from "../../main";

const url = import.meta.env.VITE_OPENAI_GET_KEY;

interface APIKeyInputProps extends BoxProps {
  provider: ApiKeyProvider;
  label: string;
}

const STORAGE_KEYS = {
  openai: API_KEY_LOCAL_STORAGE_KEY,
  anthropic: FLUX_ANTHROPIC_API_KEY,
  google: FLUX_GOOGLE_API_KEY,
};

export function APIKeyInput({ provider, ...others }: APIKeyInputProps) {
  const [apiKey, setApiKey] = useLocalStorage<string>(STORAGE_KEYS[provider]);

  const setValue = (key: string) => {
    setApiKey(key);

    if (isValidAPIKey(apiKey, provider)) {
      if (MIXPANEL_TOKEN) mixpanel.track("Entered API Key"); // KPI

      // Hacky way to get the prompt box to focus after the
      // modal closes. Long term should probably use a ref.
      setTimeout(() => window.document.getElementById("promptBox")?.focus(), 50);
    }
  };

  return (
    <LabeledPasswordInputWithLink
      width="100%"
      linkLabel="Get a key"
      placeholder="sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      link={url}
      value={apiKey ?? ""}
      setValue={setValue}
      {...others}
    />
  );
}

export function APIKeyInputs() {
  return (
    <>
      <APIKeyInput label="OpenAI API Key" provider="openai" />
      <APIKeyInput label="Anthropic API Key" provider="anthropic" />
      <APIKeyInput label="Google API Key" provider="google" />
    </>
  );
}
