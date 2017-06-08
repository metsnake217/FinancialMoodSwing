--
-- Database: 'vm2014'
--

-- --------------------------------------------------------
-- --------------------------------------------------------

--
-- The 'wm2014_match' table
--

DROP TABLE IF EXISTS vm2014_match;
CREATE TABLE IF NOT EXISTS vm2014_match (
  id integer NOT NULL,
  borta text,
  typ text,
  hemma text,
  beskrivning text,
  resultat text,
  datum timestamp without time zone,
  grupp text,
  bet integer,
  phase integer,
  image text,
  CONSTRAINT id_match PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
); ALTER TABLE vm2014_match
  OWNER TO postgres;


--
-- All matches for the world cup
--

INSERT INTO vm2014_match (id, borta, typ, hemma, beskrivning, resultat, datum, grupp, bet, phase, image) VALUES
(1,'M','Croatia','Brazil','','','2014-06-12 22:00:00','A',1,1,'neymar0'),
(2,'M','Cameroon','Mexico','','','2014-06-13 18:00:00','A',2,1,'etoo'),
(3,'M','Netherlands','Spain','','','2014-06-13 21:00:00','B',3,1,'etoo'),
(4,'M','Australia','Chile','','','2014-06-13 23:59:59','B',4,1,'etoo'),
(5,'M','Greece','Colombia','','','2014-06-14 18:00:00','C',5,1,'james'),
(6,'M','Costa Rica','Uruguay','','','2014-06-14 21:00:00','D',6,1,'james'),
(7,'M','Japan','Ivory Coast','','','2014-06-15 03:00:00','C',7,1,'dd'),
(8,'M','Italy','England','','','2014-06-14 23:59:59','D',8,1,'james'), 
(9,'M','Ecuador','Switzerland','','2:3','2014-06-15 18:00:00','E',9,1,'dd'),
(10,'M','Honduras','France','','','2014-06-15 21:00:00','E',10,1,'dd'),
(11,'M','Bosnia and Herzegovina','Argentina','','','2014-06-15 23:59:59','F',11,1,'dd'),
(12,'M','Portugal','Germany','','','2014-06-16 18:00:00','G',12,1,'ronaldo'),
(13,'M','Nigeria','Iran','','','2014-06-16 21:00:00','F',13,1,'ronaldo'),
(14,'M','United States','Ghana','','','2014-06-16 23:59:59','G',14,1,'ronaldo'),
(15,'M','Algeria','Belgium','','','2014-06-17 18:00:00','H',15,1,'hazard'),
(16,'M','Mexico','Brazil','','','2014-06-17 21:00:00','A',16,1,'hazard'),
(17,'M','South Korea','Russia','','','2014-06-17 23:59:59','H',17,1,'hazard'),
(18,'M','Netherlands','Australia','','','2014-06-18 18:00:00','B',18,1,'robben'),
(19,'M','Croatia','Cameroon','','','2014-06-18 23:59:59','A',19,1,'robben'),
(20,'M','Chile','Spain','','','2014-06-18 21:00:00','B',20,1,'robben'),
(21,'M','Ivory Coast','Colombia','','','2014-06-19 18:00:00','C',21,1,'yaya'),
(22,'M','England','Uruguay','','','2014-06-19 21:00:00','D',22,1,'yaya'),
(23,'M','Greece','Japan','','','2014-06-19 23:59:59','C',23,1,'yaya'),
(24,'M','Costa Rica','Italy','','','2014-06-20 18:00:00','D',24,1,'balotelli'),
(25,'M','France','Switzerland','','','2014-06-20 21:00:00','E',25,1,'balotelli'),
(26,'M','Ecuador','Honduras','','','2014-06-20 23:59:59','E',26,1,'balotelli'),
(27,'M','Iran','Argentina','','','2014-06-21 18:00:00','F',27,1,'messi'),
(28,'M','Ghana','Germany','','','2014-06-21 21:00:00','G',28,1,'messi'),
(29,'M','Bosnia and Herzegovina','Nigeria','','','2014-06-21 23:59:59','F',29,1,'messi'),
(30,'M','Algeria','South Korea','','','2014-06-22 21:00:00','H',30,1,'feghouli'),
(31,'M','Portugal','United States','','','2014-06-22 23:59:59','G',31,1,'feghouli'),
(32,'M','Russia','Belgium','','','2014-06-22 18:00:00','H',32,1,'feghouli'),
(33,'M','Spain','Australia','','','2014-06-23 18:00:00','B',33,1,'ramos'),
(34,'M','Chile','Netherlands','','','2014-06-23 18:00:00','B',34,1,'ramos'),
(35,'M','Brazil','Cameroon','','','2014-06-23 22:00:00','A',35,1,'ramos'),
(36,'M','Mexico','Croatia','','','2014-06-23 22:00:00','A',36,1,'ramos'),
(37,'M','Uruguay','Italy','','','2014-06-24 18:00:00','D',37,1,'suarez'),
(38,'M','England','Costa Rica','','','2014-06-24 18:00:00','D',38,1,'suarez'),
(39,'M','Colombia','Japan','','','2014-06-24 22:00:00','C',39,1,'suarez'),
(40,'M','Ivory Coast','Greece','','','2014-06-24 22:00:00','C',40,1,'suarez'),
(41,'M','Argentina','Nigeria','','','2014-06-25 18:00:00','F',41,1,'benzema'),
(42,'M','Iran','Bosnia and Herzegovina','','','2014-06-25 18:00:00','F',42,1,'benzema'),
(43,'M','Switzerland','Honduras','','','2014-06-25 22:00:00','E',43,1,'benzema'),
(44,'M','France','Ecuador','','','2014-06-25 22:00:00','E',44,1,'benzema'),
(45,'M','Germany','United States','','','2014-06-26 18:00:00','G',45,1,'reus'),
(46,'M','Ghana','Portugal','','','2014-06-26 18:00:00','G',46,1,'reus'),
(47,'M','Belgium','South Korea','','','2014-06-26 22:00:00','H',47,1,'reus'),
(48,'M','Russia','Algeria','','','2014-06-26 22:00:00','H',48,1,'reus'),
(49,'M','1A','2B','','','2014-06-28 18:00:00','X',49,2,'armadillo_logo'),
(50,'M','1C','2D','','','2014-06-28 22:00:00','X',50,2,'armadillo_logo'),
(51,'M','1B','2A','','','2014-06-29 18:00:00','X',51,2,'armadillo_logo'),
(52,'M','1D','2C','','','2014-06-29 22:00:00','X',52,2,'armadillo_logo'),
(53,'M','1E','2F','','','2014-06-30 18:00:00','X',53,2,'armadillo_logo'),
(54,'M','1G','2H','','','2014-06-30 22:00:00','X',54,2,'armadillo_logo'),
(55,'M','1F','2E','','','2014-07-01 18:00:00','X',55,2,'armadillo_logo'),
(56,'M','1H','2G','','','2014-07-01 22:00:00','X',56,2,'armadillo_logo'),
(57,'M','Winner Match 53','Winner Match 54','','','2014-07-04 22:00:00','X',57,3,'armadillo_logo'),
(58,'M','Winner Match 49','Winner Match 50','','','2014-07-04 18:00:00','X',58,3,'armadillo_logo'),
(59,'M','Winner Match 51','Winner Match 52','','','2014-07-05 21:00:00','X',59,3,'armadillo_logo'),
(60,'M','Winner Match 55','Winner Match 56','','','2014-07-05 18:00:00','X',60,3,'armadillo_logo'),
(61,'M','Winner Match 59','Winner Match 60','','','2014-07-08 22:00:00','X',61,4,'armadillo_logo'),
(62,'M','Winner Match 57','Winner Match 58','','','2014-07-09 22:00:00','X',62,4,'armadillo_logo'),
(63,'M','Loser Match 61','Loser Match 62','','','2014-07-12 22:00:00','X',63,5,'sad'),
(64,'M','Winner Match 61','Winner Match 62','','','2014-07-13 21:00:00','X',64,6,'trophy');


