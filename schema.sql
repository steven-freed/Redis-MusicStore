CREATE DATABASE MusicStore;

CREATE TABLE Products (
	productId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    brand VARCHAR(50),
    description VARCHAR(150),
    department VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(50)
);

-- total includes shipping cost
CREATE TABLE Orders (
	orderId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customerId VARCHAR(50) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
	time DATETIME,
    shippingMethod VARCHAR(50) NOT NULL,
    shippingCost DECIMAL(5,2) NOT NULL
);

INSERT INTO Products VALUES
(NULL,'Fender Stratocaster', 'Fender', 'Great guitar for intermediate players.', 'instruments', 699.99, NULL),
(NULL, 'Dean Bass', 'Dean', 'Good starters bass for hard rock lovers.', 'instruments', 199.99, NULL),
(NULL, 'Pearl Snare Drum', 'Pearl', 'Classic snare drum with a sharp snap.','instruments', 128.00, NULL), 
(NULL, 'Vic Firth A Sticks', 'Vic Firth', 'A size drum sticks with a maple glazed finish.','instruments', 22.98, NULL), 
(NULL,'Ernie Ball Guitar Strings','Ernie Ball', 'The great Slinky strings last forever.','instruments', 11.00, NULL),
(NULL, 'Dunlop Guitar Picks', 'Dunlop', 'Heavy guage picks for heavy metal rockers.','instruments', 5.05, NULL),
(NULL, 'Gibson Les Paul', 'Gibson', 'An advanced crafted instrument for experienced players only.','instruments', 1199.99, NULL), 
(NULL, 'Banjo', NULL, 'Classic banjo for bluegrass lovers.','instruments', 150.55, NULL), 
(NULL, 'DDrum Tom', 'DDrum', 'A mid range tom.','instruments', 99.99, NULL),
(NULL, 'Stedman Pro Bass', 'Stedman Pro', 'A great beginners bass.','instruments', 99.99, NULL),
(NULL,'The Jazz Guitar Guide', 'Mel Bay', 'A total jazz guide covering everything from modes to chords and keys.', 'sheet music', 9.99, NULL),
(NULL,'Blues Style', 'Mel Bay', 'A guide to the classic style of blues music. This covers composure as well as many legendary techniques used.','sheet music', 6.99, NULL),
(NULL,'Guitar Hero 2: Soundtrack', 'Hal Leonard', 'From everyones favorite video game of the early 2000''s','sheet music', 11.99, NULL), 
(NULL,'Classical Music Classics', 'Mel Bay', 'For oldies and new aspiring classical players.','sheet music', 9.99, NULL),
(NULL,'Blue Grass Hits', 'Mel Bay', 'For country boys looking to learn some classics.','sheet music', 8.99, NULL),
(NULL,'Marshall Tucker: Greatest Hits', 'Hal Leonard', 'The one and only 70''s rock band.','sheet music', 10.99, NULL),
(NULL,'The Big 4', 'Hal Leonard', 'Hits from all of the shows of the Big 4 line up.','sheet music', 11.99, NULL),
(NULL,'Sennheiser Mic', 'Sennheiser', 'Professional mic for studio quality sound.','equipment', 99.99, NULL), 
(NULL,'Apogee Duet', 'Apogee', 'Everyone from Kygo to Bruce Springsteen uses this for studio and live effects.','equipment', 595.00, NULL),
(NULL,'PreSonus MIDI to 1/4 in. Cable', 'PreSonus', 'For all your adapter needs.','equipment', 99.95, NULL),
(NULL,'IK Mulitmedia iRig 2', 'IK Mulitmedia', 'For iphone lovers looking to move music into the 21st century.','equipment', 29.99, NULL),
(NULL,'Behringer Audio Interface', 'Behringer', 'Great audio interface for beginners.','equipment', 149.99, NULL),
(NULL,'Fender 1/4 in. Cable', 'Fender', 'For adapter needs.','equipment', 21.99, NULL), 
(NULL,'Shure Professional Studio Headphones', 'Shure', 'Studio quality mic for a garage rock price.','equipment', 79.98, NULL),
(NULL,'Behringer 12 Track Mixer', 'Behringer', 'Great mixer for advanced musicians and bands.','equipment', 79.99, NULL),
(NULL,'Yamaha Stereo Mixer', 'Yamaha', 'Classic mixer.','equipment', 119.99, NULL),
(NULL,'Blue Yeti Professional Foam Windscreen', 'Blue Yeti', 'Studio mic with many digital features.','equipment', 12.95, NULL);