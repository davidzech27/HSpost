/*
  Warnings:

  - Added the required column `abbreviation` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "School" ADD COLUMN     "abbreviation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "schoolAbbreviation" TEXT;
