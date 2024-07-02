"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { HumanizeTextFormSchema } from "@/zod-schemas";
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
        predecessorId = null,
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

      try {
        const savedData = await db.humanizedText.create({
          data: {
            userId: dbUser.id,
            id: result.id,
            input: content,
            purpose: purpose,
            strength: strength,
            readability: readability,
            cost: result.cost,
            status: result.status,
            created: result.created,
            predecessorId: predecessorId,
          },
        });

        console.log(savedData);
        revalidatePath("/dashboard");
        return { savedData };
      } catch (error) {
        console.log(error);
        // }
      }
    }
  );
