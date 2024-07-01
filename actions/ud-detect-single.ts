"use server";

import { actionClient } from "@/lib/safe-action";
import { DetectSingleSchema } from "@/zod-schemas";

export const detectSingle = actionClient
  .schema(DetectSingleSchema)
  .action(async ({ parsedInput: { content } }) => {
    const response = await fetch(`https://api.undetectable.ai/detect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.UNDETECTABLE_AI_API_KEY!,
      },
      body: JSON.stringify({
        content,
      }),
    });

    const human = await response.json();

    // response shape
    // {
    // "human": 88
    // }

    console.log(human);
    return { human };
  });
