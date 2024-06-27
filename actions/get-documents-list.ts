"use server";

import { actionClient } from "@/lib/safe-action";
import { ListDocumentSchema } from "@/zod-schemas";

export const getDocumentList = actionClient
  .schema(ListDocumentSchema)
  .action(async ({ parsedInput: { page } }) => {
    const response = await fetch(`https://api.undetectable.ai/document`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "1718694308417x876773023163335700",
      },
      body: JSON.stringify({
        page,
      }),
    });

    const documentList = await response.json();
    console.log(documentList);
    return { documentList };
  });
