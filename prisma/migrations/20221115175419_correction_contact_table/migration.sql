/*
  Warnings:

  - You are about to drop the column `mail` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `area_activityID` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `area_activityID` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[area_activityId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[area_activityId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Contact_phone_key` ON `Contact`;

-- DropIndex
DROP INDEX `Schedule_area_activityID_key` ON `Schedule`;

-- DropIndex
DROP INDEX `User_area_activityID_key` ON `User`;

-- AlterTable
ALTER TABLE `Contact` DROP COLUMN `mail`,
    ADD COLUMN `contact_type` ENUM('RESIDENTIAL', 'COMMERCIAL') NOT NULL DEFAULT 'RESIDENTIAL',
    ADD COLUMN `is_default_contact` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `area_activityID`,
    ADD COLUMN `area_activityId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `area_activityID`,
    ADD COLUMN `area_activityId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Schedule_area_activityId_key` ON `Schedule`(`area_activityId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_area_activityId_key` ON `User`(`area_activityId`);
