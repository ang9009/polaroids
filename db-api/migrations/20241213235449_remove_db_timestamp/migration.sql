/*
  Warnings:

  - Added the required column `uploaderId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "uploaderId" VARCHAR(255) NOT NULL;
