import { generateText, CoreMessage } from "ai";
import { createOpenAI, OpenAIProviderSettings } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import {
  createGoogleGenerativeAI,
  GoogleGenerativeAIProviderSettings,
} from "@ai-sdk/google";
import { ApiKeyProvider } from "./apikey";

interface GenerateAI {
  apiKey: string;
  provider: ApiKeyProvider;
  model: string;
  temperature?: number;
  system?: string;
  prompt?: string;
  messages?: Array<CoreMessage>;
}

const openAiBaseUrl = import.meta.env.VITE_OPENAI_API_BASE;
const geminiBaseUrl = import.meta.env.VITE_GEMINI_API_BASE;

const SDK: Record<ApiKeyProvider, any> = {
  openai: ({ apiKey }: OpenAIProviderSettings) =>
    createOpenAI({ apiKey, baseURL: openAiBaseUrl }),
  anthropic: createAnthropic,
  google: ({ apiKey }: GoogleGenerativeAIProviderSettings) =>
    createGoogleGenerativeAI({ apiKey, baseURL: geminiBaseUrl }),
};

async function generate({ apiKey, provider, model, ...rest }: GenerateAI) {
  return await generateText({
    model: SDK[provider]({ apiKey })(model),
    ...rest,
  });
}

export default generate;
