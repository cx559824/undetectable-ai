"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const getDocuments = async () => {
  const user = await currentUser();
  const id = user?.id;

  try {
    const documents = await db.humanizedText.findMany({
      where: { userId: id },
      include: {
        predecessor: {
          include: {
            predecessor: true,
          },
        },
      },
    });

    return documents;
  } catch {
    return null;
  }
};
