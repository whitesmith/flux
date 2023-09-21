import { BoxProps } from "@chakra-ui/react";
import { LabeledPasswordInputWithLink } from "./LabeledInputs";

const url = import.meta.env.VITE_OPENAI_GET_KEY;

export function APIKeyInput({
  apiKey,
  setApiKey,
  ...others
}: {
  apiKey: string | null;
  setApiKey: (apiKey: string) => void;
} & BoxProps) {
  return (
    <LabeledPasswordInputWithLink
      width="80%"
      label="OpenAI API Key"
      linkLabel="Get a key"
      placeholder="sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      link={url}
      value={apiKey ?? ""}
      setValue={setApiKey}
      {...others}
    />
  );
}
