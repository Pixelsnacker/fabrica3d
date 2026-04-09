CREATE TABLE `site_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`imageKey` varchar(128) NOT NULL,
	`labelDe` varchar(256) NOT NULL,
	`url` text NOT NULL,
	`filename` varchar(256),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_images_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_images_imageKey_unique` UNIQUE(`imageKey`)
);