----------
-- Create or alter vm2014_predictsingleteam

-----------------------------

-CREATE TABLE vm2014_predictsingleteam
(
  id text NOT NULL,
  predictedteam text,
  bet integer NOT NULL,
  points integer,
  scoretyp integer,
  scorehemma integer,
  CONSTRAINT preditsingle PRIMARY KEY (id, bet)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_predictsingleteam
  OWNER TO postgres;


----------
-- Create or alter vm2014_users

-----------------------------


CREATE TABLE vm2016_users
(
  id text NOT NULL,
  password text,
  name text,
  active integer,
  CONSTRAINT id_user PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2016_users
  OWNER TO postgres;


INSERT INTO vm2016_users(id, password, name, active) VALUES 
('and','andria','Andria',0),
('gna','gnagna','Gnagna',0);
('era','eran','eran',0);


----
--- administer teams advancing

-----
DROP TABLE IF EXISTS vm2014_teamadvancing;
CREATE TABLE vm2014_teamadvancing
(
  id integer NOT NULL,
  "group" text,
  match integer,
  team text,
  "position" integer,
  phase integer,
  advancing text,
  CONSTRAINT id_team_winners PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_teamadvancing
  OWNER TO postgres;
  
----
--- all matches with teams advancing
-----
  
INSERT INTO vm2014_teamadvancing (id,group,match,team,position,phase,advancing) VALUES
(1,'A',49,'',1,2,''),
(2,'A',51,'',2,2,''),
(3,'B',51,'',1,2,''),
(4,'B',49,'',2,2,''),
(5,'C',50,'',1,2,''),
(6,'C',52,'',2,2,''),
(7,'D',52,'',1,2,''),
(8,'D',50,'',2,2,''),
(9,'E',53,'',1,2,''),
(10,'E',55,'',2,2,''),
(11,'F',55,'',1,2,''),
(12,'F',53,'',2,2,''),
(13,'G',54,'',1,2,''),
(14,'G',56,'',2,2,''),
(15,'H',56,'',1,2,''),
(16,'H',54,'',2,2,''),
(17,'Quarter',57,'53',1,3,''),
(18,'Quarter',57,'54',2,3,''),
(19,'Quarter',58,'49',1,3,''),
(20,'Quarter',58,'50',2,3,''),
(21,'Quarter',59,'51',1,3,''),
(22,'Quarter',59,'52',2,3,''),
(23,'Quarter',60,'55',1,3,''),
(24,'Quarter',60,'56',2,3,''),
(25,'Semis',62,'57',1,4,''),
(26,'Semis',62,'58',2,4,''),
(27,'Semis',61,'59',1,4,''),
(28,'Semis',61,'60',2,4,''),
(29,'Third',63,'61',1,5,''),
(30,'Third',63,'62',2,5,''),
(31,'Final',64,'61',1,6,''),
(32,'Final',64,'62',2,6,'')


---------------------------- MINI TOURNAMENT SUPPORT ---------------------------- 


--
-- The 'vm2014_match' table
--

DROP TABLE IF EXISTS vm2014_match;
CREATE TABLE IF NOT EXISTS vm2014_match (
  id integer NOT NULL,
  borta text,
  typ text,
  hemma text,
  beskrivning text,
  resultat text,
  datum timestamp without time zone,
  grupp text,
  bet integer,
  phase integer,
  image text,
  CONSTRAINT id_match PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
); ALTER TABLE vm2014_match
  OWNER TO postgres;


--
-- All test matches for the world cup
--

INSERT INTO vm2014_match (id, borta, typ, hemma, beskrivning, resultat, datum, grupp, bet, phase, image) VALUES
(1,'M','Croatia','Brazil','','','2014-06-09 13:00:00','X',1,3,'neymar0'),
(2,'M','Cameroon','Mexico','','','2014-06-09 13:00:00','X',2,3,'etoo'),
(3,'M','Netherlands','Spain','','','2014-06-09 18:00:00','X',3,3,'robben'),
(4,'M','Argentina','Australia','','','2014-06-09 18:00:00','X',4,3,'messi'),
(5,'M','Winner match 1','Winner match 2','','','2014-06-10 14:00:00','X',5,4,'armadillo_logo'),
(6,'M','Winner match 3','Winner match 4','','','2014-06-10 14:00:00','X',6,4,'armadillo_logo'),
(7,'M','Loser Match 5','Loser Match 6','','','2014-06-10 20:00:00','X',7,5,'sad'),
(8,'M','Winner Match 5','Winner Match 6','','','2014-06-10 22:00:00','X',8,6,'trophy');

----
--- administer teams advancing

-----
DROP TABLE IF EXISTS vm2014_teamadvancing;
CREATE TABLE vm2014_teamadvancing
(
  id integer NOT NULL,
  "group" text,
  match integer,
  team text,
  "position" integer,
  phase integer,
  advancing text,
  CONSTRAINT id_team_winners PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_teamadvancing
  OWNER TO postgres;

----
--- all matches with teams advancing
-----

INSERT INTO vm2014_teamadvancing (id,group,match,team,position,phase,advancing) VALUES
(1,'Semis',5,'1',1,4,''),
(2,'Semis',5,'2',2,4,''),
(3,'Semis',6,'3',1,4,''),
(4,'Semis',6,'4',2,4,''),
(5,'Third',7,'5',1,5,''),
(6,'Third',7,'6',2,5,''),
(7,'Final',8,'5',1,6,''),
(8,'Final',8,'6',2,6,'')


----------
-- Create or alter vm2014_predictsingleteam

-----------------------------

-CREATE TABLE vm2014_predictsingleteam
(
  id text NOT NULL,
  predictedteam text,
  bet integer NOT NULL,
  points integer,
  scoretyp integer,
  scorehemma integer,
  CONSTRAINT preditsingle PRIMARY KEY (id, bet)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_predictsingleteam
  OWNER TO postgres;


----------
-- Create or alter vm2014_users

-----------------------------


CREATE TABLE vm2014_users
(
  id text NOT NULL,
  password text,
  name text,
  active integer,
  CONSTRAINT id_user PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_users
  OWNER TO postgres;


INSERT INTO vm2014_users(id, password, name, active) VALUES 
('mkon','netlight-111','Gnagna',0),
('amjw','netlight-112','Amer',0),
('algo','netlight-113','Alexander',0),
('sgardet@gmail.com','simon','Simon',0);