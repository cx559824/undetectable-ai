/*
  Warnings:

  - You are about to drop the `HumanizedText` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HumanizedText" DROP CONSTRAINT "HumanizedText_successorId_fkey";

-- DropForeignKey
ALTER TABLE "HumanizedText" DROP CONSTRAINT "HumanizedText_user_id_fkey";

-- DropTable
DROP TABLE "HumanizedText";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "humanized_text" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT,
    "readability" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "strength" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "created" INTEGER NOT NULL,
    "successorId" TEXT
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "humanized_text_id_key" ON "humanized_text"("id");

-- CreateIndex
CREATE UNIQUE INDEX "humanized_text_successorId_key" ON "humanized_text"("successorId");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_email_token_key" ON "verification_tokens"("email", "token");

-- AddForeignKey
ALTER TABLE "humanized_text" ADD CONSTRAINT "humanized_text_successorId_fkey" FOREIGN KEY ("successorId") REFERENCES "humanized_text"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "humanized_text" ADD CONSTRAINT "humanized_text_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
