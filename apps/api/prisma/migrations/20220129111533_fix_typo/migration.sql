/*
  Warnings:

  - You are about to drop the column `orgnizationId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Orgnization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrgnizationToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[organizationId,name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_orgnizationId_fkey";

-- DropForeignKey
ALTER TABLE "_OrgnizationToUser" DROP CONSTRAINT "_OrgnizationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrgnizationToUser" DROP CONSTRAINT "_OrgnizationToUser_B_fkey";

-- DropIndex
DROP INDEX "Project_orgnizationId_name_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "orgnizationId",
ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Orgnization";

-- DropTable
DROP TABLE "_OrgnizationToUser";

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrganizationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToUser_AB_unique" ON "_OrganizationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToUser_B_index" ON "_OrganizationToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Project_organizationId_name_key" ON "Project"("organizationId", "name");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToUser" ADD FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
