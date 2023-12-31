CREATE DATABASE IF NOT EXISTS bob_ross;
USE bob_ross;
DROP TABLE IF EXISTS episodes;
CREATE TABLE episodes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  episode VARCHAR(6) NOT NULL,
  title VARCHAR(255) NOT NULL,
  date VARCHAR(50) NOT NULL,
  url VARCHAR(255) NOT NULL,
  img_src VARCHAR(255) NOT NULL,
  painting_index INT NOT NULL,
  num_colors INT NOT NULL,
  color_hexes VARCHAR(255) NOT NULL,
  notes VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS colors;
CREATE TABLE colors (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  episode VARCHAR(6) NOT NULL,
  Alizarin_Crimson BOOLEAN NOT NULL,
  Black_Gesso BOOLEAN NOT NULL,
  Bright_Red BOOLEAN NOT NULL,
  Burnt_Umber BOOLEAN NOT NULL,
  Cadmium_Yellow BOOLEAN NOT NULL,
  Dark_Sienna BOOLEAN NOT NULL,
  Indian_Red BOOLEAN NOT NULL,
  Indian_Yellow BOOLEAN NOT NULL,
  Liquid_Black BOOLEAN NOT NULL,
  Liquid_Clear BOOLEAN NOT NULL,
  Midnight_Black BOOLEAN NOT NULL,
  Phthalo_Blue BOOLEAN NOT NULL,
  Phthalo_Green BOOLEAN NOT NULL,
  Prussian_Blue BOOLEAN NOT NULL,
  Sap_Green BOOLEAN NOT NULL,
  Titanium_White BOOLEAN NOT NULL,
  Van_Dyke_Brown BOOLEAN NOT NULL,
  Yellow_Ochre BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS subjects;
CREATE TABLE subjects (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  episode VARCHAR(6) NOT NULL,
  APPLE_FRAME BOOLEAN NOT NULL,
  AURORA_BOREALIS BOOLEAN NOT NULL,
  BARN BOOLEAN NOT NULL,
  BEACH BOOLEAN NOT NULL,
  BOAT BOOLEAN NOT NULL,
  BRIDGE BOOLEAN NOT NULL,
  BUILDING BOOLEAN NOT NULL,
  BUSHES BOOLEAN NOT NULL,
  CABIN BOOLEAN NOT NULL,
  CACTUS BOOLEAN NOT NULL,
  CIRCLE_FRAME BOOLEAN NOT NULL,
  CIRRUS BOOLEAN NOT NULL,
  CLIFF BOOLEAN NOT NULL,
  CLOUDS BOOLEAN NOT NULL,
  CONIFER BOOLEAN NOT NULL,
  CUMULUS BOOLEAN NOT NULL,
  DECIDUOUS BOOLEAN NOT NULL,
  DIANE_ANDRE BOOLEAN NOT NULL,
  DOCK BOOLEAN NOT NULL,
  DOUBLE_OVAL_FRAME BOOLEAN NOT NULL,
  FARM BOOLEAN NOT NULL,
  FENCE BOOLEAN NOT NULL,
  FIRE BOOLEAN NOT NULL,
  FLORIDA_FRAME BOOLEAN NOT NULL,
  FLOWERS BOOLEAN NOT NULL,
  FOG BOOLEAN NOT NULL,
  FRAMED BOOLEAN NOT NULL,
  GRASS BOOLEAN NOT NULL,
  GUEST BOOLEAN NOT NULL,
  HALF_CIRCLE_FRAME BOOLEAN NOT NULL,
  HALF_OVAL_FRAME BOOLEAN NOT NULL,
  HILLS BOOLEAN NOT NULL,
  LAKE BOOLEAN NOT NULL,
  LAKES BOOLEAN NOT NULL,
  LIGHTHOUSE BOOLEAN NOT NULL,
  MILL BOOLEAN NOT NULL,
  MOON BOOLEAN NOT NULL,
  MOUNTAIN BOOLEAN NOT NULL,
  MOUNTAINS BOOLEAN NOT NULL,
  NIGHT BOOLEAN NOT NULL,
  OCEAN BOOLEAN NOT NULL,
  OVAL_FRAME BOOLEAN NOT NULL,
  PALM_TREES BOOLEAN NOT NULL,
  PATH BOOLEAN NOT NULL,
  PERSON BOOLEAN NOT NULL,
  PORTRAIT BOOLEAN NOT NULL,
  RECTANGLE_3D_FRAME BOOLEAN NOT NULL,
  RECTANGULAR_FRAME BOOLEAN NOT NULL,
  RIVER BOOLEAN NOT NULL,
  ROCKS BOOLEAN NOT NULL,
  SEASHELL_FRAME BOOLEAN NOT NULL,
  SNOW BOOLEAN NOT NULL,
  SNOWY_MOUNTAIN BOOLEAN NOT NULL,
  SPLIT_FRAME BOOLEAN NOT NULL,
  STEVE_ROSS BOOLEAN NOT NULL,
  STRUCTURE BOOLEAN NOT NULL,
  SUN BOOLEAN NOT NULL,
  TOMB_FRAME BOOLEAN NOT NULL,
  TREE BOOLEAN NOT NULL,
  TREES BOOLEAN NOT NULL,
  TRIPLE_FRAME BOOLEAN NOT NULL,
  WATERFALL BOOLEAN NOT NULL,
  WAVES BOOLEAN NOT NULL,
  WINDMILL BOOLEAN NOT NULL,
  WINDOW_FRAME BOOLEAN NOT NULL,
  WINTER BOOLEAN NOT NULL,
  WOOD_FRAMED BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);
