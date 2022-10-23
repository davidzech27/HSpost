/*
  Warnings:

  - You are about to drop the column `usersCommented` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "usersCommented",
ADD COLUMN     "commentCount" INTEGER NOT NULL DEFAULT 0;
