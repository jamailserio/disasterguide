// Diagnoses why the bot isn't retrieving anything.
// Usage: npm run doctor
import { readFileSync, existsSync } from "node:fs";

const ok = (m) => console.log("  PASS  " + m);
const bad = (m, fix) => { console.log("  FAIL  " + m); if (fix) console.log("        Fix: " + fix); };

// 1. Read .env.local
if (!existsSync(".env.local")) { bad(".env.local not found", "Run this from the ready-rag folder."); process.exit(1); }
const env = {};
for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*"?([^"\s]*)"?\s*$/);
  if (m) env[m[1]] = m[2];
}
console.log("\n1) Settings in .env.local");
for (const k of ["OPENAI_API_KEY", "UPSTASH_VECTOR_REST_URL", "UPSTASH_VECTOR_REST_TOKEN"]) {
  env[k] ? ok(`${k} is set`) : bad(`${k} is missing or empty`, "Add it to .env.local and save.");
}
const topK = Number(env.TOP_K ?? 6);
console.log(`        TOP_K = ${topK}`);
if (!Number.isInteger(topK) || topK < 1) bad("TOP_K is not a whole number", "Use e.g. TOP_K=6 (no spaces, no quotes).");

async function timed(label, fn) {
  try { return await fn(); }
  catch (e) {
    const code = e?.cause?.code || e?.cause?.errors?.[0]?.code || e?.code || e?.name;
    bad(`${label}: could not connect (${code ?? e.message})`, "Your network is blocking this service. Try a phone hotspot or turn off the VPN.");
    return null;
  }
}

// 2. Upstash index
console.log("\n2) Upstash vector index");
const auth = { Authorization: `Bearer ${env.UPSTASH_VECTOR_REST_TOKEN}` };
const infoRes = await timed("Upstash", () => fetch(`${env.UPSTASH_VECTOR_REST_URL}/info`, { headers: auth, signal: AbortSignal.timeout(15000) }));
let info = null;
if (infoRes) {
  if (!infoRes.ok) bad(`Upstash answered ${infoRes.status}`, "URL or token is wrong. Copy both again from the Upstash console.");
  else {
    info = (await infoRes.json()).result;
    ok(`Connected. Vectors: ${info.vectorCount}, dimension: ${info.dimension}`);
    if (info.vectorCount === 0) bad("The index is EMPTY", "Run: npm run seed   (it must end with 'Upstash reports 629 vectors').");
    else if (info.vectorCount < 600) bad(`Only ${info.vectorCount} vectors (expected 629)`, "This may be the old class index, or the seed stopped early. Run: npm run seed");
    if (info.dimension !== 1536) bad(`Dimension is ${info.dimension}, must be 1536`, "Delete the index in Upstash and create it again with 1536 / COSINE / no embedding model, then npm run seed.");
  }
}

// 3. OpenAI embeddings
console.log("\n3) OpenAI");
const embRes = await timed("OpenAI", () => fetch("https://api.openai.com/v1/embeddings", {
  method: "POST",
  headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({ model: "text-embedding-3-small", input: "what goes in a disaster supplies kit" }),
  signal: AbortSignal.timeout(20000),
}));
let vector = null;
if (embRes) {
  if (!embRes.ok) bad(`OpenAI answered ${embRes.status}: ${(await embRes.text()).slice(0, 120)}`, "401 = wrong key; 429 = no credit or rate limit.");
  else { vector = (await embRes.json()).data[0].embedding; ok(`Connected. Embedding has ${vector.length} numbers`); }
}

// 4. A real search
console.log("\n4) Test search: 'what goes in a disaster supplies kit'");
if (vector && info && info.vectorCount > 0) {
  const q = await timed("Upstash query", () => fetch(`${env.UPSTASH_VECTOR_REST_URL}/query`, {
    method: "POST", headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify({ vector, topK: 3, includeMetadata: true }), signal: AbortSignal.timeout(15000),
  }));
  if (q) {
    const hits = (await q.json()).result ?? [];
    if (hits.length === 0) bad("Search returned 0 results", "Run: npm run seed");
    else {
      ok(`${hits.length} results:`);
      for (const h of hits) console.log(`        - ${h.metadata?.shortTitle ?? "?"} p. ${h.metadata?.page ?? "?"}  (score ${h.score.toFixed(2)})${h.metadata?.shortTitle ? "" : "  <- no metadata: old index, run npm run seed"}`);
    }
  }
} else console.log("  SKIP  (fix the failures above first)");
console.log("");
