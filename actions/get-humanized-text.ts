"use server";

import { actionClient } from "@/lib/safe-action";
import { FetchDocumentSchema } from "@/zod-schemas";

export const getHumanizedText = actionClient
  .schema(FetchDocumentSchema)
  .action(async ({ parsedInput: { id } }) => {
    const response = await fetch(`https://api.undetectable.ai/document`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.UNDETECTABLE_AI_API_KEY!,
      },
      body: JSON.stringify({
        id,
      }),
    });

    const humanizedText = await response.json();

    // response shape
    // {
    //     "id": "1679859279880x594414676479736700",
    //     "input": "Your document input text will go here.",
    //     "output": "Humanized content will appear here.",
    //     "readability": "High School",
    //     "purpose": "General Writing",
    //     "strength": 2,
    //     "cost": 26,
    //     "status": "done",
    //     "created": 1679859279885
    // }

    console.log(humanizedText);
    return { humanizedText };
  });
