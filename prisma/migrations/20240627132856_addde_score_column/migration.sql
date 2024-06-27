/*
  Warnings:

  - You are about to drop the column `user_id` on the `humanized_text` table. All the data in the column will be lost.
  - Added the required column `userId` to the `humanized_text` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "humanized_text" DROP CONSTRAINT "humanized_text_user_id_fkey";

-- AlterTable
ALTER TABLE "humanized_text" DROP COLUMN "user_id",
ADD COLUMN     "score" INTEGER,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "created" SET DATA TYPE BIGINT,
ADD CONSTRAINT "humanized_text_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "two_factor_tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "two_factor_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "two_factor_confirmations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "two_factor_confirmations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "two_factor_tokens_token_key" ON "two_factor_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "two_factor_tokens_email_token_key" ON "two_factor_tokens"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "two_factor_confirmations_userId_key" ON "two_factor_confirmations"("userId");

-- AddForeignKey
ALTER TABLE "humanized_text" ADD CONSTRAINT "humanized_text_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "two_factor_confirmations" ADD CONSTRAINT "two_factor_confirmations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
