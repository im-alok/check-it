/*
  Warnings:

  - You are about to drop the column `TodoId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAT` on the `Task` table. All the data in the column will be lost.
  - Added the required column `todoId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_TodoId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "TodoId",
DROP COLUMN "updatedAT",
ADD COLUMN     "todoId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "TODO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
