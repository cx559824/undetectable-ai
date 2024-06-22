"use server";

import { auth } from "@/auth";
import { actionClient } from "@/lib/safe-action";
import { HumanizeTextFormSchema, TestLoginFormSchema } from "@/zod-schemas";

export const humanizeTextForm = actionClient
  .schema(HumanizeTextFormSchema)
  .action(async ({ parsedInput: { humanizeText } }) => {
    const session = await auth();

    console.log({
      humanizeText: `Humanized by ${session?.user.name} : ${humanizeText}`,
    });
    return {
      humanizeText: `Humanized by ${session?.user.name} : ${humanizeText}`,
    };
  });
