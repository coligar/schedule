/*
  Warnings:

  - You are about to drop the column `area_activity` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `schedule_type` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `area_activity` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[schedule_typeId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[area_activityID]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[area_activityID]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Schedule_area_activity_key` ON `Schedule`;

-- DropIndex
DROP INDEX `Schedule_schedule_type_key` ON `Schedule`;

-- DropIndex
DROP INDEX `User_area_activity_key` ON `User`;

-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `area_activity`,
    DROP COLUMN `schedule_type`,
    ADD COLUMN `area_activityID` VARCHAR(191) NULL,
    ADD COLUMN `schedule_typeId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `area_activity`,
    ADD COLUMN `area_activityID` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Schedule_schedule_typeId_key` ON `Schedule`(`schedule_typeId`);

-- CreateIndex
CREATE UNIQUE INDEX `Schedule_area_activityID_key` ON `Schedule`(`area_activityID`);

-- CreateIndex
CREATE UNIQUE INDEX `User_area_activityID_key` ON `User`(`area_activityID`);
