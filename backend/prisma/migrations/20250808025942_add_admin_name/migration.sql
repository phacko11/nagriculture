/*
  Warnings:

  - Added the required column `name` to the `AdminUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."AdminUser" ADD COLUMN     "name" TEXT NOT NULL;
