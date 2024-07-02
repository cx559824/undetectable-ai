"use server";

import { actionClient } from "@/lib/safe-action";
import { DetectSingleSchema } from "@/zod-schemas";

export const detectIndividual = actionClient
  .schema(DetectSingleSchema)
  .action(async ({ parsedInput: { content } }) => {
    const response = await fetch(
      `https://aicheck.undetectable.ai/detectIndividual`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          text: content,
          key: process.env.UNDETECTABLE_AI_API_KEY,
        }),
        redirect: "follow",
      }
    );

    const detectIndividual = await response.json();

    return { detectIndividual };
  });
