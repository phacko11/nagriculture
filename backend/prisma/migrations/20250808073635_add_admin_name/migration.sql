/*
  Warnings:

  - You are about to drop the column `contentMd` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `pdfUrl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Post_slug_key";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "contentMd",
DROP COLUMN "pdfUrl",
DROP COLUMN "slug",
ADD COLUMN     "postUrl" TEXT;
