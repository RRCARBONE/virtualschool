import "server-only";
import Anthropic from "@anthropic-ai/sdk";

// ============================================================================
// Cliente de IA — executa exclusivamente no servidor (rotas em src/app/api).
// A chave da API nunca é enviada ao navegador: fica apenas em variável de
// ambiente lida aqui. Sem a chave configurada, as rotas caem em heurísticas
// locais (ver src/lib/data/discovery.ts) para que a plataforma continue
// funcional em modo demonstração.
// ============================================================================

const apiKey = process.env.ANTHROPIC_API_KEY;
const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

export const isAIConfigured = Boolean(apiKey);

let client: Anthropic | null = null;
function getClient() {
  if (!apiKey) return null;
  if (!client) client = new Anthropic({ apiKey });
  return client;
}

export async function askClaude(params: {
  system: string;
  messages: { role: "user" | "assistant"; content: string }[];
  maxTokens?: number;
}) {
  const anthropic = getClient();
  if (!anthropic) return null;

  const response = await anthropic.messages.create({
    model,
    max_tokens: params.maxTokens ?? 700,
    system: params.system,
    messages: params.messages,
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock && "text" in textBlock ? textBlock.text : null;
}
