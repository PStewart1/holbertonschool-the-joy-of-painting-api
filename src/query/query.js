const QUERY = {
  SELECT_EPISODES: 'SELECT * FROM episodes ORDER BY episode ASC LIMIT 13',
  SELECT_EPISODE: 'SELECT * FROM episodes WHERE date LIKE ?',
  SELECT_EPISODESBYMONTH: 'SELECT * FROM episodes WHERE date LIKE ?',
  CREATE_EPISODE: 'INSERT INTO episodes(episode, title, date, url, img_src, painting_index, num_colors color_hexes, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
  UPDATE_EPISODE: 'UPDATE episodes SET episode = ?, title = ?, date = ?, url = ?, img_src = ?, painting_index = ?, num_colors = ? WHERE id = ?',
  DELETE_EPISODE: 'DELETE FROM episodes WHERE id = ?',
  CREATE_EPISODE_PROCEDURE: 'CALL create_and_return (?, ?, ?, ?, ?, ?, ?)',
  INSERT_EPISODES: 'INSERT INTO episodes (episode, title, date, url, img_src, painting_index, num_colors, color_hexes, notes) VALUES ?',
  INSERT_COLORS: 'INSERT INTO colors (episode,Alizarin_Crimson,Black_Gesso,Bright_Red,Burnt_Umber,Cadmium_Yellow,Dark_Sienna,Indian_Red,Indian_Yellow,Liquid_Black,Liquid_Clear,Midnight_Black,Phthalo_Blue,Phthalo_Green,Prussian_Blue,Sap_Green,Titanium_White,Van_Dyke_Brown,Yellow_Ochre) VALUES ?',
  INSERT_SUBJECTS: 'INSERT INTO subjects (episode,APPLE_FRAME,AURORA_BOREALIS,BARN,BEACH,BOAT,BRIDGE,BUILDING,BUSHES,CABIN,CACTUS,CIRCLE_FRAME,CIRRUS,CLIFF,CLOUDS,CONIFER,CUMULUS,DECIDUOUS,DIANE_ANDRE,DOCK,DOUBLE_OVAL_FRAME,FARM,FENCE,FIRE,FLORIDA_FRAME,FLOWERS,FOG,FRAMED,GRASS,GUEST,HALF_CIRCLE_FRAME,HALF_OVAL_FRAME,HILLS,LAKE,LAKES,LIGHTHOUSE,MILL,MOON,MOUNTAIN,MOUNTAINS,NIGHT,OCEAN,OVAL_FRAME,PALM_TREES,PATH,PERSON,PORTRAIT,RECTANGLE_3D_FRAME,RECTANGULAR_FRAME,RIVER,ROCKS,SEASHELL_FRAME,SNOW,SNOWY_MOUNTAIN,SPLIT_FRAME,STEVE_ROSS,STRUCTURE,SUN,TOMB_FRAME,TREE,TREES,TRIPLE_FRAME,WATERFALL,WAVES,WINDMILL,WINDOW_FRAME,WINTER,WOOD_FRAMED) VALUES ?'
};

export default QUERY;
