/*
  Warnings:

  - You are about to drop the `_friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_A_fkey";

-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_B_fkey";

-- DropTable
DROP TABLE "_friends";

-- CreateTable
CREATE TABLE "Friend" (
    "friendEmail" TEXT NOT NULL,
    "relationshipDescription" TEXT NOT NULL,
    "friendRelationEmail" TEXT NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("friendEmail","friendRelationEmail")
);

-- CreateTable
CREATE TABLE "_friendRequests" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_friendRequests_AB_unique" ON "_friendRequests"("A", "B");

-- CreateIndex
CREATE INDEX "_friendRequests_B_index" ON "_friendRequests"("B");

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendEmail_fkey" FOREIGN KEY ("friendEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendRelationEmail_fkey" FOREIGN KEY ("friendRelationEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friendRequests" ADD CONSTRAINT "_friendRequests_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friendRequests" ADD CONSTRAINT "_friendRequests_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
