-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `username` VARCHAR(24) NOT NULL,
    `token` CHAR(128) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Uploading` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `pid` CHAR(32) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `rejectionReason` VARCHAR(191) NULL,
    `rejectionReasonMessage` VARCHAR(191) NULL,
    `originalName` VARCHAR(255) NOT NULL,
    `effectiveName` VARCHAR(288) NOT NULL,
    `contentType` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `ownerId` INTEGER NOT NULL,

    UNIQUE INDEX `Uploading_pid_key`(`pid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Uploading` ADD CONSTRAINT `Uploading_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
