"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { HumanizeTextFormSchema, TestLoginFormSchema } from "@/zod-schemas";
import { getHumanizedText } from "./get-humanized-text";
import { revalidatePath } from "next/cache";

export const humanizeTextForm = actionClient
  .schema(HumanizeTextFormSchema)
  .action(
    async ({
      parsedInput: {
        content,
        purpose,
        strength,
        readability,
        successorId = null,
      },
    }) => {
      const response = await fetch(`https://api.undetectable.ai/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.UNDETECTABLE_AI_API_KEY!,
        },
        body: JSON.stringify({
          content,
          purpose,
          strength,
          readability,
        }),
        redirect: "follow",
      });
      const result = await response.json();
      const user = await currentUser();

      if (!user) return { error: "Unauthorized" };

      const dbUser = await getUserById(user.id!);

      if (!dbUser) return { error: "Unauthorized" };

      if (result.status === "queued" && result.id) {
        const id = result.id;
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // Retry fetching the result recursively
        const resendData = await fetch(`https://api.undetectable.ai/document`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.UNDETECTABLE_AI_API_KEY!,
          },
          body: JSON.stringify({
            id,
          }),
        });
        const data = await resendData.json();
        try {
        } catch (error) {
          console.log(error);
        }
        const savedData = await db.humanizedText.create({
          data: {
            userId: dbUser.id,
            id: data.id,
            input: content,
            purpose: purpose,
            output: data.output,
            strength: data.strength,
            readability: readability,
            cost: data.cost,
            status: data.status,
            created: data.created,
            successorId: successorId,
          },
        });
        console.log(savedData);
        revalidatePath("/dashboard");

        return { savedData };
      }
    }
  );
