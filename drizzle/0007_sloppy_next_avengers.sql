CREATE TABLE `sponsor_document_files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sponsorDocumentId` int NOT NULL,
	`documentCategory` enum('pay_stub','tax_return','w2_form','bank_statement','employment_letter','lease_agreement','mortgage_statement','utility_bill','property_deed','id_document','immigration_status','other') NOT NULL,
	`documentName` varchar(255) NOT NULL,
	`description` text,
	`fileKey` varchar(500) NOT NULL,
	`fileUrl` varchar(1000) NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileSize` int NOT NULL,
	`mimeType` varchar(100) NOT NULL,
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sponsor_document_files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sponsor_document_share_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sponsorDocumentId` int NOT NULL,
	`shareToken` varchar(64) NOT NULL,
	`passwordHash` varchar(255),
	`recipientName` varchar(255),
	`recipientEmail` varchar(320),
	`expiresAt` timestamp NOT NULL,
	`maxViews` int DEFAULT 0,
	`viewCount` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`revokedAt` timestamp,
	`lastAccessedAt` timestamp,
	`lastAccessedIp` varchar(45),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sponsor_document_share_links_id` PRIMARY KEY(`id`),
	CONSTRAINT `sponsor_document_share_links_shareToken_unique` UNIQUE(`shareToken`)
);
--> statement-breakpoint
CREATE TABLE `sponsor_documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`accessToken` varchar(64) NOT NULL,
	`sponsorName` varchar(255) NOT NULL,
	`sponsorEmail` varchar(320) NOT NULL,
	`sponsorPhone` varchar(30),
	`respondentName` varchar(255) NOT NULL,
	`respondentANumber` varchar(20),
	`sponsorLetterId` int,
	`status` enum('pending','submitted','reviewed','approved','rejected') NOT NULL DEFAULT 'pending',
	`adminNotes` text,
	`reviewedBy` int,
	`reviewedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sponsor_documents_id` PRIMARY KEY(`id`),
	CONSTRAINT `sponsor_documents_accessToken_unique` UNIQUE(`accessToken`)
);
