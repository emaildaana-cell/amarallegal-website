ALTER TABLE `bond_submissions` ADD `mentalHealthHistory` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `currentMedications` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `mentalHealthSupport` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `physicalDisabilities` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `priorImmigrationHearings` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `priorAppeals` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `previousBondHearings` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `hasAssets` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `assetsDescription` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `hasDebts` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `debtsDescription` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `bankAccounts` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `abilityToPostBond` varchar(100);--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `educationLevel` varchar(100);--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `certifications` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `professionalSkills` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `hasDependents` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `dependentsDescription` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `elderlyDependents` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `childrenInUS` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `childrenCountries` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `tiesCountryOfOrigin` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `frequencyOfVisits` varchar(100);--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `lastVisitCountryOfOrigin` varchar(20);--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `criminalRecordDetails` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `sentencesServed` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `rehabilitationPrograms` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `characterReference1Name` varchar(255);--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `characterReference1Relation` varchar(100);--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `characterReference1Contact` varchar(100);--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `characterReference2Name` varchar(255);--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `characterReference2Relation` varchar(100);--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `characterReference2Contact` varchar(100);--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `characterReference3Name` varchar(255);--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `characterReference3Relation` varchar(100);--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `characterReference3Contact` varchar(100);--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `sponsorCriminalHistory` text;--> statement-breakpoint
ALTER TABLE `bond_submissions` ADD `sponsorEmploymentHistory` text;