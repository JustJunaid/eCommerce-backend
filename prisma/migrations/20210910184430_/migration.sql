/*
  Warnings:

  - You are about to drop the column `userId` on the `Attributes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attributes" DROP CONSTRAINT "Attributes_userId_fkey";

-- AlterTable
ALTER TABLE "Attributes" DROP COLUMN "userId",
ADD COLUMN     "usersId" INTEGER;

-- AddForeignKey
ALTER TABLE "Attributes" ADD FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
