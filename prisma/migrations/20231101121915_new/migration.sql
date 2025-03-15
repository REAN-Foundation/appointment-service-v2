-- CreateTable
CREATE TABLE `appointment_statuses` (
    `id` VARCHAR(191) NOT NULL,
    `BusinessNodeId` CHAR(36) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsCancellationStatus` BOOLEAN NOT NULL DEFAULT false,
    `IsCompletedStatus` BOOLEAN NOT NULL DEFAULT false,
    `IsConfirmedStatus` BOOLEAN NOT NULL DEFAULT false,
    `IsDashboardStatus` BOOLEAN NOT NULL DEFAULT true,
    `IsWalkinEntryStatus` BOOLEAN NOT NULL DEFAULT false,
    `NotificationText` TEXT NULL,
    `SendNotification` BOOLEAN NOT NULL DEFAULT true,
    `SendSms` BOOLEAN NOT NULL DEFAULT true,
    `Sequence` INTEGER NOT NULL DEFAULT 0,
    `SmsText` TEXT NULL,
    `Status` VARCHAR(255) NULL DEFAULT '',
    `StatusCode` VARCHAR(255) NULL DEFAULT '',
    `StatusColor` VARCHAR(255) NULL DEFAULT '',
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` VARCHAR(191) NOT NULL,
    `BusinessNodeId` CHAR(36) NOT NULL,
    `BusinessServiceId` CHAR(36) NOT NULL,
    `BusinessUserId` CHAR(36) NOT NULL,
    `CancelledOn` DATETIME(0) NULL,
    `CompletedOn` DATETIME(0) NULL,
    `ConfirmedOn` DATETIME(0) NULL,
    `CouponCode` VARCHAR(255) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CustomerId` CHAR(36) NOT NULL,
    `Discount` FLOAT NOT NULL DEFAULT 0,
    `DisplayId` VARCHAR(255) NOT NULL DEFAULT '',
    `EndTime` DATETIME(0) NULL,
    `Fees` FLOAT NOT NULL DEFAULT 0,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsCancelled` BOOLEAN NOT NULL DEFAULT false,
    `IsCompleted` BOOLEAN NOT NULL DEFAULT false,
    `IsConfirmed` BOOLEAN NOT NULL DEFAULT false,
    `IsPaid` BOOLEAN NOT NULL DEFAULT false,
    `IsRescheduled` BOOLEAN NOT NULL DEFAULT false,
    `Note` TEXT NULL,
    `RescheduledAppointmentId` INTEGER NULL DEFAULT 1,
    `RescheduledOn` DATETIME(0) NULL,
    `StartTime` DATETIME(0) NULL,
    `Status` VARCHAR(255) NOT NULL DEFAULT '',
    `StatusCode` VARCHAR(255) NOT NULL DEFAULT '',
    `Tax` FLOAT NOT NULL DEFAULT 0,
    `Tip` FLOAT NOT NULL DEFAULT 0,
    `Total` FLOAT NOT NULL DEFAULT 0,
    `TransactionId` CHAR(36) NULL,
    `Type` VARCHAR(255) NOT NULL DEFAULT 'IN-PERSON',
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_node_customers` (
    `id` VARCHAR(191) NOT NULL,
    `BusinessNodeId` CHAR(36) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CustomerId` CHAR(36) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `SmsConsent` VARCHAR(255) NOT NULL DEFAULT 'NOT_REPLIED',
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_node_hours` (
    `id` VARCHAR(191) NOT NULL,
    `BusinessNodeId` CHAR(36) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Date` DATETIME(0) NULL,
    `Day` INTEGER NOT NULL,
    `EndTime` VARCHAR(191) NOT NULL DEFAULT '21:00:00',
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsOpen` BOOLEAN NOT NULL DEFAULT true,
    `Message` VARCHAR(255) NULL,
    `StartTime` VARCHAR(191) NOT NULL DEFAULT '10:00:00',
    `Type` VARCHAR(255) NOT NULL,
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_nodes` (
    `id` VARCHAR(191) NOT NULL,
    `BusinessId` CHAR(36) NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Mobile` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `DisplayPicture` TEXT NULL,
    `Address` TEXT NULL,
    `Longitude` VARCHAR(255) NULL,
    `Lattitude` VARCHAR(255) NULL,
    `OverallRating` FLOAT NULL,
    `TimeZone` VARCHAR(255) NULL DEFAULT '+05:30',
    `AllowWalkinAppointments` BOOLEAN NOT NULL DEFAULT true,
    `AllowFutureBookingFor` VARCHAR(255) NOT NULL DEFAULT '30d',
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `business_nodes_Mobile_key`(`Mobile`),
    UNIQUE INDEX `business_nodes_Email_key`(`Email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_services` (
    `id` VARCHAR(191) NOT NULL,
    `AllowCancellation` BOOLEAN NOT NULL DEFAULT false,
    `BusinessNodeId` CHAR(36) NOT NULL,
    `CancellationCharges` FLOAT NOT NULL DEFAULT 0,
    `CancellationWindow` VARCHAR(255) NOT NULL DEFAULT '1h',
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Description` TEXT NULL,
    `DisplayServicePicture` TEXT NULL,
    `EnableLoyalty` BOOLEAN NOT NULL DEFAULT true,
    `Fees` FLOAT NOT NULL DEFAULT 0,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsTaxable` BOOLEAN NOT NULL DEFAULT false,
    `Name` VARCHAR(255) NOT NULL,
    `PaymentPercent` FLOAT NOT NULL DEFAULT 0,
    `PaymentRequired` BOOLEAN NOT NULL DEFAULT false,
    `PriorBookingWindow` VARCHAR(255) NOT NULL DEFAULT '1h',
    `ReminderType` VARCHAR(255) NULL,
    `ReminderWindow` VARCHAR(255) NULL,
    `SendReminder` BOOLEAN NOT NULL DEFAULT false,
    `ServiceDuration` VARCHAR(255) NOT NULL DEFAULT '30m',
    `TaxRate` FLOAT NOT NULL DEFAULT 0,
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_skills` (
    `id` VARCHAR(191) NOT NULL,
    `BusinessNodeId` CHAR(36) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Description` TEXT NULL,
    `DisplayPicture` TEXT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `Name` VARCHAR(255) NOT NULL,
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_user_hours` (
    `id` VARCHAR(191) NOT NULL,
    `BusinessUserId` CHAR(36) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Date` DATETIME(0) NULL,
    `Day` INTEGER NOT NULL,
    `EndTime` VARCHAR(191) NOT NULL DEFAULT '21:00:00',
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsOpen` BOOLEAN NOT NULL DEFAULT true,
    `Message` VARCHAR(255) NULL,
    `StartTime` VARCHAR(191) NOT NULL DEFAULT '10:00:00',
    `Type` VARCHAR(255) NOT NULL,
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_user_services` (
    `id` VARCHAR(191) NOT NULL,
    `BusinessServiceId` CHAR(36) NOT NULL,
    `BusinessUserId` CHAR(36) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_user_skills` (
    `id` VARCHAR(191) NOT NULL,
    `BusinessSkillId` CHAR(36) NOT NULL,
    `BusinessUserId` CHAR(36) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_users` (
    `id` VARCHAR(191) NOT NULL,
    `AboutMe` TEXT NULL,
    `BusinessNodeId` CHAR(36) NOT NULL,
    `DisplayPicture` TEXT NULL,
    `Dob` DATETIME(0) NULL,
    `Email` VARCHAR(255) NULL,
    `Experience` VARCHAR(255) NULL,
    `Facebook` VARCHAR(255) NULL,
    `FirstName` VARCHAR(255) NOT NULL,
    `Gender` VARCHAR(255) NULL,
    `Instagram` VARCHAR(255) NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsAvailableForEmergency` BOOLEAN NULL DEFAULT true,
    `LastName` VARCHAR(255) NOT NULL,
    `Linkedin` VARCHAR(255) NULL,
    `Mobile` VARCHAR(255) NOT NULL,
    `OverallRating` FLOAT NULL,
    `Prefix` VARCHAR(255) NOT NULL,
    `Qualification` TEXT NULL,
    `Twitter` VARCHAR(255) NULL,
    `Yelp` VARCHAR(255) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `business_users_Email_key`(`Email`),
    UNIQUE INDEX `business_users_Mobile_key`(`Mobile`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `businesses` (
    `id` VARCHAR(191) NOT NULL,
    `ExternalId` VARCHAR(255) NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Mobile` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `AboutUs` TEXT NULL,
    `Logo` TEXT NULL,
    `DisplayPicture` TEXT NULL,
    `OverallRating` FLOAT NULL,
    `Address` TEXT NULL,
    `ApiKey` VARCHAR(255) NOT NULL,
    `Facebook` VARCHAR(255) NULL,
    `Linkedin` VARCHAR(255) NULL,
    `Twitter` VARCHAR(255) NULL,
    `Instagram` VARCHAR(255) NULL,
    `Yelp` VARCHAR(255) NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `businesses_Mobile_key`(`Mobile`),
    UNIQUE INDEX `businesses_Email_key`(`Email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` VARCHAR(191) NOT NULL,
    `Address` TEXT NULL,
    `BirthDate` DATETIME(0) NULL,
    `DisplayPicture` TEXT NULL,
    `Email` VARCHAR(255) NULL,
    `FirstName` VARCHAR(255) NULL,
    `Gender` VARCHAR(255) NULL,
    `InAppUser` BOOLEAN NOT NULL DEFAULT false,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `LastName` VARCHAR(255) NULL,
    `Mobile` VARCHAR(255) NOT NULL,
    `Prefix` VARCHAR(255) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `customers_Email_key`(`Email`),
    UNIQUE INDEX `customers_Mobile_key`(`Mobile`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `Body` TEXT NULL,
    `BusinessNodeId` CHAR(36) NOT NULL,
    `CustomerId` CHAR(36) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsRead` BOOLEAN NOT NULL DEFAULT false,
    `IsSent` BOOLEAN NOT NULL DEFAULT true,
    `Message` TEXT NULL,
    `ReadOn` DATETIME(0) NULL,
    `SentOn` DATETIME(0) NULL,
    `Title` VARCHAR(255) NULL DEFAULT '',
    `Type` VARCHAR(255) NULL DEFAULT '',
    `TypeId` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_transactions` (
    `id` VARCHAR(191) NOT NULL,
    `AppointmentId` CHAR(36) NULL,
    `BusinessNodeId` CHAR(36) NOT NULL,
    `CompletedOn` DATETIME(0) NULL,
    `Currency` VARCHAR(255) NULL DEFAULT '',
    `CustomerId` CHAR(36) NOT NULL,
    `ExternalId` VARCHAR(255) NULL,
    `InitiatedOn` DATETIME(0) NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsComplete` BOOLEAN NOT NULL DEFAULT false,
    `Status` VARCHAR(255) NULL DEFAULT '',
    `TotalAmount` FLOAT NOT NULL DEFAULT 0,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_messages` (
    `id` VARCHAR(191) NOT NULL,
    `Body` TEXT NULL,
    `BusinessNodeId` CHAR(36) NOT NULL,
    `CustomerId` CHAR(36) NOT NULL,
    `Error` TEXT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsSent` BOOLEAN NOT NULL DEFAULT true,
    `MessageId` VARCHAR(255) NULL,
    `SentOn` DATETIME(0) NULL,
    `Type` VARCHAR(255) NULL DEFAULT '',
    `TypeId` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `api_clients` (
    `id` VARCHAR(191) NOT NULL,
    `ClientName` VARCHAR(255) NOT NULL,
    `ClientCode` CHAR(36) NOT NULL,
    `FirstName` VARCHAR(255) NULL,
    `LastName` VARCHAR(255) NULL,
    `CountryCode` VARCHAR(36) NOT NULL DEFAULT '+91',
    `Phone` VARCHAR(255) NULL,
    `Email` VARCHAR(255) NULL,
    `Password` VARCHAR(512) NULL,
    `IsPrivileged` BOOLEAN NOT NULL DEFAULT false,
    `ApiKey` VARCHAR(255) NOT NULL,
    `ValidFrom` DATETIME(0) NULL,
    `ValidTill` DATETIME(0) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `api_clients_ClientCode_key`(`ClientCode`),
    UNIQUE INDEX `api_clients_ApiKey_key`(`ApiKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RoleName` CHAR(36) NOT NULL,
    `Description` TEXT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `privileges` (
    `id` VARCHAR(191) NOT NULL,
    `RoleName` CHAR(36) NOT NULL,
    `Privilege` CHAR(36) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `UserName` CHAR(36) NOT NULL,
    `Prefix` CHAR(36) NOT NULL,
    `FirstName` VARCHAR(255) NOT NULL,
    `LastName` VARCHAR(255) NOT NULL,
    `CountryCode` CHAR(36) NOT NULL,
    `Phone` VARCHAR(255) NULL,
    `Email` VARCHAR(255) NULL,
    `Gender` VARCHAR(255) NULL,
    `BirthDate` DATE NULL,
    `Password` VARCHAR(512) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `users_UserName_key`(`UserName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `id` VARCHAR(191) NOT NULL,
    `UserId` VARCHAR(191) NOT NULL,
    `RoleId` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_roles_UserId_key`(`UserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_login_session` (
    `id` VARCHAR(191) NOT NULL,
    `UserId` VARCHAR(191) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `StartedAt` DATE NOT NULL,
    `ValidTill` DATE NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_otp` (
    `id` VARCHAR(191) NOT NULL,
    `UserId` VARCHAR(191) NOT NULL,
    `Otp` CHAR(10) NOT NULL,
    `Purpose` ENUM('Login', 'Verification') NOT NULL DEFAULT 'Login',
    `Channel` ENUM('Email', 'Mobile') NOT NULL DEFAULT 'Mobile',
    `Validated` BOOLEAN NOT NULL DEFAULT false,
    `ValidFrom` DATE NOT NULL,
    `ValidTill` DATE NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_otp_UserId_key`(`UserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file_resource` (
    `id` VARCHAR(191) NOT NULL,
    `StorageKey` TEXT NULL,
    `OriginalFilename` VARCHAR(512) NOT NULL,
    `MimeType` VARCHAR(255) NOT NULL,
    `Public` BOOLEAN NOT NULL DEFAULT false,
    `Size` INTEGER NULL,
    `Tags` TEXT NOT NULL,
    `DownloadCount` INTEGER NOT NULL DEFAULT 0,
    `UserId` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `file_resource_UserId_key`(`UserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_privilegesToroles` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_privilegesToroles_AB_unique`(`A`, `B`),
    INDEX `_privilegesToroles_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `business_node_customers` ADD CONSTRAINT `business_node_customers_BusinessNodeId_fkey` FOREIGN KEY (`BusinessNodeId`) REFERENCES `business_nodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_node_customers` ADD CONSTRAINT `business_node_customers_CustomerId_fkey` FOREIGN KEY (`CustomerId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_node_hours` ADD CONSTRAINT `business_node_hours_BusinessNodeId_fkey` FOREIGN KEY (`BusinessNodeId`) REFERENCES `business_nodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_nodes` ADD CONSTRAINT `business_nodes_BusinessId_fkey` FOREIGN KEY (`BusinessId`) REFERENCES `businesses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_services` ADD CONSTRAINT `business_services_BusinessNodeId_fkey` FOREIGN KEY (`BusinessNodeId`) REFERENCES `business_nodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_skills` ADD CONSTRAINT `business_skills_BusinessNodeId_fkey` FOREIGN KEY (`BusinessNodeId`) REFERENCES `business_nodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_user_hours` ADD CONSTRAINT `business_user_hours_BusinessUserId_fkey` FOREIGN KEY (`BusinessUserId`) REFERENCES `business_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_user_services` ADD CONSTRAINT `business_user_services_BusinessServiceId_fkey` FOREIGN KEY (`BusinessServiceId`) REFERENCES `business_services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_user_services` ADD CONSTRAINT `business_user_services_BusinessUserId_fkey` FOREIGN KEY (`BusinessUserId`) REFERENCES `business_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_user_skills` ADD CONSTRAINT `business_user_skills_BusinessSkillId_fkey` FOREIGN KEY (`BusinessSkillId`) REFERENCES `business_skills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_user_skills` ADD CONSTRAINT `business_user_skills_BusinessUserId_fkey` FOREIGN KEY (`BusinessUserId`) REFERENCES `business_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_users` ADD CONSTRAINT `business_users_BusinessNodeId_fkey` FOREIGN KEY (`BusinessNodeId`) REFERENCES `business_nodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_RoleId_fkey` FOREIGN KEY (`RoleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_login_session` ADD CONSTRAINT `user_login_session_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_otp` ADD CONSTRAINT `user_otp_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file_resource` ADD CONSTRAINT `file_resource_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_privilegesToroles` ADD CONSTRAINT `_privilegesToroles_A_fkey` FOREIGN KEY (`A`) REFERENCES `privileges`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_privilegesToroles` ADD CONSTRAINT `_privilegesToroles_B_fkey` FOREIGN KEY (`B`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
