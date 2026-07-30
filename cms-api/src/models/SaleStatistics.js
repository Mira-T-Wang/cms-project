const pool = require('../config/database');

class SaleStatistics {
  static async getPaginated(page, limit) {
    const offset = (page - 1) * limit;

    const connection = await pool.getConnection();

    // Get paginated rows
    const [rows] = await connection.execute(
      `SELECT date, total, mpt, ooredoo, ooredoo_codapay,
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
}

module.exports = SaleStatistics;