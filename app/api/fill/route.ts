import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const expected = process.env.API_SECRET;

  if (!expected || authHeader !== `Bearer ${expected}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { profile, formFields } = await req.json();

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4-5-20250929"),
    schema: z.record(z.string()),
    prompt: `You are filling out a form for ${profile.name}.
Use their profile information to answer each question authentically.
Match their writing style if samples are provided.
Return a JSON object where keys are field IDs and values are the answers.

USER PROFILE:
${JSON.stringify(profile, null, 2)}

FORM FIELDS TO FILL:
${JSON.stringify(formFields, null, 2)}`,
  });

  return Response.json(object);
}
