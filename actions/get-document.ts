"use server";

import { db } from "@/lib/db";
import { actionClient } from "@/lib/safe-action";
import { FetchDocumentSchema } from "@/zod-schemas";
import { revalidatePath } from "next/cache";
import { detectIndividual } from "./ud-detect-individual";

export const getDocument = actionClient
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

    const score = await detectIndividual({ content: humanizedText.input });

    try {
      const documentData = await db.humanizedText.update({
        where: { id: id },
        data: {
          output: humanizedText.output,
          status: humanizedText.status,
          score: score?.data?.detectIndividual,
        },
      });

      console.log(documentData);

      revalidatePath("/dashboard");
      return { documentData };
    } catch (error) {
      console.log(error);
    }
  });
