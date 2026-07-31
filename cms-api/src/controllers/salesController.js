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
const create = async (req, res) => {
  try {
    const result = await SaleStatistics.create(req.body);
    res.status(201).json({ message: 'Record created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    await SaleStatistics.update(req.params.id, req.body);
    res.json({ message: 'Record updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await SaleStatistics.delete(req.params.id);
    res.json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { getPaginated, create, update, remove };