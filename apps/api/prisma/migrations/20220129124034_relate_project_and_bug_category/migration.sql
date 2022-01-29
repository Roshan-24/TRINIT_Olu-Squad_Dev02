/*
  Warnings:

  - A unique constraint covering the columns `[name,projectId]` on the table `BugCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `BugCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BugCategory" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BugCategory_name_projectId_key" ON "BugCategory"("name", "projectId");

-- AddForeignKey
ALTER TABLE "BugCategory" ADD CONSTRAINT "BugCategory_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
