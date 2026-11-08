/*
MySQL - 5.5.5-10.1.30-MariaDB : Database - inlislite_v3
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `agama` */

DROP TABLE IF EXISTS `agama`;

CREATE TABLE `agama` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `agama_createby` (`CreateBy`),
  KEY `agama_updateby` (`UpdateBy`),
  KEY `agama_kii` (`KIILastUploadDate`),
  KEY `agama_createdate` (`CreateDate`),
  KEY `agama_updatedate` (`UpdateDate`),
  CONSTRAINT `agama_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `agama_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Table structure for table `app_installed` */

DROP TABLE IF EXISTS `app_installed`;

CREATE TABLE `app_installed` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ActivationCode` varchar(255) NOT NULL,
  `PerpustakaanName` text,
  `CreateDate` datetime NOT NULL,
  `CreateTerminal` varchar(100) NOT NULL,
  `Type` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UNIQUE` (`ActivationCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `applications` */

DROP TABLE IF EXISTS `applications`;

CREATE TABLE `applications` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(100) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `WhenDownMessageError` varchar(255) DEFAULT NULL,
  `IsPublish` bit(1) DEFAULT b'1',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `applications_createby` (`CreateBy`),
  KEY `applications_updateby` (`UpdateBy`),
  CONSTRAINT `applications_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `applications_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Table structure for table `auth_assignment` */

DROP TABLE IF EXISTS `auth_assignment`;

CREATE TABLE `auth_assignment` (
  `item_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `updated_at` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`item_name`,`user_id`),
  KEY `auth_assignment_createby` (`CreateBy`),
  KEY `auth_assignment_updateby` (`UpdateBy`),
  CONSTRAINT `auth_assignment_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `auth_assignment_ibfk_1` FOREIGN KEY (`item_name`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `auth_assignment_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `auth_data` */

DROP TABLE IF EXISTS `auth_data`;

CREATE TABLE `auth_data` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Auth_Header_ID` int(11) NOT NULL,
  `Tag` varchar(3) NOT NULL,
  `Indicator1` char(1) DEFAULT NULL,
  `Indicator2` char(1) DEFAULT NULL,
  `Value` varchar(700) DEFAULT NULL,
  `DataItem` varchar(700) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `auth_data_auth_header` (`Auth_Header_ID`),
  KEY `auth_data_createby` (`CreateBy`),
  KEY `auth_data_updateby` (`UpdateBy`),
  KEY `auth_data_IDX1` (`Auth_Header_ID`,`Tag`) USING BTREE,
  KEY `auth_data_IDX2` (`Tag`,`Value`) USING BTREE,
  KEY `auth_data_IDX3` (`Tag`,`DataItem`),
  KEY `auth_data_IDX4` (`Value`),
  CONSTRAINT `auth_data_auth_header` FOREIGN KEY (`Auth_Header_ID`) REFERENCES `auth_header` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `auth_data_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `auth_data_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `auth_header` */

DROP TABLE IF EXISTS `auth_header`;

CREATE TABLE `auth_header` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Worksheet_id` int(11) NOT NULL,
  `Auth_ID` varchar(20) NOT NULL,
  `MARC_LOC` text,
  `ISTILAH_DIGUNAKAN` text,
  `ISTILAH_TDK_DIGUNAKAN` text,
  `ISTILAH_TERKAIT` text,
  `TANGGALPEMBAHASAN` varchar(45) DEFAULT NULL,
  `QUARANTINEDBY` int(11) DEFAULT NULL,
  `QUARANTINEDDATE` datetime DEFAULT NULL,
  `QUARANTINEDTERMINAL` varchar(100) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `auth_header_id` (`Auth_ID`),
  KEY `auth_header_worksheet_id` (`Worksheet_id`),
  KEY `auth_header_createby` (`CreateBy`),
  KEY `auth_header_updateby` (`UpdateBy`),
  KEY `auth_header_authid` (`Auth_ID`),
  CONSTRAINT `auth_header_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `auth_header_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `auth_header_worksheet_id` FOREIGN KEY (`Worksheet_id`) REFERENCES `worksheets` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `auth_item` */

DROP TABLE IF EXISTS `auth_item`;

CREATE TABLE `auth_item` (
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `type` int(11) NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `rule_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data` text COLLATE utf8_unicode_ci,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `updated_at` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `rule_name` (`rule_name`),
  KEY `idx-auth_item-type` (`type`),
  KEY `auth_item_createby` (`CreateBy`),
  KEY `auth_item_updateby` (`UpdateBy`),
  CONSTRAINT `auth_item_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `auth_item_ibfk_1` FOREIGN KEY (`rule_name`) REFERENCES `auth_rule` (`name`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `auth_item_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `auth_item_child` */

DROP TABLE IF EXISTS `auth_item_child`;

CREATE TABLE `auth_item_child` (
  `parent` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `child` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`parent`,`child`),
  KEY `child` (`child`),
  KEY `auth_item_child_createby` (`CreateBy`),
  KEY `auth_item_child_updateby` (`UpdateBy`),
  CONSTRAINT `auth_item_child_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `auth_item_child_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `auth_item_child_ibfk_2` FOREIGN KEY (`child`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `auth_item_child_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `auth_rule` */

DROP TABLE IF EXISTS `auth_rule`;

CREATE TABLE `auth_rule` (
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `data` text COLLATE utf8_unicode_ci,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `auth_rule_createby` (`CreateBy`),
  KEY `auth_rule_updateby` (`UpdateBy`),
  CONSTRAINT `auth_rule_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `auth_rule_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `bacaditempat` */

DROP TABLE IF EXISTS `bacaditempat`;

CREATE TABLE `bacaditempat` (
  `ID` double NOT NULL AUTO_INCREMENT,
  `NoPengunjung` varchar(50) DEFAULT NULL,
  `collection_id` double NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `Member_id` double DEFAULT NULL,
  `Location_Id` int(11) DEFAULT NULL,
  `Is_return` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `BacaDitempat_NoPengujung` (`NoPengunjung`),
  KEY `bacaditempat_createby` (`CreateBy`),
  KEY `bacaditempat_updateby` (`UpdateBy`),
  KEY `bacaditempat_collections` (`collection_id`),
  KEY `bacaditempat_locations` (`Location_Id`),
  KEY `bacaditempat_Noanggota` (`Member_id`) USING BTREE,
  CONSTRAINT `bacaditempat_collections` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bacaditempat_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bacaditempat_locations` FOREIGN KEY (`Location_Id`) REFERENCES `locations` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bacaditempat_members` FOREIGN KEY (`Member_id`) REFERENCES `members` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `bacaditempat_locations` */

DROP TABLE IF EXISTS `bacaditempat_locations`;

CREATE TABLE `bacaditempat_locations` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IP_PC` varchar(100) NOT NULL,
  `Location_ID` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_logincheckpoint_locations` (`Location_ID`),
  KEY `checkpoint_locations_createby` (`CreateBy`),
  KEY `checkpoint_locations_updateby` (`UpdateBy`),
  KEY `bacaditempat_locations_ip` (`IP_PC`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `backup` */

DROP TABLE IF EXISTS `backup`;

CREATE TABLE `backup` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `BackupType` varchar(20) NOT NULL,
  `FileName` varchar(255) NOT NULL,
  `FileSize` varchar(100) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `backup_createby` (`CreateBy`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `bibidavailable` */

DROP TABLE IF EXISTS `bibidavailable`;

CREATE TABLE `bibidavailable` (
  `BIBID` varchar(50) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`BIBID`),
  UNIQUE KEY `BIBID_UNIQUE` (`BIBID`),
  KEY `bibidavailable_createby` (`CreateBy`),
  KEY `bibidavailable_updateby` (`UpdateBy`),
  CONSTRAINT `bibidavailable_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bibidavailable_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `bookinglogs` */

DROP TABLE IF EXISTS `bookinglogs`;

CREATE TABLE `bookinglogs` (
  `memberId` varchar(50) DEFAULT NULL,
  `collectionId` double DEFAULT NULL,
  `bookingDate` datetime DEFAULT NULL,
  `bookingExpired` datetime DEFAULT NULL,
  KEY `fk_bookinglogs_memberId_idx` (`memberId`),
  CONSTRAINT `fk_bookinglogs_memberId` FOREIGN KEY (`memberId`) REFERENCES `members` (`MemberNo`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `bookmark` */

DROP TABLE IF EXISTS `bookmark`;

CREATE TABLE `bookmark` (
  `ID` double NOT NULL AUTO_INCREMENT,
  `Sesi` text NOT NULL,
  `Value` text NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `bookmark_createby` (`CreateBy`),
  KEY `bookmark_updateby` (`UpdateBy`),
  CONSTRAINT `bookmark_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bookmark_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `branchs` */

DROP TABLE IF EXISTS `branchs`;

CREATE TABLE `branchs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(50) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `branchs_createby` (`CreateBy`),
  KEY `branchs_updateby` (`UpdateBy`),
  KEY `branchs_code` (`Code`),
  CONSTRAINT `branchs_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `branchs_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;

/*Table structure for table `cardformats` */

DROP TABLE IF EXISTS `cardformats`;

CREATE TABLE `cardformats` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Width` int(11) DEFAULT '400',
  `Height` int(11) DEFAULT '400',
  `FontName` varchar(30) DEFAULT 'Verdana',
  `FontSize` int(11) DEFAULT '12',
  `FormatTeks` text,
  `FormatTeksNoAuthor` text,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `cardformats_createby` (`CreateBy`),
  KEY `cardformats_updateby` (`UpdateBy`),
  CONSTRAINT `cardformats_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `cardformats_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

/*Table structure for table `catalog_ruas` */

DROP TABLE IF EXISTS `catalog_ruas`;

CREATE TABLE `catalog_ruas` (
  `ID` double NOT NULL AUTO_INCREMENT,
  `CatalogId` double NOT NULL,
  `Tag` varchar(3) NOT NULL,
  `Indicator1` char(1) DEFAULT NULL,
  `Indicator2` char(1) DEFAULT NULL,
  `Value` text,
  `Sequence` int(11) NOT NULL DEFAULT '0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `catalog_ruas_catalogs_idx` (`CatalogId`),
  KEY `catalog_ruas_createby_idx` (`CreateBy`),
  KEY `catalog_ruas_tag` (`Tag`),
  KEY `catalog_ruas_IDX1` (`CatalogId`,`Tag`,`Value`(767)),
  KEY `catalog_ruas_updateby_idx` (`UpdateBy`),
  CONSTRAINT `catalog_ruas_catalogs` FOREIGN KEY (`CatalogId`) REFERENCES `catalogs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `catalog_ruas_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `catalog_ruas_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `catalog_subruas` */

DROP TABLE IF EXISTS `catalog_subruas`;

CREATE TABLE `catalog_subruas` (
  `ID` double NOT NULL AUTO_INCREMENT,
  `RuasID` double NOT NULL,
  `SubRuas` varchar(10) DEFAULT NULL,
  `Value` text,
  `Sequence` int(11) NOT NULL DEFAULT '0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `SubRuas` (`SubRuas`),
  KEY `RuasID_SubRuas` (`RuasID`,`SubRuas`),
  KEY `Catalog_Subruas_Value` (`Value`(767)),
  KEY `catalog_subruas_createby` (`CreateBy`),
  KEY `catalog_subruas_updateby` (`UpdateBy`),
  CONSTRAINT `catalog_subruas_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `catalog_subruas_ruas` FOREIGN KEY (`RuasID`) REFERENCES `catalog_ruas` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `catalog_subruas_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `catalogfiles` */

DROP TABLE IF EXISTS `catalogfiles`;

CREATE TABLE `catalogfiles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Catalog_id` double NOT NULL,
  `FileURL` varchar(255) DEFAULT NULL,
  `FileFlash` varchar(255) DEFAULT NULL,
  `IsPublish` tinyint(4) DEFAULT '1',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `IsFromMember` bit(1) DEFAULT b'0',
  `Member_id` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `catalogfiles_catalog` (`Catalog_id`),
  KEY `catalogfiles_createby` (`CreateBy`),
  KEY `catalogfiles_updateby` (`UpdateBy`),
  KEY `catalogfiles_fileurl` (`FileURL`),
  KEY `catalogfiles_fileflash` (`FileFlash`),
  KEY `catalogfiles_ispublish` (`IsPublish`),
  KEY `catalogfiles_member_idx` (`Member_id`),
  CONSTRAINT `catalogfiles_catalog` FOREIGN KEY (`Catalog_id`) REFERENCES `catalogs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `catalogfiles_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `catalogfiles_member` FOREIGN KEY (`Member_id`) REFERENCES `members` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `catalogfiles_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `catalogs` */

DROP TABLE IF EXISTS `catalogs`;

CREATE TABLE `catalogs` (
  `ID` double NOT NULL AUTO_INCREMENT,
  `ControlNumber` varchar(50) NOT NULL,
  `BIBID` varchar(50) NOT NULL,
  `Title` varchar(700) NOT NULL,
  `Author` varchar(700) DEFAULT NULL,
  `Edition` varchar(255) DEFAULT NULL,
  `Publisher` varchar(255) DEFAULT NULL,
  `PublishLocation` varchar(255) DEFAULT NULL,
  `PublishYear` varchar(255) DEFAULT NULL,
  `Publikasi` varchar(700) DEFAULT NULL,
  `Subject` varchar(700) DEFAULT NULL,
  `PhysicalDescription` varchar(255) DEFAULT NULL,
  `ISBN` varchar(700) DEFAULT NULL,
  `CallNumber` varchar(700) DEFAULT NULL,
  `Note` text,
  `Languages` varchar(255) DEFAULT NULL,
  `DeweyNo` varchar(255) DEFAULT NULL,
  `ApproveDateOPAC` datetime DEFAULT NULL,
  `IsOPAC` tinyint(4) DEFAULT '1',
  `IsBNI` bit(1) DEFAULT b'1',
  `IsKIN` bit(1) DEFAULT b'1',
  `IsRDA` bit(1) DEFAULT b'0',
  `CoverURL` varchar(255) DEFAULT NULL,
  `Branch_id` int(11) DEFAULT NULL,
  `Worksheet_id` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `MARC_LOC` text,
  `PRESERVASI_ID` varchar(20) DEFAULT NULL,
  `QUARANTINEDBY` int(11) DEFAULT NULL,
  `QUARANTINEDDATE` datetime DEFAULT NULL,
  `QUARANTINEDTERMINAL` varchar(100) DEFAULT NULL,
  `Member_id` double DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `catalogs_BIBID` (`BIBID`),
  KEY `catalogs_createby` (`CreateBy`),
  KEY `catalogs_updateby` (`UpdateBy`),
  KEY `catalogs_author` (`Author`),
  KEY `catalogs_edition` (`Edition`),
  KEY `catalogs_publisher` (`Publisher`),
  KEY `catalogs_publishlocation` (`PublishLocation`),
  KEY `catalogs_publishyear` (`PublishYear`),
  KEY `catalogs_subject` (`Subject`),
  KEY `catalogs_physicaldesc` (`PhysicalDescription`),
  KEY `catalogs_isbn` (`ISBN`),
  KEY `catalogs_callnumber` (`CallNumber`),
  KEY `catalogs_deweyno` (`DeweyNo`),
  KEY `catalogs_languages` (`Languages`),
  KEY `catalogs_quarantinedby` (`QUARANTINEDBY`),
  KEY `catalogs_createdate` (`CreateDate`),
  KEY `catalogs_isopac` (`IsOPAC`),
  KEY `catalogs_Worksheet_id` (`Worksheet_id`),
  KEY `catalogs_Branch_id` (`Branch_id`),
  KEY `catalogs_member_idx` (`Member_id`),
  KEY `catalogs_controlnumber` (`ControlNumber`),
  KEY `catalogs_kii` (`KIILastUploadDate`),
  KEY `catalogs_updatedate` (`UpdateDate`),
  KEY `catalogs_title` (`Title`),
  KEY `catalogs_publikasi` (`Publikasi`),
  CONSTRAINT `catalogs_branch` FOREIGN KEY (`Branch_id`) REFERENCES `branchs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `catalogs_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `catalogs_member` FOREIGN KEY (`Member_id`) REFERENCES `members` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `catalogs_quarantinedby` FOREIGN KEY (`QUARANTINEDBY`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `catalogs_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `catalogs_worksheet` FOREIGN KEY (`Worksheet_id`) REFERENCES `worksheets` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `catalogstaging` */

DROP TABLE IF EXISTS `catalogstaging`;

CREATE TABLE `catalogstaging` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(700) NOT NULL,
  `Author` varchar(700) DEFAULT NULL,
  `Publishment` varchar(255) DEFAULT NULL,
  `Edition` varchar(255) DEFAULT NULL,
  `MARC_LOC` text,
  `Worksheet_id` int(11) DEFAULT '1',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `catalogstaging_createby` (`CreateBy`),
  KEY `catalogstaging_updateby` (`UpdateBy`),
  CONSTRAINT `catalogstaging_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `catalogstaging_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `checkpoint_locations` */

DROP TABLE IF EXISTS `checkpoint_locations`;

CREATE TABLE `checkpoint_locations` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IP_PC` varchar(100) NOT NULL,
  `Location_ID` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `IP_PC` (`IP_PC`),
  KEY `FK_logincheckpoint_locations` (`Location_ID`),
  KEY `checkpoint_locations_createby` (`CreateBy`),
  KEY `checkpoint_locations_updateby` (`UpdateBy`),
  CONSTRAINT `FK_logincheckpoint_locations` FOREIGN KEY (`Location_ID`) REFERENCES `locations` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `checkpoint_locations_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `checkpoint_locations_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `collectioncategorys` */

DROP TABLE IF EXISTS `collectioncategorys`;

CREATE TABLE `collectioncategorys` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(50) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `collectioncategorys_createby` (`CreateBy`),
  KEY `collectioncategorys_updateby` (`UpdateBy`),
  KEY `collectioncategorys_kii` (`KIILastUploadDate`),
  KEY `collectioncategorys_createdate` (`CreateDate`),
  KEY `collectioncategorys_updatedate` (`UpdateDate`),
  CONSTRAINT `collectioncategorys_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectioncategorys_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Table structure for table `collectioncategorysdefault` */

DROP TABLE IF EXISTS `collectioncategorysdefault`;

CREATE TABLE `collectioncategorysdefault` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CollectionCategory_id` int(11) DEFAULT NULL,
  `JenisAnggota_id` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `collectioncategorysdefault_category` (`CollectionCategory_id`),
  KEY `collectioncategorysdefault_jenis_anggota` (`JenisAnggota_id`),
  KEY `collectioncategorysdefault_createby` (`CreateBy`),
  KEY `collectioncategorysdefault_updateby` (`UpdateBy`),
  CONSTRAINT `collectioncategorysdefault_category` FOREIGN KEY (`CollectionCategory_id`) REFERENCES `collectioncategorys` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collectioncategorysdefault_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectioncategorysdefault_jenis_anggota` FOREIGN KEY (`JenisAnggota_id`) REFERENCES `jenis_anggota` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collectioncategorysdefault_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

/*Table structure for table `collectioncategorysloanhari` */

DROP TABLE IF EXISTS `collectioncategorysloanhari`;

CREATE TABLE `collectioncategorysloanhari` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `Category_id` int(11) DEFAULT NULL,
  `Peminjaman_hari_id` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`DataID`),
  KEY `collectioncategorysloanhari_category_id` (`Category_id`),
  KEY `collectioncategorysloanhari_peminjaman_hari_id` (`Peminjaman_hari_id`),
  KEY `collectioncategorysloanhari_createby` (`CreateBy`),
  KEY `collectioncategorysloanhari_updateby` (`UpdateBy`),
  CONSTRAINT `collectioncategorysloanhari_category_id` FOREIGN KEY (`Category_id`) REFERENCES `collectioncategorys` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collectioncategorysloanhari_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectioncategorysloanhari_peminjaman_hari_id` FOREIGN KEY (`Peminjaman_hari_id`) REFERENCES `peraturan_peminjaman_hari` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collectioncategorysloanhari_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;

/*Table structure for table `collectionloanextends` */

DROP TABLE IF EXISTS `collectionloanextends`;

CREATE TABLE `collectionloanextends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `CollectionLoan_id` varchar(255) NOT NULL,
  `CollectionLoanItem_id` double NOT NULL,
  `Collection_id` double NOT NULL,
  `Member_id` double NOT NULL,
  `DateExtend` datetime NOT NULL,
  `DueDateExtend` datetime NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `collectionloanextends_colloan_idx` (`CollectionLoan_id`),
  KEY `collectionloanextends_colloanitem_idx` (`CollectionLoanItem_id`),
  KEY `collectionloanextends_col_idx` (`Collection_id`),
  KEY `collectionloanextends_member_idx` (`Member_id`),
  KEY `collectionloanextends_createby_idx` (`CreateBy`),
  KEY `collectionloanextends_updateby_idx` (`UpdateBy`),
  CONSTRAINT `collectionloanextends_col` FOREIGN KEY (`Collection_id`) REFERENCES `collections` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collectionloanextends_colloan` FOREIGN KEY (`CollectionLoan_id`) REFERENCES `collectionloans` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collectionloanextends_colloanitem` FOREIGN KEY (`CollectionLoanItem_id`) REFERENCES `collectionloanitems` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collectionloanextends_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectionloanextends_member` FOREIGN KEY (`Member_id`) REFERENCES `members` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collectionloanextends_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `collectionloanitems` */

DROP TABLE IF EXISTS `collectionloanitems`;

CREATE TABLE `collectionloanitems` (
  `ID` double NOT NULL AUTO_INCREMENT,
  `CollectionLoan_id` varchar(255) NOT NULL,
  `LoanDate` datetime DEFAULT NULL,
  `DueDate` datetime DEFAULT NULL,
  `ActualReturn` datetime DEFAULT NULL,
  `LateDays` int(11) DEFAULT NULL,
  `LoanStatus` varchar(50) DEFAULT NULL,
  `Collection_id` double NOT NULL,
  `member_id` double NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `collectionloanitems_members` (`member_id`),
  KEY `collectionloanitems_LoanDate` (`LoanDate`),
  KEY `collectionloanitems_LoanStatus` (`LoanStatus`),
  KEY `collectionloanitems_createby` (`CreateBy`),
  KEY `collectionloanitems_updateby` (`UpdateBy`),
  KEY `collectionloanitems_collections` (`Collection_id`),
  KEY `collectionloanitems_collectionloans` (`CollectionLoan_id`),
  KEY `collectionloanitems_duedate` (`DueDate`),
  KEY `collectionloanitems_actualreturn` (`ActualReturn`),
  KEY `collectionloanitems_idx1` (`LoanDate`,`member_id`),
  CONSTRAINT `collectionloanitems_col` FOREIGN KEY (`Collection_id`) REFERENCES `collections` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collectionloanitems_colloan` FOREIGN KEY (`CollectionLoan_id`) REFERENCES `collectionloans` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collectionloanitems_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectionloanitems_members` FOREIGN KEY (`member_id`) REFERENCES `members` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collectionloanitems_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `collectionloans` */

DROP TABLE IF EXISTS `collectionloans`;

CREATE TABLE `collectionloans` (
  `ID` varchar(255) NOT NULL,
  `CollectionCount` int(11) DEFAULT '0',
  `LateCount` int(11) DEFAULT '0',
  `ExtendCount` int(11) DEFAULT '0',
  `LoanCount` int(11) DEFAULT '0',
  `ReturnCount` int(11) DEFAULT '0',
  `Member_id` double NOT NULL,
  `Branch_id` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  `LocationLibrary_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Member_id` (`Member_id`),
  KEY `Branch_id` (`Branch_id`),
  KEY `collectionloans_createby` (`CreateBy`),
  KEY `collectionloans_updateby` (`UpdateBy`),
  KEY `FK_collectionloans_location_library` (`LocationLibrary_id`),
  CONSTRAINT `FKA5D300395DD8E7A8` FOREIGN KEY (`Member_id`) REFERENCES `members` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKA5D300396ADC8006` FOREIGN KEY (`Branch_id`) REFERENCES `branchs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_collectionloans_location_library` FOREIGN KEY (`LocationLibrary_id`) REFERENCES `location_library` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectionloans_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectionloans_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `collectionlocations` */

DROP TABLE IF EXISTS `collectionlocations`;

CREATE TABLE `collectionlocations` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(50) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `collectionlocations_createby` (`CreateBy`),
  KEY `collectionlocations_updateby` (`UpdateBy`),
  CONSTRAINT `collectionlocations_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectionlocations_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `collectionmedias` */

DROP TABLE IF EXISTS `collectionmedias`;

CREATE TABLE `collectionmedias` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(50) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Worksheet_id` int(11) DEFAULT NULL,
  `KodeBahanPustaka` varchar(100) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `collectionmedias_worksheet` (`Worksheet_id`),
  KEY `collectionmedias_createby` (`CreateBy`),
  KEY `collectionmedias_updateby` (`UpdateBy`),
  KEY `collectionmedias_kii` (`KIILastUploadDate`),
  KEY `collectionmedias_createdate` (`CreateDate`),
  KEY `collectionmedias_updatedate` (`UpdateDate`),
  CONSTRAINT `collectionmedias_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectionmedias_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectionmedias_worksheet` FOREIGN KEY (`Worksheet_id`) REFERENCES `worksheets` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

/*Table structure for table `collectionrules` */

DROP TABLE IF EXISTS `collectionrules`;

CREATE TABLE `collectionrules` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `collectionrules_createby` (`CreateBy`),
  KEY `collectionrules_updateby` (`UpdateBy`),
  KEY `collectionrules_kii` (`KIILastUploadDate`),
  KEY `collectionrules_createdate` (`CreateDate`),
  KEY `collectionrules_updatedate` (`UpdateDate`),
  CONSTRAINT `collectionrules_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectionrules_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Table structure for table `collectionrulesitems` */

DROP TABLE IF EXISTS `collectionrulesitems`;

CREATE TABLE `collectionrulesitems` (
  `CollectionRules_id` int(11) NOT NULL,
  `StartDay` int(11) NOT NULL,
  `EndDay` int(11) NOT NULL,
  `SuspendDays` int(11) DEFAULT '0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  KEY `CollectionRules_id` (`CollectionRules_id`),
  KEY `collectionrulesitems_createby` (`CreateBy`),
  KEY `collectionrulesitems_updateby` (`UpdateBy`),
  CONSTRAINT `FKA288C9A1451A301A` FOREIGN KEY (`CollectionRules_id`) REFERENCES `collectionrules` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collectionrulesitems_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectionrulesitems_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `collections` */

DROP TABLE IF EXISTS `collections`;

CREATE TABLE `collections` (
  `ID` double NOT NULL AUTO_INCREMENT,
  `NomorBarcode` varchar(50) NOT NULL,
  `NoInduk` varchar(50) DEFAULT NULL,
  `Currency` varchar(30) DEFAULT NULL,
  `RFID` varchar(50) DEFAULT NULL,
  `Price` decimal(10,0) DEFAULT NULL,
  `PriceType` varchar(45) DEFAULT NULL,
  `TanggalPengadaan` datetime DEFAULT NULL,
  `CallNumber` varchar(255) DEFAULT NULL,
  `Branch_id` int(11) DEFAULT NULL,
  `Catalog_id` double DEFAULT NULL,
  `Partner_id` int(11) DEFAULT NULL,
  `Location_id` int(11) DEFAULT NULL,
  `Rule_id` int(11) DEFAULT NULL,
  `Category_id` int(11) DEFAULT NULL,
  `Media_id` int(11) DEFAULT NULL,
  `Source_id` int(11) DEFAULT NULL,
  `Status_id` int(11) DEFAULT '9',
  `Location_Library_id` int(11) DEFAULT NULL,
  `Keterangan_Sumber` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `IsVerified` bit(1) DEFAULT b'0',
  `QUARANTINEDBY` int(11) DEFAULT NULL,
  `QUARANTINEDDATE` date DEFAULT NULL,
  `QUARANTINEDTERMINAL` varchar(100) DEFAULT NULL,
  `ISREFERENSI` bit(1) DEFAULT b'0',
  `EDISISERIAL` varchar(255) DEFAULT NULL,
  `NOJILID` int(11) DEFAULT NULL,
  `TANGGAL_TERBIT_EDISI_SERIAL` date DEFAULT NULL,
  `BAHAN_SERTAAN` varchar(255) DEFAULT NULL,
  `KETERANGAN_LAIN` varchar(255) DEFAULT NULL,
  `TGLENTRYJILID` date DEFAULT NULL,
  `IDJILID` varchar(20) DEFAULT NULL,
  `NOMORPANGGILJILID` varchar(100) DEFAULT NULL,
  `ISOPAC` tinyint(4) DEFAULT '1',
  `JILIDCREATEBY` int(11) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  `BookingMemberID` varchar(50) DEFAULT NULL,
  `BookingExpiredDate` datetime DEFAULT NULL,
  `IsDeposit` int(1) DEFAULT NULL,
  `NomorDeposit` varchar(21) DEFAULT NULL,
  `ThnTerbitDeposit` int(11) DEFAULT NULL,
  `deposit_ws_ID` int(11) DEFAULT NULL,
  `deposit_kode_wilayah_ID` int(11) DEFAULT NULL,
  `Nomor_Regis` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `collections_NomorBarcode` (`NomorBarcode`),
  KEY `Branch_id` (`Branch_id`),
  KEY `Catalog_id` (`Catalog_id`),
  KEY `Partner_id` (`Partner_id`),
  KEY `Location_id` (`Location_id`),
  KEY `Rule_id` (`Rule_id`),
  KEY `Category_id` (`Category_id`),
  KEY `Media_id` (`Media_id`),
  KEY `Source_id` (`Source_id`),
  KEY `collections_callnumber` (`CallNumber`),
  KEY `collections_status` (`Status_id`),
  KEY `collections_createby` (`CreateBy`),
  KEY `collections_updateby` (`UpdateBy`),
  KEY `collections_quarantinedby` (`QUARANTINEDBY`),
  KEY `collections_jilidcreateby` (`JILIDCREATEBY`),
  KEY `collections_idjilid` (`IDJILID`),
  KEY `collections_currency` (`Currency`) USING BTREE,
  KEY `collections_NoInduk` (`NoInduk`) USING BTREE,
  KEY `collections_edisiserial` (`EDISISERIAL`),
  KEY `collections_nopanggiljilid` (`NOMORPANGGILJILID`),
  KEY `collections_jilid1` (`IDJILID`,`NOMORPANGGILJILID`,`Catalog_id`),
  KEY `collections_tglentryjilid` (`TGLENTRYJILID`),
  KEY `collections_tanggalpengadaan` (`TanggalPengadaan`),
  KEY `collections_rfid` (`RFID`),
  KEY `collections_location_library_idx` (`Location_Library_id`),
  KEY `collections_kii` (`KIILastUploadDate`),
  KEY `collections_createdate` (`CreateDate`),
  KEY `collections_updatedate` (`UpdateDate`),
  KEY `collections_deposit_ws_ID` (`deposit_ws_ID`),
  KEY `collection_deposit_kode_wilayah_ID` (`deposit_kode_wilayah_ID`),
  CONSTRAINT `collection_deposit_kode_wilayah_ID` FOREIGN KEY (`deposit_kode_wilayah_ID`) REFERENCES `deposit_kode_wilayah` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collections_branch` FOREIGN KEY (`Branch_id`) REFERENCES `branchs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collections_catalog` FOREIGN KEY (`Catalog_id`) REFERENCES `catalogs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collections_category` FOREIGN KEY (`Category_id`) REFERENCES `collectioncategorys` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `collections_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collections_currency` FOREIGN KEY (`Currency`) REFERENCES `currency` (`Currency`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `collections_deposit_ws_ID` FOREIGN KEY (`deposit_ws_ID`) REFERENCES `deposit_ws` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collections_jilidcreateby` FOREIGN KEY (`JILIDCREATEBY`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collections_location` FOREIGN KEY (`Location_id`) REFERENCES `locations` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `collections_location_library` FOREIGN KEY (`Location_Library_id`) REFERENCES `location_library` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `collections_media` FOREIGN KEY (`Media_id`) REFERENCES `collectionmedias` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `collections_partner` FOREIGN KEY (`Partner_id`) REFERENCES `partners` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `collections_quarantinedby` FOREIGN KEY (`QUARANTINEDBY`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collections_rule` FOREIGN KEY (`Rule_id`) REFERENCES `collectionrules` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collections_source` FOREIGN KEY (`Source_id`) REFERENCES `collectionsources` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collections_status` FOREIGN KEY (`Status_id`) REFERENCES `collectionstatus` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collections_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `collectionsources` */

DROP TABLE IF EXISTS `collectionsources`;

CREATE TABLE `collectionsources` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(50) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `collectionsources_createby` (`CreateBy`),
  KEY `collectionsources_updateby` (`UpdateBy`),
  KEY `collectionsources_kii` (`KIILastUploadDate`),
  KEY `collectionsources_createdate` (`CreateDate`),
  KEY `collectionsources_updatedate` (`UpdateDate`),
  CONSTRAINT `collectionsources_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectionsources_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Table structure for table `collectionstatus` */

DROP TABLE IF EXISTS `collectionstatus`;

CREATE TABLE `collectionstatus` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `collectionstatus_createby` (`CreateBy`),
  KEY `collectionstatus_updateby` (`UpdateBy`),
  KEY `collectionstatus_kii` (`KIILastUploadDate`),
  KEY `collectionstatus_createdate` (`CreateDate`),
  KEY `collectionstatus_updatedate` (`UpdateDate`),
  CONSTRAINT `collectionstatus_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collectionstatus_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

/*Table structure for table `colloclib` */

DROP TABLE IF EXISTS `colloclib`;

CREATE TABLE `colloclib` (
  `Col_id` double NOT NULL,
  `LocLib_id` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  KEY `Col_id` (`Col_id`),
  KEY `LocLib_id` (`LocLib_id`),
  KEY `colloclib_createby` (`CreateBy`),
  KEY `colloclib_updateby` (`UpdateBy`),
  CONSTRAINT `FK_colloclib_col` FOREIGN KEY (`Col_id`) REFERENCES `collections` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_colloclib_loclib` FOREIGN KEY (`LocLib_id`) REFERENCES `location_library` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `colloclib_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `colloclib_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `currency` */

DROP TABLE IF EXISTS `currency`;

CREATE TABLE `currency` (
  `Currency` varchar(20) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Sort_ID` int(11) DEFAULT '999',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`Currency`),
  UNIQUE KEY `CURRENCY_UNIQUE` (`Currency`),
  KEY `currency_createby` (`CreateBy`),
  KEY `currency_updateby` (`UpdateBy`),
  KEY `currency_kii` (`KIILastUploadDate`),
  KEY `currency_createdate` (`CreateDate`),
  KEY `currency_updatedate` (`UpdateDate`),
  KEY `currency_sortno` (`Sort_ID`),
  CONSTRAINT `currency_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `currency_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `daemons` */

DROP TABLE IF EXISTS `daemons`;

CREATE TABLE `daemons` (
  `Start` text NOT NULL,
  `Info` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Table structure for table `departments` */

DROP TABLE IF EXISTS `departments`;

CREATE TABLE `departments` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(50) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `IsActive` bit(1) DEFAULT b'1',
  `ParentID` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Code` (`Code`),
  KEY `ParentID` (`ParentID`),
  KEY `departments_createby` (`CreateBy`),
  KEY `departments_updateby` (`UpdateBy`),
  KEY `departments_kii` (`KIILastUploadDate`),
  KEY `departments_createdate` (`CreateDate`),
  KEY `departments_updatedate` (`UpdateDate`),
  CONSTRAINT `FKFE0DEFC7922003A1` FOREIGN KEY (`ParentID`) REFERENCES `departments` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `departments_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `departments_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Table structure for table `deposit_group_ws` */

DROP TABLE IF EXISTS `deposit_group_ws`;

CREATE TABLE `deposit_group_ws` (
  `id_group` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(50) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_group`),
  KEY `deposit_group_ws_createby` (`CreateBy`),
  KEY `deposit_group_ws_updateby` (`UpdateBy`),
  CONSTRAINT `deposit_group_ws_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `deposit_group_ws_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `deposit_kelompok_penerbit` */

DROP TABLE IF EXISTS `deposit_kelompok_penerbit`;

CREATE TABLE `deposit_kelompok_penerbit` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(111) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `deposit_kelompok_penerbit_createby` (`CreateBy`),
  CONSTRAINT `deposit_kelompok_penerbit_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Table structure for table `deposit_kode_wilayah` */

DROP TABLE IF EXISTS `deposit_kode_wilayah`;

CREATE TABLE `deposit_kode_wilayah` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nama_wilayah` varchar(255) DEFAULT NULL,
  `kode_wilayah` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(50) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `deposit_kode_wilayah_createby` (`CreateBy`),
  KEY `deposit_kode_wilayah_updateby` (`UpdateBy`),
  CONSTRAINT `deposit_kode_wilayah_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `deposit_kode_wilayah_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `deposit_taksiran_harga` */

DROP TABLE IF EXISTS `deposit_taksiran_harga`;

CREATE TABLE `deposit_taksiran_harga` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_collections` double DEFAULT NULL,
  `cover` varchar(65) DEFAULT NULL,
  `muka_buku` varchar(65) DEFAULT NULL,
  `hard_cover` varchar(65) DEFAULT NULL,
  `penjilidan` varchar(65) DEFAULT NULL,
  `jumlah_halaman` int(11) DEFAULT NULL,
  `jenis_kertas_buku` varchar(25) DEFAULT NULL,
  `ukuran_buku` varchar(6) DEFAULT NULL,
  `kondisi_buku` varchar(10) DEFAULT NULL,
  `kondisi_usang` varchar(25) DEFAULT NULL,
  `full_color` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `colections_id` (`ID_collections`),
  CONSTRAINT `colections_id` FOREIGN KEY (`ID_collections`) REFERENCES `collections` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `deposit_ws` */

DROP TABLE IF EXISTS `deposit_ws`;

CREATE TABLE `deposit_ws` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `jenis_penerbit` varchar(55) COLLATE latin1_spanish_ci DEFAULT NULL,
  `id_group_deposit_group_ws` int(11) DEFAULT NULL,
  `id_deposit_kelompok_penerbit_ws` int(11) DEFAULT NULL,
  `nama_penerbit` varchar(55) COLLATE latin1_spanish_ci DEFAULT NULL,
  `alamat1` varchar(65) COLLATE latin1_spanish_ci DEFAULT NULL,
  `alamat2` varchar(65) COLLATE latin1_spanish_ci DEFAULT NULL,
  `alamat3` varchar(65) COLLATE latin1_spanish_ci DEFAULT NULL,
  `kabupaten` varchar(65) COLLATE latin1_spanish_ci DEFAULT NULL,
  `ID_deposit_kode_wilayah` int(11) DEFAULT NULL,
  `kode_pos` int(11) DEFAULT NULL,
  `no_telp1` int(11) DEFAULT NULL,
  `no_telp2` int(11) DEFAULT NULL,
  `no_telp3` int(11) DEFAULT NULL,
  `no_fax` int(11) DEFAULT NULL,
  `email` char(30) COLLATE latin1_spanish_ci DEFAULT NULL,
  `contact_person` char(50) COLLATE latin1_spanish_ci DEFAULT NULL,
  `no_contact` int(11) DEFAULT NULL,
  `koleksi_per_tahun` int(11) DEFAULT NULL,
  `keterangan` varchar(50) COLLATE latin1_spanish_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `(id_group)group-ws` (`id_group_deposit_group_ws`),
  KEY `(ID)deposit_kode_wilayah` (`ID_deposit_kode_wilayah`),
  KEY `(ID)deposit_kelompok_penerbit` (`id_deposit_kelompok_penerbit_ws`),
  CONSTRAINT `(ID)deposit_kelompok_penerbit` FOREIGN KEY (`id_deposit_kelompok_penerbit_ws`) REFERENCES `deposit_kelompok_penerbit` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `(ID)deposit_kode_wilayah` FOREIGN KEY (`ID_deposit_kode_wilayah`) REFERENCES `deposit_kode_wilayah` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `(id_group)group-ws` FOREIGN KEY (`id_group_deposit_group_ws`) REFERENCES `deposit_group_ws` (`id_group`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

/*Table structure for table `djkn_data` */

DROP TABLE IF EXISTS `djkn_data`;

CREATE TABLE `djkn_data` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Collection_id` double DEFAULT NULL,
  `Cover` varchar(100) DEFAULT NULL,
  `Finishing_Cover` varchar(100) DEFAULT NULL,
  `Finishing_HardCover` varchar(100) DEFAULT NULL,
  `Binding` varchar(100) DEFAULT NULL,
  `Total_Page` varchar(20) DEFAULT NULL,
  `Paper_Type` varchar(100) DEFAULT NULL,
  `Book_Size` varchar(100) DEFAULT NULL,
  `Condition_Book` varchar(100) DEFAULT NULL,
  `Conditions_Outdated` varchar(100) DEFAULT NULL,
  `FULL_COLOR` varchar(100) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(45) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `djkn_data_createby_idx` (`CreateBy`),
  KEY `djkn_data_updateby_idx` (`UpdateBy`),
  KEY `djkn_data_collection_idx` (`Collection_id`),
  CONSTRAINT `djkn_data_collection` FOREIGN KEY (`Collection_id`) REFERENCES `collections` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `djkn_data_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `djkn_data_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `favorite` */

DROP TABLE IF EXISTS `favorite`;

CREATE TABLE `favorite` (
  `id` double NOT NULL AUTO_INCREMENT,
  `Catalog_Id` double DEFAULT NULL,
  `Member_Id` varchar(50) DEFAULT NULL,
  `Createdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Catalog` (`Catalog_Id`),
  KEY `FK_members` (`Member_Id`),
  CONSTRAINT `FK_Catalog` FOREIGN KEY (`Catalog_Id`) REFERENCES `catalogs` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_members` FOREIGN KEY (`Member_Id`) REFERENCES `members` (`MemberNo`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `fielddatas` */

DROP TABLE IF EXISTS `fielddatas`;

CREATE TABLE `fielddatas` (
  `Field_id` int(11) NOT NULL,
  `Code` varchar(10) NOT NULL DEFAULT '',
  `Name` varchar(255) NOT NULL,
  `Delimiter` varchar(5) DEFAULT NULL,
  `SortNo` int(11) DEFAULT '99',
  `Repeatable` bit(1) DEFAULT b'0',
  `IsShow` bit(1) DEFAULT b'1',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Field_id`,`Code`),
  KEY `fielddatas_delimiter` (`Delimiter`),
  KEY `fielddatas_createby` (`CreateBy`),
  KEY `fielddatas_updateby` (`UpdateBy`),
  KEY `fielddatas_fieldid` (`Field_id`),
  KEY `fielddatas_code` (`Code`),
  CONSTRAINT `fielddatas_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fielddatas_fieldid` FOREIGN KEY (`Field_id`) REFERENCES `fields` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fielddatas_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `fieldgroups` */

DROP TABLE IF EXISTS `fieldgroups`;

CREATE TABLE `fieldgroups` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fieldgroups_createby` (`CreateBy`),
  KEY `fieldgroups_updateby` (`UpdateBy`),
  CONSTRAINT `fieldgroups_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fieldgroups_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Table structure for table `fieldindicator1s` */

DROP TABLE IF EXISTS `fieldindicator1s`;

CREATE TABLE `fieldindicator1s` (
  `Field_id` int(11) NOT NULL,
  `Code` varchar(10) NOT NULL DEFAULT '',
  `Name` varchar(255) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Field_id`,`Code`),
  KEY `Field_id` (`Field_id`),
  KEY `fieldindicator1s_createby` (`CreateBy`),
  KEY `fieldindicator1s_updateby` (`UpdateBy`),
  CONSTRAINT `FKBC43AFA166DFF9B4` FOREIGN KEY (`Field_id`) REFERENCES `fields` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fieldindicator1s_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fieldindicator1s_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `fieldindicator2s` */

DROP TABLE IF EXISTS `fieldindicator2s`;

CREATE TABLE `fieldindicator2s` (
  `Field_id` int(11) NOT NULL,
  `Code` varchar(10) NOT NULL DEFAULT '',
  `Name` varchar(255) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Field_id`,`Code`),
  KEY `Field_id` (`Field_id`),
  KEY `fieldindicator2s_createby` (`CreateBy`),
  KEY `fieldindicator2s_updateby` (`UpdateBy`),
  CONSTRAINT `FKBC43AFA066DFF9B4` FOREIGN KEY (`Field_id`) REFERENCES `fields` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fieldindicator2s_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fieldindicator2s_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `fields` */

DROP TABLE IF EXISTS `fields`;

CREATE TABLE `fields` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Tag` varchar(3) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Fixed` bit(1) DEFAULT NULL,
  `Enabled` bit(1) DEFAULT NULL,
  `Length` int(11) DEFAULT NULL,
  `Repeatable` bit(1) DEFAULT NULL,
  `Mandatory` bit(1) DEFAULT NULL,
  `IsCustomable` bit(1) DEFAULT NULL,
  `Format_id` int(11) NOT NULL,
  `Group_id` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `DEFAULTSUBTAG` varchar(12) DEFAULT 'a',
  `ISSUBSERIAL` bit(1) DEFAULT b'0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UQ_Tag` (`Tag`,`Format_id`),
  KEY `Format_id` (`Format_id`),
  KEY `Group_id` (`Group_id`),
  KEY `fields_createby` (`CreateBy`),
  KEY `fields_updateby` (`UpdateBy`),
  CONSTRAINT `fields_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fields_fieldgroup` FOREIGN KEY (`Group_id`) REFERENCES `fieldgroups` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fields_format` FOREIGN KEY (`Format_id`) REFERENCES `formats` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fields_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=latin1;

/*Table structure for table `formats` */

DROP TABLE IF EXISTS `formats`;

CREATE TABLE `formats` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(10) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `formats_createby` (`CreateBy`),
  KEY `formats_updateby` (`UpdateBy`),
  CONSTRAINT `formats_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `formats_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Table structure for table `gammu` */

DROP TABLE IF EXISTS `gammu`;

CREATE TABLE `gammu` (
  `Version` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Table structure for table `groupguesses` */

DROP TABLE IF EXISTS `groupguesses`;

CREATE TABLE `groupguesses` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NamaKetua` varchar(255) NOT NULL,
  `NomerTelponKetua` varchar(20) DEFAULT NULL,
  `AsalInstansi` varchar(255) NOT NULL,
  `AlamatInstansi` varchar(255) NOT NULL,
  `CountPersonel` int(11) DEFAULT NULL,
  `CountPNS` int(11) DEFAULT NULL,
  `CountPSwasta` int(11) DEFAULT NULL,
  `CountPeneliti` int(11) DEFAULT NULL,
  `CountGuru` int(11) DEFAULT NULL,
  `CountDosen` int(11) DEFAULT NULL,
  `CountPensiunan` int(11) DEFAULT NULL,
  `CountTNI` int(11) DEFAULT NULL,
  `CountWiraswasta` int(11) DEFAULT NULL,
  `CountPelajar` int(11) DEFAULT NULL,
  `CountMahasiswa` int(11) DEFAULT NULL,
  `CountLainnya` int(11) DEFAULT NULL,
  `CountSD` int(11) DEFAULT NULL,
  `CountSMP` int(11) DEFAULT NULL,
  `CountSMA` int(11) DEFAULT NULL,
  `CountD1` int(11) DEFAULT NULL,
  `CountD2` int(11) DEFAULT NULL,
  `CountD3` int(11) DEFAULT NULL,
  `CountS1` int(11) DEFAULT NULL,
  `CountS2` int(11) DEFAULT NULL,
  `CountS3` int(11) DEFAULT NULL,
  `CountLaki` int(11) DEFAULT NULL,
  `CountPerempuan` int(11) DEFAULT NULL,
  `TujuanKunjungan_ID` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `LocationLoans_ID` int(11) DEFAULT NULL,
  `Location_ID` int(11) DEFAULT NULL,
  `TeleponInstansi` varchar(20) DEFAULT NULL,
  `EmailInstansi` varchar(255) DEFAULT NULL,
  `Information` varchar(255) DEFAULT NULL,
  `NoPengunjung` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `groupguesses_locations` (`Location_ID`),
  KEY `groupguesses_tujuankunjungan_fk` (`TujuanKunjungan_ID`),
  KEY `groupguesses_createby` (`CreateBy`),
  KEY `groupguesses_updateby` (`UpdateBy`),
  KEY `groupguesses_loclib_idx` (`LocationLoans_ID`),
  CONSTRAINT `groupguesses_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `groupguesses_locations` FOREIGN KEY (`Location_ID`) REFERENCES `locations` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `groupguesses_loclib` FOREIGN KEY (`LocationLoans_ID`) REFERENCES `location_library` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `groupguesses_tujuankunjungan_fk` FOREIGN KEY (`TujuanKunjungan_ID`) REFERENCES `tujuan_kunjungan` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `groupguesses_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `historydata` */

DROP TABLE IF EXISTS `historydata`;

CREATE TABLE `historydata` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Action` varchar(10) COLLATE latin1_general_ci NOT NULL,
  `TableName` varchar(45) COLLATE latin1_general_ci NOT NULL,
  `IDRef` varchar(45) COLLATE latin1_general_ci NOT NULL,
  `Note` text COLLATE latin1_general_ci,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `Member_id` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `historydata_createby` (`CreateBy`),
  KEY `historydata_updateby` (`UpdateBy`),
  KEY `historydata_IDX1` (`TableName`,`IDRef`,`Action`),
  KEY `historydata_IDX2` (`TableName`,`Action`,`CreateBy`,`CreateDate`),
  KEY `historydata_createdate` (`CreateDate`),
  KEY `historydata_member_idx` (`Member_id`),
  CONSTRAINT `historydata_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `historydata_member` FOREIGN KEY (`Member_id`) REFERENCES `members` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `historydata_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `holidays` */

DROP TABLE IF EXISTS `holidays`;

CREATE TABLE `holidays` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Dates` datetime NOT NULL,
  `Names` varchar(255) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `holidays_createby` (`CreateBy`),
  KEY `holidays_updateby` (`UpdateBy`),
  CONSTRAINT `holidays_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `holidays_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `inbox` */

DROP TABLE IF EXISTS `inbox`;

CREATE TABLE `inbox` (
  `UpdatedInDB` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ReceivingDateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Text` text NOT NULL,
  `SenderNumber` varchar(20) NOT NULL DEFAULT '',
  `Coding` enum('Default_No_Compression','Unicode_No_Compression','8bit','Default_Compression','Unicode_Compression') NOT NULL DEFAULT 'Default_No_Compression',
  `UDH` text NOT NULL,
  `SMSCNumber` varchar(20) NOT NULL DEFAULT '',
  `Class` int(11) NOT NULL DEFAULT '-1',
  `TextDecoded` text NOT NULL,
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `RecipientID` text NOT NULL,
  `Processed` enum('false','true') NOT NULL DEFAULT 'false',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Table structure for table `jenis_anggota` */

DROP TABLE IF EXISTS `jenis_anggota`;

CREATE TABLE `jenis_anggota` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jenisanggota` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `MasaBerlakuAnggota` int(11) DEFAULT '365',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `BiayaPendaftaran` decimal(10,0) DEFAULT '0',
  `BiayaPerpanjangan` decimal(10,0) DEFAULT '0',
  `UploadDokumenKeanggotaanOnline` bit(1) DEFAULT b'0',
  `MaxPinjamKoleksi` int(11) DEFAULT '1000',
  `MaxLoanDays` int(11) DEFAULT '0',
  `DendaType` varchar(45) COLLATE latin1_general_ci DEFAULT 'Konstan',
  `DendaTenorJumlah` double DEFAULT '0',
  `DendaTenorSatuan` varchar(45) COLLATE latin1_general_ci DEFAULT 'Hari',
  `DendaPerTenor` decimal(10,0) DEFAULT '0',
  `DendaTenorMultiply` int(11) DEFAULT '1',
  `SuspendMember` bit(1) DEFAULT b'0',
  `WarningLoanDueDay` int(11) DEFAULT '0',
  `SuspendType` varchar(45) COLLATE latin1_general_ci DEFAULT 'Konstan',
  `SuspendTenorJumlah` double DEFAULT '0',
  `SuspendTenorSatuan` varchar(45) COLLATE latin1_general_ci DEFAULT 'Hari',
  `DaySuspend` int(11) DEFAULT '0',
  `SuspendTenorMultiply` int(11) DEFAULT '1',
  `DayPerpanjang` int(11) DEFAULT '0',
  `CountPerpanjang` int(11) DEFAULT '0',
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jenis_anggota_createby` (`CreateBy`),
  KEY `jenis_anggota_updateby` (`UpdateBy`),
  KEY `jenis_anggota_kii` (`KIILastUploadDate`),
  KEY `jenis_anggota_createdate` (`CreateDate`),
  KEY `jenis_anggota_updatedate` (`UpdateDate`),
  CONSTRAINT `jenis_anggota_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `jenis_anggota_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `jenis_denda` */

DROP TABLE IF EXISTS `jenis_denda`;

CREATE TABLE `jenis_denda` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `jenis_denda_createby` (`CreateBy`),
  KEY `jenis_denda_updateby` (`UpdateBy`),
  CONSTRAINT `jenis_denda_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `jenis_denda_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Table structure for table `jenis_kelamin` */

DROP TABLE IF EXISTS `jenis_kelamin`;

CREATE TABLE `jenis_kelamin` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `jenis_kelamin_createby` (`CreateBy`),
  KEY `jenis_kelamin_updateby` (`UpdateBy`),
  CONSTRAINT `jenis_kelamin_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `jenis_kelamin_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Table structure for table `jenis_pelanggaran` */

DROP TABLE IF EXISTS `jenis_pelanggaran`;

CREATE TABLE `jenis_pelanggaran` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `JenisPelanggaran` varchar(50) NOT NULL,
  `Keterangan` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `jenis_pelanggaran_createby` (`CreateBy`),
  KEY `jenis_pelanggaran_updateby` (`UpdateBy`),
  CONSTRAINT `jenis_pelanggaran_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `jenis_pelanggaran_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Table structure for table `jenis_permohonan` */

DROP TABLE IF EXISTS `jenis_permohonan`;

CREATE TABLE `jenis_permohonan` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `jenis_permohonan_createby` (`CreateBy`),
  KEY `jenis_permohonan_updateby` (`UpdateBy`),
  CONSTRAINT `jenis_permohonan_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `jenis_permohonan_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Table structure for table `jenis_perpustakaan` */

DROP TABLE IF EXISTS `jenis_perpustakaan`;

CREATE TABLE `jenis_perpustakaan` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `jenis_perpustakaan_createby` (`CreateBy`),
  KEY `jenis_perpustakaan_updateby` (`UpdateBy`),
  CONSTRAINT `jenis_perpustakaan_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `jenis_perpustakaan_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Table structure for table `judul_koleksi` */

DROP TABLE IF EXISTS `judul_koleksi`;

CREATE TABLE `judul_koleksi` (
  `no` int(11) NOT NULL,
  `judul_pernyataan` varchar(255) NOT NULL,
  `ed_cet` varchar(100) DEFAULT NULL,
  `kota` varchar(100) DEFAULT NULL,
  `penerbit` varchar(255) DEFAULT NULL,
  `tahun` int(11) DEFAULT NULL,
  `no_induk` varchar(100) DEFAULT NULL,
  `no_class` varchar(50) DEFAULT NULL,
  `no_panggil` varchar(50) DEFAULT NULL,
  `pengarang` varchar(255) DEFAULT NULL,
  `kolasi` text,
  `catatan` varchar(255) DEFAULT NULL,
  `bibliografi` varchar(255) DEFAULT NULL,
  `indeks` varchar(255) DEFAULT NULL,
  `isbn` varchar(100) DEFAULT NULL,
  `subjek1` varchar(255) DEFAULT NULL,
  `subjek2` varchar(255) DEFAULT NULL,
  `subjek3` varchar(255) DEFAULT NULL,
  `subjek4` varchar(255) DEFAULT NULL,
  `tet1` varchar(255) DEFAULT NULL,
  `tet2` varchar(255) DEFAULT NULL,
  `tet3` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  KEY `judul_koleksi_createby` (`CreateBy`),
  KEY `judul_koleksi_updateby` (`UpdateBy`),
  CONSTRAINT `judul_koleksi_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `judul_koleksi_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `kabupaten` */

DROP TABLE IF EXISTS `kabupaten`;

CREATE TABLE `kabupaten` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `NamaKab` varchar(50) NOT NULL,
  `PropinsiID` int(5) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `kabupaten_nama` (`NamaKab`),
  KEY `kabupaten_propinsi` (`PropinsiID`),
  KEY `kabupaten_createby` (`CreateBy`),
  KEY `kabupaten_updateby` (`UpdateBy`),
  CONSTRAINT `kabupaten_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `kabupaten_propinsi` FOREIGN KEY (`PropinsiID`) REFERENCES `propinsi` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `kabupaten_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=499 DEFAULT CHARSET=latin1;

/*Table structure for table `kata_sandang` */

DROP TABLE IF EXISTS `kata_sandang`;

CREATE TABLE `kata_sandang` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Tag` varchar(3) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `JumlahKarakter` int(11) DEFAULT '1',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `kata_sandang_tag` (`Tag`),
  KEY `kata_sandang_name` (`Name`),
  KEY `kata_sandang_createby` (`CreateBy`),
  KEY `kata_sandang_updateby` (`UpdateBy`),
  CONSTRAINT `kata_sandang_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `kata_sandang_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Table structure for table `kelas_siswa` */

DROP TABLE IF EXISTS `kelas_siswa`;

CREATE TABLE `kelas_siswa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `namakelassiswa` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kelas_siswa_createby` (`CreateBy`),
  KEY `kelas_siswa_updateby` (`UpdateBy`),
  KEY `kelas_siswa_kii` (`KIILastUploadDate`),
  KEY `kelas_siswa_createdate` (`CreateDate`),
  KEY `kelas_siswa_updatedate` (`UpdateDate`),
  CONSTRAINT `kelas_siswa_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `kelas_siswa_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `kelompok_pelanggaran` */

DROP TABLE IF EXISTS `kelompok_pelanggaran`;

CREATE TABLE `kelompok_pelanggaran` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Jumlah` int(11) DEFAULT '0' COMMENT 'JumlahPelanggaran',
  `Warna` varchar(50) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `SuspendMember` tinyint(3) unsigned DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `kelompok_pelanggaran_createby` (`CreateBy`),
  KEY `kelompok_pelanggaran_updateby` (`UpdateBy`),
  CONSTRAINT `kelompok_pelanggaran_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `kelompok_pelanggaran_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `keranjang_anggota` */

DROP TABLE IF EXISTS `keranjang_anggota`;

CREATE TABLE `keranjang_anggota` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Member_id` double NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `keranjang_anggota_createby` (`CreateBy`),
  KEY `keranjang_anggota_updateby` (`UpdateBy`),
  KEY `keranjang_anggota_createdate` (`CreateDate`),
  KEY `keranjang_anggota_updatedate` (`UpdateDate`),
  KEY `keranjang_anggota_member_idx` (`Member_id`),
  CONSTRAINT `keranjang_anggota_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `keranjang_anggota_members` FOREIGN KEY (`Member_id`) REFERENCES `members` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `keranjang_anggota_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `keranjang_katalog` */

DROP TABLE IF EXISTS `keranjang_katalog`;

CREATE TABLE `keranjang_katalog` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Catalog_id` double NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `keranjang_katalog_createby` (`CreateBy`),
  KEY `keranjang_katalog_updateby` (`UpdateBy`),
  KEY `keranjang_katalog_createdate` (`CreateDate`),
  KEY `keranjang_katalog_updatedate` (`UpdateDate`),
  KEY `keranjang_katalog_catalog_idx` (`Catalog_id`),
  CONSTRAINT `keranjang_katalog_catalogs` FOREIGN KEY (`Catalog_id`) REFERENCES `catalogs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `keranjang_katalog_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `keranjang_katalog_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `keranjang_koleksi` */

DROP TABLE IF EXISTS `keranjang_koleksi`;

CREATE TABLE `keranjang_koleksi` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Collection_id` double NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `keranjang_koleksi_createby` (`CreateBy`),
  KEY `keranjang_koleksi_updateby` (`UpdateBy`),
  KEY `keranjang_koleksi_createdate` (`CreateDate`),
  KEY `keranjang_koleksi_updatedate` (`UpdateDate`),
  KEY `keranjang_koleksi_collection_idx` (`Collection_id`),
  CONSTRAINT `keranjang_koleksi_collection` FOREIGN KEY (`Collection_id`) REFERENCES `collections` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `keranjang_koleksi_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `keranjang_koleksi_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `kriteria_koleksi` */

DROP TABLE IF EXISTS `kriteria_koleksi`;

CREATE TABLE `kriteria_koleksi` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `jns_kriteria` varchar(255) NOT NULL,
  `catalog_id` double DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `alamat_image` varchar(500) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `PublishYear` varchar(25) DEFAULT NULL,
  `Jumlah` int(11) DEFAULT NULL,
  `worksheet_name` varchar(100) DEFAULT NULL,
  `isLKD` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `kriteria_koleksi_idx1` (`catalog_id`),
  KEY `kriteria_koleksi_createby_idx` (`CreateBy`),
  KEY `kriteria_koleksi_updateby_idx` (`UpdateBy`),
  CONSTRAINT `kriteria_koleksi_catalogby` FOREIGN KEY (`catalog_id`) REFERENCES `catalogs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `kriteria_koleksi_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `kriteria_koleksi_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `letter` */

DROP TABLE IF EXISTS `letter`;

CREATE TABLE `letter` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TYPE_OF_DELIVERY` varchar(21) DEFAULT NULL,
  `LETTER_DATE` date DEFAULT NULL,
  `LETTER_NUMBER` varchar(35) DEFAULT NULL,
  `ACCEPT_DATE` date DEFAULT NULL,
  `SENDER` varchar(155) DEFAULT NULL,
  `PHONE` int(11) DEFAULT NULL,
  `INTENDED_TO` varchar(155) DEFAULT NULL,
  `IS_PRINTED` int(4) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateTerminal` varchar(111) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateTerminal` varchar(111) DEFAULT NULL,
  `PUBLISHER_ID` int(11) DEFAULT NULL,
  `LETTER_NUMBER_UT` varchar(45) DEFAULT NULL,
  `IS_SENDEDEMAIL` int(4) DEFAULT NULL,
  `IS_NOTE` int(4) DEFAULT NULL,
  `LANG` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `(ID)deposit_ws` (`PUBLISHER_ID`),
  KEY `letter_createby` (`CreateBy`),
  KEY `letter_updateby` (`UpdateBy`),
  CONSTRAINT `(ID)deposit_ws` FOREIGN KEY (`PUBLISHER_ID`) REFERENCES `deposit_ws` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `letter_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `letter_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `letter_detail` */

DROP TABLE IF EXISTS `letter_detail`;

CREATE TABLE `letter_detail` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SUB_TYPE_COLLECTION` int(11) DEFAULT NULL,
  `TITLE` varchar(255) DEFAULT NULL,
  `QUANTITY` int(11) DEFAULT NULL,
  `COPY` int(11) DEFAULT NULL,
  `PRICE` varchar(100) DEFAULT NULL,
  `LETTER_ID` int(111) DEFAULT NULL,
  `COLLECTION_TYPE_ID` int(11) DEFAULT NULL,
  `REMARK` varchar(255) DEFAULT NULL,
  `AUTHOR` varchar(155) DEFAULT NULL,
  `PUBLISHER` varchar(50) DEFAULT NULL,
  `PUBLISHER_ADDRESS` varchar(255) DEFAULT NULL,
  `ISBN` varchar(25) DEFAULT NULL,
  `PUBLISH_YEAR` varchar(15) DEFAULT NULL,
  `PUBLISHER_CITY` varchar(25) DEFAULT NULL,
  `ISBN_STATUS` varchar(55) DEFAULT NULL,
  `KD_PENERBIT_DTL` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `(ID)letter` (`LETTER_ID`),
  KEY `(ID)collectiomedias` (`SUB_TYPE_COLLECTION`),
  CONSTRAINT `(ID)collectiomedias` FOREIGN KEY (`SUB_TYPE_COLLECTION`) REFERENCES `collectionmedias` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `(ID)letter` FOREIGN KEY (`LETTER_ID`) REFERENCES `letter` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `library` */

DROP TABLE IF EXISTS `library`;

CREATE TABLE `library` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(50) NOT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `PORT` varchar(10) DEFAULT NULL,
  `DATABASENAME` varchar(50) DEFAULT NULL,
  `RECORDSYNTAX` varchar(20) DEFAULT NULL,
  `FULLNAME` varchar(255) DEFAULT NULL,
  `PROTOCOL` varchar(45) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `library_createby` (`CreateBy`),
  KEY `library_updateby` (`UpdateBy`),
  CONSTRAINT `library_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `library_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Table structure for table `librarysearchcriteria` */

DROP TABLE IF EXISTS `librarysearchcriteria`;

CREATE TABLE `librarysearchcriteria` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `LIBRARYID` int(11) NOT NULL,
  `CRITERIANAME` varchar(50) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `librarysearchcriteria_library` (`LIBRARYID`),
  KEY `librarysearchcriteria_createby` (`CreateBy`),
  KEY `librarysearchcriteria_updateby` (`UpdateBy`),
  CONSTRAINT `librarysearchcriteria_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `librarysearchcriteria_library` FOREIGN KEY (`LIBRARYID`) REFERENCES `library` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `librarysearchcriteria_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

/*Table structure for table `location_library` */

DROP TABLE IF EXISTS `location_library`;

CREATE TABLE `location_library` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(50) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `location_library_createby` (`CreateBy`),
  KEY `location_library_updateby` (`UpdateBy`),
  KEY `location_library_kii` (`KIILastUploadDate`),
  KEY `location_library_createdate` (`CreateDate`),
  KEY `location_library_updatedate` (`UpdateDate`),
  CONSTRAINT `location_library_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `location_library_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Table structure for table `location_library_default` */

DROP TABLE IF EXISTS `location_library_default`;

CREATE TABLE `location_library_default` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Location_Library_id` int(11) DEFAULT NULL,
  `JenisAnggota_id` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTeminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `location_library_default_loc` (`Location_Library_id`),
  KEY `location_library_default_jenis_anggota` (`JenisAnggota_id`),
  KEY `location_library_default_createby` (`CreateBy`),
  KEY `location_library_default_updateby` (`UpdateBy`),
  CONSTRAINT `location_library_default_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `location_library_default_jenis_anggota` FOREIGN KEY (`JenisAnggota_id`) REFERENCES `jenis_anggota` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `location_library_default_loc` FOREIGN KEY (`Location_Library_id`) REFERENCES `location_library` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `location_library_default_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

/*Table structure for table `locations` */

DROP TABLE IF EXISTS `locations`;

CREATE TABLE `locations` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(20) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `ISPUSTELING` bit(1) DEFAULT b'0',
  `UrlLogo` varchar(100) DEFAULT NULL,
  `IsPrintBarcode` bit(1) DEFAULT b'0',
  `IsGenerateVisitorNumber` bit(1) DEFAULT b'0',
  `IsInformationSought` bit(1) DEFAULT b'0',
  `IsVisitsDestination` bit(1) DEFAULT b'0',
  `LocationLibrary_id` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `locations_createby` (`CreateBy`),
  KEY `locations_updateby` (`UpdateBy`),
  KEY `locations_kii` (`KIILastUploadDate`),
  KEY `locations_createdate` (`CreateDate`),
  KEY `locations_updatedate` (`UpdateDate`),
  KEY `locations_loclib_idx` (`LocationLibrary_id`),
  CONSTRAINT `locations_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `locations_loclib` FOREIGN KEY (`LocationLibrary_id`) REFERENCES `location_library` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `locations_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=473 DEFAULT CHARSET=latin1;

/*Table structure for table `lockers` */

DROP TABLE IF EXISTS `lockers`;

CREATE TABLE `lockers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `No_pinjaman` varchar(255) NOT NULL,
  `no_member` varchar(45) DEFAULT NULL,
  `no_identitas` varchar(50) DEFAULT NULL,
  `jenis_jaminan` varchar(20) DEFAULT NULL,
  `id_jamin_idt` int(11) DEFAULT NULL,
  `id_jamin_uang` int(11) DEFAULT NULL,
  `loker_id` int(11) DEFAULT NULL,
  `tanggal_pinjam` datetime DEFAULT NULL,
  `tanggal_kembali` datetime DEFAULT NULL,
  `id_pelanggaran_locker` int(11) DEFAULT NULL,
  `denda` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_lockers_master_loker_idx` (`loker_id`),
  KEY `lockers_createby_idx` (`CreateBy`),
  KEY `lockers_jenisidentitas_idx` (`id_jamin_idt`),
  KEY `lockers_jenisjaminan` (`jenis_jaminan`),
  KEY `lockers_noidentitas` (`no_identitas`),
  KEY `lockers_nopinjama` (`No_pinjaman`),
  KEY `lockers_pelanggaran_idx` (`id_pelanggaran_locker`),
  KEY `lockers_tglkembali` (`tanggal_kembali`),
  KEY `lockers_tglpinjam` (`tanggal_pinjam`),
  KEY `lockers_uangjaminan_idx` (`id_jamin_uang`),
  KEY `lockers_updateby_idx` (`UpdateBy`),
  CONSTRAINT `fk_lockers_master_loker` FOREIGN KEY (`loker_id`) REFERENCES `master_loker` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lockers_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `lockers_jenisidentitas` FOREIGN KEY (`id_jamin_idt`) REFERENCES `master_jenis_identitas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lockers_pelanggaran` FOREIGN KEY (`id_pelanggaran_locker`) REFERENCES `master_pelanggaran_locker` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lockers_uangjaminan` FOREIGN KEY (`id_jamin_uang`) REFERENCES `master_uang_jaminan` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lockers_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `logsdownload` */

DROP TABLE IF EXISTS `logsdownload`;

CREATE TABLE `logsdownload` (
  `id` bigint(30) NOT NULL AUTO_INCREMENT,
  `User_id` varchar(50) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `catalogfilesID` int(11) DEFAULT NULL,
  `isLKD` tinyint(1) DEFAULT '0',
  `waktu` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_logsDownload_1_idx` (`User_id`),
  KEY `fk_logsDownload_catalogfiles_idx` (`catalogfilesID`),
  CONSTRAINT `fk_logsDownload_catalogfiles` FOREIGN KEY (`catalogfilesID`) REFERENCES `catalogfiles` (`ID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `fk_logsDownload_userid` FOREIGN KEY (`User_id`) REFERENCES `members` (`MemberNo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `logsdownload_article` */

DROP TABLE IF EXISTS `logsdownload_article`;

CREATE TABLE `logsdownload_article` (
  `id` bigint(30) NOT NULL AUTO_INCREMENT,
  `User_id` varchar(50) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `articlefilesID` int(11) DEFAULT NULL,
  `waktu` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_logsDownload_u_idx` (`User_id`),
  KEY `fk_logsDownload_articlefiles_idx` (`articlefilesID`),
  CONSTRAINT `fk_logsDownload_articlefiles` FOREIGN KEY (`articlefilesID`) REFERENCES `serial_articlefiles` (`ID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `fk_logsDownload_memberid` FOREIGN KEY (`User_id`) REFERENCES `members` (`MemberNo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `mailserver` */

DROP TABLE IF EXISTS `mailserver`;

CREATE TABLE `mailserver` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Modul` varchar(50) NOT NULL,
  `Host` varchar(50) NOT NULL,
  `Port` int(11) NOT NULL,
  `CredentialMail` varchar(50) NOT NULL,
  `CredentialPassword` varchar(50) NOT NULL,
  `EnableSsl` bit(1) DEFAULT b'1',
  `MailFrom` varchar(50) NOT NULL,
  `MailDisplayName` varchar(50) NOT NULL,
  `IsActive` bit(1) DEFAULT b'1',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `mailserver_createby` (`CreateBy`),
  KEY `mailserver_updateby` (`UpdateBy`),
  CONSTRAINT `mailserver_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `mailserver_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `masa_berlaku_anggota` */

DROP TABLE IF EXISTS `masa_berlaku_anggota`;

CREATE TABLE `masa_berlaku_anggota` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jumlah` int(20) NOT NULL,
  `satuan` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `masa_berlaku_anggota_createby` (`CreateBy`),
  KEY `masa_berlaku_anggota_updateby` (`UpdateBy`),
  KEY `masa_berlaku_anggota_kii` (`KIILastUploadDate`),
  KEY `masa_berlaku_anggota_createdate` (`CreateDate`),
  KEY `masa_berlaku_anggota_updatedate` (`UpdateDate`),
  CONSTRAINT `masa_berlaku_anggota_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `masa_berlaku_anggota_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `master_counter_barcode` */

DROP TABLE IF EXISTS `master_counter_barcode`;

CREATE TABLE `master_counter_barcode` (
  `tahun` year(4) DEFAULT NULL,
  `value` int(111) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `master_djkn` */

DROP TABLE IF EXISTS `master_djkn`;

CREATE TABLE `master_djkn` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Option_id` varchar(20) DEFAULT NULL,
  `Option_Name` varchar(100) DEFAULT NULL,
  `Value` varchar(100) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(45) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `master_djkn_createby_idx` (`CreateBy`),
  KEY `master_djkn_updateby_idx` (`UpdateBy`),
  KEY `master_djkn_option` (`Option_id`),
  CONSTRAINT `master_djkn_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `master_djkn_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `master_edisi_serial` */

DROP TABLE IF EXISTS `master_edisi_serial`;

CREATE TABLE `master_edisi_serial` (
  `id` double NOT NULL AUTO_INCREMENT,
  `tgl_edisi_serial` date DEFAULT NULL,
  `no_edisi_serial` varchar(111) DEFAULT NULL,
  `Catalog_id` double DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique` (`no_edisi_serial`),
  KEY `edisiSerial_catalog` (`Catalog_id`),
  CONSTRAINT `edisiSerial_catalog` FOREIGN KEY (`Catalog_id`) REFERENCES `catalogs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `master_fakultas` */

DROP TABLE IF EXISTS `master_fakultas`;

CREATE TABLE `master_fakultas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nama` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `master_fakultas_createby` (`CreateBy`),
  KEY `master_fakultas_updateby` (`UpdateBy`),
  KEY `master_fakultas_createdate` (`CreateDate`),
  KEY `master_fakultas_updatedate` (`UpdateDate`),
  KEY `master_fakultas_kii` (`KIILastUploadDate`),
  CONSTRAINT `master_fakultas_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `master_fakultas_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `master_jam_buka` */

DROP TABLE IF EXISTS `master_jam_buka`;

CREATE TABLE `master_jam_buka` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `hari` varchar(50) DEFAULT '0',
  `jam_buka` time DEFAULT '00:00:00',
  `jam_tutup` time DEFAULT '00:00:00',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Table structure for table `master_jenis_identitas` */

DROP TABLE IF EXISTS `master_jenis_identitas`;

CREATE TABLE `master_jenis_identitas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nama` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `IsNIK` bit(1) DEFAULT b'0',
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `master_jenis_identitas_createby` (`CreateBy`),
  KEY `master_jenis_identitas_updateby` (`UpdateBy`),
  CONSTRAINT `master_jenis_identitas_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `master_jenis_identitas_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `master_jenjang_pendidikan` */

DROP TABLE IF EXISTS `master_jenjang_pendidikan`;

CREATE TABLE `master_jenjang_pendidikan` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `jenjang_pendidikan` varchar(255) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` date DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `masjer_jenjang_pendidikan_create_by` (`CreateBy`),
  KEY `masjer_jenjang_pendidikan_create_date` (`CreateDate`),
  KEY `masjer_jenjang_pendidikan_update_by` (`UpdateBy`),
  KEY `masjer_jenjang_pendidikan_update_date` (`UpdateDate`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `master_jurusan` */

DROP TABLE IF EXISTS `master_jurusan`;

CREATE TABLE `master_jurusan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_fakultas` int(11) DEFAULT NULL,
  `Nama` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `master_jurusan_fakultas` (`id_fakultas`),
  KEY `master_jurusan_createby` (`CreateBy`),
  KEY `master_jurusan_updateby` (`UpdateBy`),
  KEY `master_jurusan_kii` (`KIILastUploadDate`),
  KEY `master_jurusan_createdate` (`CreateDate`),
  KEY `master_jurusan_updatedate` (`UpdateDate`),
  CONSTRAINT `master_jurusan_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `master_jurusan_fakultas` FOREIGN KEY (`id_fakultas`) REFERENCES `master_fakultas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `master_jurusan_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `master_kelas_besar` */

DROP TABLE IF EXISTS `master_kelas_besar`;

CREATE TABLE `master_kelas_besar` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `kdKelas` varchar(3) NOT NULL,
  `namakelas` varchar(255) NOT NULL,
  `warna` varchar(50) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `master_kelas_besar_createby` (`CreateBy`),
  KEY `master_kelas_besar_updateby` (`UpdateBy`),
  CONSTRAINT `master_kelas_besar_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `master_kelas_besar_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Table structure for table `master_kependudukan` */

DROP TABLE IF EXISTS `master_kependudukan`;

CREATE TABLE `master_kependudukan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomorkk` varchar(50) DEFAULT NULL,
  `nik` varchar(50) NOT NULL,
  `namalengkap` varchar(100) NOT NULL,
  `nama_ibu` varchar(100) DEFAULT NULL,
  `al1` varchar(255) DEFAULT NULL,
  `rt` varchar(50) DEFAULT NULL,
  `rw` varchar(50) DEFAULT NULL,
  `kodekec` varchar(50) DEFAULT NULL,
  `kodekel` varchar(50) DEFAULT NULL,
  `nama_kec` varchar(100) DEFAULT NULL,
  `nama_kel` varchar(100) DEFAULT NULL,
  `nama_kab` varchar(100) DEFAULT NULL,
  `nama_prov` varchar(100) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `lhrtempat` varchar(50) DEFAULT NULL,
  `lhrtanggal` varchar(50) DEFAULT NULL,
  `ttl` varchar(50) DEFAULT NULL,
  `umur` varchar(50) DEFAULT NULL,
  `jk` int(11) DEFAULT NULL,
  `jenis` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `sts` varchar(50) DEFAULT NULL COMMENT 'Status Kawin',
  `hub` varchar(50) DEFAULT NULL,
  `agama` int(50) DEFAULT NULL,
  `agm` varchar(50) DEFAULT NULL,
  `pendidikan` varchar(50) DEFAULT NULL,
  `pekerjaan` varchar(50) DEFAULT NULL,
  `klain_fisik` varchar(50) DEFAULT NULL,
  `aktalhr` varchar(50) DEFAULT NULL,
  `aktakawin` varchar(50) DEFAULT NULL,
  `aktacerai` varchar(50) DEFAULT NULL,
  `nocacat` varchar(50) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `master_kependudukan_createby` (`CreateBy`),
  KEY `master_kependudukan_updateby` (`UpdateBy`),
  KEY `master_kependudukan_nik` (`nik`),
  CONSTRAINT `master_kependudukan_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `master_kependudukan_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

/*Table structure for table `master_loker` */

DROP TABLE IF EXISTS `master_loker`;

CREATE TABLE `master_loker` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `No` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `locations_id` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `master_loker_createby_idx` (`CreateBy`),
  KEY `master_loker_location_idx` (`locations_id`),
  KEY `master_loker_updateby_idx` (`UpdateBy`),
  CONSTRAINT `master_loker_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `master_loker_locations` FOREIGN KEY (`locations_id`) REFERENCES `locations` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `master_loker_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Table structure for table `master_pekerjaan` */

DROP TABLE IF EXISTS `master_pekerjaan`;

CREATE TABLE `master_pekerjaan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Pekerjaan` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `master_pekerjaan_createby` (`CreateBy`),
  KEY `master_pekerjaan_updateby` (`UpdateBy`),
  CONSTRAINT `master_pekerjaan_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `master_pekerjaan_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `master_pelanggaran_locker` */

DROP TABLE IF EXISTS `master_pelanggaran_locker`;

CREATE TABLE `master_pelanggaran_locker` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `jenis_pelanggaran` varchar(50) DEFAULT NULL,
  `denda` decimal(10,0) DEFAULT NULL,
  `deskripsi` text,
  `CreateBy` varchar(100) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` varchar(100) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Table structure for table `master_pendidikan` */

DROP TABLE IF EXISTS `master_pendidikan`;

CREATE TABLE `master_pendidikan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nama` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `master_pendidikan_createby` (`CreateBy`),
  KEY `master_pendidikan_updateby` (`UpdateBy`),
  CONSTRAINT `master_pendidikan_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `master_pendidikan_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `master_program_studi` */

DROP TABLE IF EXISTS `master_program_studi`;

CREATE TABLE `master_program_studi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_jurusan` int(11) DEFAULT NULL,
  `Nama` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `master_program_studi_createby` (`CreateBy`),
  KEY `master_program_studi_updateby` (`UpdateBy`),
  KEY `master_program_studi_kii` (`KIILastUploadDate`),
  KEY `master_program_studi_jurusan_idx` (`id_jurusan`),
  CONSTRAINT `master_program_studi_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `master_program_studi_jurusan` FOREIGN KEY (`id_jurusan`) REFERENCES `master_jurusan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `master_program_studi_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `master_range_umur` */

DROP TABLE IF EXISTS `master_range_umur`;

CREATE TABLE `master_range_umur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `umur1` int(11) NOT NULL,
  `umur2` int(11) NOT NULL,
  `Keterangan` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `NoUrut` int(11) DEFAULT '99',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `master_range_umur_createby` (`CreateBy`),
  KEY `master_range_umur_updateby` (`UpdateBy`),
  CONSTRAINT `master_range_umur_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `master_range_umur_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `master_status_perkawinan` */

DROP TABLE IF EXISTS `master_status_perkawinan`;

CREATE TABLE `master_status_perkawinan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nama` varchar(30) COLLATE latin1_general_ci NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `master_status_perkawinan_createby` (`CreateBy`),
  KEY `master_status_perkawinan_updateby` (`UpdateBy`),
  CONSTRAINT `master_status_perkawinan_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `master_status_perkawinan_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `master_uang_jaminan` */

DROP TABLE IF EXISTS `master_uang_jaminan`;

CREATE TABLE `master_uang_jaminan` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `No` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `CreateBy` varchar(100) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` varchar(100) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `member_fields` */

DROP TABLE IF EXISTS `member_fields`;

CREATE TABLE `member_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `mandatory` bit(1) DEFAULT b'0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `member_fields_mandatory` (`mandatory`),
  KEY `member_fields_createby` (`CreateBy`),
  KEY `member_fields_updateby` (`UpdateBy`),
  CONSTRAINT `member_fields_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `member_fields_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;

/*Table structure for table `member_perpanjangan` */

DROP TABLE IF EXISTS `member_perpanjangan`;

CREATE TABLE `member_perpanjangan` (
  `ID` double NOT NULL AUTO_INCREMENT,
  `Member_id` double DEFAULT NULL,
  `Tanggal` datetime NOT NULL,
  `Biaya` decimal(10,0) DEFAULT '0',
  `IsLunas` bit(1) DEFAULT b'0',
  `Keterangan` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `member_perpanjangan_member` (`Member_id`),
  KEY `member_perpanjangan_createby` (`CreateBy`),
  KEY `member_perpanjangan_updateby` (`UpdateBy`),
  KEY `member_perpanjangan_createdate` (`CreateDate`),
  KEY `member_perpanjangan_tanggal` (`Tanggal`),
  CONSTRAINT `member_perpanjangan_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `member_perpanjangan_member` FOREIGN KEY (`Member_id`) REFERENCES `members` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `member_perpanjangan_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `memberguesses` */

DROP TABLE IF EXISTS `memberguesses`;

CREATE TABLE `memberguesses` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NoAnggota` varchar(50) DEFAULT NULL,
  `Nama` varchar(100) NOT NULL,
  `Status_id` int(11) DEFAULT NULL,
  `MasaBerlaku_id` int(11) DEFAULT NULL,
  `Profesi_id` int(11) DEFAULT NULL,
  `PendidikanTerakhir_id` int(11) DEFAULT NULL,
  `JenisKelamin_id` int(11) DEFAULT NULL,
  `Alamat` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `Deskripsi` varchar(255) DEFAULT NULL,
  `LOCATIONLOANS_ID` int(11) DEFAULT NULL,
  `Location_Id` int(11) DEFAULT NULL,
  `TujuanKunjungan_Id` int(11) DEFAULT NULL,
  `Information` varchar(255) DEFAULT NULL,
  `NoPengunjung` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `memberguesses_locationloans` (`LOCATIONLOANS_ID`),
  KEY `memberguesses_location_id` (`Location_Id`),
  KEY `memberguesses_TujuanKunjungan_Id` (`TujuanKunjungan_Id`),
  KEY `Membergueeses_NoPengunjung` (`NoPengunjung`),
  KEY `memberguesses_status` (`Status_id`),
  KEY `memberguesses_pekerjaan` (`Profesi_id`),
  KEY `memberguesses_pendidikan` (`PendidikanTerakhir_id`),
  KEY `memberguesses_jeniskelamin` (`JenisKelamin_id`),
  KEY `memberguesses_masaberlaku` (`MasaBerlaku_id`),
  KEY `memberguesses_createby` (`CreateBy`),
  KEY `memberguesses_updateby` (`UpdateBy`),
  KEY `memberguesses_nama` (`Nama`),
  KEY `memberguesses_createdate` (`CreateDate`),
  KEY `memberguesses_noanggota` (`NoAnggota`),
  CONSTRAINT `memberguesses_TujuanKunjungan_Id` FOREIGN KEY (`TujuanKunjungan_Id`) REFERENCES `tujuan_kunjungan` (`ID`),
  CONSTRAINT `memberguesses_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `memberguesses_jeniskelamin` FOREIGN KEY (`JenisKelamin_id`) REFERENCES `jenis_kelamin` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `memberguesses_location_id` FOREIGN KEY (`Location_Id`) REFERENCES `locations` (`ID`),
  CONSTRAINT `memberguesses_locationloans` FOREIGN KEY (`LOCATIONLOANS_ID`) REFERENCES `location_library` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `memberguesses_masaberlaku` FOREIGN KEY (`MasaBerlaku_id`) REFERENCES `masa_berlaku_anggota` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `memberguesses_pekerjaan` FOREIGN KEY (`Profesi_id`) REFERENCES `master_pekerjaan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `memberguesses_pendidikan` FOREIGN KEY (`PendidikanTerakhir_id`) REFERENCES `master_pendidikan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `memberguesses_status` FOREIGN KEY (`Status_id`) REFERENCES `status_anggota` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `memberguesses_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `memberloanauthorizecategory` */

DROP TABLE IF EXISTS `memberloanauthorizecategory`;

CREATE TABLE `memberloanauthorizecategory` (
  `DataID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Member_id` double NOT NULL,
  `CategoryLoan_id` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`DataID`),
  KEY `CategoryLoan_id` (`CategoryLoan_id`),
  KEY `Member_id` (`Member_id`),
  KEY `memberloanauthorizecategory_createby` (`CreateBy`),
  KEY `memberloanauthorizecategory_updateby` (`UpdateBy`),
  CONSTRAINT `FKCB16B2E75DD8E7A8` FOREIGN KEY (`Member_id`) REFERENCES `members` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKCB16B2E7A5EDFBF6` FOREIGN KEY (`CategoryLoan_id`) REFERENCES `collectioncategorys` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `memberloanauthorizecategory_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `memberloanauthorizecategory_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `memberloanauthorizelocation` */

DROP TABLE IF EXISTS `memberloanauthorizelocation`;

CREATE TABLE `memberloanauthorizelocation` (
  `DataID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Member_id` double NOT NULL,
  `LocationLoan_id` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`DataID`),
  KEY `memberloanauthorizelocation_createby` (`CreateBy`),
  KEY `memberloanauthorizelocation_updateby` (`UpdateBy`),
  KEY `memberloanauthorizelocation_loc_idx` (`LocationLoan_id`),
  KEY `memberloanauthorizelocation_member_idx` (`Member_id`),
  CONSTRAINT `memberloanauthorizelocation_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `memberloanauthorizelocation_loc` FOREIGN KEY (`LocationLoan_id`) REFERENCES `location_library` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `memberloanauthorizelocation_member` FOREIGN KEY (`Member_id`) REFERENCES `members` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `memberloanauthorizelocation_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `memberrules` */

DROP TABLE IF EXISTS `memberrules`;

CREATE TABLE `memberrules` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NameCategory` varchar(50) NOT NULL,
  `Contents` text,
  `isPublish` bit(1) DEFAULT b'1',
  `SortNum` int(11) DEFAULT '0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `memberrules_createby` (`CreateBy`),
  KEY `memberrules_updateby` (`UpdateBy`),
  CONSTRAINT `memberrules_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `memberrules_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Table structure for table `members` */

DROP TABLE IF EXISTS `members`;

CREATE TABLE `members` (
  `ID` double NOT NULL AUTO_INCREMENT,
  `MemberNo` varchar(50) NOT NULL,
  `Fullname` varchar(255) NOT NULL,
  `PlaceOfBirth` varchar(255) DEFAULT NULL,
  `DateOfBirth` datetime DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `AddressNow` varchar(255) DEFAULT NULL,
  `Phone` varchar(100) DEFAULT NULL,
  `InstitutionName` varchar(255) DEFAULT NULL,
  `InstitutionAddress` varchar(255) DEFAULT NULL,
  `InstitutionPhone` varchar(255) DEFAULT NULL,
  `IdentityType_id` int(11) DEFAULT NULL,
  `IdentityNo` varchar(100) DEFAULT NULL,
  `EducationLevel_id` int(11) DEFAULT NULL,
  `Sex_id` int(11) DEFAULT NULL,
  `MaritalStatus_id` int(11) DEFAULT NULL,
  `Job_id` int(11) DEFAULT NULL,
  `RegisterDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `MotherMaidenName` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `JenisPermohonan_id` int(11) DEFAULT NULL,
  `JenisAnggota_id` int(11) DEFAULT NULL,
  `StatusAnggota_id` int(11) DEFAULT NULL,
  `LoanReturnLateCount` int(11) DEFAULT '0',
  `Branch_id` int(11) DEFAULT NULL,
  `PhotoUrl` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `NoHp` varchar(100) DEFAULT NULL,
  `NamaDarurat` varchar(100) DEFAULT NULL,
  `TelpDarurat` varchar(100) DEFAULT NULL,
  `AlamatDarurat` varchar(255) DEFAULT NULL,
  `StatusHubunganDarurat` varchar(100) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `Province` varchar(255) DEFAULT NULL,
  `CityNow` varchar(255) DEFAULT NULL,
  `ProvinceNow` varchar(255) DEFAULT NULL,
  `Kecamatan` varchar(100) DEFAULT NULL,
  `Kelurahan` varchar(100) DEFAULT NULL,
  `RT` varchar(50) DEFAULT NULL,
  `RW` varchar(50) DEFAULT NULL,
  `KecamatanNow` varchar(100) DEFAULT NULL,
  `KelurahanNow` varchar(100) DEFAULT NULL,
  `RTNow` varchar(50) DEFAULT NULL,
  `RWNow` varchar(50) DEFAULT NULL,
  `Kelas_id` int(11) DEFAULT NULL,
  `TahunAjaran` varchar(50) DEFAULT NULL,
  `Agama_id` int(11) DEFAULT NULL,
  `Fakultas_id` int(11) DEFAULT NULL,
  `Jurusan_id` int(11) DEFAULT NULL,
  `ProgramStudi_id` int(11) DEFAULT NULL,
  `JenjangPendidikan_id` int(11) DEFAULT NULL,
  `UnitKerja_id` int(11) DEFAULT NULL,
  `KeteranganLain` varchar(255) DEFAULT NULL,
  `IsLunasBiayaPendaftaran` bit(1) DEFAULT b'0',
  `BiayaPendaftaran` decimal(10,0) DEFAULT '0',
  `TanggalBebasPustaka` datetime DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Branch_id` (`Branch_id`),
  KEY `MemberNo` (`MemberNo`),
  KEY `member_job` (`Job_id`),
  KEY `member_sex` (`Sex_id`),
  KEY `member_agama` (`Agama_id`),
  KEY `member_unit_kerja` (`UnitKerja_id`),
  KEY `members_status_perkawinan` (`MaritalStatus_id`),
  KEY `members_jenispermohonan` (`JenisPermohonan_id`),
  KEY `members_statusanggota` (`StatusAnggota_id`),
  KEY `members_education` (`EducationLevel_id`),
  KEY `members_jenis_anggota` (`JenisAnggota_id`),
  KEY `members_identitytype` (`IdentityType_id`),
  KEY `members_kelassiswa` (`Kelas_id`),
  KEY `members_fakultas` (`Fakultas_id`),
  KEY `members_jurusan` (`Jurusan_id`),
  KEY `members_createby` (`CreateBy`),
  KEY `members_updateby` (`UpdateBy`),
  KEY `members_dateofbirth` (`DateOfBirth`),
  KEY `members_createdate` (`CreateDate`),
  KEY `members_updatedate` (`UpdateDate`),
  KEY `members_kii` (`KIILastUploadDate`),
  KEY `members_registerdate` (`RegisterDate`),
  KEY `members_programstudi_idx` (`ProgramStudi_id`),
  KEY `members_jenjang_pendidikan` (`JenjangPendidikan_id`),
  CONSTRAINT `FK418999036ADC8006` FOREIGN KEY (`Branch_id`) REFERENCES `branchs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `member_agama` FOREIGN KEY (`Agama_id`) REFERENCES `agama` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `member_job` FOREIGN KEY (`Job_id`) REFERENCES `master_pekerjaan` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `member_sex` FOREIGN KEY (`Sex_id`) REFERENCES `jenis_kelamin` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `member_unit_kerja` FOREIGN KEY (`UnitKerja_id`) REFERENCES `departments` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `members_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `members_education` FOREIGN KEY (`EducationLevel_id`) REFERENCES `master_pendidikan` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `members_fakultas` FOREIGN KEY (`Fakultas_id`) REFERENCES `master_fakultas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `members_identitytype` FOREIGN KEY (`IdentityType_id`) REFERENCES `master_jenis_identitas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `members_jenis_anggota` FOREIGN KEY (`JenisAnggota_id`) REFERENCES `jenis_anggota` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `members_jenispermohonan` FOREIGN KEY (`JenisPermohonan_id`) REFERENCES `jenis_permohonan` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `members_jenjang_pendidikan` FOREIGN KEY (`JenjangPendidikan_id`) REFERENCES `master_jenjang_pendidikan` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `members_jurusan` FOREIGN KEY (`Jurusan_id`) REFERENCES `master_jurusan` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `members_kelassiswa` FOREIGN KEY (`Kelas_id`) REFERENCES `kelas_siswa` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `members_programstudi` FOREIGN KEY (`ProgramStudi_id`) REFERENCES `master_program_studi` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `members_status_perkawinan` FOREIGN KEY (`MaritalStatus_id`) REFERENCES `master_status_perkawinan` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `members_statusanggota` FOREIGN KEY (`StatusAnggota_id`) REFERENCES `status_anggota` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `members_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `members_form` */

DROP TABLE IF EXISTS `members_form`;

CREATE TABLE `members_form` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Member_Field_id` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `Jenis_Perpustakaan_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `members_form_field` (`Member_Field_id`),
  KEY `members_form_perpus` (`Jenis_Perpustakaan_id`),
  KEY `members_form_createby` (`CreateBy`),
  KEY `members_form_updateby` (`UpdateBy`),
  CONSTRAINT `members_form_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `members_form_field` FOREIGN KEY (`Member_Field_id`) REFERENCES `member_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_form_perpus` FOREIGN KEY (`Jenis_Perpustakaan_id`) REFERENCES `jenis_perpustakaan` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_form_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=953 DEFAULT CHARSET=latin1;

/*Table structure for table `members_form_list` */

DROP TABLE IF EXISTS `members_form_list`;

CREATE TABLE `members_form_list` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Member_Field_id` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `Jenis_Perpustakaan_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `members_form_list_field` (`Member_Field_id`),
  KEY `members_form_list_perpus` (`Jenis_Perpustakaan_id`),
  KEY `members_form_list_createby` (`CreateBy`),
  KEY `members_form_list_updateby` (`UpdateBy`),
  CONSTRAINT `members_form_list_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `members_form_list_field` FOREIGN KEY (`Member_Field_id`) REFERENCES `member_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_form_list_perpus` FOREIGN KEY (`Jenis_Perpustakaan_id`) REFERENCES `jenis_perpustakaan` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_form_list_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=latin1;

/*Table structure for table `members_info_form` */

DROP TABLE IF EXISTS `members_info_form`;

CREATE TABLE `members_info_form` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Member_Field_id` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `Jenis_Perpustakaan_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `members_info_form_field` (`Member_Field_id`),
  KEY `members_info_form_perpus` (`Jenis_Perpustakaan_id`),
  KEY `members_info_form_createby` (`CreateBy`),
  KEY `members_info_form_updateby` (`UpdateBy`),
  CONSTRAINT `members_info_form_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `members_info_form_field` FOREIGN KEY (`Member_Field_id`) REFERENCES `member_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_info_form_perpus` FOREIGN KEY (`Jenis_Perpustakaan_id`) REFERENCES `jenis_perpustakaan` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_info_form_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=latin1;

/*Table structure for table `members_loan_form` */

DROP TABLE IF EXISTS `members_loan_form`;

CREATE TABLE `members_loan_form` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Member_Field_id` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `Jenis_Perpustakaan_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `members_loan_form_field` (`Member_Field_id`),
  KEY `members_loan_form_perpus` (`Jenis_Perpustakaan_id`),
  KEY `members_loan_form_createby` (`CreateBy`),
  KEY `members_loan_form_updateby` (`UpdateBy`),
  CONSTRAINT `members_loan_form_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `members_loan_form_field` FOREIGN KEY (`Member_Field_id`) REFERENCES `member_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_loan_form_perpus` FOREIGN KEY (`Jenis_Perpustakaan_id`) REFERENCES `jenis_perpustakaan` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_loan_form_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=latin1;

/*Table structure for table `members_loanreturn_form` */

DROP TABLE IF EXISTS `members_loanreturn_form`;

CREATE TABLE `members_loanreturn_form` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Member_Field_id` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `Jenis_Perpustakaan_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `members_loanreturn_form_field` (`Member_Field_id`),
  KEY `members_loanreturn_form_perpus` (`Jenis_Perpustakaan_id`),
  KEY `members_loanreturn_form_createby` (`CreateBy`),
  KEY `members_loanreturn_form_updateby` (`UpdateBy`),
  CONSTRAINT `members_loanreturn_form_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `members_loanreturn_form_field` FOREIGN KEY (`Member_Field_id`) REFERENCES `member_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_loanreturn_form_perpus` FOREIGN KEY (`Jenis_Perpustakaan_id`) REFERENCES `jenis_perpustakaan` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_loanreturn_form_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;

/*Table structure for table `members_online_form` */

DROP TABLE IF EXISTS `members_online_form`;

CREATE TABLE `members_online_form` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Member_Field_id` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `Jenis_Perpustakaan_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `members_online_form_field` (`Member_Field_id`),
  KEY `members_online_form_perpus` (`Jenis_Perpustakaan_id`),
  KEY `members_online_form_createby` (`CreateBy`),
  KEY `members_online_form_updateby` (`UpdateBy`),
  CONSTRAINT `members_online_form_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `members_online_form_field` FOREIGN KEY (`Member_Field_id`) REFERENCES `member_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_online_form_perpus` FOREIGN KEY (`Jenis_Perpustakaan_id`) REFERENCES `jenis_perpustakaan` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_online_form_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=520 DEFAULT CHARSET=latin1;

/*Table structure for table `members_online_form_edit` */

DROP TABLE IF EXISTS `members_online_form_edit`;

CREATE TABLE `members_online_form_edit` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Member_Field_id` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `Jenis_Perpustakaan_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `members_online_form_edit_field` (`Member_Field_id`),
  KEY `members_online_form_edit_perpus` (`Jenis_Perpustakaan_id`),
  KEY `members_online_form_edit_createby` (`CreateBy`),
  KEY `members_online_form_edit_updateby` (`UpdateBy`),
  CONSTRAINT `members_online_form_edit_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `members_online_form_edit_field` FOREIGN KEY (`Member_Field_id`) REFERENCES `member_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_online_form_edit_perpus` FOREIGN KEY (`Jenis_Perpustakaan_id`) REFERENCES `jenis_perpustakaan` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_online_form_edit_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=latin1;

/*Table structure for table `membersonline` */

DROP TABLE IF EXISTS `membersonline`;

CREATE TABLE `membersonline` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `NoAnggota` varchar(50) DEFAULT NULL,
  `NickName` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `BranchId` int(11) DEFAULT NULL,
  `LocationLoanId` int(11) DEFAULT NULL,
  `Status` varchar(100) DEFAULT NULL,
  `Activation_Code` varchar(100) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `auth_key` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `BranchId` (`BranchId`),
  KEY `LocationLoanId` (`LocationLoanId`),
  KEY `NoAnggota` (`NoAnggota`),
  KEY `membersonline_createby` (`CreateBy`),
  KEY `membersonline_updateby` (`UpdateBy`),
  CONSTRAINT `FK_branch` FOREIGN KEY (`BranchId`) REFERENCES `branchs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_locationloan` FOREIGN KEY (`LocationLoanId`) REFERENCES `location_library` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `membersonline_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `membersonline_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `menu` */

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `parent` int(11) DEFAULT NULL,
  `route` varchar(256) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `data` text,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent` (`parent`),
  KEY `menu_createby` (`CreateBy`),
  KEY `menu_updateby` (`UpdateBy`),
  CONSTRAINT `menu_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `menu` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `menu_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8;

/*Table structure for table `migration` */

DROP TABLE IF EXISTS `migration`;

CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`version`),
  KEY `migration_createby` (`CreateBy`),
  KEY `migration_updateby` (`UpdateBy`),
  CONSTRAINT `migration_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `migration_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `modelhistory` */

DROP TABLE IF EXISTS `modelhistory`;

CREATE TABLE `modelhistory` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `table` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `field_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `field_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `old_value` text COLLATE utf8_unicode_ci,
  `new_value` text COLLATE utf8_unicode_ci,
  `type` smallint(6) NOT NULL,
  `user_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx-table` (`table`),
  KEY `idx-field_name` (`field_name`),
  KEY `idx-type` (`type`),
  KEY `idx-user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20555 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `modules` */

DROP TABLE IF EXISTS `modules`;

CREATE TABLE `modules` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `SortNo` int(11) DEFAULT '0',
  `IsPublish` bit(1) DEFAULT b'1',
  `ClassName` varchar(50) DEFAULT NULL,
  `IsHeader` bit(1) DEFAULT b'0',
  `ModuleLevel` int(11) DEFAULT NULL,
  `Application_id` int(11) NOT NULL,
  `ParentID` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Application_id` (`Application_id`),
  KEY `ParentID` (`ParentID`),
  KEY `modules_url` (`URL`),
  KEY `modules_IsPublish` (`IsPublish`),
  KEY `modules_name` (`Name`),
  KEY `modules_isheader` (`IsHeader`),
  KEY `modules_classname` (`ClassName`),
  KEY `modules_sortno` (`SortNo`),
  KEY `modules_moduleslevel` (`ModuleLevel`),
  KEY `modules_createby` (`CreateBy`),
  KEY `modules_updateby` (`UpdateBy`),
  CONSTRAINT `FK578D5FF54CBDA5AE` FOREIGN KEY (`Application_id`) REFERENCES `applications` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK578D5FF550C48F63` FOREIGN KEY (`ParentID`) REFERENCES `modules` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `modules_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `modules_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=357 DEFAULT CHARSET=latin1;

/*Table structure for table `notif_sms_gateway` */

DROP TABLE IF EXISTS `notif_sms_gateway`;

CREATE TABLE `notif_sms_gateway` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `number_HP` int(20) NOT NULL,
  `collectionloanitem_id` int(11) DEFAULT NULL,
  `send_message_text` text,
  `criteria_message` varchar(20) DEFAULT NULL,
  `send_date` datetime DEFAULT NULL,
  `send_status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `notif_sms_gateway_hist` */

DROP TABLE IF EXISTS `notif_sms_gateway_hist`;

CREATE TABLE `notif_sms_gateway_hist` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `number_HP` int(20) NOT NULL,
  `collectionloanitem_id` int(11) DEFAULT NULL,
  `send_message_text` text,
  `criteria_message` varchar(20) DEFAULT NULL,
  `send_date` datetime DEFAULT NULL,
  `send_status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `opac_counter` */

DROP TABLE IF EXISTS `opac_counter`;

CREATE TABLE `opac_counter` (
  `hit_id` int(11) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(30) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `region_name` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `lat` varchar(100) DEFAULT NULL,
  `long` varchar(100) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`hit_id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

/*Table structure for table `opacfields` */

DROP TABLE IF EXISTS `opacfields`;

CREATE TABLE `opacfields` (
  `ID` decimal(10,0) NOT NULL,
  `TAG` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `NAME` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `Column4` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `Column5` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `Column6` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `Column7` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `Column8` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `Column9` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `Column10` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `Column11` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `Column12` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `opacfields_createby` (`CreateBy`),
  KEY `opacfields_updateby` (`UpdateBy`),
  CONSTRAINT `opacfields_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `opacfields_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `opaclogs` */

DROP TABLE IF EXISTS `opaclogs`;

CREATE TABLE `opaclogs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `User_id` varchar(50) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `jenis_pencarian` text,
  `keyword` text,
  `jenis_bahan` varchar(50) DEFAULT NULL,
  `waktu` datetime DEFAULT NULL,
  `url` text,
  `isLKD` tinyint(4) DEFAULT '0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `Target_Pembaca` varchar(50) DEFAULT NULL,
  `Bahasa` varchar(50) DEFAULT NULL,
  `Bentuk_Karya` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `opaclogs_userid` (`User_id`),
  KEY `opaclogs_createby_idx` (`CreateBy`),
  KEY `opaclogs_updateby_idx` (`UpdateBy`),
  CONSTRAINT `opaclogs_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `opaclogs_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `opaclogs_userid` FOREIGN KEY (`User_id`) REFERENCES `members` (`MemberNo`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `opaclogs_keyword` */

DROP TABLE IF EXISTS `opaclogs_keyword`;

CREATE TABLE `opaclogs_keyword` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `OpaclogsId` int(11) NOT NULL,
  `Field` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `Keyword` text CHARACTER SET utf8,
  PRIMARY KEY (`Id`),
  KEY `opaclogs_keyword_field_idx` (`Field`),
  KEY `opaclogs_keyword_opaclogsid_idx` (`OpaclogsId`),
  KEY `opaclogs_keyword_keyword_idx` (`Keyword`(240)),
  CONSTRAINT `opaclogs_keyword_opaclogsid` FOREIGN KEY (`OpaclogsId`) REFERENCES `opaclogs` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `outbox` */

DROP TABLE IF EXISTS `outbox`;

CREATE TABLE `outbox` (
  `UpdatedInDB` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `InsertIntoDB` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `SendingDateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `SendBefore` time NOT NULL DEFAULT '23:59:59',
  `SendAfter` time NOT NULL DEFAULT '00:00:00',
  `Text` text,
  `DestinationNumber` varchar(20) NOT NULL DEFAULT '',
  `Coding` enum('Default_No_Compression','Unicode_No_Compression','8bit','Default_Compression','Unicode_Compression') NOT NULL DEFAULT 'Default_No_Compression',
  `UDH` text,
  `Class` int(11) DEFAULT '-1',
  `TextDecoded` text NOT NULL,
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `MultiPart` enum('false','true') DEFAULT 'false',
  `RelativeValidity` int(11) DEFAULT '-1',
  `SenderID` varchar(255) DEFAULT NULL,
  `SendingTimeOut` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `DeliveryReport` enum('default','yes','no') DEFAULT 'default',
  `CreatorID` text NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `outbox_date` (`SendingDateTime`,`SendingTimeOut`),
  KEY `outbox_sender` (`SenderID`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Table structure for table `outbox_multipart` */

DROP TABLE IF EXISTS `outbox_multipart`;

CREATE TABLE `outbox_multipart` (
  `Text` text,
  `Coding` enum('Default_No_Compression','Unicode_No_Compression','8bit','Default_Compression','Unicode_Compression') NOT NULL DEFAULT 'Default_No_Compression',
  `UDH` text,
  `Class` int(11) DEFAULT '-1',
  `TextDecoded` text,
  `ID` int(10) unsigned NOT NULL DEFAULT '0',
  `SequencePosition` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`,`SequencePosition`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Table structure for table `partners` */

DROP TABLE IF EXISTS `partners`;

CREATE TABLE `partners` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Phone` varchar(100) DEFAULT NULL,
  `Fax` varchar(100) DEFAULT NULL,
  `Province` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Partners_Name` (`Name`),
  KEY `partners_createby` (`CreateBy`),
  KEY `partners_updateby` (`UpdateBy`),
  KEY `partners_kii` (`KIILastUploadDate`),
  KEY `partners_createdate` (`CreateDate`),
  KEY `partners_updatedate` (`UpdateDate`),
  CONSTRAINT `partners_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `partners_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1099 DEFAULT CHARSET=latin1;

/*Table structure for table `pbk` */

DROP TABLE IF EXISTS `pbk`;

CREATE TABLE `pbk` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `GroupID` int(11) NOT NULL DEFAULT '-1',
  `Name` text NOT NULL,
  `Number` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Table structure for table `pbk_groups` */

DROP TABLE IF EXISTS `pbk_groups`;

CREATE TABLE `pbk_groups` (
  `Name` text NOT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Table structure for table `pelanggaran` */

DROP TABLE IF EXISTS `pelanggaran`;

CREATE TABLE `pelanggaran` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CollectionLoan_id` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `CollectionLoanItem_id` double DEFAULT NULL,
  `JenisPelanggaran_id` int(11) DEFAULT NULL,
  `JenisDenda_id` int(11) DEFAULT NULL,
  `JumlahDenda` decimal(10,0) DEFAULT '0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `JumlahSuspend` int(11) DEFAULT '0',
  `Paid` bit(1) DEFAULT b'0',
  `Member_id` double DEFAULT NULL,
  `Collection_id` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Pelanggaran_JumlahDenda` (`JumlahDenda`),
  KEY `pelanggaran_cli` (`CollectionLoanItem_id`),
  KEY `Pelanggaran_JenisPelanggaran` (`JenisPelanggaran_id`),
  KEY `Pelanggaran_JenisDenda` (`JenisDenda_id`),
  KEY `pelanggaran_createby` (`CreateBy`),
  KEY `pelanggaran_updateby` (`UpdateBy`),
  KEY `pelanggaran_collectionloan` (`CollectionLoan_id`),
  KEY `pelanggaran_member` (`Member_id`),
  KEY `pelanggaran_collection` (`Collection_id`),
  CONSTRAINT `pelanggaran_cli` FOREIGN KEY (`CollectionLoanItem_id`) REFERENCES `collectionloanitems` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pelanggaran_collection` FOREIGN KEY (`Collection_id`) REFERENCES `collections` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pelanggaran_collectionloan` FOREIGN KEY (`CollectionLoan_id`) REFERENCES `collectionloans` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pelanggaran_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pelanggaran_jenisdenda` FOREIGN KEY (`JenisDenda_id`) REFERENCES `jenis_denda` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pelanggaran_jenispelanggaran` FOREIGN KEY (`JenisPelanggaran_id`) REFERENCES `jenis_pelanggaran` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pelanggaran_member` FOREIGN KEY (`Member_id`) REFERENCES `members` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pelanggaran_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `penduduk` */

DROP TABLE IF EXISTS `penduduk`;

CREATE TABLE `penduduk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nik` varchar(16) DEFAULT NULL,
  `Nama` varchar(255) DEFAULT NULL,
  `Tempat_Lahir` varchar(100) DEFAULT NULL,
  `Provinsi` varchar(50) DEFAULT NULL,
  `Kabupaten_Kota` varchar(100) DEFAULT NULL,
  `Kecamatan` varchar(100) DEFAULT NULL,
  `Kelurahan_desa` varchar(100) DEFAULT NULL,
  `TPS` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `pengiriman` */

DROP TABLE IF EXISTS `pengiriman`;

CREATE TABLE `pengiriman` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `JudulKiriman` text NOT NULL,
  `PenanggungJawab` varchar(100) NOT NULL,
  `NipPenanggungJawab` varchar(50) DEFAULT NULL,
  `FromDate` date DEFAULT NULL,
  `ToDate` date DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `pengiriman_createby` (`CreateBy`),
  KEY `pengiriman_updateby` (`UpdateBy`),
  CONSTRAINT `pengiriman_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pengiriman_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `pengiriman_koleksi` */

DROP TABLE IF EXISTS `pengiriman_koleksi`;

CREATE TABLE `pengiriman_koleksi` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Collection_id` double NOT NULL,
  `BIBID` varchar(50) DEFAULT NULL,
  `JUDUL` varchar(4000) DEFAULT NULL,
  `TAHUNTERBIT` varchar(20) DEFAULT NULL,
  `CALLNUMBER` varchar(255) DEFAULT NULL,
  `NOBARCODE` varchar(100) DEFAULT NULL,
  `NOINDUK` varchar(255) DEFAULT NULL,
  `QUANTITY` int(10) DEFAULT NULL,
  `TANGGALKIRIM` date DEFAULT NULL,
  `PengirimanID` int(11) DEFAULT NULL,
  `IsCheck` bit(1) NOT NULL DEFAULT b'0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(50) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `pengirimankoleksi_createby` (`CreateBy`),
  KEY `pengirimankoleksi_updateby` (`UpdateBy`),
  KEY `pengiriman_cetak_id` (`PengirimanID`),
  KEY `pengirimankoleksi_collectionid` (`Collection_id`),
  CONSTRAINT `pengiriman_cetak_id` FOREIGN KEY (`PengirimanID`) REFERENCES `pengiriman` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `pengirimankoleksi_collectionid` FOREIGN KEY (`Collection_id`) REFERENCES `collections` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `pengirimankoleksi_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `pengirimankoleksi_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `peraturan_peminjaman_hari` */

DROP TABLE IF EXISTS `peraturan_peminjaman_hari`;

CREATE TABLE `peraturan_peminjaman_hari` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DayIndex` int(11) DEFAULT '0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `MaxPinjamKoleksi` int(11) DEFAULT '0',
  `MaxLoanDays` int(11) DEFAULT '0',
  `DendaType` varchar(45) COLLATE latin1_general_ci DEFAULT 'Konstan',
  `DendaTenorJumlah` double DEFAULT '0',
  `DendaTenorSatuan` varchar(45) COLLATE latin1_general_ci DEFAULT 'Hari',
  `DendaPerTenor` decimal(10,0) DEFAULT NULL,
  `DendaTenorMultiply` int(11) DEFAULT NULL,
  `SuspendMember` bit(1) DEFAULT b'0',
  `WarningLoanDueDay` int(11) DEFAULT '0',
  `SuspendType` varchar(45) COLLATE latin1_general_ci DEFAULT 'Konstan',
  `SuspendTenorJumlah` double DEFAULT '0',
  `SuspendTenorSatuan` varchar(45) COLLATE latin1_general_ci DEFAULT 'Hari',
  `DaySuspend` int(11) DEFAULT '0',
  `SuspendTenorMultiply` int(11) DEFAULT '1',
  `DayPerpanjang` int(11) DEFAULT '0',
  `CountPerpanjang` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `pp_hari_createby` (`CreateBy`),
  KEY `pp_hari_updateby` (`UpdateBy`),
  KEY `pp_hari_createdate` (`CreateDate`),
  KEY `pp_hari_updatedate` (`UpdateDate`),
  CONSTRAINT `pp_hari_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pp_hari_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `peraturan_peminjaman_tanggal` */

DROP TABLE IF EXISTS `peraturan_peminjaman_tanggal`;

CREATE TABLE `peraturan_peminjaman_tanggal` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TanggalAwal` datetime DEFAULT NULL,
  `TanggalAkhir` datetime DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `MaxPinjamKoleksi` int(11) DEFAULT '0',
  `MaxLoanDays` int(11) DEFAULT '0',
  `DendaType` varchar(45) COLLATE latin1_general_ci DEFAULT 'Konstan',
  `DendaTenorJumlah` double DEFAULT '0',
  `DendaTenorSatuan` varchar(45) COLLATE latin1_general_ci DEFAULT 'Hari',
  `DendaPerTenor` decimal(10,0) DEFAULT NULL,
  `DendaTenorMultiply` int(11) DEFAULT NULL,
  `SuspendMember` bit(1) DEFAULT b'0',
  `WarningLoanDueDay` int(11) DEFAULT '0',
  `SuspendType` varchar(45) COLLATE latin1_general_ci DEFAULT 'Konstan',
  `SuspendTenorJumlah` double DEFAULT '0',
  `SuspendTenorSatuan` varchar(45) COLLATE latin1_general_ci DEFAULT 'Hari',
  `DaySuspend` int(11) DEFAULT '0',
  `SuspendTenorMultiply` int(11) DEFAULT '1',
  `DayPerpanjang` int(11) DEFAULT '0',
  `CountPerpanjang` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `pp_tanggal_createby` (`CreateBy`),
  KEY `pp_tanggal_updateby` (`UpdateBy`),
  KEY `pp_tanggal_createdate` (`CreateDate`),
  KEY `pp_tanggal_updatedate` (`UpdateDate`),
  KEY `pp_tanggalawal` (`TanggalAwal`),
  KEY `pp_tanggalakhir` (`TanggalAkhir`),
  CONSTRAINT `pp_tanggal_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pp_tanggal_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `phones` */

DROP TABLE IF EXISTS `phones`;

CREATE TABLE `phones` (
  `ID` text NOT NULL,
  `UpdatedInDB` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `InsertIntoDB` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `TimeOut` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Send` enum('yes','no') NOT NULL DEFAULT 'no',
  `Receive` enum('yes','no') NOT NULL DEFAULT 'no',
  `IMEI` varchar(35) NOT NULL,
  `Client` text NOT NULL,
  `Battery` int(11) NOT NULL DEFAULT '-1',
  `Signal` int(11) NOT NULL DEFAULT '-1',
  `Sent` int(11) NOT NULL DEFAULT '0',
  `Received` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`IMEI`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Table structure for table `propinsi` */

DROP TABLE IF EXISTS `propinsi`;

CREATE TABLE `propinsi` (
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  `NamaPropinsi` varchar(50) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `propinsi_nama` (`NamaPropinsi`),
  KEY `propinsi_createby` (`CreateBy`),
  KEY `propinsi_updateby` (`UpdateBy`),
  CONSTRAINT `propinsi_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `propinsi_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

/*Table structure for table `publishers` */

DROP TABLE IF EXISTS `publishers`;

CREATE TABLE `publishers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `publishers_createby` (`CreateBy`),
  KEY `publishers_updateby` (`UpdateBy`),
  CONSTRAINT `publishers_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `publishers_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `quarantined_auth_data` */

DROP TABLE IF EXISTS `quarantined_auth_data`;

CREATE TABLE `quarantined_auth_data` (
  `ID` int(11) NOT NULL,
  `Auth_Header_ID` int(11) NOT NULL,
  `Tag` varchar(3) NOT NULL,
  `Indicator1` char(1) DEFAULT NULL,
  `Indicator2` char(1) DEFAULT NULL,
  `Value` text,
  `DataItem` text,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `quarantined_auth_data_auth_header` (`Auth_Header_ID`),
  KEY `quarantined_auth_data_ID` (`ID`),
  KEY `quarantined_auth_data_createby` (`CreateBy`),
  KEY `quarantined_auth_data_updateby` (`UpdateBy`),
  CONSTRAINT `quarantined_auth_data_auth_header` FOREIGN KEY (`Auth_Header_ID`) REFERENCES `quarantined_auth_header` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `quarantined_auth_data_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `quarantined_auth_data_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `quarantined_auth_header` */

DROP TABLE IF EXISTS `quarantined_auth_header`;

CREATE TABLE `quarantined_auth_header` (
  `ID` int(11) NOT NULL,
  `Worksheet_id` int(11) DEFAULT NULL,
  `Auth_ID` varchar(20) DEFAULT NULL,
  `MARC_LOC` text,
  `ISTILAH_DIGUNAKAN` text,
  `ISTILAH_TDK_DIGUNAKAN` text,
  `ISTILAH_TERKAIT` text,
  `TANGGALPEMBAHASAN` varchar(45) DEFAULT NULL,
  `QUARANTINEDBY` int(11) DEFAULT NULL,
  `QUARANTINEDDATE` datetime DEFAULT NULL,
  `QUARANTINEDTERMINAL` varchar(100) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `quarantined_auth_header_ID` (`ID`),
  KEY `quarantined_auth_header_createby` (`CreateBy`),
  KEY `quarantined_auth_header_updateby` (`UpdateBy`),
  CONSTRAINT `quarantined_auth_header_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `quarantined_auth_header_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `quarantined_catalog_ruas` */

DROP TABLE IF EXISTS `quarantined_catalog_ruas`;

CREATE TABLE `quarantined_catalog_ruas` (
  `ID` double NOT NULL,
  `CatalogId` double NOT NULL,
  `Tag` varchar(3) NOT NULL,
  `Indicator1` char(1) DEFAULT NULL,
  `Indicator2` char(1) DEFAULT NULL,
  `Value` text,
  `Sequence` int(10) DEFAULT '0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `quarantined_catalog_ruas_catalogs` (`CatalogId`),
  KEY `quarantined_catalog_ruas_ID` (`ID`),
  KEY `quarantined_catalog_ruas_createby` (`CreateBy`),
  KEY `quarantined_catalog_ruas_updateby` (`UpdateBy`),
  CONSTRAINT `quarantined_catalog_ruas_catalogs` FOREIGN KEY (`CatalogId`) REFERENCES `quarantined_catalogs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `quarantined_catalog_ruas_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `quarantined_catalog_ruas_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `quarantined_catalog_subruas` */

DROP TABLE IF EXISTS `quarantined_catalog_subruas`;

CREATE TABLE `quarantined_catalog_subruas` (
  `ID` double NOT NULL,
  `RuasID` double NOT NULL,
  `SubRuas` varchar(10) DEFAULT NULL,
  `Value` text,
  `Sequence` int(11) NOT NULL DEFAULT '0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `quarantined_catalog_subruas_ruas` (`RuasID`),
  KEY `quarantined_catalog_subruas_createby` (`CreateBy`),
  KEY `quarantined_catalog_subruas_updateby` (`UpdateBy`),
  CONSTRAINT `quarantined_catalog_subruas_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `quarantined_catalog_subruas_ruas` FOREIGN KEY (`RuasID`) REFERENCES `quarantined_catalog_ruas` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `quarantined_catalog_subruas_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `quarantined_catalogs` */

DROP TABLE IF EXISTS `quarantined_catalogs`;

CREATE TABLE `quarantined_catalogs` (
  `ID` double NOT NULL,
  `ControlNumber` varchar(50) NOT NULL,
  `BIBID` varchar(50) NOT NULL,
  `Title` varchar(700) NOT NULL,
  `Author` varchar(700) DEFAULT NULL,
  `Edition` varchar(255) DEFAULT NULL,
  `Publisher` varchar(255) DEFAULT NULL,
  `PublishLocation` varchar(255) DEFAULT NULL,
  `PublishYear` varchar(255) DEFAULT NULL,
  `Publikasi` varchar(700) DEFAULT NULL,
  `Subject` varchar(700) DEFAULT NULL,
  `PhysicalDescription` varchar(255) DEFAULT NULL,
  `ISBN` varchar(700) DEFAULT NULL,
  `CallNumber` varchar(700) DEFAULT NULL,
  `Note` text,
  `Languages` varchar(255) DEFAULT NULL,
  `DeweyNo` varchar(255) DEFAULT NULL,
  `ApproveDateOPAC` datetime DEFAULT NULL,
  `IsOPAC` tinyint(4) DEFAULT '0',
  `IsBNI` bit(1) DEFAULT b'0',
  `IsKIN` bit(1) DEFAULT b'0',
  `IsRDA` bit(1) DEFAULT b'0',
  `CoverURL` varchar(255) DEFAULT NULL,
  `Branch_id` int(11) DEFAULT NULL,
  `Worksheet_id` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `MARC_LOC` text,
  `PRESERVASI_ID` varchar(20) DEFAULT NULL,
  `QUARANTINEDBY` int(11) DEFAULT NULL,
  `QUARANTINEDDATE` datetime DEFAULT NULL,
  `QUARANTINEDTERMINAL` varchar(100) DEFAULT NULL,
  `Member_id` double DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `quarantined_catalogs_ID` (`ID`),
  KEY `quarantined_catalogs_createby` (`CreateBy`),
  KEY `quarantined_catalogs_updateby` (`UpdateBy`),
  KEY `quarantined_catalogs_member_idx` (`Member_id`),
  KEY `quarantined_catalogs_qby_idx` (`QUARANTINEDBY`),
  CONSTRAINT `quarantined_catalogs_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `quarantined_catalogs_member` FOREIGN KEY (`Member_id`) REFERENCES `members` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `quarantined_catalogs_qby` FOREIGN KEY (`QUARANTINEDBY`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `quarantined_catalogs_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `quarantined_collections` */

DROP TABLE IF EXISTS `quarantined_collections`;

CREATE TABLE `quarantined_collections` (
  `ID` double NOT NULL,
  `NomorBarcode` varchar(50) DEFAULT NULL,
  `NoInduk` varchar(50) DEFAULT NULL,
  `Currency` varchar(30) DEFAULT NULL,
  `RFID` varchar(50) DEFAULT NULL,
  `Price` decimal(10,0) DEFAULT NULL,
  `PriceType` varchar(45) DEFAULT NULL,
  `TanggalPengadaan` datetime DEFAULT NULL,
  `CallNumber` varchar(255) DEFAULT NULL,
  `Branch_id` int(11) DEFAULT NULL,
  `Catalog_id` double DEFAULT NULL,
  `Partner_id` int(11) DEFAULT NULL,
  `Location_id` int(11) DEFAULT NULL,
  `Rule_id` int(11) DEFAULT NULL,
  `Category_id` int(11) DEFAULT NULL,
  `Media_id` int(11) DEFAULT NULL,
  `Source_id` int(11) DEFAULT NULL,
  `Status_id` int(11) DEFAULT '9',
  `Location_Library_id` int(11) DEFAULT NULL,
  `Keterangan_Sumber` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `IsVerified` bit(1) DEFAULT b'0',
  `QUARANTINEDBY` int(11) DEFAULT NULL,
  `QUARANTINEDDATE` date DEFAULT NULL,
  `QUARANTINEDTERMINAL` varchar(100) DEFAULT NULL,
  `ISREFERENSI` bit(1) DEFAULT b'0',
  `EDISISERIAL` varchar(255) DEFAULT NULL,
  `NOJILID` int(11) DEFAULT NULL,
  `TANGGAL_TERBIT_EDISI_SERIAL` date DEFAULT NULL,
  `BAHAN_SERTAAN` varchar(255) DEFAULT NULL,
  `KETERANGAN_LAIN` varchar(255) DEFAULT NULL,
  `TGLENTRYJILID` date DEFAULT NULL,
  `IDJILID` varchar(20) DEFAULT NULL,
  `NOMORPANGGILJILID` varchar(100) DEFAULT NULL,
  `ISOPAC` tinyint(4) DEFAULT '1',
  `JILIDCREATEBY` int(11) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  `BookingMemberID` varchar(50) DEFAULT NULL,
  `BookingExpiredDate` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `quarantined_collections_ID` (`ID`),
  KEY `quarantined_collections_createby` (`CreateBy`),
  KEY `quarantined_collections_updateby` (`UpdateBy`),
  KEY `quarantined_collections_qby_idx` (`QUARANTINEDBY`),
  CONSTRAINT `quarantined_collections_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `quarantined_collections_qby` FOREIGN KEY (`QUARANTINEDBY`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `quarantined_collections_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `quarantined_pengiriman` */

DROP TABLE IF EXISTS `quarantined_pengiriman`;

CREATE TABLE `quarantined_pengiriman` (
  `ID` int(11) unsigned NOT NULL,
  `TanggalKirim` date NOT NULL,
  `Collection_ID` double NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `quarantined_pengiriman_ID` (`ID`),
  KEY `quarantined_pengiriman_createby` (`CreateBy`),
  KEY `quarantined_pengiriman_updateby` (`UpdateBy`),
  CONSTRAINT `quarantined_pengiriman_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `quarantined_pengiriman_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `readinlocation` */

DROP TABLE IF EXISTS `readinlocation`;

CREATE TABLE `readinlocation` (
  `ID` double NOT NULL AUTO_INCREMENT,
  `MemberNo` varchar(50) DEFAULT NULL,
  `Nama` varchar(100) NOT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Profesi` varchar(50) DEFAULT NULL,
  `Pendidikan` varchar(50) DEFAULT NULL,
  `JenisKelamin` varchar(50) DEFAULT NULL,
  `Alamat` varchar(255) DEFAULT NULL,
  `TypeIdCard` varchar(50) DEFAULT NULL,
  `NoIdCard` varchar(50) DEFAULT NULL,
  `NoBarcode` varchar(50) DEFAULT NULL,
  `Title` text NOT NULL,
  `Author` text,
  `Publisher` varchar(255) DEFAULT NULL,
  `ControlNumber` varchar(50) DEFAULT NULL,
  `LocationId` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `readinlocation_location` (`LocationId`),
  KEY `readinlocation_createby` (`CreateBy`),
  KEY `readinlocation_updateby` (`UpdateBy`),
  CONSTRAINT `readinlocation_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `readinlocation_location` FOREIGN KEY (`LocationId`) REFERENCES `locations` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `readinlocation_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `refferenceitems` */

DROP TABLE IF EXISTS `refferenceitems`;

CREATE TABLE `refferenceitems` (
  `RefferenceItemsID` int(11) NOT NULL AUTO_INCREMENT,
  `Refference_id` int(11) NOT NULL,
  `Code` varchar(10) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`RefferenceItemsID`),
  KEY `Refference_id` (`Refference_id`),
  KEY `refferenceitems_code` (`Code`),
  KEY `refferenceitems_createby` (`CreateBy`),
  KEY `refferenceitems_updateby` (`UpdateBy`),
  CONSTRAINT `FKFCF3C0CBEACE6BC0` FOREIGN KEY (`Refference_id`) REFERENCES `refferences` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `refferenceitems_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `refferenceitems_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1421 DEFAULT CHARSET=latin1;

/*Table structure for table `refferences` */

DROP TABLE IF EXISTS `refferences`;

CREATE TABLE `refferences` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Format_id` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `refferences_format` (`Format_id`),
  KEY `refferences_createby` (`CreateBy`),
  KEY `refferences_updateby` (`UpdateBy`),
  CONSTRAINT `refferences_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `refferences_format` FOREIGN KEY (`Format_id`) REFERENCES `formats` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `refferences_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=latin1;

/*Table structure for table `requestcatalog` */

DROP TABLE IF EXISTS `requestcatalog`;

CREATE TABLE `requestcatalog` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Type` varchar(50) DEFAULT NULL,
  `Title` varchar(255) NOT NULL,
  `Subject` varchar(255) DEFAULT NULL,
  `Author` varchar(255) DEFAULT NULL,
  `PublishLocation` varchar(255) DEFAULT NULL,
  `PublishYear` varchar(50) DEFAULT NULL,
  `Publisher` varchar(50) DEFAULT NULL,
  `Comments` text,
  `MemberID` double DEFAULT NULL,
  `CallNumber` varchar(50) DEFAULT NULL,
  `ControlNumber` varchar(50) DEFAULT NULL,
  `DateRequest` datetime DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `WorksheetID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `requestcatalog_createby` (`CreateBy`),
  KEY `requestcatalog_updateby` (`UpdateBy`),
  KEY `requestcatalog_daterequest` (`DateRequest`),
  KEY `requestcatalog_member_idx` (`MemberID`),
  KEY `requestcatalog_Title` (`Title`),
  KEY `requestcatalog_PublishLocation` (`PublishLocation`),
  KEY `requestcatalog_PublishYear` (`PublishYear`),
  KEY `requestcatalog_Publisher` (`Publisher`),
  CONSTRAINT `requestcatalog_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requestcatalog_member` FOREIGN KEY (`MemberID`) REFERENCES `members` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `requestcatalog_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `rfid_temp` */

DROP TABLE IF EXISTS `rfid_temp`;

CREATE TABLE `rfid_temp` (
  `rfid_no` varchar(50) DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `status_alarm` varchar(50) DEFAULT NULL COMMENT 'diset null jika dari service rfid lalu jika dari website.',
  `serial_number` varchar(50) DEFAULT NULL,
  `item_type` varchar(45) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  KEY `rfid_temp_createby` (`CreateBy`),
  KEY `rfid_temp_updateby` (`UpdateBy`),
  KEY `rfid_temp_ip` (`ip`),
  KEY `rfid_temp_rfidno` (`rfid_no`),
  KEY `rfid_temp_statusalarm` (`status_alarm`),
  KEY `rfid_temp_serialnumber` (`serial_number`),
  KEY `rfid_temp_itemtype` (`item_type`),
  CONSTRAINT `rfid_temp_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `rfid_temp_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `rolemodule` */

DROP TABLE IF EXISTS `rolemodule`;

CREATE TABLE `rolemodule` (
  `Role_id` int(11) NOT NULL,
  `IsView` bit(1) DEFAULT b'0',
  `IsAdd` bit(1) DEFAULT b'0',
  `IsEdit` bit(1) DEFAULT b'0',
  `IsDelete` bit(1) DEFAULT b'0',
  `IsPrint` bit(1) DEFAULT b'0',
  `Module_id` int(11) NOT NULL DEFAULT '0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Role_id`,`Module_id`),
  KEY `Module_id` (`Module_id`),
  KEY `Role_id` (`Role_id`),
  KEY `rolemodule_isview` (`IsView`),
  KEY `rolemodule_isadd` (`IsAdd`),
  KEY `rolemodule_isedit` (`IsEdit`),
  KEY `rolemodule_createby` (`CreateBy`),
  KEY `rolemodule_updateby` (`UpdateBy`),
  CONSTRAINT `FK4533E5AE26BAF3EC` FOREIGN KEY (`Module_id`) REFERENCES `modules` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK4533E5AED86F6C52` FOREIGN KEY (`Role_id`) REFERENCES `roles` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rolemodule_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `rolemodule_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(50) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `IsActive` bit(1) DEFAULT b'1',
  `Application_id` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Application_id` (`Application_id`),
  KEY `roles_createby` (`CreateBy`),
  KEY `roles_updateby` (`UpdateBy`),
  KEY `roles_kii` (`KIILastUploadDate`),
  KEY `roles_createdate` (`CreateDate`),
  KEY `roles_updatedate` (`UpdateDate`),
  CONSTRAINT `FK5F7A48334CBDA5AE` FOREIGN KEY (`Application_id`) REFERENCES `applications` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roles_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `roles_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

/*Table structure for table `route` */

DROP TABLE IF EXISTS `route`;

CREATE TABLE `route` (
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `alias` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '1',
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `sentitems` */

DROP TABLE IF EXISTS `sentitems`;

CREATE TABLE `sentitems` (
  `UpdatedInDB` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `InsertIntoDB` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `SendingDateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `DeliveryDateTime` timestamp NULL DEFAULT NULL,
  `Text` text NOT NULL,
  `DestinationNumber` varchar(20) NOT NULL DEFAULT '',
  `Coding` enum('Default_No_Compression','Unicode_No_Compression','8bit','Default_Compression','Unicode_Compression') NOT NULL DEFAULT 'Default_No_Compression',
  `UDH` text NOT NULL,
  `SMSCNumber` varchar(20) NOT NULL DEFAULT '',
  `Class` int(11) NOT NULL DEFAULT '-1',
  `TextDecoded` text NOT NULL,
  `ID` int(10) unsigned NOT NULL DEFAULT '0',
  `SenderID` varchar(255) NOT NULL,
  `SequencePosition` int(11) NOT NULL DEFAULT '1',
  `Status` enum('SendingOK','SendingOKNoReport','SendingError','DeliveryOK','DeliveryFailed','DeliveryPending','DeliveryUnknown','Error') NOT NULL DEFAULT 'SendingOK',
  `StatusError` int(11) NOT NULL DEFAULT '-1',
  `TPMR` int(11) NOT NULL DEFAULT '-1',
  `RelativeValidity` int(11) NOT NULL DEFAULT '-1',
  `CreatorID` text NOT NULL,
  `CollectionLoanItem_id` double DEFAULT NULL,
  PRIMARY KEY (`ID`,`SequencePosition`),
  KEY `sentitems_date` (`DeliveryDateTime`),
  KEY `sentitems_tpmr` (`TPMR`),
  KEY `sentitems_dest` (`DestinationNumber`),
  KEY `sentitems_sender` (`SenderID`),
  KEY `sentitems_cli_idx` (`CollectionLoanItem_id`),
  CONSTRAINT `sentitems_cli` FOREIGN KEY (`CollectionLoanItem_id`) REFERENCES `collectionloanitems` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `serial_articlefiles` */

DROP TABLE IF EXISTS `serial_articlefiles`;

CREATE TABLE `serial_articlefiles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Articles_id` double NOT NULL,
  `FileURL` varchar(255) DEFAULT NULL,
  `FileFlash` varchar(255) DEFAULT NULL,
  `sizeFile` varchar(255) DEFAULT NULL,
  `IsPublish` tinyint(4) DEFAULT '1',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `IsFromMember` bit(1) DEFAULT b'0',
  `Member_id` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Articles_id` (`Articles_id`),
  CONSTRAINT `serial_articlefiles_ibfk_1` FOREIGN KEY (`Articles_id`) REFERENCES `serial_articles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `serial_articles` */

DROP TABLE IF EXISTS `serial_articles`;

CREATE TABLE `serial_articles` (
  `id` double NOT NULL AUTO_INCREMENT,
  `Article_type` varchar(255) DEFAULT NULL,
  `Title` varchar(700) NOT NULL,
  `Content` text,
  `Creator` varchar(700) DEFAULT NULL,
  `Contributor` varchar(700) DEFAULT NULL,
  `StartPage` int(11) DEFAULT NULL,
  `Pages` int(11) DEFAULT NULL,
  `Subject` varchar(700) DEFAULT NULL,
  `DDC` varchar(255) DEFAULT NULL,
  `Call_Number` varchar(255) DEFAULT NULL,
  `EDISISERIAL` varchar(255) DEFAULT NULL,
  `TANGGAL_TERBIT_EDISI_SERIAL` date DEFAULT NULL,
  `Catalog_id` double DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `ISOPAC` bit(1) DEFAULT b'0',
  `Abstract` text,
  PRIMARY KEY (`id`),
  KEY `idx_title` (`Title`),
  KEY `articles_catalog` (`Catalog_id`),
  KEY `articles_createby` (`CreateBy`),
  KEY `articles_updateby` (`UpdateBy`),
  CONSTRAINT `articles_catalog` FOREIGN KEY (`Catalog_id`) REFERENCES `catalogs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `articles_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `serial_articles_repeatable` */

DROP TABLE IF EXISTS `serial_articles_repeatable`;

CREATE TABLE `serial_articles_repeatable` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `serial_article_ID` double NOT NULL,
  `article_field` varchar(50) DEFAULT NULL,
  `value` varchar(111) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `SERIAL_ARTICLE_ID` (`serial_article_ID`),
  KEY `CREATE_USER` (`CreateBy`),
  KEY `UPDATE_USER` (`UpdateBy`),
  CONSTRAINT `CREATE_USER` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `SERIAL_ARTICLE_ID` FOREIGN KEY (`serial_article_ID`) REFERENCES `serial_articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UPDATE_USER` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `session` */

DROP TABLE IF EXISTS `session`;

CREATE TABLE `session` (
  `id` char(40) NOT NULL,
  `expire` int(11) DEFAULT NULL,
  `data` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `settingcatalogdetail` */

DROP TABLE IF EXISTS `settingcatalogdetail`;

CREATE TABLE `settingcatalogdetail` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Field_id` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `settingcatalogdetail_Field` (`Field_id`),
  KEY `settingcatalogdetail_createby` (`CreateBy`),
  KEY `settingcatalogdetail_updateby` (`UpdateBy`),
  CONSTRAINT `settingcatalogdetail_Field` FOREIGN KEY (`Field_id`) REFERENCES `fields` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `settingcatalogdetail_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `settingcatalogdetail_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=256 DEFAULT CHARSET=latin1;

/*Table structure for table `settingparameters` */

DROP TABLE IF EXISTS `settingparameters`;

CREATE TABLE `settingparameters` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Value` text,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `settingparameters_name` (`Name`),
  KEY `settingparameters_createby` (`CreateBy`),
  KEY `settingparameters_updateby` (`UpdateBy`),
  CONSTRAINT `settingparameters_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `settingparameters_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=latin1;

/*Table structure for table `smslogs` */

DROP TABLE IF EXISTS `smslogs`;

CREATE TABLE `smslogs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `recieverID` double DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `Text` text,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `recieverID_IDX` (`recieverID`),
  KEY `phoneNumber_IDX` (`phoneNumber`),
  KEY `updateby` (`CreateBy`),
  KEY `createby` (`UpdateBy`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Table structure for table `status_anggota` */

DROP TABLE IF EXISTS `status_anggota`;

CREATE TABLE `status_anggota` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nama` varchar(30) COLLATE latin1_general_ci NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `status_anggota_createby` (`CreateBy`),
  KEY `status_anggota_updateby` (`UpdateBy`),
  CONSTRAINT `status_anggota_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `status_anggota_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Table structure for table `stockopname` */

DROP TABLE IF EXISTS `stockopname`;

CREATE TABLE `stockopname` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ProjectName` varchar(100) NOT NULL,
  `TglMulai` datetime DEFAULT NULL,
  `Tahun` int(11) NOT NULL,
  `Koordinator` varchar(100) NOT NULL,
  `Keterangan` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `stockopname_createby` (`CreateBy`),
  KEY `stockopname_updateby` (`UpdateBy`),
  CONSTRAINT `stockopname_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `stockopname_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `stockopnamedetail` */

DROP TABLE IF EXISTS `stockopnamedetail`;

CREATE TABLE `stockopnamedetail` (
  `ID` double NOT NULL AUTO_INCREMENT,
  `StockOpnameID` int(11) NOT NULL,
  `CollectionID` double NOT NULL,
  `PrevLocationID` int(11) DEFAULT NULL,
  `CurrentLocationID` int(11) DEFAULT NULL,
  `PrevStatusID` int(11) DEFAULT NULL,
  `CurrentStatusID` int(11) DEFAULT NULL,
  `PrevCollectionRuleID` int(11) DEFAULT NULL,
  `CurrentCollectionRuleID` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `stockopnamedetail_stockopname` (`StockOpnameID`),
  KEY `stockopnamedetail_collection` (`CollectionID`),
  KEY `stockopnamedetail_location1` (`PrevLocationID`),
  KEY `stockopnamedetail_location2` (`CurrentLocationID`),
  KEY `stockopnamedetail_collectionrule1` (`PrevCollectionRuleID`),
  KEY `stockopnamedetail_collectionrule2` (`CurrentCollectionRuleID`),
  KEY `stockopnamedetail_colstatus1` (`PrevStatusID`),
  KEY `stockopnamedetail_colstatus2` (`CurrentStatusID`),
  KEY `stockopnamedetail_createby` (`CreateBy`),
  KEY `stockopnamedetail_updateby` (`UpdateBy`),
  CONSTRAINT `stockopnamedetail_collection` FOREIGN KEY (`CollectionID`) REFERENCES `collections` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stockopnamedetail_collectionrule1` FOREIGN KEY (`PrevCollectionRuleID`) REFERENCES `collectionrules` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stockopnamedetail_collectionrule2` FOREIGN KEY (`CurrentCollectionRuleID`) REFERENCES `collectionrules` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stockopnamedetail_colstatus1` FOREIGN KEY (`PrevStatusID`) REFERENCES `collectionstatus` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stockopnamedetail_colstatus2` FOREIGN KEY (`CurrentStatusID`) REFERENCES `collectionstatus` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stockopnamedetail_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `stockopnamedetail_location1` FOREIGN KEY (`PrevLocationID`) REFERENCES `locations` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stockopnamedetail_location2` FOREIGN KEY (`CurrentLocationID`) REFERENCES `locations` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stockopnamedetail_stockopname` FOREIGN KEY (`StockOpnameID`) REFERENCES `stockopname` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stockopnamedetail_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `sumbangan` */

DROP TABLE IF EXISTS `sumbangan`;

CREATE TABLE `sumbangan` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Member_id` double DEFAULT NULL,
  `Jumlah` decimal(10,0) DEFAULT '0',
  `Keterangan` varchar(45) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `sumbangan_member` (`Member_id`),
  KEY `sumbangan_createby` (`CreateBy`),
  KEY `sumbangan_updateby` (`UpdateBy`),
  KEY `sumbangan_createdate` (`CreateDate`),
  CONSTRAINT `sumbangan_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sumbangan_member` FOREIGN KEY (`Member_id`) REFERENCES `members` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sumbangan_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `sumbangan_koleksi` */

DROP TABLE IF EXISTS `sumbangan_koleksi`;

CREATE TABLE `sumbangan_koleksi` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Sumbangan_id` int(11) DEFAULT NULL,
  `Collection_id` double DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `sumbangan_koleksi_collection_idx` (`Collection_id`),
  KEY `sumbangan_koleksi_sumbangan_idx` (`Sumbangan_id`) USING BTREE,
  KEY `sumbangan_koleksi_createby` (`CreateBy`),
  KEY `sumbangan_koleksi_updateby` (`UpdateBy`),
  CONSTRAINT `sumbangan_koleksi_collection` FOREIGN KEY (`Collection_id`) REFERENCES `collections` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sumbangan_koleksi_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sumbangan_koleksi_sumbangan` FOREIGN KEY (`Sumbangan_id`) REFERENCES `sumbangan` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sumbangan_koleksi_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `survey` */

DROP TABLE IF EXISTS `survey`;

CREATE TABLE `survey` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NamaSurvey` varchar(200) NOT NULL,
  `TanggalMulai` datetime NOT NULL,
  `TanggalSelesai` datetime NOT NULL,
  `IsActive` bit(1) DEFAULT b'0',
  `NomorUrut` int(11) DEFAULT '99',
  `TargetSurvey` int(11) DEFAULT '0' COMMENT '0: Semua, 1: Anggota',
  `HasilSurveyShow` int(11) DEFAULT '0' COMMENT '0: Back Office dan Modul Survey, 1: Back Office',
  `RedaksiAwal` text,
  `RedaksiAkhir` text,
  `Keterangan` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `survey_createby_idx` (`CreateBy`),
  KEY `survey_updateby_idx` (`UpdateBy`),
  CONSTRAINT `survey_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `survey_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `survey_isian` */

DROP TABLE IF EXISTS `survey_isian`;

CREATE TABLE `survey_isian` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Survey_Pertanyaan_id` int(11) DEFAULT NULL,
  `Sesi` varchar(255) DEFAULT NULL,
  `MemberNo` varchar(50) DEFAULT NULL,
  `Isian` text,
  PRIMARY KEY (`ID`),
  KEY `survey_isian_pertanyaan_idx` (`Survey_Pertanyaan_id`),
  KEY `survey_isian_sesi` (`Sesi`),
  CONSTRAINT `survey_isian_pertanyaan` FOREIGN KEY (`Survey_Pertanyaan_id`) REFERENCES `survey_pertanyaan` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `survey_pertanyaan` */

DROP TABLE IF EXISTS `survey_pertanyaan`;

CREATE TABLE `survey_pertanyaan` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Survey_id` int(11) DEFAULT NULL,
  `Pertanyaan` text NOT NULL,
  `JenisPertanyaan` varchar(20) DEFAULT 'Pilihan' COMMENT 'Pilihan/isian',
  `Orientation` varchar(20) DEFAULT 'Vertikal' COMMENT 'Vertikal/Horisontal',
  `IsMandatory` bit(1) DEFAULT b'1',
  `IsCanMultipleAnswer` bit(1) DEFAULT b'0',
  `NoUrut` int(11) DEFAULT '1',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `survey_pertanyaan_survey_idx` (`Survey_id`),
  KEY `survey_pertanyaan_createby_idx` (`CreateBy`),
  KEY `survey_pertanyaan_updateby_idx` (`UpdateBy`),
  KEY `survey_pertanyaan_nourut` (`NoUrut`),
  KEY `survey_pertanyaan_jenis` (`JenisPertanyaan`),
  CONSTRAINT `survey_pertanyaan_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `survey_pertanyaan_survey` FOREIGN KEY (`Survey_id`) REFERENCES `survey` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `survey_pertanyaan_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `survey_pilihan` */

DROP TABLE IF EXISTS `survey_pilihan`;

CREATE TABLE `survey_pilihan` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Survey_Pertanyaan_id` int(11) DEFAULT NULL,
  `Pilihan` text NOT NULL,
  `ChoosenCount` int(11) DEFAULT '0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `survey_pilihan_survey_pertanyaan_idx` (`Survey_Pertanyaan_id`),
  KEY `survey_pilihan_createby_idx` (`CreateBy`),
  KEY `survey_pilihan_updateby_idx` (`UpdateBy`),
  CONSTRAINT `survey_pilihan_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `survey_pilihan_survey_pertanyaan` FOREIGN KEY (`Survey_Pertanyaan_id`) REFERENCES `survey_pertanyaan` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `survey_pilihan_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `survey_pilihan_sesi` */

DROP TABLE IF EXISTS `survey_pilihan_sesi`;

CREATE TABLE `survey_pilihan_sesi` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Survey_Pilihan_id` int(11) DEFAULT NULL,
  `MemberNo` varchar(50) DEFAULT NULL,
  `Sesi` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `survey_pilihan_sesi_pilihan_idx` (`Survey_Pilihan_id`),
  KEY `survey_pilihan_sesi` (`Sesi`),
  CONSTRAINT `survey_pilihan_sesi_pilihan` FOREIGN KEY (`Survey_Pilihan_id`) REFERENCES `survey_pilihan` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `tempnoinduk` */

DROP TABLE IF EXISTS `tempnoinduk`;

CREATE TABLE `tempnoinduk` (
  `ID` double NOT NULL AUTO_INCREMENT,
  `NoInduk` varchar(50) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `tempnoinduk_createby` (`CreateBy`),
  KEY `tempnoinduk_updateby` (`UpdateBy`),
  CONSTRAINT `tempnoinduk_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tempnoinduk_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2090 DEFAULT CHARSET=latin1;

/*Table structure for table `tujuan_kunjungan` */

DROP TABLE IF EXISTS `tujuan_kunjungan`;

CREATE TABLE `tujuan_kunjungan` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(100) NOT NULL,
  `TujuanKunjungan` varchar(255) NOT NULL,
  `Member` tinyint(1) DEFAULT NULL,
  `NonMember` tinyint(1) DEFAULT NULL,
  `Rombongan` tinyint(1) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Code` (`Code`),
  KEY `tujuan_kunjungan_createby` (`CreateBy`),
  KEY `tujuan_kunjungan_updateby` (`UpdateBy`),
  CONSTRAINT `tujuan_kunjungan_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tujuan_kunjungan_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `auth_key` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_reset_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '10',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password_reset_token` (`password_reset_token`),
  KEY `user_createby` (`CreateBy`),
  KEY `user` (`UpdateBy`),
  CONSTRAINT `user` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `userloclibforcol` */

DROP TABLE IF EXISTS `userloclibforcol`;

CREATE TABLE `userloclibforcol` (
  `User_id` int(11) NOT NULL,
  `LocLib_id` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  KEY `User_id` (`User_id`),
  KEY `LocLib_id` (`LocLib_id`),
  KEY `userloclibforcol_createby` (`CreateBy`),
  KEY `userloclibforcol_updateby` (`UpdateBy`),
  CONSTRAINT `FK_userloclibforcol_loclib` FOREIGN KEY (`LocLib_id`) REFERENCES `location_library` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK_userloclibforcol_user` FOREIGN KEY (`User_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userloclibforcol_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `userloclibforcol_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `userloclibforloan` */

DROP TABLE IF EXISTS `userloclibforloan`;

CREATE TABLE `userloclibforloan` (
  `User_id` int(11) NOT NULL,
  `LocLib_id` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  KEY `User_id` (`User_id`),
  KEY `LocLib_id` (`LocLib_id`),
  KEY `userloclibforloan_createby` (`CreateBy`),
  KEY `userloclibforloan` (`UpdateBy`),
  CONSTRAINT `FK_userloclibforloan_loclib` FOREIGN KEY (`LocLib_id`) REFERENCES `location_library` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_userloclibforloan_user` FOREIGN KEY (`User_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userloclibforloan` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `userloclibforloan_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `userlogs` */

DROP TABLE IF EXISTS `userlogs`;

CREATE TABLE `userlogs` (
  `User_id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  KEY `User_id` (`User_id`),
  KEY `userlogs_createby` (`CreateBy`),
  KEY `userlogs` (`UpdateBy`),
  CONSTRAINT `FKF49AED76753825B6` FOREIGN KEY (`User_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userlogs` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `userlogs_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `auth_key` varchar(32) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `status` smallint(10) DEFAULT NULL,
  `PhotoUrl` varchar(255) DEFAULT NULL,
  `Fullname` varchar(255) NOT NULL,
  `EmailAddress` varchar(255) DEFAULT NULL,
  `IsActive` bit(1) DEFAULT b'1',
  `SesID` varchar(255) DEFAULT NULL,
  `MaxDateSesID` datetime DEFAULT NULL,
  `ActivationCode` varchar(255) DEFAULT NULL,
  `LoginAttemp` int(11) DEFAULT NULL,
  `LastSubmtLogin` datetime DEFAULT NULL,
  `LastSuccess` datetime DEFAULT NULL,
  `Department_id` int(11) DEFAULT NULL,
  `Branch_id` int(11) DEFAULT NULL,
  `Role_id` int(11) NOT NULL,
  `IsCanResetUserPassword` bit(1) DEFAULT b'0',
  `IsCanResetMemberPassword` bit(1) DEFAULT b'0',
  `IsAdvanceEntryCatalog` bit(1) DEFAULT b'0',
  `IsAdvanceEntryCollection` bit(1) DEFAULT b'0',
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  `KIILastUploadDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Department_id` (`Department_id`),
  KEY `Branch_id` (`Branch_id`),
  KEY `Role_id` (`Role_id`),
  KEY `Users_Password` (`password`),
  KEY `users_createby` (`CreateBy`),
  KEY `users_updateby` (`UpdateBy`),
  KEY `users_kii` (`KIILastUploadDate`),
  KEY `Users_UserName` (`username`),
  KEY `users_createdate` (`CreateDate`),
  KEY `users_updatedate` (`UpdateDate`),
  KEY `users_IsActive` (`IsActive`),
  CONSTRAINT `FK617D3C3A6ADC8006` FOREIGN KEY (`Branch_id`) REFERENCES `branchs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK617D3C3AA5775E88` FOREIGN KEY (`Department_id`) REFERENCES `departments` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK617D3C3AD86F6C52` FOREIGN KEY (`Role_id`) REFERENCES `roles` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `users_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

/*Table structure for table `worksheetfielditems` */

DROP TABLE IF EXISTS `worksheetfielditems`;

CREATE TABLE `worksheetfielditems` (
  `WorksheetField_id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `RefferenceMode` varchar(20) NOT NULL,
  `StartPosition` int(11) DEFAULT NULL,
  `Length` int(11) DEFAULT NULL,
  `DefaultValue` varchar(255) DEFAULT NULL,
  `IdemTag` varchar(255) DEFAULT NULL,
  `IdemStartPosition` int(11) DEFAULT NULL,
  `Refference_id` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  KEY `Refference_id` (`Refference_id`),
  KEY `WorksheetField_id` (`WorksheetField_id`),
  KEY `WFItems_StartPosition` (`StartPosition`),
  KEY `worksheetfielditems_createby` (`CreateBy`),
  KEY `worksheetfielditems_updateby` (`UpdateBy`),
  CONSTRAINT `FKB9A428D2352BBDA2` FOREIGN KEY (`WorksheetField_id`) REFERENCES `worksheetfields` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKB9A428D2EACE6BC0` FOREIGN KEY (`Refference_id`) REFERENCES `refferences` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `worksheetfielditems_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `worksheetfielditems_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `worksheetfields` */

DROP TABLE IF EXISTS `worksheetfields`;

CREATE TABLE `worksheetfields` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Field_id` int(11) DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `Worksheet_id` int(11) DEFAULT NULL,
  `IsAkuisisi` bit(1) DEFAULT b'0',
  `ISDEPOSIT` bit(1) DEFAULT b'0',
  `ISDETAILKOLEKSI_PENGOLAHAN` bit(1) DEFAULT b'0',
  `ISDETAILKOLEKSI_AKUISISI` bit(1) DEFAULT b'0',
  PRIMARY KEY (`ID`),
  KEY `Field_id` (`Field_id`),
  KEY `Worksheet_id` (`Worksheet_id`),
  KEY `worksheetfields_createby` (`CreateBy`),
  KEY `worksheetfields_updateby` (`UpdateBy`),
  CONSTRAINT `FK1471BB4B66DFF9B4` FOREIGN KEY (`Field_id`) REFERENCES `fields` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK1471BB4BFEC5D3CC` FOREIGN KEY (`Worksheet_id`) REFERENCES `worksheets` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `worksheetfields_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `worksheetfields_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1212 DEFAULT CHARSET=latin1;

/*Table structure for table `worksheets` */

DROP TABLE IF EXISTS `worksheets`;

CREATE TABLE `worksheets` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Format_id` int(11) NOT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateTerminal` varchar(100) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateTerminal` varchar(100) DEFAULT NULL,
  `NoUrut` int(11) DEFAULT '99',
  `DEPOSITFORMAT_CODE` varchar(5) DEFAULT NULL,
  `ISSERIAL` tinyint(1) DEFAULT '0',
  `ISMUSIK` bit(1) DEFAULT b'0',
  `ISKARTOGRAFI` bit(1) DEFAULT b'0',
  `CODE` varchar(10) NOT NULL,
  `Keterangan` varchar(255) DEFAULT NULL,
  `MaxPinjamKoleksi` int(11) DEFAULT '0',
  `MaxLoanDays` int(11) DEFAULT '0',
  `DendaType` varchar(45) DEFAULT 'Konstan',
  `DendaTenorJumlah` decimal(10,0) DEFAULT '0',
  `DendaTenorSatuan` varchar(45) DEFAULT 'Hari',
  `DendaPerTenor` decimal(10,0) DEFAULT '0',
  `DendaTenorMultiply` int(11) DEFAULT '1',
  `SuspendMember` bit(1) DEFAULT b'0',
  `WarningLoanDueDay` int(11) DEFAULT '0',
  `SuspendType` varchar(45) DEFAULT 'Konstan',
  `SuspendTenorJumlah` double DEFAULT '0',
  `SuspendTenorSatuan` varchar(45) DEFAULT 'Hari',
  `DaySuspend` int(11) DEFAULT '0',
  `SuspendTenorMultiply` int(11) DEFAULT '1',
  `DayPerpanjang` int(11) DEFAULT '0',
  `CountPerpanjang` int(11) DEFAULT '0',
  `IsBerisiArtikel` bit(1) DEFAULT b'0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name` (`Name`),
  KEY `Format_id` (`Format_id`),
  KEY `worksheets_createby` (`CreateBy`),
  KEY `worksheets_updateby` (`UpdateBy`),
  CONSTRAINT `FK3800D37D5B024CA8` FOREIGN KEY (`Format_id`) REFERENCES `formats` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `worksheets_createby` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `worksheets_updateby` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;

/* Trigger structure for table `inbox` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `inbox_timestamp` */$$

/*!50003 CREATE */ /*!50017   */ /*!50003 TRIGGER `inbox_timestamp` BEFORE INSERT ON `inbox` FOR EACH ROW BEGIN
    IF NEW.ReceivingDateTime = '0000-00-00 00:00:00' THEN
        SET NEW.ReceivingDateTime = CURRENT_TIMESTAMP();
    END IF;
END */$$

DELIMITER ;

/* Trigger structure for table `outbox` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `outbox_timestamp` */$$

/*!50003 CREATE */ /*!50017   */ /*!50003 TRIGGER `outbox_timestamp` BEFORE INSERT ON `outbox` FOR EACH ROW BEGIN
    IF NEW.InsertIntoDB = '0000-00-00 00:00:00' THEN
        SET NEW.InsertIntoDB = CURRENT_TIMESTAMP();
    END IF;
    IF NEW.SendingDateTime = '0000-00-00 00:00:00' THEN
        SET NEW.SendingDateTime = CURRENT_TIMESTAMP();
    END IF;
    IF NEW.SendingTimeOut = '0000-00-00 00:00:00' THEN
        SET NEW.SendingTimeOut = CURRENT_TIMESTAMP();
    END IF;
END */$$

DELIMITER ;

/* Trigger structure for table `phones` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `phones_timestamp` */$$

/*!50003 CREATE */ /*!50017   */ /*!50003 TRIGGER `phones_timestamp` BEFORE INSERT ON `phones` FOR EACH ROW BEGIN
    IF NEW.InsertIntoDB = '0000-00-00 00:00:00' THEN
        SET NEW.InsertIntoDB = CURRENT_TIMESTAMP();
    END IF;
    IF NEW.TimeOut = '0000-00-00 00:00:00' THEN
        SET NEW.TimeOut = CURRENT_TIMESTAMP();
    END IF;
END */$$

DELIMITER ;

/* Trigger structure for table `sentitems` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `sentitems_timestamp` */$$

/*!50003 CREATE */ /*!50017   */ /*!50003 TRIGGER `sentitems_timestamp` BEFORE INSERT ON `sentitems` FOR EACH ROW BEGIN
    IF NEW.InsertIntoDB = '0000-00-00 00:00:00' THEN
        SET NEW.InsertIntoDB = CURRENT_TIMESTAMP();
    END IF;
    IF NEW.SendingDateTime = '0000-00-00 00:00:00' THEN
        SET NEW.SendingDateTime = CURRENT_TIMESTAMP();
    END IF;
END */$$

DELIMITER ;

/* Function  structure for function  `GetWarningLoanDueDay` */

/*!50003 DROP FUNCTION IF EXISTS `GetWarningLoanDueDay` */;
DELIMITER $$

/*!50003 CREATE   FUNCTION `GetWarningLoanDueDay`( JenisAnggotaID double, WorksheetID int(11)) RETURNS int(11)
BEGIN
declare WarningLoanDueDay int(11);
set WarningLoanDueDay = 0;
set WarningLoanDueDay = (SELECT WarningLoanDueDay FROM jenis_anggota WHERE jenis_anggota.id = JenisAnggotaID);
if WarningLoanDueDay = 0 then set WarningLoanDueDay = (SELECT WarningLoanDueDay FROM worksheets WHERE worksheets.id = WorksheetID); end if;
return WarningLoanDueDay;
END */$$
DELIMITER ;

/* Function  structure for function  `KATEGORY_UMUR` */

/*!50003 DROP FUNCTION IF EXISTS `KATEGORY_UMUR` */;
DELIMITER $$

/*!50003 CREATE   FUNCTION `KATEGORY_UMUR`( tglLahir_prm DATETIME ) RETURNS varchar(200) CHARSET latin1 COLLATE latin1_general_ci
BEGIN
    DECLARE umuranggota INTEGER;
    DECLARE katagory_umur_param varchar(200);
    
    SET umuranggota =YEAR(NOW())-YEAR(tglLahir_prm);
    
    IF DATE_FORMAT(tglLahir_prm,'%m%d')>DATE_FORMAT(NOW(),'%m%d') THEN SET umuranggota =umuranggota -1; END IF;
    select master_range_umur.`Keterangan` into katagory_umur_param from master_range_umur where umuranggota between master_range_umur.`umur1` and master_range_umur.`umur2`;
    RETURN katagory_umur_param;
    END */$$
DELIMITER ;

/* Function  structure for function  `levenshtein_ratio` */

/*!50003 DROP FUNCTION IF EXISTS `levenshtein_ratio` */;
DELIMITER $$

/*!50003 CREATE   FUNCTION `levenshtein_ratio`( s1 text, s2 text ) RETURNS int(11)
    DETERMINISTIC
BEGIN 
    DECLARE s1_len, s2_len, max_len INT; 
    SET s1_len = LENGTH(s1), s2_len = LENGTH(s2); 
    IF s1_len > s2_len THEN  
      SET max_len = s1_len;  
    ELSE  
      SET max_len = s2_len;  
    END IF; 
    RETURN ROUND((1 - LEVENSHTEIN(s1, s2) / max_len) * 100); 
  END */$$
DELIMITER ;

/* Function  structure for function  `SPLIT_STR` */

/*!50003 DROP FUNCTION IF EXISTS `SPLIT_STR` */;
DELIMITER $$

/*!50003 CREATE   FUNCTION `SPLIT_STR`(
x VARCHAR(255),
delim VARCHAR(12),
pos INT
) RETURNS varchar(255) CHARSET latin1
RETURN REPLACE(SUBSTRING(SUBSTRING_INDEX(x, delim, pos),
LENGTH(SUBSTRING_INDEX(x, delim, pos -1)) + 1),
delim, '') */$$
DELIMITER ;

/* Function  structure for function  `get_next_no_pemijaman_id` */

/*!50003 DROP FUNCTION IF EXISTS `get_next_no_pemijaman_id` */;
DELIMITER $$

/*!50003 CREATE   FUNCTION `get_next_no_pemijaman_id`() RETURNS varchar(20) CHARSET latin1
BEGIN
 DECLARE next_no_pemijaman VARCHAR(20);
 DECLARE last_no_pemijaman BIGINT(20) DEFAULT 1;
 DECLARE pemijaman_count BIGINT(20);
 
 SELECT COUNT(No_pinjaman) INTO pemijaman_count FROM lockers WHERE LEFT(No_pinjaman, 6) = DATE_FORMAT(NOW(),'%Y%m') ;
 IF pemijaman_count > 0 THEN
 
   SELECT RIGHT(No_pinjaman, 7) INTO last_no_pemijaman FROM lockers  WHERE LEFT(No_pinjaman, 6) = DATE_FORMAT(NOW(),'%Y%m')  ORDER BY no_pinjaman DESC LIMIT 0, 1;
   SET last_no_pemijaman = last_no_pemijaman+ 1;
 ELSE SET last_no_pemijaman =1;
 END IF;
 SET next_no_pemijaman = CONCAT(DATE_FORMAT(NOW(),'%Y%m'), REPEAT(0, 7 - LENGTH(last_no_pemijaman)), last_no_pemijaman);
 RETURN CONCAT(DATE_FORMAT(NOW(),'%Y%m'),REPEAT(0, 7 - LENGTH(last_no_pemijaman)),last_no_pemijaman);
END */$$
DELIMITER ;

/* Function  structure for function  `hasil35dec` */

/*!50003 DROP FUNCTION IF EXISTS `hasil35dec` */;
DELIMITER $$

/*!50003 CREATE   FUNCTION `hasil35dec`(param1 VARCHAR(3)) RETURNS varchar(11) CHARSET utf8
BEGIN
    DECLARE maxpengunjung VARCHAR(11) ;
    DECLARE pengunjung VARCHAR(11) ;
    SET maxpengunjung ='';
    SET pengunjung ='';
    IF param1 = 'GST' THEN
      SELECT MAX(nopengunjung) INTO maxpengunjung FROM memberguesses WHERE SUBSTR(nopengunjung,1,7)= CONCAT(param1,YEAR(NOW()));
    ELSE
      SELECT MAX(nopengunjung) INTO maxpengunjung FROM groupguesses WHERE SUBSTR(nopengunjung,1,7)= CONCAT(param1,YEAR(NOW()));
    END IF;
IF maxpengunjung IS NULL THEN 
	SET maxpengunjung=CONCAT(param1,YEAR(NOW()),'0001');
ELSE
	SET pengunjung =SUBSTR(maxpengunjung,8,4);
	SET pengunjung=CONV(pengunjung,36,10);
	SET pengunjung=pengunjung+1;
	SET pengunjung=CONV(pengunjung,10,36);
	SET maxpengunjung=CONCAT(param1,YEAR(NOW()),REPEAT(0, 4 - LENGTH(pengunjung)),pengunjung);
END IF;
RETURN maxpengunjung;
    END */$$
DELIMITER ;

/* Function  structure for function  `umur` */

/*!50003 DROP FUNCTION IF EXISTS `umur` */;
DELIMITER $$

/*!50003 CREATE   FUNCTION `umur`( tglLahir_prm DATEtime ) RETURNS int(11)
BEGIN
declare umuranggota integer;
set umuranggota =YEAR(NOW())-year(tglLahir_prm);
if DATE_FORMAT(tglLahir_prm,'%m%d')>DATE_FORMAT(now(),'%m%d') then SET umuranggota =umuranggota -1; end if;
return umuranggota;
END */$$
DELIMITER ;

/* Function  structure for function  `jaro_winkler_similarity` */

/*!50003 DROP FUNCTION IF EXISTS `jaro_winkler_similarity` */;
DELIMITER $$

/*!50003 CREATE   FUNCTION `jaro_winkler_similarity`(
in1 text,
in2 text
) RETURNS float
    DETERMINISTIC
BEGIN
declare finestra, curString, curSub, maxSub, trasposizioni, prefixlen, maxPrefix int;
declare char1, char2 char(1);
declare common1, common2, old1, old2 text;
declare trovato boolean;
declare returnValue, jaro float;
set maxPrefix=6; set common1="";
set common2="";
set finestra=(length(in1)+length(in2)-abs(length(in1)-length(in2))) DIV 4
+ ((length(in1)+length(in2)-abs(length(in1)-length(in2)))/2) mod 2;
set old1=in1;
set old2=in2;
set curString=1;
while curString<=length(in1) and (curString<=(length(in2)+finestra)) do
set curSub=curstring-finestra;
if (curSub)<1 then
set curSub=1;
end if;
set maxSub=curstring+finestra;
if (maxSub)>length(in2) then
set maxSub=length(in2);
end if;
set trovato = false;
while curSub<=maxSub and trovato=false do
if substr(in1,curString,1)=substr(in2,curSub,1) then
set common1 = concat(common1,substr(in1,curString,1));
set in2 = concat(substr(in2,1,curSub-1),concat("0",substr(in2,curSub+1,length(in2)-curSub+1)));
set trovato=true;
end if;
set curSub=curSub+1;
end while;
set curString=curString+1;
end while;
set in2=old2;
set curString=1;
while curString<=length(in2) and (curString<=(length(in1)+finestra)) do
set curSub=curstring-finestra;
if (curSub)<1 then
set curSub=1;
end if;
set maxSub=curstring+finestra;
if (maxSub)>length(in1) then
set maxSub=length(in1);
end if;
set trovato = false;
while curSub<=maxSub and trovato=false do
if substr(in2,curString,1)=substr(in1,curSub,1) then
set common2 = concat(common2,substr(in2,curString,1));
set in1 = concat(substr(in1,1,curSub-1),concat("0",substr(in1,curSub+1,length(in1)-curSub+1)));
set trovato=true;
end if;
set curSub=curSub+1;
end while;
set curString=curString+1;
end while;
set in1=old1;
if length(common1)<>length(common2)
then set jaro=0;
elseif length(common1)=0 or length(common2)=0
then set jaro=0;
else
set trasposizioni=0;
set curString=1;
while curString<=length(common1) do
if(substr(common1,curString,1)<>substr(common2,curString,1)) then
set trasposizioni=trasposizioni+1;
end if;
set curString=curString+1;
end while;
set jaro=
(
length(common1)/length(in1)+
length(common2)/length(in2)+
(length(common1)-trasposizioni/2)/length(common1)
)/3;
end if; set prefixlen=0;
while (substring(in1,prefixlen+1,1)=substring(in2,prefixlen+1,1)) and (prefixlen<6) do
set prefixlen= prefixlen+1;
end while;
return jaro+(prefixlen*0.1*(1-jaro));
END */$$
DELIMITER ;

/* Function  structure for function  `levenshtein` */

/*!50003 DROP FUNCTION IF EXISTS `levenshtein` */;
DELIMITER $$

/*!50003 CREATE   FUNCTION `levenshtein`( s1 text, s2 text) RETURNS int(11)
    DETERMINISTIC
BEGIN 
    DECLARE s1_len, s2_len, i, j, c, c_temp, cost INT; 
    DECLARE s1_char CHAR; 
    DECLARE cv0, cv1 text; 
    SET s1_len = CHAR_LENGTH(s1), s2_len = CHAR_LENGTH(s2), cv1 = 0x00, j = 1, i = 1, c = 0; 
    IF s1 = s2 THEN 
      RETURN 0; 
    ELSEIF s1_len = 0 THEN 
      RETURN s2_len; 
    ELSEIF s2_len = 0 THEN 
      RETURN s1_len; 
    ELSE 
      WHILE j <= s2_len DO 
        SET cv1 = CONCAT(cv1, UNHEX(HEX(j))), j = j + 1; 
      END WHILE; 
      WHILE i <= s1_len DO 
        SET s1_char = SUBSTRING(s1, i, 1), c = i, cv0 = UNHEX(HEX(i)), j = 1; 
        WHILE j <= s2_len DO 
          SET c = c + 1; 
          IF s1_char = SUBSTRING(s2, j, 1) THEN  
            SET cost = 0; ELSE SET cost = 1; 
          END IF; 
          SET c_temp = CONV(HEX(SUBSTRING(cv1, j, 1)), 16, 10) + cost; 
          IF c > c_temp THEN SET c = c_temp; END IF; 
            SET c_temp = CONV(HEX(SUBSTRING(cv1, j+1, 1)), 16, 10) + 1; 
            IF c > c_temp THEN  
              SET c = c_temp;  
            END IF; 
            SET cv0 = CONCAT(cv0, UNHEX(HEX(c))), j = j + 1; 
        END WHILE; 
        SET cv1 = cv0, i = i + 1; 
      END WHILE; 
    END IF; 
    RETURN c; 
  END */$$
DELIMITER ;

/* Function  structure for function  `regexp_replace` */

/*!50003 DROP FUNCTION IF EXISTS `regexp_replace` */;
DELIMITER $$

/*!50003 CREATE   FUNCTION `regexp_replace`(pattern VARCHAR(1000),replacement VARCHAR(1000),original VARCHAR(1000)) RETURNS varchar(1000) CHARSET latin1
    DETERMINISTIC
BEGIN
DECLARE temp VARCHAR(1000);
DECLARE ch VARCHAR(1);
DECLARE i INT;
DECLARE j INT;
DECLARE qbTemp VARCHAR(1000);
SET i = 1;
SET j = 1;
SET temp = '';
SET qbTemp = '';
IF original REGEXP pattern THEN
loop_label: LOOP
IF i>CHAR_LENGTH(original) THEN
LEAVE loop_label;
END IF;
SET ch = SUBSTRING(original,i,1);
IF NOT ch REGEXP pattern THEN
SET temp = CONCAT(temp,ch);
ELSE
SET temp = CONCAT(temp,replacement);
END IF;
SET i=i+1;
END LOOP;
ELSE
SET temp = original;
END IF;
SET temp = TRIM(BOTH replacement FROM temp);
SET temp = REPLACE(REPLACE(REPLACE(temp , CONCAT(replacement,replacement),CONCAT(replacement,'#')),CONCAT('#',replacement),''),'#','');
RETURN temp;
END */$$
DELIMITER ;

/* Function  structure for function  `regex_replace_master` */

/*!50003 DROP FUNCTION IF EXISTS `regex_replace_master` */;
DELIMITER $$

/*!50003 CREATE   FUNCTION `regex_replace_master`(pattern VARCHAR(1000),replacement VARCHAR(1000),original VARCHAR(1000)) RETURNS varchar(1000) CHARSET latin1
    DETERMINISTIC
BEGIN
DECLARE temp VARCHAR(1000);
DECLARE ch VARCHAR(1);
DECLARE i INT;
DECLARE j INT;
DECLARE qbTemp VARCHAR(1000);
SET i = 1;
SET j = 1;
SET temp = '';
SET qbTemp = '';
IF original REGEXP pattern THEN
loop_label: LOOP
IF i>CHAR_LENGTH(original) THEN
LEAVE loop_label;
END IF;
SET ch = SUBSTRING(original,i,1);
IF NOT ch REGEXP pattern THEN
SET temp = CONCAT(temp,ch);
ELSE
SET temp = CONCAT(temp,replacement);
END IF;
SET i=i+1;
END LOOP;
ELSE
SET temp = original;
END IF;
SET temp = TRIM(BOTH replacement FROM temp);
SET temp = REPLACE(REPLACE(REPLACE(temp , CONCAT(replacement,replacement),CONCAT(replacement,'#')),CONCAT('#',replacement),''),'#','');
RETURN SUBSTRING(temp,1,1);
END */$$
DELIMITER ;

/* Function  structure for function  `terbilang` */

/*!50003 DROP FUNCTION IF EXISTS `terbilang` */;
DELIMITER $$

/*!50003 CREATE   FUNCTION `terbilang`(angka bigint) RETURNS varchar(5000) CHARSET utf8
BEGIN
 DECLARE sString varchar(30);
 DECLARE Bil1 varchar(255);
 DECLARE Bil2 varchar(255);
 DECLARE STot varchar(255);
 DECLARE X int;
 DECLARE Y int;
 DECLARE Z int;
 DECLARE Urai varchar(5000);
 SET sString = CAST(angka as char);
 SET Urai = '';
 SET X = 0;
 SET Y = 0;
 WHILE X <> LENGTH(sString) DO
SET X = X + 1;
SET sTot = MID(sString, X, 1);
SET Y = Y + CAST(sTot as UNSIGNED);
SET Z = LENGTH(sString) - X + 1;
CASE CAST(sTot as UNSIGNED)
WHEN 1 THEN
 BEGIN
  IF (Z = 1 OR Z = 7 OR Z = 10 OR Z = 13) THEN
   SET Bil1 = 'SATU ';
  ELSEIF (z = 4) THEN
   IF (x = 1) THEN
    SET Bil1 = 'SE';
   ELSE
    SET Bil1 = 'SATU';
   END IF;
  ELSEIF (Z = 2 OR Z = 5 OR Z = 8 OR Z = 11 OR Z = 14) THEN
   SET X = X + 1;
   SET sTot = MID(sString, X, 1);
   SET Z = LENGTH(sString) - X + 1;
   SET Bil2 = '';
   CASE CAST(sTot AS UNSIGNED)
    WHEN 0 THEN SET Bil1 = 'SEPULUH ';
    WHEN 1 THEN SET Bil1 = 'SEBELAS ';
    WHEN 2 THEN SET Bil1 = 'DUA BELAS ';
    WHEN 3 THEN SET Bil1 = 'TIGA BELAS ';
    WHEN 4 THEN SET Bil1 = 'EMPAT BELAS ';
    WHEN 5 THEN SET Bil1 = 'LIMA BELAS ';
    WHEN 6 THEN SET Bil1 = 'ENAM BELAS ';
    WHEN 7 THEN SET Bil1 = 'TUJUH BELAS ';
    WHEN 8 THEN SET Bil1 = 'DELAPAN BELAS ';
    WHEN 9 THEN SET Bil1 = 'SEMBILAN BELAS ';
   ELSE BEGIN END;
   END CASE;
  ELSE
   SET Bil1 = 'SE';
  END IF;
 END;
WHEN 2 THEN SET Bil1 = 'DUA ';
WHEN 3 THEN SET Bil1 = 'TIGA ';
WHEN 4 THEN SET Bil1 = 'EMPAT ';
WHEN 5 THEN SET Bil1 = 'LIMA ';
WHEN 6 THEN SET Bil1 = 'ENAM ';
WHEN 7 THEN SET Bil1 = 'TUJUH ';
WHEN 8 THEN SET Bil1 = 'DELAPAN ';
WHEN 9 THEN SET Bil1 = 'SEMBILAN ';
ELSE SET Bil1 = '';
END CASE;
IF CAST(sTot as UNSIGNED) > 0 THEN
IF (Z = 2 OR Z = 5 OR Z = 8 OR Z = 11 OR Z = 14) THEN
 SET Bil2 = 'PULUH ';
ELSEIF (Z = 3 OR Z = 6 OR Z = 9 OR Z = 12 OR Z = 15) THEN
 SET Bil2 = 'RATUS ';
ELSE
 SET Bil2 = '';
END IF;
ELSE
SET Bil2 = '';
END IF;
IF Y > 0 THEN
CASE Z
 WHEN 4 THEN BEGIN SET Bil2 = CONCAT(Bil2, 'RIBU '); SET Y = 0; END;
 WHEN 7 THEN BEGIN SET Bil2 = CONCAT(Bil2, 'JUTA '); SET Y = 0; END;
 WHEN 10 THEN BEGIN SET Bil2 = CONCAT(Bil2, 'MILYAR '); SET Y = 0; END;
 WHEN 13 THEN BEGIN SET Bil2 = CONCAT(Bil2, 'TRILYUN '); SET Y = 0; END;
 ELSE BEGIN END;
END CASE;
END IF;
SET Urai = CONCAT(Urai, Bil1, Bil2);
END WHILE;
RETURN Urai;
END */$$
DELIMITER ;

/* Function  structure for function  `TO_MARC` */

/*!50003 DROP FUNCTION IF EXISTS `TO_MARC` */;
DELIMITER $$

/*!50003 CREATE   FUNCTION `TO_MARC`( CATID INT) RETURNS text CHARSET latin1
    DETERMINISTIC
BEGIN
DECLARE v_ID INT(10);
DECLARE v_CatalogId DOUBLE;
DECLARE v_Tag VARCHAR(3);
DECLARE v_Indicator1 CHAR(1);
DECLARE v_Indicator2 CHAR(1);
DECLARE v_Value VARCHAR(4000);
DECLARE done INT DEFAULT FALSE;
DECLARE curCR CURSOR FOR SELECT ID,CatalogId,Tag,Indicator1,Indicator2,Value FROM catalog_ruas WHERE CatalogId=CATID;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
SET @FD = '^';
SET @WORKSHEET_ID = (SELECT Worksheet_id FROM catalogs WHERE ID=CATID);
SET @LEADER = '[LEN]c';
SET @TypeOfRecord = 'a';
IF @WORKSHEET_ID = 1  THEN SET @TypeOfRecord = 'a'; END IF;
IF @WORKSHEET_ID = 3  THEN SET @TypeOfRecord = 'g'; END IF;
IF @WORKSHEET_ID = 5  THEN SET @TypeOfRecord = 'e'; END IF;
IF @WORKSHEET_ID = 7  THEN SET @TypeOfRecord = 'g'; END IF;
IF @WORKSHEET_ID = 8  THEN SET @TypeOfRecord = 'j'; END IF;
IF @WORKSHEET_ID = 9  THEN SET @TypeOfRecord = 'p'; END IF;
IF @WORKSHEET_ID = 10  THEN SET @TypeOfRecord = 'j'; END IF;
IF @WORKSHEET_ID = 11  THEN SET @TypeOfRecord = 'g'; END IF;
IF @WORKSHEET_ID = 12  THEN SET @TypeOfRecord = 'f'; END IF;
IF @WORKSHEET_ID = 13  THEN SET @TypeOfRecord = 'a'; END IF;
IF @WORKSHEET_ID = 41  THEN SET @TypeOfRecord = 'a'; END IF;
IF @WORKSHEET_ID = 21  THEN SET @TypeOfRecord = 'k'; END IF;
IF @WORKSHEET_ID = 20  THEN SET @TypeOfRecord = 'm'; END IF;
IF @WORKSHEET_ID = 102  THEN SET @TypeOfRecord = 'a'; END IF;
SET @LEADER = CONCAT(@LEADER, @TypeOfRecord);
SET @BibLevel = 'm';
IF @WORKSHEET_ID = 13  THEN SET @TypeOfRecord = 's'; END IF;
IF @WORKSHEET_ID = 102  THEN SET @TypeOfRecord = 'a'; END IF;
SET @LEADER = CONCAT(@LEADER, @BibLevel, '  22[BAD]   4500');
SET @RESULT = '';
SET @DIRVAL = '';
SET @DIRNUM = 0;
SET @RECVAL = '';
OPEN curCR;
REPEAT
FETCH curCR INTO v_ID, v_CatalogId, v_Tag, v_Indicator1, v_Indicator2, v_Value;
IF NOT done AND LENGTH(v_Value) > 0 THEN
IF v_Tag = '035' THEN
IF LENGTH(v_Indicator1) = 0 THEN
SET v_Indicator1 = '#';
END IF;
IF LENGTH(v_Indicator2) = 0 THEN
SET v_Indicator2 = '#';
END IF;
IF SUBSTR(v_Value, 1, 2) <> '$a' THEN
SET v_Value = CONCAT('$a ', v_Value);
END IF;
END IF;
SET @LEN = 0;
SET @VAL3 = LPAD(@DIRNUM, 5, '0');
SET @DATAVAL = '';
SET @v_Indicator1 = v_Indicator1;
SET @v_Indicator2 = v_Indicator2;
SET @v_Value = v_Value;
IF v_Tag <= '010' THEN
SET @LEN = LENGTH(@v_Value) + 1;
SET @DIRNUM = @DIRNUM + @LEN;
SET @DATAVAL = @v_Value;
ELSE
SET @LEN = LENGTH(@v_Indicator1) + LENGTH(@v_Indicator2) + LENGTH(@v_Value) + 1;
SET @DIRNUM = @DIRNUM + @LEN;
SET @DATAVAL = CONCAT(@v_Indicator1, @v_Indicator2, @v_Value);
END IF;
SET @VAL1 = v_Tag;
SET @VAL2 = LPAD(@LEN, 4, '0');
SET @DIRVAL = CONCAT(@DIRVAL, @VAL1, @VAL2, @VAL3);
SET @RECVAL = CONCAT(@RECVAL, @FD, @DATAVAL);
END IF;
UNTIL done END REPEAT;
CLOSE curCR;
SET @RESULT = CONCAT(@LEADER, @DIRVAL);
SET @IndexBAD = LENGTH(@RESULT);
SET @RESULT = REPLACE(@RESULT, '[BAD]', LPAD(@IndexBAD, 5, '0'));
SET @RESULT = CONCAT(@RESULT, @RECVAL);
SET @RESULT = REPLACE(@RESULT, '[LEN]', LPAD(LENGTH(@RESULT), 5, '0'));
RETURN @RESULT;
END */$$
DELIMITER ;

/* Procedure structure for procedure `20newCollectionOpac` */

/*!50003 DROP PROCEDURE IF EXISTS  `20newCollectionOpac` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `20newCollectionOpac`()
BEGIN
SELECT c.id AS id, c.title AS title, c.author AS author, c.PublishLocation AS PublishLocation, 
				c.publishyear AS YEAR, CONCAT(c.PublishLocation, '  ' , c.Publisher, '  ' ,c.publishyear) AS penerbitan, 
				c.publisher AS publisher,  c.publishyear AS YEAR, CONCAT(c.publisher, ' : ', c.publishyear) AS penerbitan,
				s.CreateDate, w.name AS wn, TRIM(c.coverurl) AS coverurl, c.callnumber AS callnumber
				FROM collections s 
               INNER JOIN catalogs c ON c.id = s.catalog_id 
                              LEFT JOIN worksheets w ON w.ID = c.Worksheet_id 
               WHERE c.isopac =1 
               GROUP BY c.id 
               ORDER BY s.createdate DESC LIMIT 0,20;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `BrowseOpac` */

/*!50003 DROP PROCEDURE IF EXISTS  `BrowseOpac` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `BrowseOpac`(
                    IN keyword TEXT,
                    IN keyword2 TEXT,
                    IN keyword3 TEXT,
                    IN isLKD TEXT,
                    IN Location TEXT
                    )
BEGIN
                    IF isLKD = 1
                     THEN
                            IF keyword = 'Alphabetical' AND keyword2 = '' THEN
                            SET @query_as_string=CONCAT("SELECT 'A' AS `A` UNION ALL SELECT 'B' AS `B` UNION ALL SELECT 'C' AS `C` UNION ALL SELECT 'D' AS `D` UNION ALL SELECT 'E' AS `E` UNION ALL SELECT 'F' AS `F` UNION ALL SELECT 'G' AS `G` UNION ALL SELECT 'H' AS `H` UNION ALL SELECT 'I' AS `I` UNION ALL SELECT 'J' AS `J` UNION ALL SELECT 'K' AS `K` UNION ALL SELECT 'L' AS `L` UNION ALL SELECT 'M' AS `M` UNION ALL SELECT 'N' AS `N` UNION ALL SELECT 'O' AS `O` UNION ALL SELECT 'P' AS `P` UNION ALL SELECT 'Q' AS `Q` UNION ALL SELECT 'R' AS `R` UNION ALL SELECT 'S' AS `S` UNION ALL SELECT 'T' AS `T` UNION ALL SELECT 'U' AS `U` UNION ALL SELECT 'V' AS `V` UNION ALL SELECT 'W' AS `W` UNION ALL SELECT 'X' AS `X` UNION ALL SELECT 'Y' AS `Y` UNION ALL SELECT 'Z' AS `Z`");             
                              PREPARE statement_1 FROM @query_as_string;
                              EXECUTE statement_1;
                              DEALLOCATE PREPARE statement_1;
                            END IF;
                            IF keyword = 'Alphabetical' AND keyword2 <> '' THEN
                            SET @query_as_string=CONCAT('
                             SELECT distinct CAT.',keyword2,' as name,COUNT(CAT.',keyword2,') as jml FROM catalogs CAT
                                                        INNER JOIN catalogfiles CF on  CAT.ID = CF.Catalog_id
                                                        WHERE CAT.isopac=1
                                                        AND CAT.',keyword2,' like "',keyword3,'%"  
                                                        GROUP BY name
                                                        ORDER BY jml desc
                                                        limit 0,20');             
                              PREPARE statement_1 FROM @query_as_string;
                              EXECUTE statement_1;
                              DEALLOCATE PREPARE statement_1;
                            END IF;
                            IF keyword2 = '' AND keyword <> 'Alphabetical' THEN
                            SET @query_as_string=CONCAT('
                                SELECT distinct CAT.',keyword,'  as name,COUNT(CAT.',keyword,' ) as jml FROM catalogs CAT
                                                        INNER JOIN catalogfiles CF on  CAT.ID = CF.Catalog_id
                                                        WHERE CAT.isopac=1
                                                        GROUP BY name
                                                        ORDER BY jml desc
                                                        limit 0,20 ');             
                              PREPARE statement_1 FROM @query_as_string;
                              EXECUTE statement_1;
                              DEALLOCATE PREPARE statement_1;
                            END IF;
                            IF keyword2 <> '' AND keyword <> 'Alphabetical' THEN
                            SET @query_as_string=CONCAT('
                                SELECT distinct CAT.',keyword2,' as name,COUNT(CAT.',keyword2,') as jml FROM catalogs CAT
                                                        INNER JOIN catalogfiles CF on  CAT.ID = CF.Catalog_id
                                                        WHERE CAT.isopac=1 AND
                                                        CAT.',keyword,' = "',keyword3,'"
                                                        GROUP BY name
                                                        ORDER BY jml desc
                                                        limit 0,20;');             
                              PREPARE statement_1 FROM @query_as_string;
                              EXECUTE statement_1;
                              DEALLOCATE PREPARE statement_1;    
                            END IF;
                    ELSE
                    IF Location <> 0
                     THEN
                            IF keyword = 'Alphabetical' AND keyword2 = '' THEN
                            SET @query_as_string=CONCAT("SELECT 'A' AS `A` UNION ALL SELECT 'B' AS `B` UNION ALL SELECT 'C' AS `C` UNION ALL SELECT 'D' AS `D` UNION ALL SELECT 'E' AS `E` UNION ALL SELECT 'F' AS `F` UNION ALL SELECT 'G' AS `G` UNION ALL SELECT 'H' AS `H` UNION ALL SELECT 'I' AS `I` UNION ALL SELECT 'J' AS `J` UNION ALL SELECT 'K' AS `K` UNION ALL SELECT 'L' AS `L` UNION ALL SELECT 'M' AS `M` UNION ALL SELECT 'N' AS `N` UNION ALL SELECT 'O' AS `O` UNION ALL SELECT 'P' AS `P` UNION ALL SELECT 'Q' AS `Q` UNION ALL SELECT 'R' AS `R` UNION ALL SELECT 'S' AS `S` UNION ALL SELECT 'T' AS `T` UNION ALL SELECT 'U' AS `U` UNION ALL SELECT 'V' AS `V` UNION ALL SELECT 'W' AS `W` UNION ALL SELECT 'X' AS `X` UNION ALL SELECT 'Y' AS `Y` UNION ALL SELECT 'Z' AS `Z`");             
                              PREPARE statement_1 FROM @query_as_string;
                              EXECUTE statement_1;
                              DEALLOCATE PREPARE statement_1;
                            END IF;
                            IF keyword = 'Alphabetical' AND keyword2 <> '' THEN
                            SET @query_as_string=CONCAT('
                             SELECT distinct CAT.',keyword2,' as name,COUNT(CAT.',keyword2,') as jml FROM catalogs CAT
                                                        LEFT JOIN collections col ON col.Catalog_id = CAT.ID
                                                        WHERE CAT.isopac=1 
                                                        AND col.Location_id = ',Location,'
                                                        AND CAT.',keyword2,' like "',keyword3,'%"  
                                                        GROUP BY name
                                                        ORDER BY jml desc
                                                        limit 0,20');             
                              PREPARE statement_1 FROM @query_as_string;
                              EXECUTE statement_1;
                              DEALLOCATE PREPARE statement_1;
                            END IF;
                            IF keyword2 = '' AND keyword <> 'Alphabetical' THEN
                            SET @query_as_string=CONCAT('
                                SELECT distinct CAT.',keyword,'  as name,COUNT(CAT.',keyword,' ) as jml FROM catalogs CAT
                                                        LEFT JOIN collections col ON col.Catalog_id = CAT.ID
                                                        WHERE CAT.isopac=1
                                                        AND col.Location_id = ',Location,'
                                                        GROUP BY name
                                                        ORDER BY jml desc
                                                        limit 0,20 ');             
                              PREPARE statement_1 FROM @query_as_string;
                              EXECUTE statement_1;
                              DEALLOCATE PREPARE statement_1;
                            END IF;
                            IF keyword2 <> '' AND keyword <> 'Alphabetical' THEN
                            SET @query_as_string=CONCAT('
                                SELECT distinct CAT.',keyword2,' as name,COUNT(CAT.',keyword2,') as jml FROM catalogs CAT
                                                        LEFT JOIN collections col ON col.Catalog_id = CAT.ID
                                                        WHERE CAT.isopac=1
                                                        AND col.Location_id = ',Location,'          
                                                        AND
                                                        CAT.',keyword,' = "',keyword3,'"
                                                        GROUP BY name
                                                        ORDER BY jml desc
                                                        limit 0,20;');             
                              PREPARE statement_1 FROM @query_as_string;
                              EXECUTE statement_1;
                              DEALLOCATE PREPARE statement_1;    
                            END IF;
                    ELSE
                            IF keyword = 'Alphabetical' AND keyword2 = '' THEN
                            SET @query_as_string=CONCAT("SELECT 'A' AS `A` UNION ALL SELECT 'B' AS `B` UNION ALL SELECT 'C' AS `C` UNION ALL SELECT 'D' AS `D` UNION ALL SELECT 'E' AS `E` UNION ALL SELECT 'F' AS `F` UNION ALL SELECT 'G' AS `G` UNION ALL SELECT 'H' AS `H` UNION ALL SELECT 'I' AS `I` UNION ALL SELECT 'J' AS `J` UNION ALL SELECT 'K' AS `K` UNION ALL SELECT 'L' AS `L` UNION ALL SELECT 'M' AS `M` UNION ALL SELECT 'N' AS `N` UNION ALL SELECT 'O' AS `O` UNION ALL SELECT 'P' AS `P` UNION ALL SELECT 'Q' AS `Q` UNION ALL SELECT 'R' AS `R` UNION ALL SELECT 'S' AS `S` UNION ALL SELECT 'T' AS `T` UNION ALL SELECT 'U' AS `U` UNION ALL SELECT 'V' AS `V` UNION ALL SELECT 'W' AS `W` UNION ALL SELECT 'X' AS `X` UNION ALL SELECT 'Y' AS `Y` UNION ALL SELECT 'Z' AS `Z`");             
                              PREPARE statement_1 FROM @query_as_string;
                              EXECUTE statement_1;
                              DEALLOCATE PREPARE statement_1;
                            END IF;
                            IF keyword = 'Alphabetical' AND keyword2 <> '' THEN
                            SET @query_as_string=CONCAT('
                             SELECT distinct CAT.',keyword2,' as name,COUNT(CAT.',keyword2,') as jml FROM catalogs CAT
                                                        
                                                        WHERE CAT.isopac=1
                                                        AND CAT.',keyword2,' like "',keyword3,'%"  
                                                        GROUP BY name
                                                        ORDER BY jml desc
                                                        limit 0,20');             
                              PREPARE statement_1 FROM @query_as_string;
                              EXECUTE statement_1;
                              DEALLOCATE PREPARE statement_1;
                            END IF;
                            IF keyword2 = '' AND keyword <> 'Alphabetical' THEN
                            SET @query_as_string=CONCAT('
                                SELECT distinct CAT.',keyword,'  as name,COUNT(CAT.',keyword,' ) as jml FROM catalogs CAT
                                                        WHERE CAT.isopac=1
                                                        GROUP BY name
                                                        ORDER BY jml desc
                                                        limit 0,20 ');             
                              PREPARE statement_1 FROM @query_as_string;
                              EXECUTE statement_1;
                              DEALLOCATE PREPARE statement_1;
                            END IF;
                            IF keyword2 <> '' AND keyword <> 'Alphabetical' THEN
                            SET @query_as_string=CONCAT('
                                SELECT distinct CAT.',keyword2,' as name,COUNT(CAT.',keyword2,') as jml FROM catalogs CAT
                                                        WHERE CAT.isopac=1 AND
                                                        CAT.',keyword,' = "',keyword3,'"
                                                        GROUP BY name
                                                        ORDER BY jml desc
                                                        limit 0,20;');             
                              PREPARE statement_1 FROM @query_as_string;
                              EXECUTE statement_1;
                              DEALLOCATE PREPARE statement_1;    
                            END IF;
                    END IF;
                    END IF;
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `countPencarianLanjutOpac1` */

/*!50003 DROP PROCEDURE IF EXISTS  `countPencarianLanjutOpac1` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `countPencarianLanjutOpac1`(
                        IN fAuthor TEXT,
                        IN fPublisher TEXT,
                        IN fPublishLoc TEXT,
                        IN fPublishYear TEXT,
                        IN fSubject TEXT,
                        IN fBahasa TEXT
                        )
BEGIN
                        SELECT COUNT(1)
                              FROM tempCariOpac
                              
                              WHERE
                              IF(fAuthor='',1=1,author = fAuthor) AND
                                   IF(fPublisher='',1=1,publisher = fPublisher) AND
                              IF(fPublishLoc='',1=1,PublishLocation = fPublishLoc) AND
                              IF(fPublishYear='',1=1,PublishYear = fPublishYear) AND
                              IF(fSubject='',1=1,Subject = fSubject) AND
                              IF(fSubject='',1=1,SUBJECT LIKE fSubject);
                              
                                 
                        END */$$
DELIMITER ;

/* Procedure structure for procedure `countPencarianSederhanaOpac1` */

/*!50003 DROP PROCEDURE IF EXISTS  `countPencarianSederhanaOpac1` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `countPencarianSederhanaOpac1`(
                IN fAuthor TEXT,
                IN fPublisher TEXT,
                IN fPublishLoc TEXT,
                IN fPublishYear TEXT,
                IN fSubject TEXT,
                IN fBahasa TEXT
                )
BEGIN
                SELECT COUNT(1)
                      FROM tempCariOpac 
                      
                      WHERE 
                        IF(fAuthor='',1=1,author LIKE concat('%',concat(fAuthor,'%'))) AND
                      IF(fPublisher='',1=1,publisher LIKE fPublisher) AND
                      IF(fPublishLoc='',1=1,PublishLocation LIKE fPublishLoc) AND
                      IF(fPublishYear='',1=1,PublishYear LIKE fPublishYear) AND
                      IF(fBahasa='',1=1,bahasa LIKE fBahasa) AND
                      IF(fSubject='',1=1,Subject LIKE fSubject) ;
                      
                         
                END */$$
DELIMITER ;

/* Procedure structure for procedure `countTelusurOpac1` */

/*!50003 DROP PROCEDURE IF EXISTS  `countTelusurOpac1` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `countTelusurOpac1`(
IN fAuthor TEXT,
IN fPublisher TEXT,
IN fPublishLoc TEXT,
IN fPublishYear TEXT
)
BEGIN
SELECT COUNT(1)
      FROM tempCariOpac
      
      WHERE 
      IF(fAuthor='',1=1,author LIKE fAuthor) AND
      IF(fPublisher='',1=1,publisher LIKE fPublisher) AND
      IF(fPublishLoc='',1=1,PublishLocation LIKE fPublishLoc) AND
      IF(fPublishYear='',1=1,PublishYear LIKE fPublishYear);
      
         
END */$$
DELIMITER ;

/* Procedure structure for procedure `explode_table` */

/*!50003 DROP PROCEDURE IF EXISTS  `explode_table` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `explode_table`(
bound VARCHAR(255),
IN fAuthor TEXT,
IN fPublisher TEXT,
IN fPublishLoc TEXT,
IN fPublishYear TEXT,
IN fSubject TEXT
)
BEGIN
DECLARE id INT DEFAULT 0;
DECLARE value TEXT;
DECLARE occurance INT DEFAULT 0;
DECLARE i INT DEFAULT 0;
DECLARE splitted_value varchar(25);
DECLARE done INT DEFAULT 0;
DECLARE cur1 CURSOR FOR SELECT author    FROM tempCariOpac
 WHERE 
      IF(fAuthor='',1=1,author LIKE concat('%',concat(fAuthor,'%'))) AND
      IF(fPublisher='',1=1,publisher LIKE fPublisher) AND
      IF(fPublishLoc='',1=1,PublishLocation LIKE fPublishLoc) AND
      IF(fPublishYear='',1=1,PublishYear LIKE fPublishYear) AND
	  IF(fSubject='',1=1,Subject LIKE fSubject);
                                     
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
DROP TEMPORARY TABLE IF EXISTS table2;
CREATE TEMPORARY TABLE table2(
`value` VARCHAR(56) NOT NULL
) engine=memory;
OPEN cur1;
  read_loop: LOOP
    FETCH cur1 INTO  value;
    IF done THEN
      LEAVE read_loop;
    END IF;
    SET occurance = (SELECT LENGTH(value)
                             - LENGTH(REPLACE(value, bound, ''))
                             +1);
    SET i=1;
    WHILE i <= occurance DO
      SET splitted_value =
      trim((SELECT REPLACE(SUBSTRING(SUBSTRING_INDEX(value, bound, i),
      LENGTH(SUBSTRING_INDEX(value, bound, i - 1)) + 1), ';', '')));
      INSERT INTO table2 VALUES ( splitted_value);
      SET i = i + 1;
    END WHILE;
  END LOOP;
 CLOSE cur1;
      IF(fAuthor='',1=1,author LIKE concat('%',concat(fAuthor,'%'))) AND
      IF(fPublisher='',1=1,publisher LIKE fPublisher) AND
      IF(fPublishLoc='',1=1,PublishLocation LIKE fPublishLoc) AND
      IF(fPublishYear='',1=1,PublishYear LIKE fPublishYear) AND
	  IF(fSubject='',1=1,Subject LIKE fSubject) AND author not like '%;%';
 
 END */$$
DELIMITER ;

/* Procedure structure for procedure `getStatKlasSubjekKoleksiDibaca` */

/*!50003 DROP PROCEDURE IF EXISTS  `getStatKlasSubjekKoleksiDibaca` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `getStatKlasSubjekKoleksiDibaca`(
	IN `Bfrom` TEXT, 
	IN `Bto` TEXT
	
    )
BEGIN
    
    
    SELECT 
	COUNT(*) AS CountEksemplar, 
	namakelas AS NAME, 
	COUNT(DISTINCT catalogs.ID) AS CountJudul 
	FROM bacaditempat  
	INNER JOIN collections ON collections.ID = bacaditempat.collection_id  
	INNER JOIN catalogs ON collections.Catalog_id = catalogs.ID  
	INNER JOIN master_kelas_besar ON SUBSTR(catalogs.DeweyNo,1,1) = SUBSTR(master_kelas_besar.kdKelas,1,1) 
	WHERE DATE(collections.TanggalPengadaan) BETWEEN Bfrom AND Bto
	GROUP BY 
	kdKelas 
	ORDER BY 
	kdKelas ;
    
    
    END */$$
DELIMITER ;

/* Procedure structure for procedure `getStatKlasSubjekKoleksiDipinjam` */

/*!50003 DROP PROCEDURE IF EXISTS  `getStatKlasSubjekKoleksiDipinjam` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `getStatKlasSubjekKoleksiDipinjam`(
	IN `Bfrom` TEXT, 
	IN `Bto` TEXT
    )
BEGIN
    
	SELECT 
	COUNT(*) AS CountEksemplar, 
	namakelas AS NAME, 
	COUNT(DISTINCT catalogs.ID) AS CountJudul 
	FROM collectionloanitems  
	INNER JOIN collections ON collections.ID = collectionloanitems.Collection_id  
	INNER JOIN catalogs ON collections.Catalog_id = catalogs.ID  
	INNER JOIN master_kelas_besar ON SUBSTR(catalogs.DeweyNo,1,1) = SUBSTR(master_kelas_besar.kdKelas,1,1) 
	WHERE DATE(collections.TanggalPengadaan) BETWEEN Bfrom AND Bto
	GROUP BY 
	kdKelas 
	ORDER BY 
	kdKelas ;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `detailCatalogOpac` */

/*!50003 DROP PROCEDURE IF EXISTS  `detailCatalogOpac` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `detailCatalogOpac`(IN `catID` int
)
BEGIN
SELECT	C.Worksheet_id,
(SELECT C.CoverURL FROM catalogs C WHERE C.ID = catID) AS CoverURL , 
(SELECT W.name FROM worksheets W WHERE W.ID = C.worksheet_id) AS JENIS_BAHAN,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (245,246,440,740) GROUP BY CR.CatalogId) AS JUDUL,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (240) GROUP BY CR.CatalogId) AS JUDUL_SERAGAM,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR '|') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (100,110,111,700,710,711,800,810,811) GROUP BY CR.CatalogId) AS PENGARANG,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (250) GROUP BY CR.CatalogId) AS EDISI,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (490) GROUP BY CR.CatalogId) AS PERNYATAAN_SERI,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (260,264) GROUP BY CR.CatalogId) AS PENERBITAN,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (300) GROUP BY CR.CatalogId) AS DESKRIPSI_FISIK,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (336) GROUP BY CR.CatalogId) AS KONTEN,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (337) GROUP BY CR.CatalogId) AS MEDIA,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (338) GROUP BY CR.CatalogId) AS PENYIMPANAN_MEDIA,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (538) GROUP BY CR.CatalogId) AS INFORMASI_TEKNIS,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (020) GROUP BY CR.CatalogId) AS ISBN,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (022) GROUP BY CR.CatalogId) AS ISSN,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (024) AND CR.indicator1 = 2 GROUP BY CR.CatalogId) AS ISMN,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR '|') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (600,610,611,650,651) GROUP BY CR.CatalogId) AS SUBJEK,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (520) GROUP BY CR.CatalogId) AS ABSTRAK,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (500,501,502,504,505,533,550) GROUP BY CR.CatalogId) AS CATATAN,
(SELECT RI.Name FROM catalog_ruas CR LEFT JOIN refferenceitems RI ON TRIM(RI.Code) = SUBSTRING(CR.VALUE,36,3) WHERE CR.CatalogId = C.ID AND CR.Tag = 008 AND RI.Refference_id = 5) AS BAHASA,
(SELECT RI.Name FROM catalog_ruas CR LEFT JOIN refferenceitems RI ON TRIM(RI.Code) = SUBSTRING(CR.VALUE,34,1) WHERE CR.CatalogId = C.ID AND CR.Tag = 008 AND RI.Refference_id = 17) AS BENTUK_KARYA,
(SELECT RI.Name FROM catalog_ruas CR LEFT JOIN refferenceitems RI ON TRIM(RI.Code) = SUBSTRING(CR.VALUE,23,1) WHERE CR.CatalogId = C.ID AND CR.Tag = 008 AND RI.Refference_id = 2) AS TARGET_PEMBACA,
(SELECT GROUP_CONCAT(CS.Value ORDER BY CR.Tag,CS.Sequence ASC SEPARATOR ' ') FROM catalog_subruas CS LEFT JOIN catalog_ruas CR ON CS.RuasID = CR.ID WHERE CR.CatalogId = C.ID AND CR.Tag IN (856) GROUP BY CR.CatalogId) AS LOKASI_AKSES_ONLINE
FROM catalogs C WHERE C.ID = catID AND isopac = 1;
      
         
END */$$
DELIMITER ;

/* Procedure structure for procedure `duplikat_katalog` */

/*!50003 DROP PROCEDURE IF EXISTS  `duplikat_katalog` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `duplikat_katalog`()
BEGIN
SELECT update_collection (separtorVar) FROM
(
SELECT  * FROM
(
SELECT GROUP_CONCAT(id SEPARATOR ',') separtorVar,COUNT(1) AS JUM  FROM `catalogs` GROUP BY `Title`,`Author`,`Edition`,`Publisher`,`PublishLocation`,`PublishYear`
) katalogdouble
WHERE  JUM>1
) update_collection;
DELETE FROM catalogs WHERE id NOT IN (SELECT catalog_id FROM collections);
END */$$
DELIMITER ;

/* Procedure structure for procedure `get_stat_jenis_pendidikan` */

/*!50003 DROP PROCEDURE IF EXISTS  `get_stat_jenis_pendidikan` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `get_stat_jenis_pendidikan`(
IN `Bfrom` text, 
IN `Bto` text
)
BEGIN
    SELECT 
        `mp`.`Nama` AS `Keterangan`,
        COUNT(`mem`.`ID`) AS `Jumlah`,
        DATE_FORMAT(`mem`.`CreateDate`, '%Y') AS `Tahun`
     
    FROM
        (`master_pendidikan` `mp`
        LEFT JOIN `members` `mem` ON ((`mem`.`EducationLevel_id` = `mp`.`id`)))
    WHERE
        (`mem`.`EducationLevel_id` IS NOT NULL)
        
        and   
        (CAST(`mem`.`CreateDate`
            AS DATE) BETWEEN Bfrom AND Bto )
        
        GROUP BY `mp`.`Nama` , DATE_FORMAT(`mem`.`CreateDate`, '%Y')
    ORDER BY `mp`.`id` , `mem`.`CreateDate`;
    
    
END */$$
DELIMITER ;

/* Procedure structure for procedure `get_stat_kelas_subject_koleksi` */

/*!50003 DROP PROCEDURE IF EXISTS  `get_stat_kelas_subject_koleksi` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `get_stat_kelas_subject_koleksi`(
IN `Bfrom` text, 
IN `Bto` text
)
BEGIN
SELECT 
COUNT(*) AS CountEksemplar, 
namakelas as Name, 
COUNT(DISTINCT catalogs.ID) AS CountJudul 
FROM collections  
INNER JOIN catalogs ON collections.Catalog_id = catalogs.ID  
INNER JOIN master_kelas_besar ON SUBSTR(catalogs.DeweyNo,1,1) = SUBSTR(master_kelas_besar.kdKelas,1,1) 
WHERE DATE(collections.TanggalPengadaan) BETWEEN Bfrom AND Bto 
GROUP BY 
kdKelas 
ORDER BY 
kdKelas;
END */$$
DELIMITER ;

/* Procedure structure for procedure `get_stat_range_umur` */

/*!50003 DROP PROCEDURE IF EXISTS  `get_stat_range_umur` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `get_stat_range_umur`(IN `Bfrom` text, IN `Bto` text
)
BEGIN
 SELECT 
        KATEGORY_UMUR(`members`.`DateOfBirth`) AS `Keterangan`,
        COUNT(`memberguesses`.`ID`) AS `Jumlah`
    FROM
        (`memberguesses`
        JOIN `members` ON ((`memberguesses`.`NoAnggota` = `members`.`MemberNo`)))
    WHERE
        (CAST(`memberguesses`.`CreateDate`
            AS DATE) BETWEEN Bfrom AND Bto )
    GROUP BY KATEGORY_UMUR(`members`.`DateOfBirth`)
    ORDER BY DATE_FORMAT(`memberguesses`.`CreateDate`,
            '%Y') DESC , COUNT(`memberguesses`.`ID`) DESC;
END */$$
DELIMITER ;

/* Procedure structure for procedure `facedArticle` */

/*!50003 DROP PROCEDURE IF EXISTS  `facedArticle` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `facedArticle`(
                    IN facedType TEXT,
                    IN fAuthor TEXT,
                    IN fPublisher TEXT,
                    IN fSubject TEXT,
                    IN fBahasa TEXT,
                    IN maxFaced INT
                    )
BEGIN
                IF facedType = 'Author'
                THEN
                    SELECT COALESCE(Creator_article,'-') Creator_article,COUNT(1) jml
                          FROM tempCariArticle 
                          
                          WHERE 
                          IF(fAuthor='',1=1,Creator_article LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                          IF(fPublisher='',1=1,publisher = fPublisher) AND
                          IF(fSubject='',1=1,subject_article = fSubject) AND
                          IF(fBahasa='',1=1,Languages = fBahasa)
                        GROUP BY Creator_article
                        ORDER BY jml DESC
                        LIMIT 0,maxFaced;              
                ELSE             
                IF facedType = 'Bahasa'
                THEN                  
                    SELECT Languages,COUNT(1) jml
                          FROM tempCariArticle 
                          
                          WHERE 
                          IF(fAuthor='',1=1,Creator_article LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                          IF(fPublisher='',1=1,publisher = fPublisher) AND
                          IF(fSubject='',1=1,subject_article = fSubject) AND
                          IF(fBahasa='',1=1,Languages = fBahasa)
                        GROUP BY Languages ORDER BY jml DESC
                        LIMIT 0,maxFaced;
                ELSE             
                IF facedType = 'Subject' 
                THEN
                    SELECT COALESCE(subject_article,'-') subject_article,COUNT(1) jml
                          FROM tempCariArticle 
                          
                          WHERE 
                          IF(fAuthor='',1=1,Creator_article LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                          IF(fPublisher='',1=1,publisher = fPublisher) AND
                          IF(fSubject='',1=1,subject_article = fSubject) AND
                          IF(fBahasa='',1=1,Languages = fBahasa)
                        GROUP BY subject_article ORDER BY jml DESC
                        LIMIT 0,maxFaced;
                ELSE             
                IF facedType = 'Publisher' 
                THEN
                    SELECT COALESCE(Publisher,'-') Publisher,COUNT(1) jml
                          FROM tempCariArticle 
                          
                          WHERE 
                          IF(fAuthor='',1=1,Creator_article LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                          IF(fPublisher='',1=1,publisher = fPublisher) AND
                          IF(fSubject='',1=1,subject_article = fSubject) AND
                          IF(fBahasa='',1=1,Languages = fBahasa)
                          
                        GROUP BY Publisher
                        ORDER BY jml DESC
                        LIMIT 0,maxFaced;
                END IF;
                END IF; 
                END IF; 
                END IF;         
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `facedAuthorOpac1` */

/*!50003 DROP PROCEDURE IF EXISTS  `facedAuthorOpac1` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `facedAuthorOpac1`(
                    IN fAuthor TEXT,
                    IN fPublisher TEXT,
                    IN fPublishLoc TEXT,
                    IN fPublishYear TEXT,
                    IN fSubject TEXT,
                    IN fBahasa TEXT,
                    IN maxFaced INT
                    )
BEGIN
                    -- call explode_table(';',fAuthor,fPublisher,fPublishLoc,fPublishYear,fSubject);
                                  
                    -- SELECT  COALESCE(Value,'-') Author ,COUNT(1) jml FROM table2 group by COALESCE(Value,'-') order by jml desc LIMIT 0,maxFaced;    
                              
                    SELECT Author,COUNT(1) jml
                          FROM tempCariOpac 
                          
                          WHERE 
                          IF(fAuthor='',1=1,Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                          IF(fPublisher='',1=1,publisher = fPublisher) AND
                          IF(fPublishLoc='',1=1,PublishLocation = fPublishLoc) AND
                          IF(fPublishYear='',1=1,PublishYear = fPublishYear) AND
                          IF(fSubject='',1=1,SUBJECT = fSubject) AND
                          IF(fBahasa='',1=1,bahasa = fBahasa)
                        GROUP BY Author
                        ORDER BY jml DESC
                        LIMIT 0,maxFaced;    
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `facedBahasaOpac1` */

/*!50003 DROP PROCEDURE IF EXISTS  `facedBahasaOpac1` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `facedBahasaOpac1`(
                    IN fAuthor TEXT,
                    IN fPublisher TEXT,
                    IN fPublishLoc TEXT,
                    IN fPublishYear TEXT,
                    IN fSubject TEXT,
                    IN fBahasa TEXT,
                    IN maxFaced INT
                    )
BEGIN
                                  
                    SELECT bahasa,COUNT(1) jml
                          FROM tempCariOpac 
                          
                          WHERE 
                          IF(fAuthor='',1=1,Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                          IF(fPublisher='',1=1,publisher = fPublisher) AND
                          IF(fPublishLoc='',1=1,PublishLocation = fPublishLoc) AND
                          IF(fPublishYear='',1=1,PublishYear = fPublishYear) AND
                          IF(fSubject='',1=1,SUBJECT = fSubject) AND
                          IF(fBahasa='',1=1,bahasa = fBahasa)
                        GROUP BY bahasa ORDER BY jml DESC
                        LIMIT 0,maxFaced;                 
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `insertTempSederhanaOpac` */

/*!50003 DROP PROCEDURE IF EXISTS  `insertTempSederhanaOpac` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `insertTempSederhanaOpac`(
                    IN keyword TEXT,
                    IN tag TEXT,
                    IN worksheet VARCHAR(255),
                    IN fAuthor TEXT,
                    IN fPublisher TEXT,
                    IN fPublishLoc TEXT,
                    IN fPublishYear TEXT,
                    IN fSubject TEXT,
                    IN fBahasa TEXT,
                    IN fromTgl TEXT,
                    IN toTgl TEXT,
                    IN isLKD TEXT,
                    IN Location TEXT
                    )
BEGIN
                    DROP TABLE IF EXISTS tempCariOpac;
                    CREATE  TEMPORARY TABLE tempCariOpac
                    (
                    CatalogId            INT(11),
                    title       TEXT,
                    author    TEXT,
                    publisher   TEXT,
                    PublishLocation  TEXT,
                    PublishYear TEXT,
                    SUBJECT TEXT,
                    bahasa TEXT,
                    CoverURL TEXT,
                    CallNumber TEXT,
                    worksheet_id INT,
                    worksheet TEXT,
                    ISSERIAL TEXT,
                    JML_BUKU INT,
                    ALL_BUKU INT,
                    KONTEN_DIGITAL VARCHAR(100)
                    );
                    IF isLKD = 1
                    THEN
                     INSERT INTO tempCariOpac
                     SELECT DISTINCT CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.Languages,CAT.CoverURL ,CAT.CallNumber ,CAT.Worksheet_id, 
                                   (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                                   (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                    (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND (BookingExpiredDate < NOW() || BookingExpiredDate IS NULL)) JML_BUKU,
                                     (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                     (SELECT GROUP_CONCAT(DISTINCT SUBSTRING(FileURL,(LENGTH(FileURL)-LOCATE('.',REVERSE(FileURL)))+2) SEPARATOR ', ') 
                                     FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                          FROM catalogs CAT 
                             INNER JOIN catalogfiles CF ON  CAT.ID = CF.Catalog_id 
                          
                          WHERE 
                          
                          
                          EXISTS           
                                   (SELECT  1
                                    FROM catalog_ruas R  
                                     WHERE 
                         
                            CASE tag
                            WHEN 'Judul' THEN R.TAG IN ('240','245','246','440','740')
                            WHEN 'Pengarang' THEN R.TAG IN ('100','110','111','700','710','711','800','810','811')
                            WHEN 'Penerbit' THEN R.TAG IN ('260','264')
                            WHEN 'Subyek' THEN R.TAG IN ('600','610','611','650','651')
                            WHEN 'Nomor Panggil' THEN R.TAG IN ('090','084')
                            WHEN 'ISBN' THEN R.TAG IN ('020')
                            WHEN 'ISSN' THEN R.TAG IN ('022')
                            WHEN 'ISMN' THEN R.TAG IN ('024')        
                            WHEN 'Semua Ruas' THEN 1 = 1
                            END
                                    AND  R.Value LIKE keyword 
                            AND R.CATALOGID=CAT.ID
                        
                                    
                                    ) 
                                
                            AND
                            IF(fAuthor='',1=1,CAT.Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                            IF(fPublisher='',1=1,CAT.Publisher LIKE fPublisher) AND
                            IF(fPublishLoc='',1=1,CAT.PublishLocation LIKE fPublishLoc) AND
                            IF(fPublishYear='',1=1,CAT.PublishYear LIKE fPublishYear) AND
                            IF(fSubject='',1=1,CAT.Subject LIKE fSubject) AND
                            IF(fBahasa='',1=1,CAT.Languages LIKE fBahasa) AND
                            
                            
                            CAT.isopac=1 
                            
                            
                        HAVING CASE worksheet
                            WHEN 'pdf' THEN KONTEN_DIGITAL = worksheet
                            WHEN 'doc' THEN KONTEN_DIGITAL = worksheet
                            WHEN 'xls' THEN KONTEN_DIGITAL = worksheet
                            WHEN 'rar' THEN KONTEN_DIGITAL = worksheet
                            WHEN 'Semua Format File' THEN 1 = 1  
                        END
                            ;  
                    ELSE             
                    IF worksheet='4' THEN   
                    INSERT INTO tempCariOpac
                    SELECT DISTINCT CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.Languages,CAT.CoverURL ,CAT.CallNumber ,CAT.Worksheet_id, 
                                   (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                                   (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                    (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND (BookingExpiredDate < NOW() || BookingExpiredDate IS NULL)) JML_BUKU,
                                     (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                     (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') 
                                     FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                          FROM catalogs CAT 
                                WHERE EXISTS           
                                   (SELECT  1
                                    FROM catalog_ruas R  LEFT JOIN collections col ON col.Catalog_id = R.CATALOGID
                                     WHERE 
                                                            
                            CASE tag
                            WHEN 'Judul' THEN R.TAG IN ('240','245','246','440','740')
                            WHEN 'Pengarang' THEN R.TAG IN ('100','110','111','700','710','711','800','810','811')
                            WHEN 'Penerbit' THEN R.TAG IN ('260','264')
                            WHEN 'Subyek' THEN R.TAG IN ('600','610','611','650','651')
                            WHEN 'Nomor Panggil' THEN R.TAG IN ('090','084')
                            WHEN 'ISBN' THEN R.TAG IN ('020')
                            WHEN 'ISSN' THEN R.TAG IN ('022')
                            WHEN 'ISMN' THEN R.TAG IN ('024')        
                            WHEN 'Semua Ruas' THEN 1 = 1
                            END
                                    
                            AND  R.Value LIKE keyword 
                             AND IF(fromTgl!='' AND toTgl!='' ,col.TANGGAL_TERBIT_EDISI_SERIAL BETWEEN fromTgl AND toTgl,1=1)
                                                    AND R.CATALOGID=CAT.ID) 
                            AND IF(worksheet='Semua Jenis bahan',1=1,CAT.Worksheet_id = worksheet)
                            AND
                            IF(fAuthor='',1=1,CAT.Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                            IF(fPublisher='',1=1,CAT.Publisher LIKE fPublisher) AND
                            IF(fPublishLoc='',1=1,CAT.PublishLocation LIKE fPublishLoc) AND
                            IF(fPublishYear='',1=1,CAT.PublishYear LIKE fPublishYear) AND
                            IF(fSubject='',1=1,CAT.Subject LIKE fSubject) AND
                            IF(fBahasa='',1=1,CAT.Languages LIKE fBahasa) AND
                            
                            CAT.isopac=1 
                            ;    
                    ELSE
                    IF location<>0 THEN   
                    INSERT INTO tempCariOpac
                    SELECT DISTINCT CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.Languages,CAT.CoverURL ,CAT.CallNumber ,CAT.Worksheet_id, 
                                   (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                                   (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                    (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND (BookingExpiredDate < NOW() || BookingExpiredDate IS NULL)) JML_BUKU,
                                     (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                     (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') 
                                     FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                          FROM catalogs CAT 
                                WHERE EXISTS           
                                   (SELECT  1
                                    FROM catalog_ruas R  LEFT JOIN collections col ON col.Catalog_id = R.CATALOGID
                                     WHERE 
                                                            
                            CASE tag
                            WHEN 'Judul' THEN R.TAG IN ('240','245','246','440','740')
                            WHEN 'Pengarang' THEN R.TAG IN ('100','110','111','700','710','711','800','810','811')
                            WHEN 'Penerbit' THEN R.TAG IN ('260','264')
                            WHEN 'Subyek' THEN R.TAG IN ('600','610','611','650','651')
                            WHEN 'Nomor Panggil' THEN R.TAG IN ('090','084')
                            WHEN 'ISBN' THEN R.TAG IN ('020')
                            WHEN 'ISSN' THEN R.TAG IN ('022')
                            WHEN 'ISMN' THEN R.TAG IN ('024')        
                            WHEN 'Semua Ruas' THEN 1 = 1
                            END
                                    
                            AND  R.Value LIKE keyword 
                            AND col.Location_id = Location AND R.CATALOGID=CAT.ID) 
                            AND IF(worksheet='Semua Jenis bahan',1=1,CAT.Worksheet_id = worksheet)
                            AND
                            IF(fAuthor='',1=1,CAT.Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                            IF(fPublisher='',1=1,CAT.Publisher LIKE fPublisher) AND
                            IF(fPublishLoc='',1=1,CAT.PublishLocation LIKE fPublishLoc) AND
                            IF(fPublishYear='',1=1,CAT.PublishYear LIKE fPublishYear) AND
                            IF(fSubject='',1=1,CAT.Subject LIKE fSubject) AND
                            IF(fBahasa='',1=1,CAT.Languages LIKE fBahasa) AND
                            
                            CAT.isopac=1 
                            ;    
                    ELSE
                    INSERT INTO tempCariOpac
                    SELECT DISTINCT CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.Languages,CAT.CoverURL ,CAT.CallNumber ,CAT.Worksheet_id, 
                                   (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                                   (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                    (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND (BookingExpiredDate < NOW() || BookingExpiredDate IS NULL)) JML_BUKU,
                                     (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                     (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') 
                                     FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                          FROM catalogs CAT 
                                WHERE EXISTS           
                                   (SELECT  1
                                    FROM catalog_ruas R  
                                                     WHERE 
                                                            
                            CASE tag
                            WHEN 'Judul' THEN R.TAG IN ('240','245','246','440','740')
                            WHEN 'Pengarang' THEN R.TAG IN ('100','110','111','700','710','711','800','810','811')
                            WHEN 'Penerbit' THEN R.TAG IN ('260','264')
                            WHEN 'Subyek' THEN R.TAG IN ('600','610','611','650','651')
                            WHEN 'Nomor Panggil' THEN R.TAG IN ('090','084')
                            WHEN 'ISBN' THEN R.TAG IN ('020')
                            WHEN 'ISSN' THEN R.TAG IN ('022')
                            WHEN 'ISMN' THEN R.TAG IN ('024')        
                            WHEN 'Semua Ruas' THEN 1 = 1
                            END
                                    
                            AND  R.Value LIKE keyword 
                                                   AND R.CATALOGID=CAT.ID) 
                            AND IF(worksheet='Semua Jenis bahan',1=1,CAT.Worksheet_id = worksheet)
                            AND
                            IF(fAuthor='',1=1,CAT.Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                            IF(fPublisher='',1=1,CAT.Publisher LIKE fPublisher) AND
                            IF(fPublishLoc='',1=1,CAT.PublishLocation LIKE fPublishLoc) AND
                            IF(fPublishYear='',1=1,CAT.PublishYear LIKE fPublishYear) AND
                            IF(fSubject='',1=1,CAT.Subject LIKE fSubject) AND
                            IF(fBahasa='',1=1,CAT.Languages LIKE fBahasa) AND
                            
                            CAT.isopac=1 
                            ;  
                    END IF;
                    END IF;
                    END IF;
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `insertTempSederhanaOpac0` */

/*!50003 DROP PROCEDURE IF EXISTS  `insertTempSederhanaOpac0` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `insertTempSederhanaOpac0`(
                    IN keyword TEXT,
                    IN tag TEXT,
                    IN worksheet VARCHAR(255),
                    IN limit1 INT,
                    IN limit2 INT,
                    IN fAuthor TEXT,
                    IN fPublisher TEXT,
                    IN fPublishLoc TEXT,
                    IN fPublishYear TEXT,
                    IN fSubject TEXT,
                    IN fBahasa TEXT,
                    IN fromTgl TEXT,
                    IN toTgl TEXT,
                    IN isLKD TEXT,
                    IN Location TEXT
                    )
BEGIN
                    DROP TABLE IF EXISTS tempCariOpac;
                    CREATE  TEMPORARY TABLE tempCariOpac
                    (
                    CatalogId            INT(11),
                    title       TEXT,
                    author    TEXT,
                    publisher   TEXT,
                    PublishLocation  TEXT,
                    PublishYear TEXT,
                    SUBJECT TEXT,
                    bahasa TEXT,
                    CoverURL TEXT,
                    worksheet_id INT,
                    worksheet TEXT,
                    ISSERIAL TEXT,
                    JML_BUKU INT,
                    ALL_BUKU INT,
                    KONTEN_DIGITAL VARCHAR(100)
                    );
                    IF isLKD = 1
                    THEN
                     INSERT INTO tempCariOpac
                     SELECT DISTINCT CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.Languages,CAT.CoverURL ,CAT.Worksheet_id, 
                                   (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                                   (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                    (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND (BookingExpiredDate < NOW() || BookingExpiredDate IS NULL)) JML_BUKU,
                                     (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                     (SELECT GROUP_CONCAT(DISTINCT SUBSTRING(FileURL,(LENGTH(FileURL)-LOCATE('.',REVERSE(FileURL)))+2) SEPARATOR ', ') 
                                     FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                          FROM catalogs CAT 
                             INNER JOIN catalogfiles CF ON  CAT.ID = CF.Catalog_id 
                          
                          WHERE 
                          
                          
                          EXISTS           
                                   (SELECT  1
                                    FROM catalog_ruas R  
                                     WHERE 
                         
                            CASE tag
                            WHEN 'Judul' THEN R.TAG IN ('240','245','246','440','740')
                            WHEN 'Pengarang' THEN R.TAG IN ('100','110','111','700','710','711','800','810','811')
                            WHEN 'Penerbit' THEN R.TAG IN ('260','264')
                            WHEN 'Subyek' THEN R.TAG IN ('600','610','611','650','651')
                            WHEN 'Nomor Panggil' THEN R.TAG IN ('090','084')
                            WHEN 'ISBN' THEN R.TAG IN ('020')
                            WHEN 'ISSN' THEN R.TAG IN ('022')
                            WHEN 'ISMN' THEN R.TAG IN ('024')        
                            WHEN 'Semua Ruas' THEN 1 = 1
                            END
                                AND  R.Value LIKE keyword 
                                AND R.CATALOGID=CAT.ID
                        
                                    
                                    ) 
                                
                            AND
                            IF(fAuthor='',1=1,CAT.Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                            IF(fPublisher='',1=1,CAT.Publisher LIKE fPublisher) AND
                            IF(fPublishLoc='',1=1,CAT.PublishLocation LIKE fPublishLoc) AND
                            IF(fPublishYear='',1=1,CAT.PublishYear LIKE fPublishYear) AND
                            IF(fSubject='',1=1,CAT.Subject LIKE fSubject) AND
                            IF(fBahasa='',1=1,CAT.Languages LIKE fBahasa) AND
                            
                            CAT.isopac=1
                            
                            
                         HAVING CASE worksheet
                            WHEN 'pdf' THEN KONTEN_DIGITAL = worksheet
                            WHEN 'doc' THEN KONTEN_DIGITAL = worksheet
                            WHEN 'xls' THEN KONTEN_DIGITAL = worksheet
                            WHEN 'rar' THEN KONTEN_DIGITAL = worksheet
                            WHEN 'Semua Format File' THEN 1 = 1
                            
                                END
                            LIMIT limit1,limit2;  
                    ELSE             
                    IF worksheet='4' THEN   
                    INSERT INTO tempCariOpac
                    SELECT DISTINCT CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.Languages,CAT.CoverURL ,CAT.Worksheet_id, 
                                   (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                                   (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                    (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND (BookingExpiredDate < NOW() || BookingExpiredDate IS NULL)) JML_BUKU,
                                     (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                     (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') 
                                     FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                          FROM catalogs CAT 
                                WHERE EXISTS           
                                   (SELECT  1
                                    FROM catalog_ruas R  LEFT JOIN collections col ON col.Catalog_id = R.CATALOGID
                                     WHERE 
                                                            
                            CASE tag
                            WHEN 'Judul' THEN R.TAG IN ('240','245','246','440','740')
                            WHEN 'Pengarang' THEN R.TAG IN ('100','110','111','700','710','711','800','810','811')
                            WHEN 'Penerbit' THEN R.TAG IN ('260','264')
                            WHEN 'Subyek' THEN R.TAG IN ('600','610','611','650','651')
                            WHEN 'Nomor Panggil' THEN R.TAG IN ('090','084')
                            WHEN 'ISBN' THEN R.TAG IN ('020')
                            WHEN 'ISSN' THEN R.TAG IN ('022')
                            WHEN 'ISMN' THEN R.TAG IN ('024')        
                            WHEN 'Semua Ruas' THEN 1 = 1
                            END
                                    
                            AND  R.Value LIKE keyword 
                             AND IF(fromTgl!='' AND toTgl!='' ,col.TANGGAL_TERBIT_EDISI_SERIAL BETWEEN fromTgl AND toTgl,1=1)
                                                    AND R.CATALOGID=CAT.ID) 
                            AND IF(worksheet='Semua Jenis bahan',1=1,CAT.Worksheet_id = worksheet)
                            AND
                            IF(fAuthor='',1=1,CAT.Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                            IF(fPublisher='',1=1,CAT.Publisher LIKE fPublisher) AND
                            IF(fPublishLoc='',1=1,CAT.PublishLocation LIKE fPublishLoc) AND
                            IF(fPublishYear='',1=1,CAT.PublishYear LIKE fPublishYear) AND
                            IF(fSubject='',1=1,CAT.Subject LIKE fSubject) AND
                            IF(fBahasa='',1=1,CAT.Languages LIKE fBahasa) AND
                            
                            CAT.isopac=1 
                            LIMIT limit1,limit2;    
                    ELSE
                    IF location<>0 THEN  
                    INSERT INTO tempCariOpac
                    SELECT DISTINCT CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.Languages,CAT.CoverURL ,CAT.Worksheet_id, 
                                   (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                                   (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                    (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND (BookingExpiredDate < NOW() || BookingExpiredDate IS NULL)) JML_BUKU,
                                     (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                     (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') 
                                     FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                          FROM catalogs CAT 
                                WHERE EXISTS           
                                   (SELECT  1
                                    FROM catalog_ruas R  LEFT JOIN collections col ON col.Catalog_id = R.CATALOGID
                                     WHERE 
                                                            
                            CASE tag
                            WHEN 'Judul' THEN R.TAG IN ('240','245','246','440','740')
                            WHEN 'Pengarang' THEN R.TAG IN ('100','110','111','700','710','711','800','810','811')
                            WHEN 'Penerbit' THEN R.TAG IN ('260','264')
                            WHEN 'Subyek' THEN R.TAG IN ('600','610','611','650','651')
                            WHEN 'Nomor Panggil' THEN R.TAG IN ('090','084')
                            WHEN 'ISBN' THEN R.TAG IN ('020')
                            WHEN 'ISSN' THEN R.TAG IN ('022')
                            WHEN 'ISMN' THEN R.TAG IN ('024')        
                            WHEN 'Semua Ruas' THEN 1 = 1
                            END
                                    
                            AND  R.Value LIKE keyword 
                             AND  R.Value LIKE keyword 
                            AND col.Location_id = Location
                                                    AND R.CATALOGID=CAT.ID) 
                            AND IF(worksheet='Semua Jenis bahan',1=1,CAT.Worksheet_id = worksheet)
                            AND
                            IF(fAuthor='',1=1,CAT.Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                            IF(fPublisher='',1=1,CAT.Publisher LIKE fPublisher) AND
                            IF(fPublishLoc='',1=1,CAT.PublishLocation LIKE fPublishLoc) AND
                            IF(fPublishYear='',1=1,CAT.PublishYear LIKE fPublishYear) AND
                            IF(fSubject='',1=1,CAT.Subject LIKE fSubject) AND
                            IF(fBahasa='',1=1,CAT.Languages LIKE fBahasa) AND
                            
                            CAT.isopac=1 
                            LIMIT limit1,limit2;    
                    ELSE
                    INSERT INTO tempCariOpac
                    SELECT DISTINCT CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.Languages,CAT.CoverURL ,CAT.Worksheet_id, 
                                   (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                                   (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                    (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND (BookingExpiredDate < NOW() || BookingExpiredDate IS NULL)) JML_BUKU,
                                     (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                     (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') 
                                     FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                          FROM catalogs CAT 
                                WHERE EXISTS           
                                   (SELECT  1
                                    FROM catalog_ruas R  
                                                     WHERE 
                                                            
                            CASE tag
                            WHEN 'Judul' THEN R.TAG IN ('240','245','246','440','740')
                            WHEN 'Pengarang' THEN R.TAG IN ('100','110','111','700','710','711','800','810','811')
                            WHEN 'Penerbit' THEN R.TAG IN ('260','264')
                            WHEN 'Subyek' THEN R.TAG IN ('600','610','611','650','651')
                            WHEN 'Nomor Panggil' THEN R.TAG IN ('090','084')
                            WHEN 'ISBN' THEN R.TAG IN ('020')
                            WHEN 'ISSN' THEN R.TAG IN ('022')
                            WHEN 'ISMN' THEN R.TAG IN ('024')        
                            WHEN 'Semua Ruas' THEN 1 = 1
                            END
                                    
                            AND  R.Value LIKE keyword 
                                                   AND R.CATALOGID=CAT.ID) 
                            AND IF(worksheet='Semua Jenis bahan',1=1,CAT.Worksheet_id = worksheet)
                            AND
                            IF(fAuthor='',1=1,CAT.Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                            IF(fPublisher='',1=1,CAT.Publisher LIKE fPublisher) AND
                            IF(fPublishLoc='',1=1,CAT.PublishLocation LIKE fPublishLoc) AND
                            IF(fPublishYear='',1=1,CAT.PublishYear LIKE fPublishYear) AND
                            IF(fSubject='',1=1,CAT.Subject LIKE fSubject) AND
                            IF(fBahasa='',1=1,CAT.Languages LIKE fBahasa) AND
                            
                            CAT.isopac=1 
                            LIMIT limit1,limit2;  
                    END IF;
                    END IF;
                    END IF;
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `facedPublisherOpac1` */

/*!50003 DROP PROCEDURE IF EXISTS  `facedPublisherOpac1` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `facedPublisherOpac1`(
                    IN fAuthor TEXT,
                    IN fPublisher TEXT,
                    IN fPublishLoc TEXT,
                    IN fPublishYear TEXT,
                    IN fSubject TEXT,
                    IN fBahasa TEXT,
                    IN maxFaced INT
                    )
BEGIN
                                  
                    SELECT Publisher,COUNT(1) jml
                          FROM tempCariOpac 
                          
                          WHERE 
                          IF(fAuthor='',1=1,Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                          IF(fPublisher='',1=1,publisher = fPublisher) AND
                          IF(fPublishLoc='',1=1,PublishLocation = fPublishLoc) AND
                          IF(fPublishYear='',1=1,PublishYear = fPublishYear) AND
                          IF(fSubject='',1=1,SUBJECT = fPublishYear) AND
                          IF(fBahasa='',1=1,bahasa = fBahasa)
                          
                        GROUP BY Publisher
                        ORDER BY jml DESC
                        LIMIT 0,maxFaced;                        
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `facedPublishLocationOpac1` */

/*!50003 DROP PROCEDURE IF EXISTS  `facedPublishLocationOpac1` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `facedPublishLocationOpac1`(
                IN fAuthor TEXT,
                IN fPublisher TEXT,
                IN fPublishLoc TEXT,
                IN fPublishYear TEXT,
                IN fSubject TEXT,
                IN fBahasa TEXT,
                IN maxFaced INT
                )
BEGIN
                              
                SELECT PublishLocation,COUNT(1) jml
                      FROM tempCariOpac 
                      
                      WHERE 
                      IF(fAuthor='',1=1,Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                      IF(fPublisher='',1=1,publisher = fPublisher) AND
                      IF(fPublishLoc='',1=1,PublishLocation = fPublishLoc) AND
                      IF(fPublishYear='',1=1,PublishYear = fPublishYear) AND
                      IF(fSubject='',1=1,SUBJECT = fSubject) AND
                      IF(fBahasa='',1=1,bahasa = fBahasa)
                      
                    GROUP BY PublishLocation
                    ORDER BY jml DESC
                    LIMIT 0,maxFaced;    
                END */$$
DELIMITER ;

/* Procedure structure for procedure `facedPublishYearOpac1` */

/*!50003 DROP PROCEDURE IF EXISTS  `facedPublishYearOpac1` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `facedPublishYearOpac1`(
                    IN fAuthor TEXT,
                    IN fPublisher TEXT,
                    IN fPublishLoc TEXT,
                    IN fPublishYear TEXT,
                    IN fSubject TEXT,
                    IN fBahasa TEXT,
                    IN maxFaced INT
                    )
BEGIN
                                  
                    SELECT PublishYear,COUNT(1) jml
                          FROM tempCariOpac
                          
                          WHERE 
                          IF(fAuthor='',1=1,Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                          IF(fPublisher='',1=1,publisher = fPublisher) AND
                          IF(fPublishLoc='',1=1,PublishLocation = fPublishLoc) AND
                          IF(fPublishYear='',1=1,PublishYear = fPublishYear) AND
                          IF(fSubject='',1=1,SUBJECT = fSubject) AND
                          IF(fBahasa='',1=1,bahasa = fBahasa)
                        GROUP BY PublishYear
                        ORDER BY jml DESC
                        LIMIT 0,maxFaced;      
                              
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `facedSubjectOpac1` */

/*!50003 DROP PROCEDURE IF EXISTS  `facedSubjectOpac1` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `facedSubjectOpac1`(
                    IN fAuthor TEXT,
                    IN fPublisher TEXT,
                    IN fPublishLoc TEXT,
                    IN fPublishYear TEXT,
                    IN fSubject TEXT,
                    IN fBahasa TEXT,
                    IN maxFaced INT
                    )
BEGIN
                                  
                    SELECT COALESCE(SUBJECT,'-') SUBJECT,COUNT(1) jml
                          FROM tempCariOpac 
                          
                          WHERE 
                          IF(fAuthor='',1=1,Author LIKE CONCAT('%',CONCAT(fAuthor,'%'))) AND
                          IF(fPublisher='',1=1,publisher = fPublisher) AND
                          IF(fPublishLoc='',1=1,PublishLocation = fPublishLoc) AND
                          IF(fPublishYear='',1=1,PublishYear = fPublishYear) AND
                          IF(fSubject='',1=1,SUBJECT = fSubject) AND
                          IF(fBahasa='',1=1,bahasa = fBahasa)
                        GROUP BY SUBJECT ORDER BY jml DESC
                        LIMIT 0,maxFaced;    
                              
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `get_koleksi_terimakasih` */

/*!50003 DROP PROCEDURE IF EXISTS  `get_koleksi_terimakasih` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `get_koleksi_terimakasih`(
IN Partner_id text,
IN Source_id text,
IN TanggalPengadaan text
)
BEGIN
SET @Eks = 0;
SELECT 
cat.Worksheet_id as WORKSHEETID, 
w.Name as WorksheetName,(@Eks := COUNT(*)) as Eksemplar,
terbilang(@Eks) as Terbilang,
 Title as Judul,
 '' as AnakJudul,
 Author as Pengarang,
 '' as PengarangTambahan,
 '' as BadanKoperasi, 
 Publisher as Penerbit, 
 PublishLocation as TempatTerbit,
 PublishYear as TahunTerbit,
 CONCAT(PublishLocation,' ',Publisher,' ',PublishYear) as Penerbitan,
 Edition as Edisi,
 DeweyNo as NoKlas, 
 PhysicalDescription as DeskripsiFisik,
 ISBN as ISBN, Note as Catatan,
 '' as Skala, cs.Name as Sumber,
 Keterangan_Sumber as KeteranganSumber,
 Currency as Currency,
 Price as Harga, 
 u.UserName as ReportedBy,
 DATE_FORMAT(col.CreateDate,'%d %b %Y') as ReportedDate, 
 '' as Status, 
 u.FullName as NamaPenerima
 
 FROM collections col 
 INNER JOIN catalogs cat on col.Catalog_id = cat.id 
 INNER JOIN worksheets w on cat.Worksheet_id = w.id 
 INNER JOIN users u on col.createby = u.id 
 INNER JOIN collectionsources cs on col.Source_id = cs.id 
 
 WHERE Partner_id = Partner_id
 AND Source_id = Source_id
 AND DATE(col.TanggalPengadaan) = TanggalPengadaan 
 
 GROUP BY cat.ID;
         
END */$$
DELIMITER ;

/* Procedure structure for procedure `marcCatalogOpac` */

/*!50003 DROP PROCEDURE IF EXISTS  `marcCatalogOpac` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `marcCatalogOpac`(
IN catID int
)
BEGIN
select * from catalog_ruas where catalogId = catID order by Tag asc;
      
         
END */$$
DELIMITER ;

/* Procedure structure for procedure `showCollectionOpac` */

/*!50003 DROP PROCEDURE IF EXISTS  `showCollectionOpac` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `showCollectionOpac`(IN keyword TEXT)
BEGIN
              
SELECT c.id,c.`Catalog_id`, m.`Name` media,c.`NomorBarcode`, c.`NoInduk`, c.`CallNumber`, r.`Name` akses, l.`Name` lokasi, s.`Name` ketersediaan, loc.`Name` namaperpus, c.BookingMemberID, c.BookingExpiredDate
			FROM collections c 
			LEFT JOIN collectionmedias m ON c.`Media_id`=m.`ID` 
			LEFT JOIN collectionrules r ON c.`Rule_id`=r.`ID` 
			LEFT JOIN collectionstatus s ON c.`Status_id`=s.`ID`   
			LEFT JOIN locations l ON c.`Location_id`=l.`ID`
            LEFT join location_library loc on c.`Location_Library_id` = loc.`id`
			WHERE c.`Catalog_id`=keyword;   
          
END */$$
DELIMITER ;

/* Procedure structure for procedure `showKontenDigital` */

/*!50003 DROP PROCEDURE IF EXISTS  `showKontenDigital` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `showKontenDigital`(IN keyword TEXT)
BEGIN
              
Select C.ID,C.Catalog_id,C.FileURL,C.FileFlash,C.IsPublish,	(
								SELECT  SUBSTRING(FileURL,(LENGTH(FileURL)-LOCATE('.',REVERSE(FileURL)))+2))  as FormatFile
                				 FROM catalogfiles C where IsPublish <> 0 and Catalog_id =keyword;   
          
END */$$
DELIMITER ;

/* Procedure structure for procedure `get_stat_jenis_pendidikan_bulan` */

/*!50003 DROP PROCEDURE IF EXISTS  `get_stat_jenis_pendidikan_bulan` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `get_stat_jenis_pendidikan_bulan`(
                    IN `Bfrom` TEXT, 
                    IN `Bto` TEXT
                    )
BEGIN
                    SELECT 
                        `mp`.`Nama` AS `Keterangan`,
                        COUNT(`mem`.`ID`) AS `Jumlah`,
                        DATE(`mem`.`CreateDate`) AS `Tanggal`
                     
                    FROM
                        (`master_pendidikan` `mp`
                        LEFT JOIN `members` `mem` ON ((`mem`.`EducationLevel_id` = `mp`.`id`)))
                    WHERE
                        (`mem`.`EducationLevel_id` IS NOT NULL)
                        
                        AND   
                        (CAST(`mem`.`CreateDate`
                            AS DATE) BETWEEN Bfrom AND Bto )
                        
                        GROUP BY `mp`.`Nama` , DATE_FORMAT(`mem`.`CreateDate`, '%M')
                    ORDER BY `mp`.`id` , `mem`.`CreateDate`;
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `get_stat_jenis_pendidikan_tahun` */

/*!50003 DROP PROCEDURE IF EXISTS  `get_stat_jenis_pendidikan_tahun` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `get_stat_jenis_pendidikan_tahun`(
                    IN `Bfrom` TEXT, 
                    IN `Bto` TEXT
                    )
BEGIN
                    SELECT 
                        `mp`.`Nama` AS `Keterangan`,
                        COUNT(`mem`.`ID`) AS `Jumlah`,
                        DATE(`mem`.`CreateDate`) AS `Tanggal`
                     
                    FROM
                        (`master_pendidikan` `mp`
                        LEFT JOIN `members` `mem` ON ((`mem`.`EducationLevel_id` = `mp`.`id`)))
                    WHERE
                        (`mem`.`EducationLevel_id` IS NOT NULL)
                        
                        AND   
                        (CAST(`mem`.`CreateDate`
                            AS DATE) BETWEEN Bfrom AND Bto )
                        
                        GROUP BY `mp`.`Nama` , DATE_FORMAT(`mem`.`CreateDate`, '%Y')
                    ORDER BY `mp`.`id` , `mem`.`CreateDate`;
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `insertTempOpacSederhana` */

/*!50003 DROP PROCEDURE IF EXISTS  `insertTempOpacSederhana` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `insertTempOpacSederhana`(
IN keyword TEXT,
IN tag TEXT,
IN worksheet VARCHAR(255),
IN fAuthor TEXT,
IN fPublisher TEXT,
IN fPublishLoc TEXT,
IN fPublishYear TEXT,
IN fSubject TEXT,
IN fromTgl DATE,
IN toTgl DATE
)
BEGIN
DROP TABLE IF EXISTS tempCariOpac;
CREATE  TEMPORARY TABLE tempCariOpac
(
CatalogId            INT(11),
title       TEXT,
author    TEXT,
publisher   TEXT,
PublishLocation  TEXT,
PublishYear TEXT,
Subject Text,
CoverURL TEXT,
worksheet_id INT,
worksheet TEXT,
JML_BUKU INT,
ALL_BUKU INT,
KONTEN_DIGITAL VARCHAR(100)
);              
   
SELECT CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.CoverURL ,CAT.Worksheet_id, 
               (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND BookingExpiredDate < now()) JML_BUKU,
                 (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                 (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') 
                 FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
      FROM catalogs CAT JOIN collections col ON col.Catalog_id = CAT.ID
      WHERE EXISTS           
               (SELECT  1
                FROM catalog_ruas R  
                 WHERE 
                 IF(fAuthor='',1=1,CAT.Author LIKE fAuthor) AND
		 IF(fPublisher='',1=1,CAT.Publisher LIKE fPublisher) AND
		 IF(fPublishLoc='',1=1,CAT.PublishLocation LIKE fPublishLoc) AND
		 IF(fPublishYear='',1=1,CAT.PublishYear LIKE fPublishYear) AND
         IF(fSubject='',1=1,CAT.Subject LIKE fSubject) AND
		
		CASE tag
		WHEN 'Judul' THEN R.TAG IN ('240','245','246','440','740')
		WHEN 'Pengarang' THEN R.TAG IN ('100','110','700','710')
		WHEN 'Penerbit' THEN R.TAG IN ('260')
		WHEN 'Tahun Terbit' THEN R.TAG IN ('260')
		WHEN 'Subyek' THEN R.TAG LIKE '6%'
		WHEN 'Nomor Panggil' THEN R.TAG IN ('090','082','084','080')
		WHEN 'BIB-ID' THEN R.TAG IN ('035')
		WHEN 'ISBN/ISSN/ISMN' THEN R.TAG IN ('020','022')
		WHEN 'Semua Ruas' THEN R.TAG IN ('240','245','740','100','110','700','710','260','600','610','611','630','650','651','080','082','084','096','022','020')
		END
                
                AND  R.Value LIKE keyword 
                AND IF(worksheet='4',col.TANGGAL_TERBIT_EDISI_SERIAL BETWEEN fromTgl AND toTgl,1=1)
                AND R.CATALOGID=CAT.ID) 
		AND IF(worksheet='Semua Jenis bahan',1=1,CAT.Worksheet_id = worksheet)
	
		
		 AND CAT.isopac=1 
        ;  
  
          
END */$$
DELIMITER ;

/* Procedure structure for procedure `TO_MARC` */

/*!50003 DROP PROCEDURE IF EXISTS  `TO_MARC` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `TO_MARC`(
IN CatID INT
)
BEGIN
select TO_MARC(CatID);
END */$$
DELIMITER ;

/* Procedure structure for procedure `insertTempLanjutArticle` */

/*!50003 DROP PROCEDURE IF EXISTS  `insertTempLanjutArticle` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `insertTempLanjutArticle`(
                    IN worksheet TEXT,
                    IN bahasa TEXT,
                    IN targetPembaca TEXT,
                    IN bentukKarya TEXT,
                    IN keyword TEXT,
                    IN fAuthor TEXT,
                    IN fPublisher TEXT,
                    IN fPublishLoc TEXT,
                    IN fPublishYear TEXT,
                    IN fSubject TEXT,
                    IN fBahasa TEXT,
                    IN isLKD TEXT
                    )
BEGIN
                    DECLARE querys,querys2,querys3,bhs,karya,pembaca TEXT;
                    SET querys='';
                    SET querys2='';
                    SET querys3='';
                    SET bhs='';
                    SET karya='';
                    SET pembaca='';
                    DROP TABLE IF EXISTS tempCariArticle;
                    CREATE  TEMPORARY TABLE tempCariArticle
                    (
                Article_type VARCHAR(100),
                Creator_article VARCHAR(200),
                title_article TEXT,
                content_article TEXT,
                subject_article VARCHAR(200),
                EDISISERIAL VARCHAR(200),
                TANGGAL_TERBIT_EDISI_SERIAL VARCHAR(200),
                CatalogId            INT(11),
                title       TEXT,
                bahasa VARCHAR(100),
                author    VARCHAR(200),
                publisher   VARCHAR(100),
                PublishLocation  VARCHAR(100),
                PublishYear VARCHAR(100),
                SUBJECT VARCHAR(200),
                CoverURL VARCHAR(100),
                worksheet_id INT,
                worksheet VARCHAR(100),
                KONTEN_DIGITAL VARCHAR(100)
                    );
                     IF bahasa <> '' THEN SET bhs = CONCAT(bhs,' AND R.TAG IN (''008'') AND SUBSTRING(R.VALUE,36,3) = ''',bahasa,''''); 
                      END IF;
                     IF bentukKarya <> '' THEN SET karya = CONCAT(bhs,' AND R.TAG IN (''008'') AND SUBSTRING(R.VALUE,34,1) = ''',bentukKarya,''''); 
                      END IF;
                     IF targetPembaca <> '' THEN SET pembaca = CONCAT(pembaca,' AND R.TAG IN (''008'') AND SUBSTRING(R.VALUE,23,1) = ''',targetPembaca,''''); 
                      END IF;
                     
                     IF fAuthor <> '' THEN SET querys = CONCAT(querys,' AND CAT.Author = ''',fAuthor,''''); 
                      END IF;
                      IF fPublisher <> ''   THEN SET querys = CONCAT(querys,' AND CAT.Publisher = ''',fPublisher,'''');
                      END IF;
                      IF fPublishLoc <> '' THEN SET querys = CONCAT(querys,' AND CAT.PublishLocation = ''',fPublishLoc,''''); 
                      END IF;
                      IF fPublishYear <> ''  THEN SET querys = CONCAT(querys,' AND CAT.PublishYear = ''',fPublishYear,''''); 
                       END IF;
                      IF fSubject <> ''  THEN SET querys = CONCAT(querys,' AND CAT.Subject = ''',fSubject,''''); 
                       END IF;
                        IF fBahasa <> ''  THEN SET querys = CONCAT(querys,' AND CAT.Languages = ''',fBahasa,''''); 
                       END IF;
                            
                       
                    SET @query_as_string=CONCAT('
                INSERT INTO tempCariArticle
                        SELECT art.Article_type,art.Creator AS Creator_article, art.title AS title_article, art.content AS content_article, art.subject AS subject_article, art.EDISISERIAL, art.TANGGAL_TERBIT_EDISI_SERIAL, CAT.id CatalogId,CAT.title,CAT.Languages, CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.CoverURL ,CAT.Worksheet_id, 
                            w.name worksheet,
                                    (SELECT GROUP_CONCAT(DISTINCT SUBSTRING(FileURL,(LENGTH(FileURL)-LOCATE(''.'',REVERSE(FileURL)))+2) SEPARATOR '','') 
                                     FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                          FROM serial_articles art 
                          JOIN catalogs CAT ON art.Catalog_id = CAT.ID  
                          lEFT JOIN worksheets w ON w.id = CAT.Worksheet_id
                          
                          ',querys3,' 
                       WHERE 
                      
                       ',keyword,' AND CAT.isopac=1 AND art.ISOPAC=1
                            AND w.ISSERIAL = 1',querys,querys2,' ');
                     PREPARE statement_1 
                      FROM @query_as_string ;
                       EXECUTE statement_1;
                      DEALLOCATE PREPARE statement_1;
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `insertTempLanjutArticle0` */

/*!50003 DROP PROCEDURE IF EXISTS  `insertTempLanjutArticle0` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `insertTempLanjutArticle0`(
                    IN worksheet TEXT,
                    IN bahasa TEXT,
                    IN targetPembaca TEXT,
                    IN bentukKarya TEXT,
                    IN keyword TEXT,
                    IN limit1 TEXT,
                    IN limit2 TEXT,
                    IN fAuthor TEXT,
                    IN fPublisher TEXT,
                    IN fPublishLoc TEXT,
                    IN fPublishYear TEXT,
                    IN fSubject TEXT,
                    IN fBahasa TEXT,
                    IN isLKD TEXT
                    )
BEGIN
                    DECLARE querys,querys2,querys3,bhs,karya,pembaca TEXT;
                    SET querys='';
                    SET querys2='';
                    SET querys3='';
                    SET bhs='';
                    SET karya='';
                    SET pembaca='';
                    DROP TABLE IF EXISTS tempCariArticle;
                    CREATE  TEMPORARY TABLE tempCariArticle
                    (
                Article_type VARCHAR(100),
                Creator_article VARCHAR(200),
                title_article TEXT,
                content_article TEXT,
                subject_article VARCHAR(200),
                EDISISERIAL VARCHAR(200),
                TANGGAL_TERBIT_EDISI_SERIAL VARCHAR(200),
                CatalogId            INT(11),
                title       TEXT,
                bahasa VARCHAR(100),
                author    VARCHAR(200),
                publisher   VARCHAR(100),
                PublishLocation  VARCHAR(100),
                PublishYear VARCHAR(100),
                SUBJECT VARCHAR(200),
                CoverURL VARCHAR(100),
                worksheet_id INT,
                worksheet VARCHAR(100),
                KONTEN_DIGITAL VARCHAR(100)
                    );
                     IF bahasa <> '' THEN SET bhs = CONCAT(bhs,' AND R.TAG IN (''008'') AND SUBSTRING(R.VALUE,36,3) = ''',bahasa,''''); 
                      END IF;
                     IF bentukKarya <> '' THEN SET karya = CONCAT(bhs,' AND R.TAG IN (''008'') AND SUBSTRING(R.VALUE,34,1) = ''',bentukKarya,''''); 
                      END IF;
                     IF targetPembaca <> '' THEN SET pembaca = CONCAT(pembaca,' AND R.TAG IN (''008'') AND SUBSTRING(R.VALUE,23,1) = ''',targetPembaca,''''); 
                      END IF;
                     
                     IF fAuthor <> '' THEN SET querys = CONCAT(querys,' AND CAT.Author = ''',fAuthor,''''); 
                      END IF;
                      IF fPublisher <> ''   THEN SET querys = CONCAT(querys,' AND CAT.Publisher = ''',fPublisher,'''');
                      END IF;
                      IF fPublishLoc <> '' THEN SET querys = CONCAT(querys,' AND CAT.PublishLocation = ''',fPublishLoc,''''); 
                      END IF;
                      IF fPublishYear <> ''  THEN SET querys = CONCAT(querys,' AND CAT.PublishYear = ''',fPublishYear,''''); 
                       END IF;
                      IF fSubject <> ''  THEN SET querys = CONCAT(querys,' AND CAT.Subject = ''',fSubject,''''); 
                       END IF;
                        IF fBahasa <> ''  THEN SET querys = CONCAT(querys,' AND CAT.Languages = ''',fBahasa,''''); 
                       END IF;
                SET @query_as_string=CONCAT('
                INSERT INTO tempCariArticle
                        SELECT art.Article_type,art.Creator AS Creator_article, art.title AS title_article, art.content AS content_article, art.subject AS subject_article, art.EDISISERIAL, art.TANGGAL_TERBIT_EDISI_SERIAL, CAT.id CatalogId,CAT.title,CAT.Languages, CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.CoverURL ,CAT.Worksheet_id, 
                            w.name worksheet,
                                    (SELECT GROUP_CONCAT(DISTINCT SUBSTRING(FileURL,(LENGTH(FileURL)-LOCATE(''.'',REVERSE(FileURL)))+2) SEPARATOR '','') 
                                     FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                          FROM serial_articles art 
                          JOIN catalogs CAT ON art.Catalog_id = CAT.ID  
                          lEFT JOIN worksheets w ON w.id = CAT.Worksheet_id
                          
                          ',querys3,' 
                       WHERE 
                      
                       ',keyword,' AND CAT.isopac=1 AND art.ISOPAC=1
                            AND w.ISSERIAL = 1',querys,querys2,' LIMIT ',limit1,',',limit2,' ');            
                      
                     PREPARE statement_1 
                      FROM @query_as_string ;
                       EXECUTE statement_1;
                      DEALLOCATE PREPARE statement_1;
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `insertTempLanjutOpac` */

/*!50003 DROP PROCEDURE IF EXISTS  `insertTempLanjutOpac` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `insertTempLanjutOpac`(
                    IN worksheet TEXT,
                    IN bahasa TEXT,
                    IN targetPembaca TEXT,
                    in bentukKarya TEXT,
                    IN keyword TEXT,
                    IN fAuthor TEXT,
                    IN fPublisher TEXT,
                    IN fPublishLoc TEXT,
                    IN fPublishYear TEXT,
                    IN fSubject TEXT,
                    IN fBahasa TEXT,
                    IN isLKD TEXT,
                    IN lokasi TEXT
                    )
BEGIN
                    DECLARE querys,querys2,querys3,bhs,karya,pembaca,queryloc,querylocjoin TEXT;
                    set querys='';
                    set querys2='';
                    set querys3='';
                    SET queryloc='';
                    SET querylocjoin='';
                    set bhs='';
                    set karya='';
                    set pembaca='';
                    DROP TABLE IF EXISTS tempCariOpac;
                    CREATE  TEMPORARY TABLE tempCariOpac
                    (
                    CatalogId            INT(11),
                    title       TEXT,
                    author    TEXT,
                    publisher   TEXT,
                    PublishLocation  TEXT,
                    PublishYear TEXT,
                    Subject Text,
                    bahasa TEXT,
                    CoverURL TEXT,
                    worksheet_id INT,
                    worksheet TEXT,
                    ISSERIAL TEXT,
                    JML_BUKU INT,
                    ALL_BUKU INT,
                    KONTEN_DIGITAL VARCHAR(100)
                    );
                     IF bahasa <> '' THEN SET bhs = CONCAT(bhs,' AND R.TAG IN (''008'') AND SUBSTRING(R.VALUE,36,3) = ''',bahasa,''''); 
                      END IF;
                     IF bentukKarya <> '' THEN SET karya = CONCAT(bhs,' AND R.TAG IN (''008'') AND SUBSTRING(R.VALUE,34,1) = ''',bentukKarya,''''); 
                      END IF;
                     IF targetPembaca <> '' THEN SET pembaca = CONCAT(pembaca,' AND R.TAG IN (''008'') AND SUBSTRING(R.VALUE,23,1) = ''',targetPembaca,''''); 
                      END IF;
                     IF fAuthor <> '' THEN SET querys = CONCAT(querys,' AND CAT.Author = ''',fAuthor,''''); 
                      END IF;
                      IF fPublisher <> ''   THEN SET querys = CONCAT(querys,' AND CAT.Publisher = ''',fPublisher,'''');
                      END IF;
                      IF fPublishLoc <> '' THEN SET querys = CONCAT(querys,' AND CAT.PublishLocation = ''',fPublishLoc,''''); 
                      END IF;
                      IF fPublishYear <> ''  THEN SET querys = CONCAT(querys,' AND CAT.PublishYear = ''',fPublishYear,''''); 
                       END IF;
                      IF fSubject <> ''  THEN SET querys = CONCAT(querys,' AND CAT.Subject = ''',fSubject,''''); 
                       END IF;
                        IF fBahasa <> ''  THEN SET querys = CONCAT(querys,' AND CAT.Languages = ''',fBahasa,''''); 
                       END IF;
                       
                       IF lokasi <> 0 THEN SET queryloc = CONCAT(queryloc,' AND col.Location_id = ''',lokasi,''''); 
                       END IF;
                       
                       IF lokasi <> 0 THEN SET querylocjoin = CONCAT(querys,' LEFT JOIN collections col ON col.Catalog_id = R.CATALOGID '); 
                       END IF;
                       
                        IF worksheet <> 'Semua Format FIle' and isLKD = 1  THEN SET querys2 = CONCAT(querys2,' HAVING KONTEN_DIGITAL =  ''',worksheet,''''); 
                       END IF;
                        IF isLKD  = 1  THEN SET querys3 = CONCAT(querys3,' INNER JOIN catalogfiles CF on  CAT.ID = CF.Catalog_id '); 
                       END IF;
                       
                       
                    SET @query_as_string=CONCAT('
                        INSERT INTO tempCariOpac
                         SELECT distinct CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.Languages,CAT.CoverURL ,CAT.Worksheet_id, 
                                   (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                                    (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                    (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND (BookingExpiredDate < now() || BookingExpiredDate is null)) JML_BUKU,
                                     (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                     (SELECT GROUP_CONCAT(DISTINCT SUBSTRING(FileURL,(LENGTH(FileURL)-LOCATE(''.'',REVERSE(FileURL)))+2) SEPARATOR '','') 
                                     FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                          FROM catalogs CAT 
                          -- LEFT JOIN collections col ON col.Catalog_id = CAT.ID
                          
                          ',querys3,' 
                          WHERE EXISTS           
                                   (SELECT  1
                                    FROM catalog_ruas R  ',querylocjoin,' 
                                     WHERE 
                                     
                                    
                                     
                    ',keyword,queryloc,bhs,karya,pembaca,'  AND R.CATALOGID=CAT.ID) AND CAT.isopac=1',querys,querys2);
                     PREPARE statement_1 
                      FROM @query_as_string ;
                       EXECUTE statement_1;
                      DEALLOCATE PREPARE statement_1;
                            
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `insertTempLanjutOpac0` */

/*!50003 DROP PROCEDURE IF EXISTS  `insertTempLanjutOpac0` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `insertTempLanjutOpac0`(
                IN worksheet TEXT,
                IN bahasa TEXT,
                IN targetPembaca TEXT,
                IN bentukKarya TEXT,
                IN keyword TEXT,
                IN limit1 TEXT,
                IN limit2 TEXT,
                IN fAuthor TEXT,
                IN fPublisher TEXT,
                IN fPublishLoc TEXT,
                IN fPublishYear TEXT,
                IN fSubject TEXT,
                IN fBahasa TEXT,
                IN isLKD TEXT,
                IN lokasi TEXT
                )
BEGIN
                DECLARE querys,querys2,querys3,bhs,karya,pembaca,queryloc,querylocjoin TEXT;
                SET querys='';
                SET querys2='';
                SET querys3='';
                SET queryloc='';
                SET querylocjoin='';
                SET bhs='';
                SET karya='';
                SET pembaca='';
                DROP TABLE IF EXISTS tempCariOpac;
                CREATE  TEMPORARY TABLE tempCariOpac
                (
                CatalogId            INT(11),
                title       TEXT,
                author    TEXT,
                publisher   TEXT,
                PublishLocation  TEXT,
                PublishYear TEXT,
                SUBJECT TEXT,
                bahasa TEXT,
                CoverURL TEXT,
                worksheet_id INT,
                worksheet TEXT,
                ISSERIAL TEXT,
                JML_BUKU INT,
                ALL_BUKU INT,
                KONTEN_DIGITAL VARCHAR(100)
                );
                 IF bahasa <> '' THEN SET bhs = CONCAT(bhs,' AND R.TAG IN (''008'') AND SUBSTRING(R.VALUE,36,3) = ''',bahasa,''''); 
                  END IF;
                 IF bentukKarya <> '' THEN SET karya = CONCAT(bhs,' AND R.TAG IN (''008'') AND SUBSTRING(R.VALUE,34,1) = ''',bentukKarya,''''); 
                  END IF;
                 IF targetPembaca <> '' THEN SET pembaca = CONCAT(pembaca,' AND R.TAG IN (''008'') AND SUBSTRING(R.VALUE,23,1) = ''',targetPembaca,''''); 
                  END IF;
                 
                 IF fAuthor <> '' THEN SET querys = CONCAT(querys,' AND CAT.Author = ''',fAuthor,''''); 
                  END IF;
                  IF fPublisher <> ''   THEN SET querys = CONCAT(querys,' AND CAT.Publisher = ''',fPublisher,'''');
                  END IF;
                  IF fPublishLoc <> '' THEN SET querys = CONCAT(querys,' AND CAT.PublishLocation = ''',fPublishLoc,''''); 
                  END IF;
                  IF fPublishYear <> ''  THEN SET querys = CONCAT(querys,' AND CAT.PublishYear = ''',fPublishYear,''''); 
                   END IF;
                  IF fSubject <> ''  THEN SET querys = CONCAT(querys,' AND CAT.Subject = ''',fSubject,''''); 
                   END IF;
                    IF fBahasa <> ''  THEN SET querys = CONCAT(querys,' AND CAT.Languages = ''',fBahasa,''''); 
                   END IF;
                   
                   IF lokasi <> 0 THEN SET queryloc = CONCAT(queryloc,' AND col.Location_id = ''',lokasi,''''); 
                   END IF;
                   
                   IF lokasi <> 0 THEN SET querylocjoin = CONCAT(querys,' LEFT JOIN collections col ON col.Catalog_id = R.CATALOGID '); 
                   END IF;
                   
                   
                   
                      IF worksheet <> 'Semua Format FIle' AND isLKD = 1  THEN SET querys2 = CONCAT(querys2,' HAVING KONTEN_DIGITAL =  ''',worksheet,''''); 
                   END IF;
                   
                    IF isLKD  = 1  THEN SET querys3 = CONCAT(querys3,' INNER JOIN catalogfiles CF on  CAT.ID = CF.Catalog_id '); 
                   END IF;
                   
                   
                SET @query_as_string=CONCAT('
                    INSERT INTO tempCariOpac
                     SELECT distinct CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.Languages,CAT.CoverURL ,CAT.Worksheet_id, 
                               (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                               (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND (BookingExpiredDate < now() || BookingExpiredDate is null)) JML_BUKU,
                                 (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                 (SELECT GROUP_CONCAT(DISTINCT SUBSTRING(FileURL,(LENGTH(FileURL)-LOCATE(''.'',REVERSE(FileURL)))+2) SEPARATOR '','') 
                                 FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                      FROM catalogs CAT 
                      -- LEFT JOIN collections col ON col.Catalog_id = CAT.ID
                      
                      ',querys3,' 
                   WHERE EXISTS           
                               (SELECT  1
                                FROM catalog_ruas R  ',querylocjoin,' 
                                 WHERE    
                                
                                 
                ',keyword,queryloc,bhs,karya,pembaca,' AND R.CATALOGID=CAT.ID) AND CAT.isopac=1',querys,querys2,' LIMIT ',limit1,',',limit2,' ');
                 PREPARE statement_1 
                  FROM @query_as_string ;
                   EXECUTE statement_1;
                  DEALLOCATE PREPARE statement_1;
                END */$$
DELIMITER ;

/* Procedure structure for procedure `insertTempSederhanaArticle` */

/*!50003 DROP PROCEDURE IF EXISTS  `insertTempSederhanaArticle` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `insertTempSederhanaArticle`(
                    IN keyword TEXT,
                    IN tag TEXT,
                    IN isLimit INT,
                    IN limit1 INT,
                    IN limit2 INT
                    )
BEGIN
                    DROP TABLE IF EXISTS tempCariArticle;
                    CREATE  TEMPORARY TABLE tempCariArticle
                    (
                    serial_articles_id INT(11),
                    Article_type VARCHAR(100),
                    Creator_article VARCHAR(200),
                    title_article TEXT,
                    content_article TEXT,
                    subject_article VARCHAR(200),
                    EDISISERIAL VARCHAR(200),
                    TANGGAL_TERBIT_EDISI_SERIAL VARCHAR(200),
                    CatalogId            INT(11),
                    title       TEXT,
                    bahasa VARCHAR(100),
                    author    VARCHAR(200),
                    publisher   VARCHAR(100),
                    PublishLocation  VARCHAR(100),
                    PublishYear VARCHAR(100),
                    SUBJECT VARCHAR(200),
                    CoverURL VARCHAR(100),
                    worksheet_id INT,
                    worksheet VARCHAR(100),
                    KONTEN_DIGITAL VARCHAR(100)
                    );              
                    IF isLimit = 1
                    THEN
                            INSERT INTO tempCariArticle
                            SELECT art.id AS id, art.Article_type,art.Creator AS Creator_article, art.title AS title_article, art.content AS content_article, art.subject AS subject_article, art.EDISISERIAL, art.TANGGAL_TERBIT_EDISI_SERIAL, CAT.id CatalogId,CAT.title,CAT.Languages, CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.CoverURL ,CAT.Worksheet_id, 
                                w.name worksheet,
                                (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') FROM serial_articlefiles WHERE Articles_id = art.id AND art.Catalog_id = CAT.ID) KONTEN_DIGITAL
                              FROM serial_articles art 
                              -- update nambah join ini
                                JOIN serial_articles_repeatable sar ON sar.serial_article_ID = art.id
                              -- batas akhir update 
                              JOIN catalogs CAT ON art.Catalog_id = CAT.ID  
                              lEFT JOIN worksheets w ON w.id = CAT.Worksheet_id
                              WHERE  
                              
                                CASE tag
                                    WHEN 'Judul' THEN art.Title LIKE keyword
                                    -- update filter
                                    WHEN 'Pengarang' THEN (sar.article_field IN ('Kreator','Kontributor') AND sar.value LIKE keyword)
                                    WHEN 'Subyek' THEN (sar.article_field IN ('Subjek') AND sar.value LIKE keyword)
                                    -- batas update filter
                                    /*WHEN 'Pengarang' THEN art.Creator LIKE keyword
                                    WHEN 'Subyek' THEN art.Subject LIKE keyword*/     
                                    WHEN 'Sembarang' THEN 1 = 1
                                END
                              
                                AND CAT.isopac=1 
                                AND art.ISOPAC=1
                                AND w.ISSERIAL = 1
                                GROUP BY art.id
                                LIMIT limit1,limit2;
                                
                    ELSE
                            INSERT INTO tempCariArticle
                            SELECT art.id AS id, art.Article_type,art.Creator AS Creator_article, art.title AS title_article, art.content AS content_article, art.subject AS subject_article, art.EDISISERIAL, art.TANGGAL_TERBIT_EDISI_SERIAL, CAT.id CatalogId,CAT.title,CAT.Languages, CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.CoverURL ,CAT.Worksheet_id, 
                                w.name worksheet,
                                (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') FROM serial_articlefiles WHERE Articles_id = art.id AND art.Catalog_id = CAT.ID) KONTEN_DIGITAL
                              FROM serial_articles art 
                              -- update nambah join ini
                                JOIN serial_articles_repeatable sar ON sar.serial_article_ID = art.id
                              -- batas akhir update 
                              JOIN catalogs CAT ON art.Catalog_id = CAT.ID  
                              lEFT JOIN worksheets w ON w.id = CAT.Worksheet_id
                              WHERE  
                              
                                CASE tag
                                    WHEN 'Judul' THEN art.Title LIKE keyword
                                    -- update filter
                                    WHEN 'Pengarang' THEN (sar.article_field IN ('Kreator','Kontributor') AND sar.value LIKE keyword)
                                    WHEN 'Subyek' THEN (sar.article_field IN ('Subjek') AND sar.value LIKE keyword)
                                    -- batas update filter
                                    /*WHEN 'Pengarang' THEN art.Creator LIKE keyword
                                    WHEN 'Subyek' THEN art.Subject LIKE keyword*/     
                                    WHEN 'Sembarang' THEN 1 = 1
                                END
                              
                                AND CAT.isopac=1 
                                AND art.ISOPAC=1
                                AND w.ISSERIAL = 1
                                GROUP BY art.id;  
                            
                        END IF;
                              
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `insertTempSederhanaOpac123` */

/*!50003 DROP PROCEDURE IF EXISTS  `insertTempSederhanaOpac123` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `insertTempSederhanaOpac123`(
IN keyword TEXT,
IN tag TEXT,
IN worksheet VARCHAR(255),
IN fAuthor TEXT,
IN fPublisher TEXT,
IN fPublishLoc TEXT,
IN fPublishYear TEXT,
IN fSubject TEXT,
IN fromTgl TEXT,
IN toTgl TEXT,
IN isLKD TEXT
)
BEGIN
DROP TABLE IF EXISTS tempCariOpac;
CREATE  TEMPORARY TABLE tempCariOpac
(
CatalogId            INT(11),
title       TEXT,
author    TEXT,
publisher   TEXT,
PublishLocation  TEXT,
PublishYear TEXT,
Subject TEXT,
CoverURL TEXT,
worksheet_id INT,
worksheet TEXT,
JML_BUKU INT,
ALL_BUKU INT,
KONTEN_DIGITAL VARCHAR(100)
);
IF isLKD = 1
then
 INSERT INTO tempCariOpac
 SELECT distinct CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.CoverURL ,CAT.Worksheet_id, 
               (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND (BookingExpiredDate < now() || BookingExpiredDate is null)) JML_BUKU,
                 (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                 (SELECT GROUP_CONCAT(DISTINCT SUBSTRING(FileURL,(LENGTH(FileURL)-LOCATE('.',REVERSE(FileURL)))+2) SEPARATOR ', ') 
                 FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
      FROM catalogs CAT 
      	 INNER JOIN catalogfiles CF on  CAT.ID = CF.Catalog_id 
      
      WHERE 
      
      
      EXISTS           
               (SELECT  1
                FROM catalog_ruas R  
                 WHERE 
     
		CASE tag
		WHEN 'Judul' THEN R.TAG IN ('240','245','246','440','740')
		WHEN 'Pengarang' THEN R.TAG IN ('100','110','700','710')
		WHEN 'Penerbit' THEN R.TAG IN ('260')
		WHEN 'Tahun Terbit' THEN R.TAG IN ('260')
		WHEN 'Subyek' THEN R.TAG IN ('600','610','611','650','651')
		WHEN 'Nomor Panggil' THEN R.TAG IN ('090','082','084','080')
		WHEN 'BIB-ID' THEN R.TAG IN ('035')
		WHEN 'ISBN/ISSN/ISMN' THEN R.TAG IN ('020','022')
		        WHEN 'Semua Ruas' THEN 1 = 1
		END
                AND  R.Value LIKE keyword 
			                 AND R.CATALOGID=CAT.ID
	
                
                ) 
			
        AND
		IF(fAuthor='',1=1,CAT.Author LIKE concat('%',concat(fAuthor,'%'))) AND
		IF(fPublisher='',1=1,CAT.Publisher LIKE fPublisher) AND
		IF(fPublishLoc='',1=1,CAT.PublishLocation LIKE fPublishLoc) AND
		IF(fPublishYear='',1=1,CAT.PublishYear LIKE fPublishYear) AND
        IF(fSubject='',1=1,CAT.Subject LIKE fSubject) AND
		
        CAT.isopac=1
        
		
	 HAVING CASE worksheet
		 WHEN 'pdf' THEN KONTEN_DIGITAL = worksheet
		 WHEN 'doc' THEN KONTEN_DIGITAL = worksheet
		 WHEN 'xls' THEN KONTEN_DIGITAL = worksheet
		 WHEN 'rar' THEN KONTEN_DIGITAL = worksheet
         WHEN 'Semua Format File' THEN 1 = 1
        
			END
        ;  
else             
IF worksheet='4' THEN   
SELECT distinct CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.CoverURL ,CAT.Worksheet_id, 
               (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND (BookingExpiredDate < now() || BookingExpiredDate is null)) JML_BUKU,
                 (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                 (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') 
                 FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
      FROM catalogs CAT 
            WHERE EXISTS           
               (SELECT  1
                FROM catalog_ruas R  LEFT JOIN collections col ON col.Catalog_id = R.CATALOGID
                 WHERE 
      							 		
		CASE tag
		WHEN 'Judul' THEN R.TAG IN ('240','245','246','440','740')
		WHEN 'Pengarang' THEN R.TAG IN ('100','110','700','710')
		WHEN 'Penerbit' THEN R.TAG IN ('260')
		WHEN 'Tahun Terbit' THEN R.TAG IN ('260')
		WHEN 'Subyek' THEN R.TAG LIKE '6%'
		WHEN 'Nomor Panggil' THEN R.TAG IN ('090','082','084','080')
		WHEN 'BIB-ID' THEN R.TAG IN ('035')
		WHEN 'ISBN/ISSN/ISMN' THEN R.TAG IN ('020','022')
		WHEN 'Semua Ruas' THEN R.TAG IN ('240','245','740','100','110','700','710','260','600','610','611','630','650','651','080','082','084','096','022','020')
		END
                
		AND  R.Value LIKE keyword 
         AND IF(fromTgl!='' AND toTgl!='' ,col.TANGGAL_TERBIT_EDISI_SERIAL BETWEEN fromTgl AND toTgl,1=1)
                                AND R.CATALOGID=CAT.ID) 
		AND IF(worksheet='Semua Jenis bahan',1=1,CAT.Worksheet_id = worksheet)
		AND
        IF(fAuthor='',1=1,CAT.Author LIKE concat('%',concat(fAuthor,'%'))) AND
		IF(fPublisher='',1=1,CAT.Publisher LIKE fPublisher) AND
		IF(fPublishLoc='',1=1,CAT.PublishLocation LIKE fPublishLoc) AND
		IF(fPublishYear='',1=1,CAT.PublishYear LIKE fPublishYear) AND
        IF(fSubject='',1=1,CAT.Subject LIKE fSubject) AND
		
        CAT.isopac=1 
		;    
else
SELECT distinct CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.subject,CAT.CoverURL ,CAT.Worksheet_id, 
               (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND (BookingExpiredDate < now() || BookingExpiredDate is null)) JML_BUKU,
                 (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                 (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') 
                 FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
      FROM catalogs CAT 
            WHERE EXISTS           
               (SELECT  1
                FROM catalog_ruas R  
                                 WHERE 
      							 		
		CASE tag
		WHEN 'Judul' THEN R.TAG IN ('240','245','246','440','740')
		WHEN 'Pengarang' THEN R.TAG IN ('100','110','700','710')
		WHEN 'Penerbit' THEN R.TAG IN ('260')
		WHEN 'Tahun Terbit' THEN R.TAG IN ('260')
		WHEN 'Subyek' THEN R.TAG LIKE '6%'
		WHEN 'Nomor Panggil' THEN R.TAG IN ('090','082','084','080')
		WHEN 'BIB-ID' THEN R.TAG IN ('035')
		WHEN 'ISBN/ISSN/ISMN' THEN R.TAG IN ('020','022')
		WHEN 'Semua Ruas' THEN R.TAG IN ('240','245','740','100','110','700','710','260','600','610','611','630','650','651','080','082','084','096','022','020')
		END
                
		AND  R.Value LIKE keyword 
                               AND R.CATALOGID=CAT.ID) 
		AND IF(worksheet='Semua Jenis bahan',1=1,CAT.Worksheet_id = worksheet)
		AND
        IF(fAuthor='',1=1,CAT.Author LIKE concat('%',concat(fAuthor,'%'))) AND
		IF(fPublisher='',1=1,CAT.Publisher LIKE fPublisher) AND
		IF(fPublishLoc='',1=1,CAT.PublishLocation LIKE fPublishLoc) AND
		IF(fPublishYear='',1=1,CAT.PublishYear LIKE fPublishYear) AND
        IF(fSubject='',1=1,CAT.Subject LIKE fSubject) AND
		
        CAT.isopac=1 
		;  
end if;
end if;
END */$$
DELIMITER ;

/* Procedure structure for procedure `insertTempTelusurArticle` */

/*!50003 DROP PROCEDURE IF EXISTS  `insertTempTelusurArticle` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `insertTempTelusurArticle`(
                        IN tag TEXT,
                        IN findby TEXT,
                        IN fquery TEXT,
                        IN fquery2 TEXT,
                        IN fAuthor TEXT,
                        IN fPublisher TEXT,
                        IN fPublishLoc TEXT,
                        IN fPublishYear TEXT,
                        IN FSubject TEXT,
                        IN fBahasa TEXT,
                        IN isLKD TEXT
                        )
BEGIN
                        DROP TABLE IF EXISTS tempCariArticle;
                        CREATE  TEMPORARY TABLE tempCariArticle
                        (
                        CatalogId            INT(11),
                        title       TEXT,
                        author    TEXT,
                        publisher   TEXT,
                        PublishLocation  TEXT,
                        PublishYear TEXT,
                        SUBJECT TEXT,
                        bahasa TEXT,
                        CoverURL TEXT,
                        worksheet_id INT,
                        worksheet TEXT,
                        ISSERIAL TEXT,
                        JML_BUKU INT,
                        ALL_BUKU INT,
                        KONTEN_DIGITAL VARCHAR(100)
                        );              
                        IF isLKD = 1 THEN
                                INSERT INTO tempCariArticle
                        SELECT CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.Subject,CAT.Languages,CAT.CoverURL ,CAT.Worksheet_id,
                                       (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                                        (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                        (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND BookingExpiredDate < NOW()) JML_BUKU,
                                         (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                         (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') 
                                         FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                              FROM catalogs CAT 
                              INNER JOIN catalogfiles CF ON  CAT.ID = CF.Catalog_id
                              WHERE CAT.isopac=1 AND
                                         IF(fAuthor='',1=1,CAT.Author = fAuthor) AND
                                 IF(fPublisher='',1=1,CAT.Publisher = fPublisher) AND
                                 IF(fPublishLoc='',1=1,CAT.PublishLocation = fPublishLoc) AND
                                 IF(fPublishYear='',1=1,CAT.PublishYear = fPublishYear) AND
                                 IF(fSubject='',1=1,CAT.SUBJECT = fSubject) AND
                                 IF(fBahasa='',1=1,CAT.Languages LIKE fBahasa) AND
                                CASE tag
                                WHEN 'Author' THEN CAT.Author = fquery2
                                WHEN 'Subject' THEN CAT.subject = fquery2
                                WHEN 'Publisher' THEN CAT.Publisher = fquery2
                                WHEN 'PublishLocation' THEN CAT.PublishLocation = fquery2
                                WHEN 'PublishYear' THEN CAT.PublishYear = fquery2
                                END
                                 AND
                                CASE findBy
                                WHEN 'Alphabetical'  THEN  1=1
                                WHEN 'Author' THEN CAT.Author = fquery
                                WHEN 'Subject' THEN CAT.subject = fquery
                                WHEN 'Publisher' THEN CAT.Publisher = fquery
                                WHEN 'PublishLocation' THEN CAT.PublishLocation = fquery
                                WHEN 'PublishYear' THEN CAT.PublishYear = fquery
                                END;
                                  
                        ELSE
                            INSERT INTO tempCariArticle
                        SELECT CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.Subject,CAT.Languages,CAT.CoverURL ,CAT.Worksheet_id,
                                       (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                                        (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                        (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND BookingExpiredDate < NOW()) JML_BUKU,
                                         (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                         (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') 
                                         FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                              FROM catalogs CAT 
                              WHERE CAT.isopac=1 AND
                                 IF(fAuthor='',1=1,CAT.Author = fAuthor) AND
                                 IF(fPublisher='',1=1,CAT.Publisher = fPublisher) AND
                                 IF(fPublishLoc='',1=1,CAT.PublishLocation = fPublishLoc) AND
                                 IF(fPublishYear='',1=1,CAT.PublishYear = fPublishYear) AND
                                 IF(fSubject='',1=1,CAT.SUBJECT = fSubject) AND
                                 IF(fBahasa='',1=1,CAT.Languages LIKE fBahasa) AND
                                CASE tag
                                WHEN 'Author' THEN CAT.Author = fquery2
                                WHEN 'Subject' THEN CAT.subject = fquery2
                                WHEN 'Publisher' THEN CAT.Publisher = fquery2
                                WHEN 'PublishLocation' THEN CAT.PublishLocation = fquery2
                                WHEN 'PublishYear' THEN CAT.PublishYear = fquery2
                                END
                                 AND
                                CASE findBy
                                WHEN 'Alphabetical'  THEN  1=1
                                WHEN 'Author' THEN CAT.Author = fquery
                                WHEN 'Subject' THEN CAT.subject = fquery
                                WHEN 'Publisher' THEN CAT.Publisher = fquery
                                WHEN 'PublishLocation' THEN CAT.PublishLocation = fquery
                                WHEN 'PublishYear' THEN CAT.PublishYear = fquery
                                END;
                                  
                        END IF;
                        END */$$
DELIMITER ;

/* Procedure structure for procedure `insertTempTelusurOpac` */

/*!50003 DROP PROCEDURE IF EXISTS  `insertTempTelusurOpac` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `insertTempTelusurOpac`(
                    IN tag TEXT,
                    IN findby TEXT,
                    IN fquery TEXT,
                    IN fquery2 TEXT,
                    IN fAuthor TEXT,
                    IN fPublisher TEXT,
                    IN fPublishLoc TEXT,
                    IN fPublishYear TEXT,
                    IN FSubject TEXT,
                    IN fBahasa TEXT,
                    IN isLKD TEXT
                    )
BEGIN
                    DROP TABLE IF EXISTS tempCariOpac;
                    CREATE  TEMPORARY TABLE tempCariOpac
                    (
                    CatalogId            INT(11),
                    title       TEXT,
                    author    TEXT,
                    publisher   TEXT,
                    PublishLocation  TEXT,
                    PublishYear TEXT,
                    Subject TEXT,
                    bahasa TEXT,
                    CoverURL TEXT,
                    worksheet_id INT,
                    worksheet TEXT,
                    ISSERIAL TEXT,
                    JML_BUKU INT,
                    ALL_BUKU INT,
                    KONTEN_DIGITAL VARCHAR(100)
                    );              
                    if isLKD = 1 then
                            INSERT INTO tempCariOpac
                    SELECT CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.Subject,CAT.Languages,CAT.CoverURL ,CAT.Worksheet_id,
                                   (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                                    (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                    (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND BookingExpiredDate < now()) JML_BUKU,
                                     (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                     (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') 
                                     FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                          FROM catalogs CAT 
                          INNER JOIN catalogfiles CF on  CAT.ID = CF.Catalog_id
                          WHERE CAT.isopac=1 AND
                                     IF(fAuthor='',1=1,CAT.Author = fAuthor) AND
                             IF(fPublisher='',1=1,CAT.Publisher = fPublisher) AND
                             IF(fPublishLoc='',1=1,CAT.PublishLocation = fPublishLoc) AND
                             IF(fPublishYear='',1=1,CAT.PublishYear = fPublishYear) AND
                             IF(fSubject='',1=1,CAT.SUBJECT = fSubject) AND
                             IF(fBahasa='',1=1,CAT.Languages LIKE fBahasa) AND
                            CASE tag
                            WHEN 'Author' THEN CAT.Author = fquery2
                            WHEN 'Subject' THEN CAT.subject = fquery2
                            WHEN 'Publisher' THEN CAT.Publisher = fquery2
                            WHEN 'PublishLocation' THEN CAT.PublishLocation = fquery2
                            WHEN 'PublishYear' THEN CAT.PublishYear = fquery2
                            END
                             AND
                            CASE findBy
                            When 'Alphabetical'  THEN  1=1
                            WHEN 'Author' THEN CAT.Author = fquery
                            WHEN 'Subject' THEN CAT.subject = fquery
                            WHEN 'Publisher' THEN CAT.Publisher = fquery
                            WHEN 'PublishLocation' THEN CAT.PublishLocation = fquery
                            WHEN 'PublishYear' THEN CAT.PublishYear = fquery
                            END;
                              
                    else
                        INSERT INTO tempCariOpac
                    SELECT CAT.id CatalogId,CAT.title,CAT.author,CAT.publisher,CAT.PublishLocation,CAT.PublishYear,CAT.Subject,CAT.Languages,CAT.CoverURL ,CAT.Worksheet_id,
                                   (SELECT NAME FROM worksheets WHERE id=CAT.Worksheet_id) worksheet,
                                    (SELECT ISSERIAL FROM worksheets WHERE id=CAT.Worksheet_id) ISSERIAL,
                                    (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID AND STATUS_ID=1 AND BookingExpiredDate < now()) JML_BUKU,
                                     (SELECT COUNT(1) FROM collections WHERE CATALOG_ID=CAT.ID) ALL_BUKU,
                                     (SELECT GROUP_CONCAT(DISTINCT SUBSTR(fileURL,INSTR(fileURL, '.')+1) SEPARATOR ', ') 
                                     FROM catalogfiles WHERE Catalog_id = CAT.ID) KONTEN_DIGITAL
                          FROM catalogs CAT 
                          WHERE CAT.isopac=1 AND
                             IF(fAuthor='',1=1,CAT.Author = fAuthor) AND
                             IF(fPublisher='',1=1,CAT.Publisher = fPublisher) AND
                             IF(fPublishLoc='',1=1,CAT.PublishLocation = fPublishLoc) AND
                             IF(fPublishYear='',1=1,CAT.PublishYear = fPublishYear) AND
                             IF(fSubject='',1=1,CAT.SUBJECT = fSubject) AND
                             IF(fBahasa='',1=1,CAT.Languages LIKE fBahasa) AND
                            CASE tag
                            WHEN 'Author' THEN CAT.Author = fquery2
                            WHEN 'Subject' THEN CAT.subject = fquery2
                            WHEN 'Publisher' THEN CAT.Publisher = fquery2
                            WHEN 'PublishLocation' THEN CAT.PublishLocation = fquery2
                            WHEN 'PublishYear' THEN CAT.PublishYear = fquery2
                            END
                             AND
                            CASE findBy
                            When 'Alphabetical'  THEN  1=1
                            WHEN 'Author' THEN CAT.Author = fquery
                            WHEN 'Subject' THEN CAT.subject = fquery
                            WHEN 'Publisher' THEN CAT.Publisher = fquery
                            WHEN 'PublishLocation' THEN CAT.PublishLocation = fquery
                            WHEN 'PublishYear' THEN CAT.PublishYear = fquery
                            END;
                              
                    end if;
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `newCollectionOpac` */

/*!50003 DROP PROCEDURE IF EXISTS  `newCollectionOpac` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `newCollectionOpac`()
BEGIN
SELECT c.id AS id, c.title AS title, c.author AS author, c.PublishLocation AS PublishLocation, 
				c.publishyear AS YEAR, CONCAT(c.PublishLocation, '  ' , c.Publisher, '  ' ,c.publishyear) AS penerbitan, 
				c.publisher AS publisher,  c.publishyear AS YEAR, CONCAT(c.publisher, ' : ', c.publishyear) AS penerbitan,
				s.CreateDate, w.name AS wn, TRIM(c.coverurl) AS coverurl, c.callnumber AS callnumber
				FROM collections s 
               INNER JOIN catalogs c ON c.id = s.catalog_id 
                              LEFT JOIN worksheets w ON w.ID = c.Worksheet_id 
               WHERE c.isopac =1 
               GROUP BY c.id 
               ORDER BY s.createdate DESC;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `pencarianLanjutLimitOpac` */

/*!50003 DROP PROCEDURE IF EXISTS  `pencarianLanjutLimitOpac` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `pencarianLanjutLimitOpac`(
                    IN limit1 INT, 
                    IN limit2 INT,
                    IN fAuthor TEXT,
                    IN fPublisher TEXT,
                    IN fPublishLoc TEXT,
                    IN fPublishYear TEXT,
                    IN fSubject TEXT,
                    IN fBahasa TEXT
                    )
BEGIN
                    SELECT CatalogId,title kalimat2,author,publisher,PublishLocation,PublishYear,Subject,bahasa,CoverURL,
                                   worksheet_id,worksheet,
                                    JML_BUKU,
                                    ALL_BUKU,
                                    KONTEN_DIGITAL
                          FROM tempCariOpac
                          
                          WHERE 
                                IF(fAuthor='',1=1,author = fAuthor) AND
                          IF(fPublisher='',1=1,publisher = fPublisher) AND
                          IF(fPublishLoc='',1=1,PublishLocation = fPublishLoc) AND
                          IF(fPublishYear='',1=1,PublishYear = fPublishYear) AND
                          IF(fBahasa='',1=1,bahasa LIKE fBahasa) AND
                          IF(fSubject='',1=1,Subject = fSubject) 
                          
                          
                          LIMIT limit1,limit2;    
                    END */$$
DELIMITER ;

/* Procedure structure for procedure `pencarianSederhanaOpacLimit1` */

/*!50003 DROP PROCEDURE IF EXISTS  `pencarianSederhanaOpacLimit1` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `pencarianSederhanaOpacLimit1`(
                IN limit1 INT, 
                IN limit2 INT,
                IN fAuthor TEXT,
                IN fPublisher TEXT,
                IN fPublishLoc TEXT,
                IN fPublishYear TEXT,
                IN fSubject TEXT,
                IN fBahasa TEXT
                )
BEGIN
                SELECT *
                      FROM tempCariOpac 
                      
                      WHERE 
                     IF(fAuthor='',1=1,author LIKE concat('%',concat(fAuthor,'%'))) AND
                           IF(fPublisher='',1=1,publisher LIKE fPublisher) AND
                      IF(fPublishLoc='',1=1,PublishLocation LIKE fPublishLoc) AND
                      IF(fPublishYear='',1=1,PublishYear LIKE fPublishYear) AND
                      IF(fBahasa='',1=1,bahasa LIKE fBahasa) AND
                       IF(fSubject='',1=1,Subject LIKE fSubject)
                      
                      
                      LIMIT limit1,limit2;    
                END */$$
DELIMITER ;

/* Procedure structure for procedure `topCollectionOpac` */

/*!50003 DROP PROCEDURE IF EXISTS  `topCollectionOpac` */;

DELIMITER $$

/*!50003 CREATE   PROCEDURE `topCollectionOpac`()
BEGIN
SELECT COUNT(collection_id) entry, c.title AS title, c.id AS id, c.author AS author,
				c.PublishLocation AS PublishLocation, c.publishyear AS YEAR, 
				CONCAT(c.PublishLocation, '  ',  c.Publisher, '  ' ,c.publishyear) AS penerbitan, w.name AS wn,
				c.publisher AS publisher, c.publishyear AS YEAR, CONCAT(c.publisher, ' : ', c.publishyear) AS penerbitan, 
				TRIM(c.coverurl) AS coverurl,  c.callnumber AS callnumber
				
FROM collectionloanitems h 
               INNER JOIN collections s ON s.id = h.collection_id 
               INNER JOIN catalogs c ON c.id = s.catalog_id and c.ISOPAC =1 
                LEFT JOIN worksheets w ON w.ID = c.Worksheet_id 
               GROUP BY c.id ORDER BY entry DESC;
    END */$$
DELIMITER ;

/*Table structure for table `item_koleksi` */

DROP TABLE IF EXISTS `item_koleksi`;

/*!50001 DROP VIEW IF EXISTS `item_koleksi` */;
/*!50001 DROP TABLE IF EXISTS `item_koleksi` */;

/*!50001 CREATE TABLE  `item_koleksi`(
 `periode` varchar(6) ,
 `bulan` int(2) ,
 `tahun` int(4) ,
 `jumlah_eksemplar` bigint(21) 
)*/;

/*Table structure for table `v_abjadopac` */

DROP TABLE IF EXISTS `v_abjadopac`;

/*!50001 DROP VIEW IF EXISTS `v_abjadopac` */;
/*!50001 DROP TABLE IF EXISTS `v_abjadopac` */;

/*!50001 CREATE TABLE  `v_abjadopac`(
 `A` varchar(1) 
)*/;

/*Table structure for table `v_lap_kriteria_anggota` */

DROP TABLE IF EXISTS `v_lap_kriteria_anggota`;

/*!50001 DROP VIEW IF EXISTS `v_lap_kriteria_anggota` */;
/*!50001 DROP TABLE IF EXISTS `v_lap_kriteria_anggota` */;

/*!50001 CREATE TABLE  `v_lap_kriteria_anggota`(
 `kriteria` varchar(14) ,
 `id_dtl_anggota` varchar(255) ,
 `dtl_anggota` varchar(255) 
)*/;

/*Table structure for table `v_lap_kriteria_koleksi` */

DROP TABLE IF EXISTS `v_lap_kriteria_koleksi`;

/*!50001 DROP VIEW IF EXISTS `v_lap_kriteria_koleksi` */;
/*!50001 DROP TABLE IF EXISTS `v_lap_kriteria_koleksi` */;

/*!50001 CREATE TABLE  `v_lap_kriteria_koleksi`(
 `kriteria` varchar(19) ,
 `id_dtl_kriteria` text ,
 `dtl_kriteria` text 
)*/;

/*Table structure for table `v_pertumb_jml_kunjungan` */

DROP TABLE IF EXISTS `v_pertumb_jml_kunjungan`;

/*!50001 DROP VIEW IF EXISTS `v_pertumb_jml_kunjungan` */;
/*!50001 DROP TABLE IF EXISTS `v_pertumb_jml_kunjungan` */;

/*!50001 CREATE TABLE  `v_pertumb_jml_kunjungan`(
 `kriteria` varchar(10) ,
 `tahun` bigint(20) ,
 `jumlah` bigint(21) 
)*/;

/*Table structure for table `v_pertumb_jml_kunjungan_bulanan` */

DROP TABLE IF EXISTS `v_pertumb_jml_kunjungan_bulanan`;

/*!50001 DROP VIEW IF EXISTS `v_pertumb_jml_kunjungan_bulanan` */;
/*!50001 DROP TABLE IF EXISTS `v_pertumb_jml_kunjungan_bulanan` */;

/*!50001 CREATE TABLE  `v_pertumb_jml_kunjungan_bulanan`(
 `kriteria` varchar(10) ,
 `tahun` bigint(20) ,
 `bulan` bigint(20) ,
 `jumlah` decimal(32,0) 
)*/;

/*Table structure for table `v_stat_anggota` */

DROP TABLE IF EXISTS `v_stat_anggota`;

/*!50001 DROP VIEW IF EXISTS `v_stat_anggota` */;
/*!50001 DROP TABLE IF EXISTS `v_stat_anggota` */;

/*!50001 CREATE TABLE  `v_stat_anggota`(
 `tahun` int(4) ,
 `bulan` int(2) ,
 `jumlah` bigint(21) ,
 `jenisanggota` varchar(50) ,
 `IDjenisanggota` int(11) 
)*/;

/*Table structure for table `v_stat_colectionloan` */

DROP TABLE IF EXISTS `v_stat_colectionloan`;

/*!50001 DROP VIEW IF EXISTS `v_stat_colectionloan` */;
/*!50001 DROP TABLE IF EXISTS `v_stat_colectionloan` */;

/*!50001 CREATE TABLE  `v_stat_colectionloan`(
 `tahun` int(4) ,
 `bulan` int(1) ,
 `jumlah_judul` int(2) ,
 `jumlah_eksemplar` int(3) ,
 `jumlah_dijital` int(2) 
)*/;

/*Table structure for table `v_stat_jenis_pendidikan` */

DROP TABLE IF EXISTS `v_stat_jenis_pendidikan`;

/*!50001 DROP VIEW IF EXISTS `v_stat_jenis_pendidikan` */;
/*!50001 DROP TABLE IF EXISTS `v_stat_jenis_pendidikan` */;

/*!50001 CREATE TABLE  `v_stat_jenis_pendidikan`(
 `Keterangan` varchar(50) ,
 `Jumlah` bigint(21) ,
 `Tahun` varchar(4) ,
 `bulan` int(2) 
)*/;

/*Table structure for table `v_stat_jumlah_koleksi` */

DROP TABLE IF EXISTS `v_stat_jumlah_koleksi`;

/*!50001 DROP VIEW IF EXISTS `v_stat_jumlah_koleksi` */;
/*!50001 DROP TABLE IF EXISTS `v_stat_jumlah_koleksi` */;

/*!50001 CREATE TABLE  `v_stat_jumlah_koleksi`(
 `bulan` int(2) ,
 `tahun` int(4) ,
 `jumlah_judul` bigint(21) ,
 `jumlah_eksemplar` bigint(21) ,
 `jumlah_dijital` bigint(21) 
)*/;

/*Table structure for table `v_stat_kelas_subjek` */

DROP TABLE IF EXISTS `v_stat_kelas_subjek`;

/*!50001 DROP VIEW IF EXISTS `v_stat_kelas_subjek` */;
/*!50001 DROP TABLE IF EXISTS `v_stat_kelas_subjek` */;

/*!50001 CREATE TABLE  `v_stat_kelas_subjek`(
 `Keterangan` varchar(255) ,
 `Jumlah` int(11) ,
 `Tahun` int(4) 
)*/;

/*Table structure for table `v_stat_koleksi_dipinjam_eksemplar` */

DROP TABLE IF EXISTS `v_stat_koleksi_dipinjam_eksemplar`;

/*!50001 DROP VIEW IF EXISTS `v_stat_koleksi_dipinjam_eksemplar` */;
/*!50001 DROP TABLE IF EXISTS `v_stat_koleksi_dipinjam_eksemplar` */;

/*!50001 CREATE TABLE  `v_stat_koleksi_dipinjam_eksemplar`(
 `tahun` int(4) ,
 `bulan` int(2) ,
 `jumlah_eksemplar` bigint(21) 
)*/;

/*Table structure for table `v_stat_koleksi_dipinjam_judul` */

DROP TABLE IF EXISTS `v_stat_koleksi_dipinjam_judul`;

/*!50001 DROP VIEW IF EXISTS `v_stat_koleksi_dipinjam_judul` */;
/*!50001 DROP TABLE IF EXISTS `v_stat_koleksi_dipinjam_judul` */;

/*!50001 CREATE TABLE  `v_stat_koleksi_dipinjam_judul`(
 `tahun` int(4) ,
 `bulan` int(2) ,
 `jumlah_judul` bigint(21) 
)*/;

/*Table structure for table `v_stat_pendidikan` */

DROP TABLE IF EXISTS `v_stat_pendidikan`;

/*!50001 DROP VIEW IF EXISTS `v_stat_pendidikan` */;
/*!50001 DROP TABLE IF EXISTS `v_stat_pendidikan` */;

/*!50001 CREATE TABLE  `v_stat_pendidikan`(
 `Nama` varchar(50) ,
 `Jumlah` int(11) ,
 `Tahun` int(4) 
)*/;

/*Table structure for table `v_stat_rangeumur_kunj` */

DROP TABLE IF EXISTS `v_stat_rangeumur_kunj`;

/*!50001 DROP VIEW IF EXISTS `v_stat_rangeumur_kunj` */;
/*!50001 DROP TABLE IF EXISTS `v_stat_rangeumur_kunj` */;

/*!50001 CREATE TABLE  `v_stat_rangeumur_kunj`(
 `Keterangan` varchar(200) ,
 `Tahun` varchar(4) ,
 `Jumlah` bigint(21) 
)*/;

/*Table structure for table `v_stat_rangeumur_kunj_bulanan` */

DROP TABLE IF EXISTS `v_stat_rangeumur_kunj_bulanan`;

/*!50001 DROP VIEW IF EXISTS `v_stat_rangeumur_kunj_bulanan` */;
/*!50001 DROP TABLE IF EXISTS `v_stat_rangeumur_kunj_bulanan` */;

/*!50001 CREATE TABLE  `v_stat_rangeumur_kunj_bulanan`(
 `Keterangan` varchar(200) ,
 `Tahun` varchar(4) ,
 `bulan` int(2) ,
 `Jumlah` bigint(21) 
)*/;

/*View structure for view item_koleksi */

/*!50001 DROP TABLE IF EXISTS `item_koleksi` */;
/*!50001 DROP VIEW IF EXISTS `item_koleksi` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `item_koleksi` AS select concat(year(`collections`.`CreateDate`),lpad(month(`collections`.`CreateDate`),2,0)) AS `periode`,month(`collections`.`CreateDate`) AS `bulan`,year(`collections`.`CreateDate`) AS `tahun`,count('*') AS `jumlah_eksemplar` from `collections` group by month(`collections`.`CreateDate`),year(`collections`.`CreateDate`) */;

/*View structure for view v_abjadopac */

/*!50001 DROP TABLE IF EXISTS `v_abjadopac` */;
/*!50001 DROP VIEW IF EXISTS `v_abjadopac` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_abjadopac` AS select 'A' AS `A` union all select 'B' AS `B` union all select 'C' AS `C` union all select 'D' AS `D` union all select 'E' AS `E` union all select 'F' AS `F` union all select 'G' AS `G` union all select 'H' AS `H` union all select 'I' AS `I` union all select 'J' AS `J` union all select 'K' AS `K` union all select 'L' AS `L` union all select 'M' AS `M` union all select 'N' AS `N` union all select 'O' AS `O` union all select 'P' AS `P` union all select 'Q' AS `Q` union all select 'R' AS `R` union all select 'S' AS `S` union all select 'T' AS `T` union all select 'U' AS `U` union all select 'V' AS `V` union all select 'W' AS `W` union all select 'X' AS `X` union all select 'Y' AS `Y` union all select 'Z' AS `Z` */;

/*View structure for view v_lap_kriteria_anggota */

/*!50001 DROP TABLE IF EXISTS `v_lap_kriteria_anggota` */;
/*!50001 DROP VIEW IF EXISTS `v_lap_kriteria_anggota` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_lap_kriteria_anggota` AS select distinct 'Pekerjaan' AS `kriteria`,`master_pekerjaan`.`Pekerjaan` AS `id_dtl_anggota`,`master_pekerjaan`.`Pekerjaan` AS `dtl_anggota` from `master_pekerjaan` union all select distinct 'Pendidikan' AS `kriteria`,`master_pendidikan`.`Nama` AS `id_dtl_anggota`,`master_pendidikan`.`Nama` AS `dtl_anggota` from `master_pendidikan` union all select distinct 'Status_Anggota' AS `kriteria`,`status_anggota`.`Nama` AS `id_dtl_anggota`,`status_anggota`.`Nama` AS `dtl_anggota` from `status_anggota` union all select distinct 'Jenis_Anggota' AS `kriteria`,`jenis_anggota`.`jenisanggota` AS `id_dtl_anggota`,`jenis_anggota`.`jenisanggota` AS `dtl_anggota` from `jenis_anggota` union all select distinct 'Kelas' AS `kriteria`,`kelas_siswa`.`namakelassiswa` AS `id_dtl_anggota`,`kelas_siswa`.`namakelassiswa` AS `dtl_anggota` from `kelas_siswa` union all select distinct 'Fakultas' AS `kriteria`,`master_fakultas`.`Nama` AS `id_dtl_anggota`,`master_fakultas`.`Nama` AS `dtl_anggota` from `master_fakultas` union all select distinct 'Jurusan' AS `kriteria`,`master_jurusan`.`Nama` AS `id_dtl_anggota`,`master_jurusan`.`Nama` AS `dtl_anggota` from `master_jurusan` */;

/*View structure for view v_lap_kriteria_koleksi */

/*!50001 DROP TABLE IF EXISTS `v_lap_kriteria_koleksi` */;
/*!50001 DROP VIEW IF EXISTS `v_lap_kriteria_koleksi` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_lap_kriteria_koleksi` AS select distinct 'PublishLocation' AS `kriteria`,`catalogs`.`PublishLocation` AS `id_dtl_kriteria`,`catalogs`.`PublishLocation` AS `dtl_kriteria` from `catalogs` union all select distinct 'Publisher' AS `kriteria`,`catalogs`.`Publisher` AS `id_dtl_kriteria`,`catalogs`.`Publisher` AS `dtl_kriteria` from `catalogs` union all select distinct 'PublishYear' AS `kriteria`,`catalogs`.`PublishYear` AS `id_dtl_kriteria`,`catalogs`.`PublishYear` AS `dtl_kriteria` from `catalogs` union all select distinct 'Subject' AS `kriteria`,`catalogs`.`Subject` AS `id_dtl_kriteria`,`catalogs`.`Subject` AS `dtl_kriteria` from `catalogs` union all select 'location_library' AS `kriteria`,`location_library`.`ID` AS `id_dtl_kriteria`,`location_library`.`Name` AS `dtl_kriteria` from `location_library` union all select 'locations' AS `kriteria`,`locations`.`ID` AS `id_dtl_kriteria`,`locations`.`Name` AS `dtl_kriteria` from `locations` union all select 'collectionsources' AS `kriteria`,`collectionsources`.`ID` AS `id_dtl_kriteria`,`collectionsources`.`Name` AS `dtl_kriteria` from `collectionsources` union all select 'partners' AS `kriteria`,`partners`.`ID` AS `id_dtl_kriteria`,`partners`.`Name` AS `dtl_kriteria` from `partners` union all select 'currency' AS `kriteria`,`currency`.`Currency` AS `id_dtl_kriteria`,concat(`currency`.`Currency`,' - ',`currency`.`Description`) AS `dtl_kriteria` from `currency` union all select 'collectioncategorys' AS `kriteria`,`collectioncategorys`.`ID` AS `id_dtl_kriteria`,`collectioncategorys`.`Name` AS `dtl_kriteria` from `collectioncategorys` union all select 'collectionrules' AS `kriteria`,`collectionrules`.`ID` AS `id_dtl_kriteria`,`collectionrules`.`Name` AS `dtl_kriteria` from `collectionrules` union all select 'worksheets' AS `kriteria`,`worksheets`.`ID` AS `id_dtl_kriteria`,`worksheets`.`Name` AS `dtl_kriteria` from `worksheets` union all select 'collectionmedias' AS `kriteria`,`collectionmedias`.`ID` AS `id_dtl_kriteria`,`collectionmedias`.`Name` AS `dtl_kriteria` from `collectionmedias` union all select 'no_klas' AS `kriteria`,`master_kelas_besar`.`kdKelas` AS `id_dtl_kriteria`,`master_kelas_besar`.`namakelas` AS `dtl_kriteria` from `master_kelas_besar` union all select 'createby' AS `kriteria`,`users`.`ID` AS `id_dtl_kriteria`,`users`.`username` AS `dtl_kriteria` from `users` union all select 'Members' AS `kriteria`,`members`.`ID` AS `id_dtl_kriteria`,concat(`members`.`MemberNo`,' - ',`members`.`Fullname`) AS `dtl_kriteria` from `members` */;

/*View structure for view v_pertumb_jml_kunjungan */

/*!50001 DROP TABLE IF EXISTS `v_pertumb_jml_kunjungan` */;
/*!50001 DROP VIEW IF EXISTS `v_pertumb_jml_kunjungan` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_pertumb_jml_kunjungan` AS select 'ANGGOTA' AS `kriteria`,year(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')) AS `tahun`,count(0) AS `jumlah` from `memberguesses` where (`memberguesses`.`NoAnggota` is not null) group by year(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')) union all select 'NONANGGOTA' AS `kriteria`,year(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')) AS `tahun`,count(0) AS `jumlah` from `memberguesses` where isnull(`memberguesses`.`NoAnggota`) group by year(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')) union all select 'ROMBONGAN' AS `kriteria`,year(str_to_date(`groupguesses`.`CreateDate`,'%Y-%m-%d')) AS `tahun`,count(0) AS `jumlah` from `groupguesses` group by year(str_to_date(`groupguesses`.`CreateDate`,'%Y-%m-%d')) */;

/*View structure for view v_pertumb_jml_kunjungan_bulanan */

/*!50001 DROP TABLE IF EXISTS `v_pertumb_jml_kunjungan_bulanan` */;
/*!50001 DROP VIEW IF EXISTS `v_pertumb_jml_kunjungan_bulanan` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_pertumb_jml_kunjungan_bulanan` AS select 'ANGGOTA' AS `kriteria`,year(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')) AS `tahun`,month(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')) AS `bulan`,count(0) AS `jumlah` from `memberguesses` where (`memberguesses`.`NoAnggota` is not null) group by year(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')),month(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')) union all select 'NONANGGOTA' AS `kriteria`,year(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')) AS `tahun`,month(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')) AS `bulan`,count(0) AS `jumlah` from `memberguesses` where isnull(`memberguesses`.`NoAnggota`) group by year(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')),month(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')) union all select 'ROMBONGAN' AS `kriteria`,year(str_to_date(`groupguesses`.`CreateDate`,'%Y-%m-%d')) AS `tahun`,month(str_to_date(`groupguesses`.`CreateDate`,'%Y-%m-%d')) AS `bulan`,sum(`groupguesses`.`CountPersonel`) AS `jumlah` from `groupguesses` group by year(str_to_date(`groupguesses`.`CreateDate`,'%Y-%m-%d')),month(str_to_date(`groupguesses`.`CreateDate`,'%Y-%m-%d')) order by `tahun` */;

/*View structure for view v_stat_anggota */

/*!50001 DROP TABLE IF EXISTS `v_stat_anggota` */;
/*!50001 DROP VIEW IF EXISTS `v_stat_anggota` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_stat_anggota` AS select year(str_to_date(`members`.`CreateDate`,'%Y-%m-%d')) AS `tahun`,month(str_to_date(`members`.`CreateDate`,'%Y-%m-%d')) AS `bulan`,count(0) AS `jumlah`,`jenis_anggota`.`jenisanggota` AS `jenisanggota`,`jenis_anggota`.`id` AS `IDjenisanggota` from (`members` left join `jenis_anggota` on((`jenis_anggota`.`id` = `members`.`JenisAnggota_id`))) group by year(str_to_date(`members`.`CreateDate`,'%Y-%m-%d')),month(str_to_date(`members`.`CreateDate`,'%Y-%m-%d')),`jenis_anggota`.`id` */;

/*View structure for view v_stat_colectionloan */

/*!50001 DROP TABLE IF EXISTS `v_stat_colectionloan` */;
/*!50001 DROP VIEW IF EXISTS `v_stat_colectionloan` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_stat_colectionloan` AS select 2015 AS `tahun`,2 AS `bulan`,10 AS `jumlah_judul`,100 AS `jumlah_eksemplar`,20 AS `jumlah_dijital` */;

/*View structure for view v_stat_jenis_pendidikan */

/*!50001 DROP TABLE IF EXISTS `v_stat_jenis_pendidikan` */;
/*!50001 DROP VIEW IF EXISTS `v_stat_jenis_pendidikan` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_stat_jenis_pendidikan` AS select `mp`.`Nama` AS `Keterangan`,count(`mem`.`ID`) AS `Jumlah`,date_format(`mem`.`CreateDate`,'%Y') AS `Tahun`,month(str_to_date(`mem`.`CreateDate`,'%Y-%m-%d')) AS `bulan` from (`master_pendidikan` `mp` left join `members` `mem` on((`mem`.`EducationLevel_id` = `mp`.`id`))) where (`mem`.`EducationLevel_id` is not null) group by `mp`.`Nama`,date_format(`mem`.`CreateDate`,'%Y'),month(str_to_date(`mem`.`CreateDate`,'%Y-%m-%d')) order by `mp`.`id`,`mem`.`CreateDate` */;

/*View structure for view v_stat_jumlah_koleksi */

/*!50001 DROP TABLE IF EXISTS `v_stat_jumlah_koleksi` */;
/*!50001 DROP VIEW IF EXISTS `v_stat_jumlah_koleksi` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_stat_jumlah_koleksi` AS select `item_koleksi`.`bulan` AS `bulan`,`item_koleksi`.`tahun` AS `tahun`,(select count(0) from `catalogs` where (concat(year(`catalogs`.`CreateDate`),lpad(month(`catalogs`.`CreateDate`),2,0)) = `item_koleksi`.`periode`)) AS `jumlah_judul`,`item_koleksi`.`jumlah_eksemplar` AS `jumlah_eksemplar`,(select count(0) from `catalogfiles` where (concat(year(`catalogfiles`.`CreateDate`),lpad(month(`catalogfiles`.`CreateDate`),2,0)) = `item_koleksi`.`periode`)) AS `jumlah_dijital` from `item_koleksi` */;

/*View structure for view v_stat_kelas_subjek */

/*!50001 DROP TABLE IF EXISTS `v_stat_kelas_subjek` */;
/*!50001 DROP VIEW IF EXISTS `v_stat_kelas_subjek` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_stat_kelas_subjek` AS select `master_kelas_besar`.`namakelas` AS `Keterangan`,`master_kelas_besar`.`ID` AS `Jumlah`,2015 AS `Tahun` from `master_kelas_besar` */;

/*View structure for view v_stat_koleksi_dipinjam_eksemplar */

/*!50001 DROP TABLE IF EXISTS `v_stat_koleksi_dipinjam_eksemplar` */;
/*!50001 DROP VIEW IF EXISTS `v_stat_koleksi_dipinjam_eksemplar` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_stat_koleksi_dipinjam_eksemplar` AS select year(str_to_date(`colit`.`CreateDate`,'%Y-%m-%d')) AS `tahun`,month(str_to_date(`colit`.`CreateDate`,'%Y-%m-%d')) AS `bulan`,count(0) AS `jumlah_eksemplar` from `collectionloanitems` `colit` where (`colit`.`CreateDate` between (now() + interval -(12) month) and (now() + interval -(1) month)) group by year(str_to_date(`colit`.`CreateDate`,'%Y-%m-%d')),month(str_to_date(`colit`.`CreateDate`,'%Y-%m-%d')) */;

/*View structure for view v_stat_koleksi_dipinjam_judul */

/*!50001 DROP TABLE IF EXISTS `v_stat_koleksi_dipinjam_judul` */;
/*!50001 DROP VIEW IF EXISTS `v_stat_koleksi_dipinjam_judul` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_stat_koleksi_dipinjam_judul` AS select year(str_to_date(`colit`.`CreateDate`,'%Y-%m-%d')) AS `tahun`,month(str_to_date(`colit`.`CreateDate`,'%Y-%m-%d')) AS `bulan`,count(distinct `colit`.`Collection_id`) AS `jumlah_judul` from `collectionloanitems` `colit` where (`colit`.`CreateDate` between (now() + interval -(12) month) and (now() + interval -(1) month)) group by year(str_to_date(`colit`.`CreateDate`,'%Y-%m-%d')),month(str_to_date(`colit`.`CreateDate`,'%Y-%m-%d')) */;

/*View structure for view v_stat_pendidikan */

/*!50001 DROP TABLE IF EXISTS `v_stat_pendidikan` */;
/*!50001 DROP VIEW IF EXISTS `v_stat_pendidikan` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_stat_pendidikan` AS select `master_pendidikan`.`Nama` AS `Nama`,`master_pendidikan`.`id` AS `Jumlah`,2015 AS `Tahun` from `master_pendidikan` */;

/*View structure for view v_stat_rangeumur_kunj */

/*!50001 DROP TABLE IF EXISTS `v_stat_rangeumur_kunj` */;
/*!50001 DROP VIEW IF EXISTS `v_stat_rangeumur_kunj` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_stat_rangeumur_kunj` AS select `KATEGORY_UMUR`(`members`.`DateOfBirth`) AS `Keterangan`,date_format(`memberguesses`.`CreateDate`,'%Y') AS `Tahun`,count(`memberguesses`.`ID`) AS `Jumlah` from (`memberguesses` join `members` on((`memberguesses`.`NoAnggota` = `members`.`MemberNo`))) where (cast(`memberguesses`.`CreateDate` as date) between '2010-01-01' and '2016-12-31') group by `KATEGORY_UMUR`(`members`.`DateOfBirth`),date_format(`memberguesses`.`CreateDate`,'%Y') order by date_format(`memberguesses`.`CreateDate`,'%Y') desc,count(`memberguesses`.`ID`) desc */;

/*View structure for view v_stat_rangeumur_kunj_bulanan */

/*!50001 DROP TABLE IF EXISTS `v_stat_rangeumur_kunj_bulanan` */;
/*!50001 DROP VIEW IF EXISTS `v_stat_rangeumur_kunj_bulanan` */;

/*!50001 CREATE ALGORITHM=UNDEFINED   SQL SECURITY DEFINER VIEW `v_stat_rangeumur_kunj_bulanan` AS select `KATEGORY_UMUR`(`members`.`DateOfBirth`) AS `Keterangan`,date_format(`memberguesses`.`CreateDate`,'%Y') AS `Tahun`,month(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')) AS `bulan`,count(`memberguesses`.`ID`) AS `Jumlah` from (`memberguesses` join `members` on((`memberguesses`.`NoAnggota` = `members`.`MemberNo`))) group by `KATEGORY_UMUR`(`members`.`DateOfBirth`),date_format(`memberguesses`.`CreateDate`,'%Y'),month(str_to_date(`memberguesses`.`CreateDate`,'%Y-%m-%d')) order by date_format(`memberguesses`.`CreateDate`,'%Y') desc,count(`memberguesses`.`ID`) desc */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
