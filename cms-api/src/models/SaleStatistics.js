const pool = require('../config/database');

class SaleStatistics {
  static async getPaginated(page, limit) {
    const offset = (page - 1) * limit;

    const connection = await pool.getConnection();

    // Get paginated rows
    const [rows] = await connection.execute(
  `SELECT id, DATE_FORMAT(date, '%Y-%m-%d') as date, total, mpt, ooredoo, ooredoo_codapay,
          telenor, mec, mytel, dtac, kbzpay
   FROM sale_statistics
   ORDER BY date DESC
   LIMIT ? OFFSET ?`,
  [limit, offset]
);

    // Get total count for pagination
    const [[{ count }]] = await connection.execute(
      'SELECT COUNT(*) as count FROM sale_statistics'
    );

    connection.release();

    return {
      data: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit)
    };
  }

  static async dateExists(date) {
  const connection = await pool.getConnection();
  const [[{ count }]] = await connection.execute(
    'SELECT COUNT(*) as count FROM sale_statistics WHERE date = ?',
    [date]
  );
  connection.release();
  return count > 0;
}

  static async create(fields) {
    const connection = await pool.getConnection();
    const { date, total, mpt, ooredoo, ooredoo_codapay, telenor, mec, mytel, dtac, kbzpay } = fields;
    const plainDate = date.split('T')[0];
    const [result] = await connection.execute(
      `INSERT INTO sale_statistics 
       (date, total, mpt, ooredoo, ooredoo_codapay, telenor, mec, mytel, dtac, kbzpay, created_timetick, created_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UNIX_TIMESTAMP(), NOW())`,
      [date, total, mpt, ooredoo, ooredoo_codapay, telenor, mec, mytel, dtac, kbzpay]
    );
    connection.release();
    return result;
  }

  static async update(id, fields) {
    const connection = await pool.getConnection();
    const { date, total, mpt, ooredoo, ooredoo_codapay, telenor, mec, mytel, dtac, kbzpay } = fields;
    const [result] = await connection.execute(
      `UPDATE sale_statistics 
       SET date=?, total=?, mpt=?, ooredoo=?, ooredoo_codapay=?, 
           telenor=?, mec=?, mytel=?, dtac=?, kbzpay=?
       WHERE id=?`,
      [date, total, mpt, ooredoo, ooredoo_codapay, telenor, mec, mytel, dtac, kbzpay, id]
    );
    connection.release();
    return result;
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'DELETE FROM sale_statistics WHERE id = ?',
      [id]
    );
    connection.release();
    return result;
  }
}

module.exports = SaleStatistics;