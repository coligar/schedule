/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[interviewerId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Schedule` ADD COLUMN `interviewerId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Schedule_userId_key` ON `Schedule`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Schedule_interviewerId_key` ON `Schedule`(`interviewerId`);
