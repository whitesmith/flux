export type ApiKeyProvider = "openai" | "anthropic" | "google";

export function isValidAPIKey(apiKey: string | null, provider?: ApiKeyProvider) {
  if (!apiKey) return false;
  if (provider === "anthropic") {
    return apiKey.length > 100 && apiKey?.startsWith("sk-ant-");
  }
  if (provider === "google") {
    return apiKey.length >= 50;
  }
  return (
    (apiKey.length === 51 && apiKey.startsWith("sk-")) ||
    (apiKey.length === 56 && apiKey.startsWith("sk-proj-"))
  );
}
