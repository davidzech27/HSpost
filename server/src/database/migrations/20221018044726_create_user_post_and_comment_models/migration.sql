-- CreateEnum
CREATE TYPE "PostVisibility" AS ENUM ('PUBLIC', 'DISTRICT', 'PRIVATE');

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "photo" VARCHAR(1000),
    "bio" VARCHAR(10000),
    "schoolName" TEXT NOT NULL,
    "joinedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "text" VARCHAR(100000) NOT NULL,
    "posterEmail" TEXT NOT NULL,
    "usersCommented" INTEGER NOT NULL DEFAULT 0,
    "postVisibility" "PostVisibility" NOT NULL,
    "postedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "text" VARCHAR(1000) NOT NULL,
    "commenterEmail" TEXT NOT NULL,
    "replyToId" TEXT,
    "postId" TEXT NOT NULL,
    "commentedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_posterEmail_fkey" FOREIGN KEY ("posterEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commenterEmail_fkey" FOREIGN KEY ("commenterEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
