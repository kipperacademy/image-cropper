// Optional instructor demo. No API request runs until this script is explicitly invoked.
// Usage: OPENAI_API_KEY=... node scripts/harness-demo.mjs none|web|declare|execute
import { randomUUID } from "node:crypto";

const mode = process.argv[2] ?? "none";
if (!["none", "web", "declare", "execute"].includes(mode)) throw new Error("Use none|web|declare|execute");
if (!process.env.OPENAI_API_KEY) throw new Error("Set OPENAI_API_KEY in the instructor environment, never in browser code.");
const marker = randomUUID();
const custom = { type: "function", name: "get_session_marker", description: "Read the unique marker generated inside the instructor's running program.", strict: true, parameters: { type: "object", properties: {}, required: [], additionalProperties: false } };
const tools = mode === "web" ? [{ type: "web_search" }] : mode === "none" ? [] : [custom];
let input = [{ role: "user", content: mode === "web" || mode === "none"
  ? "Procure uma notícia publicada hoje no site oficial da OpenAI. Cite título, data e URL. Se não puder consultar a web nesta execução, diga isso e não invente."
  : "Consulte a ferramenta e informe o marcador único desta execução. Não é possível inferir esse marcador pelo treinamento." }];
async function request() {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST", headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: process.env.OPENAI_MODEL ?? "gpt-6-astra", store: false, input, tools,
      tool_choice: tools.length ? "required" : "none" }),
  });
  if (!response.ok) throw new Error(`OpenAI HTTP ${response.status}. Check model access, key and billing.`);
  return response.json();
}
let response = await request();
console.log(JSON.stringify({ stage: "model_output", output: response.output, usage: response.usage }, null, 2));
if (mode === "declare") console.log("STOP: tool was declared, but the harness has not executed it. The marker is still unknown to the model.");
if (mode === "execute") {
  const calls = response.output.filter((item) => item.type === "function_call");
  if (!calls.length) throw new Error("No function call returned; inspect the response before continuing.");
  const results = calls.map((call) => {
    if (call.name !== custom.name) throw new Error("Unknown tool");
    const args = JSON.parse(call.arguments);
    if (Object.keys(args).length) throw new Error("Invalid tool arguments");
    console.log("HARNESS executes the allowed function now.");
    return { type: "function_call_output", call_id: call.call_id, output: JSON.stringify({ marker }) };
  });
  input = [...input, ...response.output, ...results];
  tools.length = 0;
  response = await request();
  console.log(JSON.stringify({ stage: "after_harness_execution", output: response.output, usage: response.usage }, null, 2));
}
