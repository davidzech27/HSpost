/*
  Warnings:

  - You are about to alter the column `relationshipDescription` on the `Friendship` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "Friendship" ALTER COLUMN "relationshipDescription" SET DATA TYPE VARCHAR(100);
