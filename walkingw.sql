-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Gép: mysql.omega:3306
-- Létrehozás ideje: 2020. Jún 29. 20:04
-- Kiszolgáló verziója: 5.6.47-log
-- PHP verzió: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `walkingw`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) CHARACTER SET latin1 NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `tokens` int(5) NOT NULL DEFAULT '1',
  `steps` int(20) NOT NULL,
  `checkpoint_steps` int(20) NOT NULL DEFAULT '-1',
  `score` int(15) NOT NULL,
  `tm` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `gamelevel` int(10) NOT NULL DEFAULT '1',
  `last_saved_state` text COLLATE utf8_hungarian_ci NOT NULL,
  `tester` tinyint(4) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `tokens`, `steps`, `checkpoint_steps`, `score`, `tm`, `gamelevel`, `last_saved_state`, `tester`) VALUES
(1, 'Gergo', '$2y$10$c4RXlKXnY/S8mmOo6xAUK.h/sDaVyoQXRCfkfr8JRqj2T2p50X3C6', '2018-11-28 17:04:44', 95, 0, 0, 9645, '2019-08-28 21:50:16', 5, '{\"tileState\":[[\"6\",\"6\",\"2\",\"3\",\"4\",\"4\",\"2\",\"2\",\"3\"],[\"3\",\"5\",\"1\",\"3\",\"3\",\"6\",\"9\",\"2\",\"3\"],[\"1\",\"4\",\"4\",\"5\",\"8\",\"11\",\"2\",\"1\",\"6\"],[\"14\",\"2\",\"13\",\"1\",\"4\",\"3\",\"6\",\"3\",\"2\"],[\"2\",\"6\",\"3\",\"5\",\"16\",\"1\",\"2\",\"6\",\"5\"],[\"5\",\"2\",\"6\",\"1\",\"5\",\"6\",\"5\",\"2\",\"4\"]],\"level\":17,\"score\":34,\"moves\":30,\"replays\":\"95\"}', 0),
(2, 'Renato', '$2y$10$kNEUxNnUeSyQCiOAN7vcUOftq2jhggbiYPIQWG5FATOl8y5G30pMC', '2018-11-28 18:05:31', 1, 0, 0, 0, '2019-08-28 21:50:16', 1, '', 0),
(3, 'Adrian', '$2y$10$3Co.pAqMl09IxDfILbdH/erQUPJ5Oihg30O/9zBUS2N/ilwQtnoTm', '2018-11-28 18:23:08', 48, 0, 0, 563, '2019-08-28 21:50:16', 11, '', 0),
(4, 'sawolfe89', '$2y$10$wLTGs0VnnDs4QhJL1M389u.MC.Y6MrnC.YCepGKjKnNfRWx6aofG2', '2018-12-12 14:57:59', 1, 0, 0, 1005, '2019-08-28 21:50:16', 23, '', 0),
(17, 'AznONEder', '$2y$10$wBuvl7P4/b0O6ze0ILPOQOmPRnXrodRDtHRgOWRm9KB0kOs6tue3m', '2019-01-30 05:26:58', 0, 0, 0, 4080, '2019-11-17 20:43:31', 23, '{\"tileState\":[[6,4,3,3,5,3,4,1,4],[1,3,2,4,1,2,11,4,2],[4,2,6,5,4,1,5,4,3],[3,3,5,5,3,6,5,2,3],[4,1,1,4,3,6,1,2,1],[3,3,5,4,1,3,3,6,4]],\"level\":\"Level1\",\"score\":21,\"moves\":45}', 0),
(7, 'Renato93', '$2y$10$uKrNubRhwgPsmUfTzvJ5geqEO0VJM7qpDBzLV5eLaWBIwP1EtgDaW', '2018-12-13 15:27:10', 3, 0, 0, 0, '2019-08-28 21:50:16', 1, '', 0),
(8, 'Arpad', '$2y$10$PsXh9.Pt.l64sKqJFhYDeOO0LTeXuhRhyMUaKV7LuLpJy/RDus4mW', '2018-12-15 18:47:00', 18, 0, 0, 0, '2020-03-07 19:04:56', 5, '{\"tileState\":[[5,6,5,3,4,6,4,3,2],[4,5,4,1,4,5,1,5,1],[3,1,2,11,3,6,5,2,2],[4,3,1,3,2,1,3,5,6],[1,4,6,6,4,6,3,3,6],[5,4,6,4,4,2,5,5,2]],\"level\":\"Level4\",\"score\":20,\"moves\":39,\"tile1Count\":0}', 0),
(94, 'Kundangujjar', '$2y$10$oYLCv2xrQW2TMRKVb//cdeL1H6Zxuc7qGy1hp2rikKPfJaoTSJGuq', '2019-11-12 06:16:13', 1, 0, -1, 0, '2019-11-12 05:16:13', 1, '', 0),
(16, 'test', '$2y$10$SDfYLsfvn63WsffHjdaS0.9DBZFtnVpYKDjitIZ3jde0WSwFN5iT2', '2019-01-22 10:34:13', 17, 0, 0, 538, '2019-08-28 21:50:16', 1, '', 0),
(10, 'Chenyu', '$2y$10$GOi8NICBlWr/cWLkgyHTOe0uRN0pPT3uL8VePpKJnXQHVt1gGet9W', '2018-12-22 07:14:43', 3, 0, 0, 0, '2019-08-28 21:50:16', 1, '', 0),
(11, 'brent.abel@umaryland.edu', '$2y$10$Fe5MsJNJAGiNbabT2lGARe/G9AmSALEwdREoe7BThwSZdr0lAMGfe', '2018-12-31 20:22:15', 2, 0, 0, 50, '2019-08-28 21:50:16', 5, '', 0),
(12, 'Lezzybum', '$2y$10$CnpmmS9Zy8IaxDUX0ET3TuqLGvz0lhxljtI3BsgP1ER/q/rhH/FFC', '2019-01-03 02:45:03', 0, 0, 0, 1230, '2019-08-28 21:50:16', 12, '', 0),
(13, 'barbvan@gmail.com', '$2y$10$VPqFzSqTFztyDevkfgnF5uTpWtzY3Bz1YilY.Oktlj3y9vQHl6esW', '2019-01-03 14:47:54', 1, 0, 0, 0, '2019-01-30 11:25:28', 1, '', 0),
(14, 'BlueWinston', '$2y$10$1ZlDmobbnzsGWmiblHMBfOnnim7yYD9EFfRuCdHYaHf3gOVfpMxHm', '2019-01-04 06:13:43', 1, 0, 0, 0, '2019-08-28 21:50:16', 1, '', 0),
(15, 'Chenyu2', '$2y$10$wu9c5dRBZrWxg/2l5/6AW.I9CvMUKhaqnQf.QbFbFcK00MY8IJyT2', '2019-01-21 17:18:21', 1, 0, 0, 0, '2019-01-30 11:25:28', 1, '', 0),
(20, 'aronsontm', '$2y$10$kOVRdwbLC1O7blsFnr7bo.C0r3.T5naqtmD7FXF00Q24esLLoo.8y', '2019-01-31 02:35:45', 1, 0, 0, 929, '2019-08-28 21:50:16', 23, '', 0),
(21, 'BarryGloria', '$2y$10$SkJKvxT2vUnPdVdIaLXDouKgnoN5HLON40WBXGi97Q4R2qTQ73GwS', '2019-01-31 13:39:42', 1, 0, 0, 0, '2019-01-31 12:49:21', 5, '', 0),
(22, 'a', '$2y$10$YDNs1f00Qr..AGr4v3ElZuUWDaBKDuDA29AReEBHf6Wn.p/VkvkaG', '2019-01-31 15:09:36', 1, 0, 0, 0, '2019-01-31 14:09:36', 1, '', 0),
(23, 'mjcong', '$2y$10$sanMINiP8RikoC7sryOMV.8v6dy66OCtS4qwcCbPBovAapWEjQy9m', '2019-01-31 16:21:50', 0, 0, 0, 895, '2019-08-28 21:50:16', 20, '', 0),
(24, 'Bluelilmunkie', '$2y$10$aJQKdXQo0sFxIt5omndD2OR7m5vuE2502sI6ep.HU6exNgPvpCoiu', '2019-01-31 16:38:24', 0, 0, 0, 1636, '2019-08-28 21:50:16', 22, '', 0),
(25, 'gerst.steven91@gmail.com', '$2y$10$Iuauc7sLivfoiHyBjPCuyufMoazKujlEx/gnDRiDXaMesrqnqzP3G', '2019-02-01 00:03:25', 1, 0, 0, 0, '2019-01-31 23:03:25', 1, '', 0),
(26, 'gerst.steven91', '$2y$10$vnsoHoX0HVRSN3cgYHiL6.9qecSV7vgCQUydBdxzpgp.wpLUuBvMu', '2019-02-01 00:04:00', 2, 0, 0, 558, '2019-08-28 21:50:16', 9, '', 0),
(27, 'wtrang', '$2y$10$DzY.tTjNo48muepXU93pIuhn.1KU9SEZkS8kBjbezfhcPG6P0X2JK', '2019-02-01 14:52:13', 12, 0, 0, 2435, '2019-08-28 21:50:16', 23, '', 0),
(28, 'ccarcaci@umaryland.edu', '$2y$10$CcdrdjtYj3wkpPyNkx33l.hqYLqTmFm.M1kKjFXXDW6sPXL09wVAC', '2019-02-02 03:09:50', 1, 0, 0, 0, '2019-02-02 02:09:50', 1, '', 0),
(29, 'B', '$2y$10$TO8zl5CoVU3tv8Tqzqrtp.TbzaxJ0Y2h1D90n8cjGKtIy4lFw4ume', '2019-02-02 03:18:18', 1, 0, 0, 0, '2019-02-02 02:18:18', 1, '', 0),
(30, 'Daisy', '$2y$10$Bt5T7pexYCt5vB/SvEMSnu7TTy4PRf2oQXUjf.8um/zPH3DsLYIGq', '2019-02-02 03:29:25', 1, 0, 0, 0, '2019-02-02 02:29:25', 1, '', 0),
(31, 'DaisyJean', '$2y$10$ZI0PdZuXt/kVyV5vXzsHEeefZhO/2JhThcjnysMHLcfeK9QxkeCZ6', '2019-02-02 03:29:54', 2, 0, 0, 90, '2019-08-28 21:50:16', 5, '', 0),
(32, 'cayla.kelley', '$2y$10$1AVq4r.3jMgrNKUZ/95Vu..QQedOiotRmV8T3NVGmz3y1M6i69sXy', '2019-02-03 19:32:54', 4, 0, 0, 0, '2019-08-28 21:50:16', 2, '', 0),
(33, 'cherie', '$2y$10$hfWap/bhAT3liJf0z40t.OGVUdEhrWUQ8Q9G0fynzfkugY7XZNguW', '2019-02-05 03:01:21', 0, 0, 0, 578, '2019-08-28 21:50:16', 5, '', 0),
(34, 'rasha.madani@umaryland.edu', '$2y$10$i5YG1E2Z/.EzhV1GNou2eeXDfvWLXW21Wv15L7zaWAUGMHZNeIriW', '2019-02-05 06:16:12', 2, 0, 0, 639, '2019-08-28 21:50:16', 5, '', 0),
(35, 'kgustafson', '$2y$10$ez7vkTOzM01Thzmrs4W5oud1psl.u3cu//.VbA8oBv9J5HZfO2yQu', '2019-02-05 20:28:35', 1, 0, 0, 467, '2019-08-28 21:50:16', 5, '', 0),
(36, 'mikern02', '$2y$10$hf8qjOzEcYRXJNS9e6YcMOH2.gOVgA6lTs8XVe4jblhLtHLJ96ofa', '2019-02-06 15:01:51', 4, 0, 0, 1256, '2019-08-28 21:50:16', 20, '', 0),
(37, 'harpervn', '$2y$10$LDeuOd2odUpFe8IFvyhNwel5s9q/3Vg4wwI9NOTK12MUwcna.Atd2', '2019-02-06 23:07:33', 2, 0, 0, 0, '2019-08-28 21:50:16', 5, '', 0),
(38, 'dcapron@umaryland.edu', '$2y$10$TCTLsPcoz6VduDFcAwegoeOPzlMJX7V.C4kKCTBahdyuEEue4MNsa', '2019-02-08 00:41:15', 1, 0, 0, 118, '2019-02-08 00:41:44', 20, '', 0),
(39, 'Harlem', '$2y$10$slt2ufIQJY1AkyEDG7SM5OHXpLT78r3sRs1tHc.RSKxYp.HHozL1a', '2019-02-08 01:20:12', 6, 0, 0, 285, '2019-08-28 21:50:16', 23, '', 0),
(62, 'madani182005', '$2y$10$pV..F2fZOgGq974g2KMjw.dboeCF7u1l8CyiSmq2vvrJ/6rVGDVya', '2019-05-03 07:28:37', 1, 0, 0, 0, '2019-05-03 05:28:37', 1, '', 0),
(61, 'Cherie2', '$2y$10$kGo56cBqIgUuE7r75guoHe52AEzI0387uj60PIkoKyyr4UL9dhpzy', '2019-05-02 00:56:17', 1, 0, 0, 309, '2019-05-02 21:06:23', 6, '', 0),
(60, 'vandecastle@umaryland.edu', '$2y$10$0MzzC6OhyN.XeWnqX3uZ3OxYGRvHS6tlXTrb.TCTzagFQoe8I3kj.', '2019-04-29 18:31:58', 21, 0, 0, 83, '2019-11-09 01:23:12', 4, '{\"tileState\":[[1,5,4,3,1,1,4,2,6],[3,2,5,6,5,6,3,5,5],[5,6,2,1,5,5,3,2,5],[6,6,5,3,2,2,4,1,4],[5,1,1,5,4,5,6,3,3],[4,4,1,2,3,4,5,1,6]],\"level\":\"Level2\",\"score\":0,\"moves\":20,\"tile1Count\":0}', 0),
(95, 'test222', '$2y$10$5v6nyfLxdqhz0/sGkLFJnOG/utW1jT52MxcycyqMM4pDcbmWg6poK', '2019-11-13 15:42:50', 1, 0, -1, 0, '2019-11-13 14:42:50', 1, '', 0),
(59, 'cayla.kelley@umaryland.edu', '$2y$10$j/fvcPEi3p/7/JrhistSH.HsYD1BLqtkI5RxrdY./EoUbNF2kDup.', '2019-04-26 02:46:09', 1, 0, 0, 243, '2019-05-01 00:29:10', 8, '', 0),
(58, 'ashin1', '$2y$10$xf/3tu0mWPkuPDQdIx/i5ePs2u/Z53p/zG/twRo4gB6yy89j73Bgm', '2019-04-25 05:45:28', 1, 0, 0, 0, '2019-04-25 03:52:29', 5, '', 0),
(57, '2', '$2y$10$cDX/VYDwIGRiDyXMN/5XpeGfXP3klB75rDNyHzUV3tTuo73ducDf.', '2019-04-18 14:06:17', 1, 0, 0, 0, '2019-04-18 12:06:17', 1, '', 0),
(56, 'tepertyiu', '$2y$10$k5maVFnNlzyzh9OtjluveOvLNHPdL17ap.RRNgWo0KMpIDIsfxRJ6', '2019-03-19 22:29:23', 4, 0, 0, 0, '2019-08-28 21:50:16', 1, '', 0),
(55, 'rferko', '$2y$10$eEstolXK8SsYsXUE/iIJneTluRVLHuHWxja/Vh5TX/zYj1RD5/Kt2', '2019-03-19 18:30:23', 1, 77, 65, 218, '2020-06-14 11:45:00', 16, '{\"tileState\":[[2,2,6,2,1,2,3,5,4],[2,4,5,3,5,6,\"potassium\",2,2],[6,3,2,4,6,4,1,4,4],[1,6,4,2,4,6,3,2,4],[2,5,6,5,1,4,3,5,2],[5,6,5,4,1,2,6,3,1]],\"level\":\"Level10\",\"score\":24,\"moves\":35}', 0),
(92, 'audreyvdc', '$2y$10$DLmQjt.JYPT.DJkkR1i1rO30OwVKmRWiDDCczL7fU5k8Km.VbYVq6', '2019-09-28 02:08:42', 1, 0, -1, 0, '2019-09-28 00:09:55', 2, '{\"tileState\":[[6,3,6,4,3,5,4,4,1],[5,3,1,2,4,6,6,3,4],[1,2,6,2,3,6,2,3,1],[5,5,2,1,6,6,4,1,2],[3,5,9,6,3,6,5,6,6],[2,6,1,1,6,3,3,6,2]],\"level\":\"Level1\",\"score\":20,\"moves\":13}', 0),
(54, 'Aronson', '$2y$10$/QB3NuOPGBmZzeHcpn8v7.cmnaluWa9DiXO1wKl7repMb73.oLzFG', '2019-03-07 20:02:09', 2, 0, 0, 94, '2019-08-28 21:50:16', 18, '', 0),
(53, 'Benpg', '$2y$10$jvCa0p4JQwomimLRRaux9urNK0FHGoYlEdL1DClyYR.pfgKYnMaaK', '2019-03-07 20:01:57', 1, 0, 0, 0, '2019-03-07 19:05:18', 2, '', 0),
(63, 'catherinecarcaci@gmail.com', '$2y$10$07d61PJ/VTIB2g5aUcxuQet1ZRLmakrDX2RRjWzVHSKEl78RpDgpG', '2019-05-03 12:38:07', 1, 0, 0, 0, '2019-05-03 21:10:00', 5, '', 0),
(64, 'Catherine12', '$2y$10$cn3AS/E2nvbKNd3t/.pZ2eto9ebTEx7QPTXier1BIWcAHRiZQcR8W', '2019-05-03 22:34:12', 1, 0, 0, 80, '2019-05-04 00:46:17', 4, '', 0),
(65, 'dcapron', '$2y$10$b5M6OM9sPaoqQOWQ1paJMOGQs6ZT9pTV8BmuMsB6wSfNDDgI2CxJC', '2019-05-04 02:29:42', 0, 0, 0, 104, '2019-05-04 00:56:09', 5, '', 0),
(66, 'Qwert', '$2y$10$mwrvVqUfbqanKBhdQTtzX.MkLEG/mHwbhjih2mm9K6TSq2K8thEqy', '2019-05-16 20:09:01', 1, 0, 0, 0, '2019-05-16 18:09:01', 1, '', 0),
(67, 'Zxcvb', '$2y$10$7XGXeibk8VJ7uKaNUX0DX.Feycxkj4MVgPQs6xxvHD9QBZCcb1NXK', '2019-05-16 20:09:37', 1, 0, 0, 0, '2019-05-16 18:22:57', 2, '', 0),
(68, 'cecilia', '$2y$10$Hth8HGgXoM1vevgg2xIW2OBbmHSDzv90xLhfz8PbyXndySaOqwboW', '2019-05-27 10:35:54', 1, 0, 0, 0, '2019-05-27 08:46:13', 2, '', 0),
(69, 'Tdub823', '$2y$10$QfJo4Oip/h/.ytMkNVgBvu1bD0eVf2hDNgFVyIXwyjgx85nctnldK', '2019-05-31 00:22:56', 6, 0, 0, 421, '2019-08-28 21:50:16', 5, '', 0),
(83, 'joze.brecl', '$2y$10$.qZt1UzbBpjJWPv5O64z4ezN3c45xVQeYo3FyJL55yOlAPcKm1DpG', '2019-06-10 20:15:27', 1, 0, 0, 0, '2019-06-10 18:31:52', 2, '', 0),
(70, 'csutakbalazs96', '$2y$10$inb904V0WxCdDmhEBIORaON2KN8zLhJ2II0RSz6dkMPmhPutAv9xC', '2019-06-01 09:25:33', 1, 0, 0, 0, '2019-06-01 07:25:33', 1, '', 0),
(71, 'malacka', '$2y$10$noe7biF61y5k5oY0Qq4ekOtoceJGaVj8XRsewwZPjaLTfwZ0tzrZ.', '2019-06-01 09:27:01', 1, 0, 0, 0, '2019-06-01 07:27:01', 1, '', 0),
(72, 'Bence', '$2y$10$J5LhZd9VEWXHKVyC3D/1IOofuLqp5.jjsSP2LxslFCvh7lzKIHK8y', '2019-06-01 10:51:37', 1, 0, 0, 0, '2019-06-01 08:51:37', 1, '', 0),
(73, 'Gyula', '$2y$10$AQXrOVJMevXQe8t67SFA8eP/uejGCAMlU6Kjb3irtVuP4Pibj9eUm', '2019-06-01 19:56:29', 1, 0, 0, 43, '2019-06-01 18:00:10', 18, '', 0),
(74, 'Mollybasl', '$2y$10$TJwP9Mlz0R99F68bsJaySO8urmGSwqseXoXRNnksJv72UjHNlwl2i', '2019-06-03 15:42:42', 1, 0, 0, 528, '2019-06-06 20:15:26', 8, '', 0),
(75, 'gkvegan', '$2y$10$YvasXLKq7JjfhGiTKcspjeJvczqFrCn0z2Wfq4UVuittHV/np5XHy', '2019-06-04 21:30:24', 1, 0, 0, 0, '2019-06-04 19:30:24', 1, '', 0),
(76, 'Steveg3215@gmail.com', '$2y$10$Ux1UGYJiE1On9Q4wCrxwgufkr2qfS.li44cfuStj2DErIYJN/9f1K', '2019-06-05 00:24:18', 1, 0, 0, 0, '2019-06-05 23:32:54', 2, '', 0),
(77, 'madome', '$2y$10$O8CHyNKkq96O/KwPTtBvkus.XCOWTrV6yqNLAqZamdNXGJW5r6Ydm', '2019-06-05 18:23:30', 1, 0, 0, 0, '2019-06-05 16:49:59', 5, '', 0),
(78, 'Arpad2', '$2y$10$KuIadLaids.zuH7LBx65q.1cH3df4HiTLBLhsOz/gYShnyKeiG7G2', '2019-06-06 01:53:09', 1, 0, 0, 0, '2019-06-05 23:53:09', 1, '', 0),
(79, 'Kismalac', '$2y$10$/cMTtW3abL.mN.gYjsNFiuuo9/WwH1nMur8vJ0EaXFSjr8cEgoS..', '2019-06-06 17:44:28', 1, 0, 0, 0, '2019-06-06 15:44:28', 1, '', 0),
(80, 'Mcouto', '$2y$10$JStsnw8CBWGF0QefRsdUTOL9zaypge3bmP4yP.ZIC07Yrh1bI5RHG', '2019-06-08 20:18:42', 1, 0, 0, 422, '2019-07-14 21:12:25', 15, '{\"tileState\":[[\"6\",\"3\",\"2\",\"3\",\"4\",\"5\",\"6\",\"6\",\"1\"],[\"6\",\"6\",\"3\",\"5\",\"5\",\"2\",\"3\",\"3\",\"2\"],[\"5\",\"5\",\"1\",\"2\",\"4\",\"4\",\"3\",\"1\",\"5\"],[\"6\",\"4\",\"5\",\"4\",\"5\",\"2\",\"6\",\"11\",\"2\"],[\"6\",\"4\",\"6\",\"6\",\"5\",\"2\",\"2\",\"1\",\"1\"],[\"1\",\"3\",\"3\",\"1\",\"1\",\"5\",\"4\",\"5\",\"2\"]],\"level\":23,\"score\":6,\"moves\":39,\"replays\":\"1\"}', 0),
(81, 'ksessa', '$2y$10$77GtVOezC6ZrSFfrGODL5eNr/Od4Pc.uBlsXzVVNW42dE8gDwxsuO', '2019-06-09 13:22:55', 0, 0, 0, 0, '2019-06-09 11:30:53', 5, '', 0),
(82, 'gledson.h', '$2y$10$3UPJcQEQOUq9RkMEq1K6sun6WbvOmiKGCvJlYoXIqnBRhglORj64y', '2019-06-10 01:27:06', 1, 0, 0, 143, '2019-06-10 01:21:38', 8, '', 0),
(84, 'ksessa@umaryland.edu', '$2y$10$P6wAchZVYzeGu5m365hgJ.lDshBr2Kv50mcTqw0qlC8X00oDNtj62', '2019-06-20 02:45:15', 1, 0, 0, 0, '2019-08-28 21:50:16', 1, '', 0),
(85, 'chandrade@aol.com', '$2y$10$0Gf67wXXmdY9Mnxf.688Xe/dAaFBKnWOwWTZrdBGBLstJKWTamgsu', '2019-06-21 02:30:09', 1, 0, 0, 0, '2019-08-28 21:50:16', 1, '', 0),
(86, 'Timothyharris84', '$2y$10$bPyPliEuMrVjbtEtcnH95OCYE/dLi4H4W/IPLSfJiBccUO/M8bbsS', '2019-07-03 02:08:44', 1, 0, 0, 67, '2019-08-28 21:50:16', 14, '', 0),
(87, 'mharris21617@gmail.com', '$2y$10$SYzy9Gin0hWuFJepMs.HQubejeP1bV.JcrKwCH.pGaNo4WYPMaIHK', '2019-07-04 03:09:38', 6, 0, 0, 2458, '2019-08-28 21:50:16', 15, '{\"tileState\":[[\"2\",\"6\",\"4\",\"2\",\"6\",\"1\",\"3\",\"3\",\"6\"],[\"6\",\"3\",\"1\",\"2\",\"6\",\"2\",\"3\",\"6\",\"5\"],[\"4\",\"2\",\"3\",\"6\",\"3\",\"2\",\"6\",\"1\",\"6\"],[\"4\",\"2\",\"3\",\"5\",\"4\",\"6\",\"6\",\"2\",\"2\"],[\"1\",\"7\",\"2\",\"5\",\"4\",\"4\",\"2\",\"1\",\"5\"],[\"3\",\"6\",\"3\",\"1\",\"3\",\"11\",\"6\",\"5\",\"2\"]],\"level\":10,\"score\":13,\"moves\":30,\"replays\":17}', 0),
(88, 'Mgema', '$2y$10$jWJpuTMFqNy4T6Ekz97AK.r2p6cuHBAxwZ5pHjSUwvkEN2W6k9l/q', '2019-07-12 21:26:27', 0, 0, 0, 0, '2019-08-28 21:50:16', 2, '', 0),
(89, 'test01', '$2y$10$CAM4VjqMPNSZ6bycNswDg.cJjifC7oHTGjIJPhsXkfFhcc2wMMOxG', '2019-08-27 21:37:24', 1, 0, 0, 0, '2019-08-28 21:50:16', 2, '', 0),
(90, 'csilonka', '$2y$10$8mYXM4lTRwYLvdHzBWnWRueBbt/EoUBJE4t38Fjh2ISyNwOyoH58q', '2019-08-27 21:40:29', 1, 0, 0, 0, '2019-08-28 21:50:16', 1, '', 0),
(91, 'dom', '$2y$10$bRK6FC3tbTwmmPC8c/5OpOGV..jlMEP8PsmBBfqmHUOnnZEZRjVrm', '2019-08-30 12:41:01', 1, 0, -1, 0, '2019-08-30 10:52:30', 2, '', 0),
(93, 'Nsm', '$2y$10$8p/tF.vF6BEdOZclaAxy/ukKHFAI2/pcJp8WbXzoxFND46IVI/Pza', '2019-10-02 04:11:44', 0, 0, -1, 0, '2019-10-02 02:30:58', 2, '{\"tileState\":[[5,3,1,4,2,1,6,3,3],[5,1,6,4,2,3,1,4,6],[6,1,3,6,1,5,6,4,2],[3,4,4,3,6,1,5,2,3],[6,1,1,3,6,6,2,5,3],[3,3,5,4,4,1,1,4,6]],\"level\":\"Level1\",\"score\":20,\"moves\":9}', 0),
(96, 'testtest', '$2y$10$OGM7kaa.kJ9czoBzHMkkFuxAKGi5QI91h/zkzgBKCLuVAXCi5YKT2', '2019-11-13 15:43:39', 1, 0, -1, 0, '2019-11-13 14:44:14', 1, '{\"tileState\":[[2,5,4,1,3,2,2,3,4],[4,5,6,2,4,3,3,4,5],[6,6,5,3,5,3,2,1,2],[1,4,4,2,7,1,5,5,6],[1,2,5,4,5,2,6,5,6],[3,2,6,5,3,4,6,1,4]],\"level\":\"Level1\",\"score\":9,\"moves\":25}', 0),
(97, 'janluc06', '$2y$10$/fTBJvgHwwtNreEIvvYyJudmV3xxPmWQxebejHiNFhU/fMdRno7wu', '2019-12-16 20:23:05', 1, 0, -1, 0, '2019-12-16 19:25:32', 2, '{\"tileState\":[[5,5,3,4,3,4,5,5,4],[4,2,1,4,5,3,1,3,4],[2,6,3,1,1,12,4,1,2],[5,5,1,5,3,2,5,3,2],[2,4,2,3,4,5,1,1,3],[3,4,3,5,4,6,6,2,4]],\"level\":\"Level1\",\"score\":21,\"moves\":40}', 0),
(98, 'ckyung', '$2y$10$Mjo8pMG4eMMuan8o1mjWHeC1cNMeNlGw6DGHXxVooJ0eP7f5JoLnG', '2020-01-28 02:35:56', 0, 0, -1, 0, '2020-02-14 03:13:26', 2, '{\"tileState\":[[6,6,1,5,5,1,2,1,4],[1,6,4,4,5,3,4,3,3],[6,3,1,6,3,4,1,5,6],[2,2,3,2,6,6,5,1,3],[4,4,5,2,3,1,1,5,2],[2,5,1,1,5,6,2,6,3]],\"level\":\"Level2\",\"score\":0,\"moves\":50,\"tile1Count\":0}', 0),
(99, 'lojimba@umaryland.edu', '$2y$10$8K3.MZiga41CI4phJLVYKuiJiFcBW72no.I/El/F52pft0fj8pP9m', '2020-01-28 14:48:32', 0, 0, -1, 0, '2020-01-29 01:27:20', 3, '{\"tileState\":[[6,2,\"potassium\",6,2,5,6,2,3],[5,2,6,2,2,3,2,5,1],[6,5,2,2,6,\"magnesium\",3,4,4],[1,4,6,1,6,1,5,1,1],[6,6,5,4,2,3,2,4,5],[2,6,3,5,1,6,5,3,6]],\"level\":\"Level2\",\"score\":0,\"moves\":9,\"tile1Count\":3}', 0),
(100, 'kcopeland', '$2y$10$/pjXZ0CAg6kJ4HJfOmj9Sekuk30JBfC36gtBe9UN0TSwErOwemA0.', '2020-01-29 01:07:55', 0, 0, -1, 0, '2020-01-30 00:59:36', 2, '{\"tileState\":[[5,4,6,5,2,6,1,4,5],[5,3,5,4,3,1,2,6,5],[6,3,4,1,5,4,3,4,6],[1,5,2,6,6,1,5,6,3],[4,6,4,5,5,6,2,5,6],[4,5,3,6,4,1,1,2,1]],\"level\":\"Level2\",\"score\":0,\"moves\":50,\"tile1Count\":0}', 0),
(101, 'amanalo', '$2y$10$1oIoj9vOeDxJmYjT6/O6LuNHyFECAED/SVWQKrww6066sNuBKc8Wa', '2020-01-29 01:59:36', 1, 0, -1, 0, '2020-01-29 01:01:32', 2, '{\"tileState\":[[4,5,4,6,4,5,3,4,2],[6,9,4,5,6,5,4,3,3],[2,3,5,4,3,1,2,1,5],[6,1,2,3,4,2,5,6,1],[4,4,5,6,3,4,5,3,1],[6,6,1,4,5,3,6,2,2]],\"level\":\"Level1\",\"score\":20,\"moves\":40}', 0),
(102, 'mvz_2009', '$2y$10$xh9EzwPutuP6/Ypp1HGxDeYwXMI/YVVTf.QBJUVUXYEVSUhJUKYoi', '2020-01-29 05:01:02', 1, 0, -1, 0, '2020-01-29 04:04:29', 1, '{\"tileState\":[[1,4,6,1,1,2,3,1,3],[2,6,2,2,1,6,6,4,4],[2,2,5,2,4,5,6,1,4],[3,4,6,6,1,6,2,1,1],[1,2,2,1,1,4,1,3,5],[2,2,6,1,5,3,5,4,1]],\"level\":\"Level1\",\"score\":15,\"moves\":51}', 0),
(103, 'Jfritsch', '$2y$10$GkM2oXS93/lTsoFHjxpFh.lKhdJDdIHe77OTpVj05iOpk8DdUzKlq', '2020-01-29 16:29:15', 0, 0, -1, 0, '2020-02-02 21:05:59', 2, '{\"tileState\":[[3,3,5,1,6,2,4,5,1],[1,2,2,5,6,1,3,1,2],[5,4,1,1,3,5,6,4,2],[2,2,1,4,2,1,4,4,6],[2,6,5,6,1,5,6,3,2],[4,6,5,6,5,2,1,1,5]],\"level\":\"Level2\",\"score\":0,\"moves\":9,\"tile1Count\":0}', 0),
(104, 'aslack89', '$2y$10$Jfz779yUtKj96h0eP7TFhe/mda/arH7bDny81IJ3NPeYBu9RVOKLm', '2020-02-01 05:06:03', 1, 0, -1, 0, '2020-02-01 04:18:22', 2, '{\"tileState\":[[3,6,3,6,1,3,5,2,4],[6,1,4,2,5,5,3,1,3],[1,2,6,4,1,2,1,5,4],[3,2,6,1,6,6,1,6,6],[4,3,3,5,2,4,2,3,1],[4,6,2,6,2,6,5,1,6]],\"level\":\"Level2\",\"score\":0,\"moves\":7,\"tile1Count\":0}', 0),
(105, 'zara32002', '$2y$10$UtDBtxp6D3/j0agI.zTWNeswRvg8O99hI.ZuhPzcZLkkbinT61uL2', '2020-02-01 16:42:18', 0, 0, -1, 0, '2020-02-12 23:06:46', 2, '{\"tileState\":[[2,5,6,6,4,5,1,6,5],[3,1,6,5,3,3,6,5,6],[1,2,2,3,3,2,2,3,5],[2,2,3,6,6,4,6,4,5],[5,5,6,2,3,6,3,1,6],[6,4,2,3,4,5,6,2,5]],\"level\":\"Level2\",\"score\":0,\"moves\":49,\"tile1Count\":2}', 0),
(106, 'ww_tester_1', '$2y$10$hzuB.kip0AoLSCmcZGJN2OkkYfc8sqLLm5Qpoy9Yz6NqD9NDDabGi', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-04-07 02:59:01', 22, '{\"tileState\":[[5,2,15,6,2,2,6,1,6],[6,5,2,6,15,1,3,6,6],[4,6,5,6,4,5,5,5,15],[4,6,4,2,15,5,3,4,2],[5,15,3,5,4,6,4,1,1],[3,15,15,4,1,4,2,2,4]],\"level\":\"Level23\",\"score\":0,\"moves\":40,\"tile1Count\":0}', 1),
(107, 'ww_tester_2', '$2y$10$jYIeGBUY.gFsR3di8AQNQe8C9G2MaikNkl3G.Y/nwVNvpke0w2kOi', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-05 14:10:18', 2, '{\"tileState\":[[1,2,5,5,1,3,4,6,1],[2,6,\"magnesium\",2,2,4,5,5,3],[4,5,4,6,5,5,4,1,9],[5,4,6,2,3,4,6,12,1],[1,2,5,2,5,6,2,3,3],[6,5,6,1,3,5,1,1,5]],\"level\":\"Level17\",\"score\":0,\"moves\":35,\"tile1Count\":2,\"tile2Count\":1}', 1),
(108, 'ww_tester_3', '$2y$10$RZOrpOEadGw.EA7.NOJAWedffegt3aquD9ebiPIOcN1RR4jZ28OM2', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-06 00:36:11', 21, '{\"tileState\":[[6,15,1,4,2,1,6,4,1],[2,1,8,3,1,5,5,2,3],[15,2,5,6,5,4,2,2,1],[1,15,6,4,1,5,2,6,2],[5,15,2,15,6,3,1,6,6],[2,1,2,4,4,3,1,5,6]],\"level\":\"Level21\",\"score\":7,\"moves\":40,\"tile1Count\":18,\"tile2Count\":28,\"tile3Count\":21}', 1),
(109, 'ww_tester_4', '$2y$10$ccOmqJg3t2WSUhjSRo188.d4rTxgYGe2ODSg8JUvJ15cZsmarUX/a', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-05 15:40:06', 9, '{\"tileState\":[[4,6,3,1,6,3,1,2,4],[1,1,5,1,3,2,6,5,3],[2,2,6,3,6,5,5,1,1],[5,5,3,6,1,1,4,3,5],[2,4,1,3,2,1,2,6,2],[6,2,4,3,1,5,1,5,2]],\"level\":\"SandBox\",\"score\":3,\"moves\":998}', 1),
(110, 'ww_tester_5', '$2y$10$u//24ScIwZGPIn5DHlJAdOMEG02skVhXoeqIyr05s9BpTrShzfM6.', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-04 23:20:35', 19, '{\"tileState\":[[6,3,4,4,2,1,4,3,4],[5,4,1,2,3,6,6,1,6],[2,3,3,6,2,1,4,6,4],[4,5,3,5,2,4,2,1,3],[6,1,2,4,1,6,4,4,5],[4,6,2,4,5,1,6,2,6]],\"level\":\"SandBox\",\"score\":7,\"moves\":999}', 1),
(111, 'ww_tester_6', '$2y$10$F99qSIiN9rYc0DW4JRHj.uVeTPYsn0hWAcx.VcNosGojlBxRuULYi', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-02 09:20:21', 1, '', 1),
(112, 'ww_tester_7', '$2y$10$DutQ.dTEG6TQcEo.sOvrYuO/ldsXeK0rnSkBPpGN7hI./wvoQDMrW', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-02 16:31:59', 1, '{\"tileState\":[[3,4,3,6,4,4,1,5,5],[2,3,2,5,3,1,5,2,5],[2,6,4,1,2,2,6,2,4],[1,2,1,3,5,5,1,6,4],[1,4,5,6,4,6,4,6,5],[4,1,6,4,1,3,6,2,2]],\"level\":\"Level9\",\"score\":5,\"moves\":28,\"tile1Count\":0}', 1),
(113, 'ww_tester_8', '$2y$10$IpcpKS/Ef.ToHocjAahaiursulLhizBdpzl7USBJ/vhjhs4SEVQ22', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-05 04:25:30', 19, '{\"tileState\":[[4,2,5,2,3,3,6,2,1],[5,9,5,2,7,6,5,2,4],[3,5,1,6,3,3,12,3,5],[5,4,1,4,6,2,2,4,1],[2,1,6,3,1,5,6,3,5],[1,2,2,6,3,1,5,6,4]],\"level\":\"SandBox\",\"score\":25,\"moves\":994}', 1),
(114, 'ww_tester_9', '$2y$10$NWG/0NmC9HBuKpl32lRAh.1hBioepUS50zpk8DnGP1PxGCmNDVwGe', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-05-08 00:54:29', 22, '{\"tileState\":[[3,5,4,3,1,5,1,1,6],[6,6,6,3,4,3,4,1,5],[4,5,5,3,4,4,4,3,4],[2,1,6,2,2,3,5,6,6],[3,6,1,5,2,4,6,6,3],[1,3,2,3,3,2,5,6,4]],\"level\":\"Level1\",\"score\":0,\"moves\":50}', 1),
(115, 'ww_tester_10', '$2y$10$n4B.IcK7ygfjbrrfcvdEB.1Wu6Av0FmWm5KI2an0oGgqdlBT.Jp32', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-02 09:20:21', 1, '', 1),
(116, 'ww_tester_11', '$2y$10$ZDtSlt0viPPmlE6nFe7Uv.2xNADcTUEYgBLrPe5yxJN.AKkz6Xfkm', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-02 09:20:21', 1, '', 1),
(117, 'ww_tester_12', '$2y$10$v3F5kIhtUV4AtifVzOSOMuu2dC7KYkYO9oIm6XiLfoOpCx8EPZcIi', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-02 09:20:21', 1, '', 1),
(118, 'ww_tester_13', '$2y$10$nRrB/iOgAr4.T5sjX1DnP.vj12IOBFLau.pXW7PruMI2bAiZ9eOd.', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-05-08 01:35:37', 22, '{\"tileState\":[[3,6,4,3,6,15,5,2,4],[2,1,2,5,4,3,2,5,2],[3,2,5,4,2,6,4,3,2],[6,3,3,2,6,5,1,2,3],[2,3,6,9,6,3,2,2,5],[2,4,4,3,2,5,1,3,1]],\"level\":\"Level3\",\"score\":6,\"moves\":50}', 1),
(119, 'ww_tester_14', '$2y$10$eAJ/rG1IZ6Aha2T4u3XNQOeDDQP7/2Y3lXbJisvqu.2wr5fGxvTny', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-02 09:20:21', 1, '', 1),
(120, 'ww_tester_15', '$2y$10$EnRdA.IfxK7FJvKe7gmUYeMfj/6z4qWu0bVzHkD1qYjzlih4zpEym', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-02 09:20:21', 1, '', 1),
(121, 'ww_tester_16', '$2y$10$YbgsGwskd7YcfXvsDjYb2uDyQXTh4bjfsjr3f.nH75c6QT9ZVQHce', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-02 09:20:21', 1, '', 1),
(122, 'ww_tester_17', '$2y$10$mPmH5bw.IvQmrLqI71A0OeAI.hJ2ez4XlKXV2oyZbBlyZ.jXr.7by', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-03 01:35:50', 10, '{\"tileState\":[[2,6,4,3,1,2,3,6,1],[1,4,3,6,3,6,4,3,1],[4,5,2,6,4,2,6,2,5],[3,4,6,3,6,2,1,2,6],[1,2,2,4,1,4,6,1,4],[6,4,10,1,2,3,4,3,6]],\"level\":\"SandBox\",\"score\":99,\"moves\":970}', 1),
(123, 'ww_tester_18', '$2y$10$fkLiCCl70kzOSKRLwNa.T.1rbhexXd6H36sQffwBsEqETafqjovVe', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-02 09:20:21', 1, '', 1),
(124, 'ww_tester_19', '$2y$10$gvvZj.HtdZPQkN3Ys9foR.nc/Tolk6mz5AxcKG7tNbvcXJ162a7Eu', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-02 09:20:21', 1, '', 1),
(125, 'ww_tester_20', '$2y$10$pn361EL9jTT5pVitwZ644upVzgUUesYWt94ZUZCx51NGofUvNucFW', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-05-07 20:31:47', 22, '{\"tileState\":[[5,2,3,6,2,6,1,5,1],[2,4,6,6,4,6,4,3,2],[6,1,1,5,1,2,5,6,6],[5,1,2,6,4,6,2,2,1],[2,4,6,5,1,1,2,1,3],[5,4,5,6,4,1,4,2,4]],\"level\":\"Level14\",\"score\":2,\"moves\":40,\"tile1Count\":0,\"tile2Count\":0,\"tile3Count\":0}', 1),
(126, 'ww_tester_21', '$2y$10$G8a/udWz0woQuzN290.XfujGaeirX0TC7edekxpCm4/2LUCNLwsTS', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-07 21:02:59', 21, '{\"tileState\":[[1,9,2,1,3,4,2,8,3],[12,6,4,6,4,4,3,3,5],[6,1,1,4,5,6,4,2,1],[2,2,4,5,2,4,3,3,2],[5,1,3,6,1,2,1,1,6],[1,1,3,1,6,4,1,6,6]],\"level\":\"Level1\",\"score\":20,\"moves\":47}', 1),
(127, 'ww_tester_22', '$2y$10$2uk.dariuTywBt6BJAi/Auspu1LAn6Th6fU.jvhpzt3F6.mDredlO', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-02 09:20:21', 1, '', 1),
(128, 'ww_tester_23', '$2y$10$PGgAt8TReipQDfUjBKTirO7NTIEUK84Xj0cPOpNFAoQCrhyJ8LIQi', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-05 05:14:43', 20, '{\"tileState\":[[5,4,3,4,6,1,2,6,1],[1,6,3,11,5,2,3,4,6],[2,5,6,5,4,2,3,3,5],[6,4,3,4,5,1,4,2,5],[2,1,5,5,2,4,6,6,1],[5,5,1,2,6,1,4,2,5]],\"level\":\"Level14\",\"score\":6,\"moves\":40,\"tile1Count\":6,\"tile2Count\":3,\"tile3Count\":10}', 1),
(129, 'ww_tester_24', '$2y$10$g1c7enLxUlcJJmB4kHmEiuhKNbxFk3UGcJPpoJvg8bM1rDHwwf12m', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-02-04 04:57:48', 2, '{\"tileState\":[[2,4,1,1,3,5,12,2,3],[4,1,4,5,5,4,2,7,6],[5,5,3,1,6,2,5,5,3],[3,3,5,6,3,1,6,6,2],[4,5,2,4,11,8,3,4,4],[2,6,5,2,4,6,1,4,3]],\"level\":\"SandBox\",\"score\":64,\"moves\":972}', 1),
(130, 'ww_tester_25', '$2y$10$hLapKhk7I1iyh3b5b90E0OB1JYiVYgtPORc09KH7e44NFI/oXbGNe', '2020-02-02 10:20:21', 0, 0, -1, 0, '2020-05-07 23:07:18', 22, '{\"tileState\":[[2,3,2,1,1,2,6,1,15],[5,6,6,15,4,4,5,3,4],[1,2,6,1,15,5,5,3,4],[3,3,1,3,6,15,4,2,5],[2,3,6,2,2,4,2,2,6],[4,4,1,2,3,3,6,15,3]],\"level\":\"Level3\",\"score\":4,\"moves\":50}', 1),
(132, 'ladybug', '$2y$10$uvpARbxKPoA.1WJwIuREc.LWLQ0mDz8qfHZc4c/j5Ia9ty1kyig2W', '2020-02-13 17:11:54', 0, 0, -1, 0, '2020-02-13 16:11:54', 1, '', 0),
(131, 'KHHarris', '$2y$10$fxf.U1Jed4AZYZAS/1B2f.BmlZddp6eS2WtLdboC8B13S57VFeiga', '2020-02-06 05:59:32', 0, 0, -1, 0, '2020-05-08 01:02:19', 2, '{\"tileState\":[[5,3,4,3,2,6,3,4,1],[4,4,2,6,3,4,6,2,3],[5,2,4,5,5,4,2,5,6],[6,3,4,6,1,1,2,3,4],[3,5,3,3,1,4,1,6,6],[2,5,1,6,6,2,4,3,2]],\"level\":\"Level2\",\"score\":0,\"moves\":50,\"tile1Count\":0}', 0),
(133, 'Boobi97', '$2y$10$vEGt4Ni.Jy6ZTfZ0qh0Q9OyXdmxZuxwwRuxzP6HqqViHIvlKMD1Wq', '2020-02-14 05:43:15', 1, 64, 64, 0, '2020-04-19 07:29:48', 1, '{\"tileState\":[[2,3,5,2,3,4,5,3,6],[3,6,5,6,3,6,5,5,3],[2,5,5,5,3,2,6,4,4],[6,6,2,6,1,3,4,2,4],[1,6,2,1,3,1,2,6,1],[4,2,6,5,3,3,4,2,1]],\"level\":\"Level1\",\"score\":0,\"moves\":50}', 0),
(134, 'Boobi97@aol.com', '$2y$10$Sisd0USM2dZ1kNwKYwIprukeSl5yDCc3Tb4/EaHJIznotqtLt4o1q', '2020-03-02 12:18:22', 0, 0, -1, 0, '2020-03-12 01:56:07', 2, '{\"tileState\":[[1,4,1,6,1,4,6,3,2],[4,6,1,1,6,1,2,6,2],[3,3,6,3,1,3,1,1,2],[1,2,4,1,1,4,1,6,6],[6,4,2,3,1,2,4,4,6],[6,4,4,4,6,2,1,5,5]],\"level\":\"Level2\",\"score\":0,\"moves\":50,\"tile1Count\":0}', 0),
(136, 'Zalam', '$2y$10$CRdBqoG5JrPAbXpN6GjHhO4qxYadPHahOxBJnaffWD8HzVH47SlVq', '2020-04-04 22:18:59', 0, 0, -1, 0, '2020-04-04 20:22:55', 2, '{\"tileState\":[[2,6,2,1,4,3,2,3,4],[5,4,3,6,1,2,5,4,2],[1,6,5,5,6,4,2,5,4],[4,4,6,3,3,5,1,4,5],[4,4,6,6,5,3,1,5,4],[6,2,5,2,4,4,5,3,6]],\"level\":\"Level2\",\"score\":4,\"moves\":50,\"tile1Count\":0}', 0),
(135, 'Zahra', '$2y$10$w37aW2HdO8yvDGohO.MLM.61T4YYyYEERri4UfVGqGY1QXELA9Z7S', '2020-04-03 23:07:44', 0, 0, -1, 0, '2020-05-07 16:56:44', 3, '{\"tileState\":[[5,4,3,6,1,3,6,3,2],[1,4,5,1,5,2,3,1,2],[3,1,5,1,4,4,5,1,3],[5,2,1,6,6,5,2,6,5],[4,5,5,4,6,2,5,1,2],[6,3,6,3,9,5,2,5,1]],\"level\":\"Level2\",\"score\":6,\"moves\":49,\"tile1Count\":0}', 0),
(137, 'A2', '$2y$10$ZOQ6OZIQ4/fh.ydn4cdvju1LIi6sc54c7Zs3bCFKjq5UDr5wTUXQe', '2020-05-07 17:47:42', 0, 0, -1, 0, '2020-05-07 15:50:56', 1, '{\"tileState\":[[1,3,5,4,3,1,3,2,3],[5,2,5,1,4,2,1,1,5],[1,3,6,1,6,4,4,5,4],[5,3,2,6,2,4,5,1,1],[4,3,1,3,1,6,4,1,4],[3,6,2,3,1,2,2,6,6]],\"level\":\"Level1\",\"score\":0,\"moves\":50}', 0),
(138, 'bodoganabel@gmail.com', '$2y$10$8nYQ7XYHX5J07THHCaml3eRLWWBuMiPs1R29cG091/KMZjAgvQr.2', '2020-06-04 18:09:13', 0, 0, -1, 0, '2020-06-04 16:43:45', 2, '{\"tileState\":[[1,4,3,5,5,2,6,3,2],[1,3,4,6,1,3,4,5,1],[3,6,1,4,1,5,3,6,5],[5,3,6,2,6,1,2,6,2],[1,5,1,3,2,3,9,5,2],[2,2,4,1,4,6,2,5,3]],\"level\":\"Level2\",\"score\":77,\"moves\":15,\"tile1Count\":0}', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
