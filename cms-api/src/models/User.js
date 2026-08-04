const pool = require('../config/database');

class User {
  // Find user by username in tbl_user
  static async findByUsername(username) {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM tbl_user WHERE username = ?',
      [username]
    );
    connection.release();
    return rows[0] || null;
  } 
  static async updatePassword(id, newPassword) {
  const connection = await pool.getConnection();
  await connection.execute(
    'UPDATE tbl_user SET password = ? WHERE idx = ?',
    [newPassword, id]
  );
  connection.release();
}
}

module.exports = User;