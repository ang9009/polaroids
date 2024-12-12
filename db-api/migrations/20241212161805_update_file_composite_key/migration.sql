/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `messageId` on the `File` table. All the data in the column will be lost.
  - Added the required column `discordId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
DROP COLUMN "messageId",
ADD COLUMN     "discordId" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "File_pkey" PRIMARY KEY ("discordId");
