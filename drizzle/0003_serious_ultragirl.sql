CREATE TABLE `datasheets` (
	`id` varchar(32) NOT NULL,
	`status` enum('entwurf','pruefung','freigegeben','archiviert') NOT NULL DEFAULT 'entwurf',
	`headlineDe` varchar(256) NOT NULL DEFAULT '',
	`productGroup` varchar(128) NOT NULL DEFAULT '',
	`prospektNr` varchar(64) NOT NULL DEFAULT '',
	`datum` varchar(16) NOT NULL DEFAULT '',
	`data` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `datasheets_id` PRIMARY KEY(`id`)
);
