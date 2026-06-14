CREATE TABLE `mileage_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`driverName` varchar(256),
	`licensePlate` varchar(32),
	`personnelNumber` varchar(64),
	`defaultStartAddress` text,
	`ratePerKm` decimal(6,2) NOT NULL DEFAULT '0.30',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mileage_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `mileage_settings_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `mileage_trips` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`tripDate` date NOT NULL,
	`purpose` varchar(512) NOT NULL,
	`startAddress` text NOT NULL,
	`endAddress` text NOT NULL,
	`roundTrip` boolean NOT NULL DEFAULT false,
	`distanceKm` decimal(8,2) NOT NULL,
	`ratePerKm` decimal(6,2) NOT NULL DEFAULT '0.30',
	`note` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mileage_trips_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saved_addresses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`label` varchar(128) NOT NULL,
	`address` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `saved_addresses_id` PRIMARY KEY(`id`)
);
