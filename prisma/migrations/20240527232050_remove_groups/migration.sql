/*
  Warnings:

  - You are about to drop the column `groupId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersOnGroups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_groupId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnGroups" DROP CONSTRAINT "UsersOnGroups_groupId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnGroups" DROP CONSTRAINT "UsersOnGroups_userId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "groupId";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "groupId";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "UsersOnGroups";
