-- MySQL dump 10.13  Distrib 5.6.17, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: hackathon
-- ------------------------------------------------------
-- Server version	5.6.17-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `trv_data_demo`
--

DROP TABLE IF EXISTS `trv_data_demo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trv_data_demo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `platform_search` varchar(240) NOT NULL DEFAULT '',
  `city_search` varchar(80) NOT NULL DEFAULT '',
  `country_search` varchar(80) NOT NULL DEFAULT '',
  `continent_search` varchar(80) DEFAULT NULL,
  `date_search` int(11) NOT NULL,
  `country_user` varchar(100) DEFAULT NULL,
  `continent_user` varchar(80) DEFAULT NULL,
  `count_search` int(11) NOT NULL DEFAULT '0',
  `longitude_search` double NOT NULL DEFAULT '0',
  `latitude_search` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`platform_search`,`date_search`,`country_search`,`city_search`,`longitude_search`,`latitude_search`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17646060 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trv_data_demo`
--

LOCK TABLES `trv_data_demo` WRITE;
/*!40000 ALTER TABLE `trv_data_demo` DISABLE KEYS */;
INSERT INTO `trv_data_demo` VALUES (27091,'AE','Perth','Australia','Australia & Oceania',20130131,'United Arab Emirates','Asia',1,115.857468,-31.953005),(132546,'AR','Melbourne','Australia','Australia & Oceania',20130131,'Argentina','Central and South America',1,144.96283,-37.815205),(5051475,'AT','Melbourne','Australia','Australia & Oceania',20130131,'Austria','Europe',2,144.96283,-37.815205),(4044521,'AU','Alice Springs','Australia','Australia & Oceania',20130131,'USA','North America',2,133.88089,-23.700357),(5010334,'BE','Andorra la Vella','Andorra','Europe',20130131,'Italy','Europe',4,1.5185,42.505901),(3049965,'BG','Oranjestad','Aruba','Central and South America',20130131,'Italy','Europe',1,-70.026459,12.52458),(6465143,'BR','Córdoba City','Argentina','Central and South America',20130131,'Austria','Europe',1,-64.180389,-31.405254),(7914586,'CA','English Harbour Town','Antigua and Barbuda','Central and South America',20130131,'United Kingdom','Europe',1,-61.762115,17.008785),(2247746,'CH','Melbourne','Australia','Australia & Oceania',20130131,'Switzerland','Europe',1,144.96283,-37.815205),(222231,'CL','Liège','Belgium','Europe',20130131,'Chile','Central and South America',1,5.572,50.640598),(1780419,'CN','Vienna','Austria','Europe',20130131,'China','Asia',1,16.373056,48.208332),(343608,'CO','Limassol','Cyprus','Europe',20130131,'Colombia','Central and South America',1,33.022617,34.70713),(1057436,'CZ','Andorra la Vella','Andorra','Europe',20130131,'Denmark','Europe',1,1.5185,42.505901),(14468447,'DE','Adelaide','Australia','Australia & Oceania',20130131,'Germany','Europe',1,138.59996,-34.928619),(6528971,'DK','Soldeu','Andorra','Europe',20130131,'Denmark','Europe',1,1.667764,42.576897),(14983117,'ES','Andorra la Vella','Andorra','Europe',20130131,'United Kingdom','Europe',7,1.5185,42.505901),(7681419,'FI','Brisbane','Australia','Australia & Oceania',20130131,'Finland','Europe',1,153.023453,-27.47101),(11778569,'FR','Pas de la Casa','Andorra','Europe',20130131,'Germany','Europe',1,1.733827,42.542336),(7982067,'GR','Soldeu','Andorra','Europe',20130131,'Greece','Europe',1,1.667764,42.576897),(2699344,'HK','Vienna','Austria','Europe',20130131,'Hong Kong','Asia',1,16.373056,48.208332),(1975716,'HU','Noord','Aruba','Central and South America',20130131,'Hungary','Europe',1,-70.038879,12.563672),(1095808,'ID','Siem Reap','Cambodia','Asia',20130131,'Indonesia','Asia',2,103.859718,13.362222),(5658205,'IE','Byron Bay','Australia','Australia & Oceania',20130131,'Ireland','Europe',1,153.612228,-28.643387),(800795,'IL','Prague','Czech Republic','Europe',20130131,'Israel','Asia',1,14.421389,50.088612),(2863541,'IN','Mayrhofen','Austria','Europe',20130131,'India','Asia',1,11.8629,47.166901),(16329065,'IT','Canillo','Andorra','Europe',20130131,'Italy','Europe',1,1.596701,42.566093),(4703789,'JP','Gold Coast','Australia','Australia & Oceania',20130131,'Austria','Europe',6,153.422379,-28.023153),(1378770,'KR','Sydney','Australia','Australia & Oceania',20130131,'South Korea','Asia',1,151.210114,-33.870098),(6993063,'MX','Andorra la Vella','Andorra','Europe',20130131,'USA','North America',1,1.5185,42.505901),(2129404,'MY','Sydney','Australia','Australia & Oceania',20130131,'Malaysia','Asia',1,151.210114,-33.870098),(8554841,'NL','Bolans','Antigua and Barbuda','Central and South America',20130131,'Netherlands','Europe',1,-61.875622,17.05888),(6246499,'NO','Saalbach Hinterglemm','Austria','Europe',20130131,'USA','North America',1,12.5959,47.378601),(2133795,'NZ','Sydney','Australia','Australia & Oceania',20130131,'New Zealand','Australia & Oceania',1,151.210114,-33.870098),(7649958,'PL','Encamp','Andorra','Europe',20130131,'Poland','Europe',1,1.58311,42.536331),(7319660,'PT','Andorra la Vella','Andorra','Europe',20130131,'Austria','Europe',3,1.5185,42.505901),(5716343,'RO','Brisbane','Australia','Australia & Oceania',20130131,'Romania','Europe',1,153.023453,-27.47101),(6513298,'RS','Melbourne','Australia','Australia & Oceania',20130131,'Serbia','Europe',1,144.96283,-37.815205),(8325102,'RU','Andorra la Vella','Andorra','Europe',20130131,'Spain','Europe',2,1.5185,42.505901),(10427083,'SE','Noord','Aruba','Central and South America',20130131,'Sweden','Europe',1,-70.038879,12.563672),(2802153,'SG','Luxor','Egypt','Africa',20130131,'Singapore','Asia',1,32.649757,25.700241),(3947119,'SI','Gold Coast','Australia','Australia & Oceania',20130131,'Spain','Europe',3,153.422379,-28.023153),(2988419,'TH','Bansko','Bulgaria','Europe',20130131,'Thailand','Asia',1,23.488899,41.838123),(4509287,'TR','Melbourne','Australia','Australia & Oceania',20130131,'Turkey','Europe',1,144.96283,-37.815205),(2054139,'TW','Bombinhas','Brazil','Central and South America',20130131,'Taiwan','Asia',1,-48.516083,-27.139921),(14422269,'UK','Pas de la Casa','Andorra','Europe',20130131,'Malaysia','Asia',1,1.733827,42.542336),(17646059,'US','Canillo','Andorra','Europe',20130131,'USA','North America',1,1.596701,42.566093),(2214153,'VN','Berlin','Germany','Europe',20130131,'Vietnam','Asia',1,13.4134,52.5214),(2271431,'ZA','Adelaide','Australia','Australia & Oceania',20130131,'South Africa','Africa',1,138.59996,-34.928619);
/*!40000 ALTER TABLE `trv_data_demo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-07-06 11:45:49
