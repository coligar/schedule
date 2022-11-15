/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `AreaActivity` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `AreaActivity` table. All the data in the column will be lost.
  - You are about to drop the column `interviewerId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `ScheduleType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[area_activity]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[schedule_type]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[interviewer]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[area_activity]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `AreaActivity_scheduleId_key` ON `AreaActivity`;

-- DropIndex
DROP INDEX `AreaActivity_userId_key` ON `AreaActivity`;

-- DropIndex
DROP INDEX `Schedule_interviewerId_key` ON `Schedule`;

-- DropIndex
DROP INDEX `ScheduleType_scheduleId_key` ON `ScheduleType`;

-- AlterTable
ALTER TABLE `AreaActivity` DROP COLUMN `scheduleId`,
    DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `interviewerId`,
    ADD COLUMN `area_activity` VARCHAR(191) NULL,
    ADD COLUMN `interviewer` VARCHAR(191) NULL,
    ADD COLUMN `schedule_type` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ScheduleType` DROP COLUMN `scheduleId`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `area_activity` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Schedule_area_activity_key` ON `Schedule`(`area_activity`);

-- CreateIndex
CREATE UNIQUE INDEX `Schedule_schedule_type_key` ON `Schedule`(`schedule_type`);

-- CreateIndex
CREATE UNIQUE INDEX `Schedule_interviewer_key` ON `Schedule`(`interviewer`);

-- CreateIndex
CREATE UNIQUE INDEX `User_area_activity_key` ON `User`(`area_activity`);
