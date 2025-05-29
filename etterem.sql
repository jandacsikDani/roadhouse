-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Máj 24. 10:46
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `etterem`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `menuitems`
--

CREATE TABLE `menuitems` (
  `id` int(11) NOT NULL,
  `typeid` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `price` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `menuitems`
--

INSERT INTO `menuitems` (`id`, `typeid`, `name`, `description`, `price`) VALUES
(6, 1, 'Margaréta', 'alap, sajt', '2390Ft / 4900Ft'),
(8, 1, 'Kukoricás', 'alap, kukorica, sajt', '2490Ft / 5100Ft'),
(9, 1, 'Baconos', 'alap, bacon, sajt', '2590Ft / 5200Ft'),
(10, 1, 'Sonkás', 'alap, sonka, sajt', '2590Ft / 5200Ft'),
(11, 1, 'Szalámis', 'alap, szalámi, sajt', '2590Ft / 5200Ft'),
(12, 1, 'Tengerész', 'alap, tonhal, lila hagyma, sajt', '2590Ft / 5200Ft'),
(13, 1, 'Zöldike', 'alap, paradicsomn, paprika, kukorica,gomba, hagyma, sajt', '2590Ft / 5200Ft'),
(14, 1, 'Bolognai', 'bolognai alap,paradicsom karika, sajt', '2790Ft / 5400Ft'),
(15, 1, 'Gabi kedvence', 'alap, lila hagyma, gomba, bacon, erős paprika, sajt', '2790Ft / 5600Ft'),
(16, 1, 'Hawaii', 'alap, sonka, ananász, sajt', '2790Ft / 5600Ft'),
(17, 1, 'Kotkodács', 'alap, csirkehusi, kukorica, sajt', '2790Ft / 5600Ft'),
(18, 1, 'Piedóne', 'kedvence alap, chilis bab, kolbász, hagyma, sajt', '2790Ft / 5600Ft'),
(19, 1, 'SonGoKu', 'alap, sonka, gomba, kukorica, sajt', '2790Ft / 5600Ft'),
(20, 1, 'Sonkás- gombás', 'alap, sonka, gomba, sajt', '2790Ft / 5600Ft'),
(21, 1, 'Sonkás- kukoricás', 'alap, sonka, kukorica, sajt', '2790Ft / 5600Ft'),
(22, 1, 'Szatymazi', 'alap, sonka, barack, bacon, camembert sajt, sajt', '2790Ft / 5600Ft'),
(23, 1, 'Alcatraz', 'alap, sonka, bacon, juhtúró, gomba, lilahagyma, sajt', '2990Ft / 5900Ft'),
(24, 1, 'Arizona', 'alap, csirke husi, ananász, kukorica, camembert sajt', '2990Ft / 5900Ft'),
(25, 1, 'BBQ', 'barbecue alap, csirkehusi, bacon, hagyma, paradicsom, sajt', '2990Ft / 5900Ft'),
(26, 1, 'Boston', 'alap, kolbász, bacon, kukorica, csemege uborka, sajt', '2990Ft / 5900Ft'),
(27, 1, 'Buffalo', 'bolognai szósz, sonka, bacon, gomba, sajt', '2990Ft / 5900Ft'),
(28, 1, 'Filadelfia', 'alap, sonka, bacon, brokkoli, feta sajt, sajt', '2990Ft / 5900Ft'),
(29, 1, 'Húsimádó', 'alap, csirkehusi, sonka, szalámi, bacon, sajt', '2990Ft / 5900Ft'),
(30, 1, 'Lucifer', 'alap csípős alap, szalámi, bacon, erős paprika, l.hagyma, sajt', '2990Ft / 5900Ft'),
(31, 1, 'Magyaros', 'alap, kolbász, bacon, hagyma, paprika, sajt', '2990Ft / 5900Ft'),
(32, 1, 'Megálló', 'alap, csirkehusi, bacon, kukorica, lilahagyma sajt', '2990Ft / 5900Ft'),
(33, 1, 'Mount-Everest', 'alap, bacon, kolbász, paprika, tejföl, sajt', '2990Ft / 5900Ft'),
(34, 1, 'Négysajtos', 'alap, mozzarella, füstölt sajt, feta sajt, camambert sajt', '2990Ft / 5900Ft'),
(35, 1, 'Niagara', 'alap, szalámi, gomba, bacon, paprika, sajt, füstölt sajt', '2990Ft / 5900Ft'),
(36, 1, 'Atlantisz', 'alap, tenger gyümölcsei, sajt', '3390Ft / 6500Ft'),
(37, 2, 'Classic Burger', 'Házi buci, 100% marhapogácsa, jégsaláta, csemege uborka, hamburgerszósz', '2300Ft'),
(38, 2, 'MegaMarha Burger', 'Házi buci, 100% marhapogácsa, jégsaláta, csemege uborka, hamburgerszósz, cheddar sajt, sült bacon', '2500Ft'),
(39, 2, 'CsipiMarha Burger', 'Házi buci, 100% marhapogácsa, jégsaláta, csemege uborka, hamburgerszósz, cheddar sajt, sült bacon', '2700Ft'),
(40, 3, 'SimaBurger', 'hamburger zsemle, hamburger hús, saláta, uborka, paradicsom, lilahagyma, mustár, ketchup', '1600Ft'),
(41, 3, 'VegaBurger', 'hamburger zsemle, sült sajt, saláta, uborka, paradicsom, lilahagyma, mustár, ketchup', '1600Ft'),
(42, 3, 'SajtosBurger', 'hamburger zsemle, hamburger hús, sajt, saláta, uborka, paradicsom, lilahagyma, mustár, ketchup', '1700Ft'),
(43, 3, 'BaconBurger', 'hamburger zsemle, hamburger hús, sajt, bacon, saláta, uborka, paradicsom, lilahagyma, mustár, ketchup', '1800Ft'),
(44, 3, 'HúsimádóBurger', 'hamburger zsemle, hamburger hús, sajt, sonka, szalámi, bacon, saláta, uborka, paradicsom, lilahagyma, mustár, ketchup', '1900Ft'),
(45, 4, 'Roston csirkemell', '', '2300Ft'),
(46, 4, 'Roston karaj', '', '2300Ft'),
(47, 4, 'Csevap, lilahagyma, ajvár', '', '2600Ft'),
(48, 4, 'Roston tarja', '', '2900Ft'),
(49, 4, 'Gyros hús', '', '2100Ft'),
(50, 4, 'Gyros pitában', '2db- gyros hús, pita, saláta, szósz', '1900Ft'),
(51, 5, 'párolt rizs', '', '600Ft'),
(52, 5, 'grill zöldség', '', '1000Ft'),
(53, 5, 'fűszeres steak burgonya', '', '800Ft'),
(54, 5, 'hasáb burgonya', '', '800Ft'),
(55, 5, 'sült édes burgonya', '', '1000Ft'),
(56, 6, 'Cézár saláta', '', '2100Ft'),
(57, 6, 'Brutusz saláta', 'majonézes kukorica saláta, jégsaláta, sonka, sajt', '2100Ft'),
(58, 6, 'Görög saláta', '', '1900Ft'),
(59, 7, 'Pepsi Cola 0,5', '', '500Ft + 50Ft betétdíj'),
(60, 7, 'Pepsi Cola Zero 0,5', '', '500Ft + 50Ft betétdíj'),
(61, 7, 'Pepsi Cola Zero Citrom 0,5', '', '500Ft + 50Ft betétdíj'),
(62, 7, 'Schweppes Narancs 0,5', '', '500Ft + 50Ft betétdíj'),
(63, 7, 'Schweppes Citrom 0,5', '', '500Ft + 50Ft betétdíj'),
(64, 7, 'Kinley Gyömbér 0,5', '', '500Ft + 50Ft betétdíj'),
(65, 7, 'Kinely Tonic 0,5', '', '500Ft + 50Ft betétdíj'),
(66, 7, 'Szentkirályi dús 0,5', '', '500Ft + 50Ft betétdíj'),
(67, 7, 'Szentkirályi mentes 0,5', '', '500Ft + 50Ft betétdíj');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `menutypes`
--

CREATE TABLE `menutypes` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `menutypes`
--

INSERT INTO `menutypes` (`id`, `name`) VALUES
(1, 'Pizzák'),
(2, 'Kézműves hamburger'),
(3, 'Hamburger'),
(4, 'Grill ételek'),
(5, 'Köretek'),
(6, 'Saláták'),
(7, 'Üdítők');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'tesztfelhasznalo', '$2b$10$Htfq52JSSa2aAJmhKPbS7eFS7WxqCLmdg1DLxC55TqI2njlDsTsnq'),
(2, 'admin', '$2b$10$kOeIeI.1qf0Ru8ov8Al.NexdmDSQJTupu4wsxeV7gWNRaxv5dTLWi');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `menuitems`
--
ALTER TABLE `menuitems`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `menutypes`
--
ALTER TABLE `menutypes`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Users_username_key` (`username`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `menuitems`
--
ALTER TABLE `menuitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT a táblához `menutypes`
--
ALTER TABLE `menutypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
