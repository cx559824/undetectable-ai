// will use next-safe-actions here
// "use server";
//
// import * as z from "zod";
//
// import { ResetSchema } from "@/zod-schemas";
// import { getUserByEmail } from "@/data/user";
// import { actionClient } from "@/lib/safe-action";
//
// export const reset = actionClient
//   .schema(ResetSchema)
//   .action(async ({ parsedInput: { email } }) => {
// });

"use server";

import * as z from "zod";

import { ResetSchema } from "@/zod-schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
