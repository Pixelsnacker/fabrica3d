CREATE TABLE `pricing_config` (
	`id` int AUTO_INCREMENT NOT NULL,
	`processKey` varchar(64) NOT NULL,
	`labelDe` varchar(128) NOT NULL,
	`labelEn` varchar(128) NOT NULL,
	`unit` enum('cm3','hour','object') NOT NULL,
	`pricePerUnitMin` decimal(10,4) NOT NULL,
	`pricePerUnitMax` decimal(10,4) NOT NULL,
	`minimumPrice` decimal(10,2) NOT NULL,
	`discountFrom10` decimal(5,4) NOT NULL DEFAULT '0.1500',
	`discountFrom50` decimal(5,4) NOT NULL DEFAULT '0.2500',
	`noteDe` text,
	`noteEn` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pricing_config_id` PRIMARY KEY(`id`),
	CONSTRAINT `pricing_config_processKey_unique` UNIQUE(`processKey`)
);
