/*
  Warnings:

  - The values [PRIVATE] on the enum `PostVisibility` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostVisibility_new" AS ENUM ('PUBLIC', 'DISTRICT', 'FRIENDS');
ALTER TABLE "Post" ALTER COLUMN "postVisibility" TYPE "PostVisibility_new" USING ("postVisibility"::text::"PostVisibility_new");
ALTER TYPE "PostVisibility" RENAME TO "PostVisibility_old";
ALTER TYPE "PostVisibility_new" RENAME TO "PostVisibility";
DROP TYPE "PostVisibility_old";
COMMIT;
