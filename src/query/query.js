const QUERY = {
  SELECT_EPISODES: 'SELECT * FROM episodes ORDER BY episode ASC LIMIT 13',
  SELECT_EPISODE: 'SELECT * FROM episodes WHERE date LIKE ?',
  CREATE_EPISODE: 'INSERT INTO episodes(episode, title, date, url, img_src, painting_index, num_colors) VALUES (?, ?, ?, ?, ?, ?, ?)',
  UPDATE_EPISODE: 'UPDATE episodes SET episode = ?, title = ?, date = ?, url = ?, img_src = ?, painting_index = ?, num_colors = ? WHERE id = ?',
  DELETE_EPISODE: 'DELETE FROM episodes WHERE id = ?',
  CREATE_EPISODE_PROCEDURE: 'CALL create_and_return (?, ?, ?, ?, ?, ?, ?)'
};

export default QUERY;
