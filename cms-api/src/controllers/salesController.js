const SaleStatistics = require('../models/SaleStatistics');

const getPaginated = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await SaleStatistics.getPaginated(page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPaginated };