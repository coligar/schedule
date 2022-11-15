/*
  Warnings:

  - You are about to drop the column `area` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `area`,
    DROP COLUMN `type`,
    ADD COLUMN `status` ENUM('ACTIVE', 'RESCHEDULED', 'CANCELED', 'FINISHED') NOT NULL DEFAULT 'ACTIVE',
    MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `account_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `account_verified_date` DATETIME(3) NULL,
    ADD COLUMN `birth_date` DATE NULL,
    ADD COLUMN `cpf` VARCHAR(191) NULL,
    ADD COLUMN `have_desability` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lastname` VARCHAR(191) NULL,
    ADD COLUMN `own_car` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `rg` VARCHAR(191) NULL,
    ADD COLUMN `sex` ENUM('F', 'M') NULL,
    ADD COLUMN `status` ENUM('ACTIVE', 'CANCELED', 'NOTVERIFIED', 'INACTIVE') NOT NULL DEFAULT 'NOTVERIFIED';

-- CreateTable
CREATE TABLE `AreaActivity` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `scheduleId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AreaActivity_name_key`(`name`),
    UNIQUE INDEX `AreaActivity_color_key`(`color`),
    UNIQUE INDEX `AreaActivity_userId_key`(`userId`),
    UNIQUE INDEX `AreaActivity_scheduleId_key`(`scheduleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `zip` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `district` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `uf` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `mail` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Contact_email_key`(`email`),
    UNIQUE INDEX `Contact_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScheduleType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `scheduleId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ScheduleType_name_key`(`name`),
    UNIQUE INDEX `ScheduleType_icon_key`(`icon`),
    UNIQUE INDEX `ScheduleType_color_key`(`color`),
    UNIQUE INDEX `ScheduleType_scheduleId_key`(`scheduleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
