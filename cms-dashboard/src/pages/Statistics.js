import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import SalesModal from '../components/SalesModal';
import { salesAPI } from '../api/apiService';
import './Statistics.css';

const Statistics = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedRow, setSelectedRow] = useState(null);

  // Delete confirm state
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchData = async (currentPage) => {
    setLoading(true);
    try {
      const res = await salesAPI.getPaginated(currentPage);
      setData(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
    } catch (error) {
      console.error('Failed to fetch sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleAdd = () => {
    setModalMode('add');
    setSelectedRow(null);
    setModalOpen(true);
  };

  const handleEdit = (row) => {
    setModalMode('edit');
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleSave = async (form) => {
    try {
      if (modalMode === 'add') {
        await salesAPI.create(form);
      } else {
        await salesAPI.update(selectedRow.id, form);
      }
      setModalOpen(false);
      fetchData(page);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleDeleteConfirm = (row) => {
    setDeleteTarget(row);
  };

  const handleDelete = async () => {
    try {
      await salesAPI.delete(deleteTarget.id);
      setDeleteTarget(null);
      fetchData(page);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <TopBar title="Statistics" />
        <div className="layout-content">

          {/* Header */}
          <div className="stats-header">
            <button className="stats-add-btn" onClick={handleAdd}>
              + Add
            </button>
          </div>

          {loading ? (
            <div className="stats-loading">Loading...</div>
          ) : (
            <>
              {/* Table */}
              <div className="stats-table-wrapper">
                <table className="stats-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Total</th>
                      <th>MPT</th>
                      <th>Ooredoo</th>
                      <th>Ooredoo Codapay</th>
                      <th>Telenor</th>
                      <th>MEC</th>
                      <th>Mytel</th>
                      <th>DTAC</th>
                      <th>KBZPay</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row) => (
                      <tr key={row.id}>
                        <td>{row.date}</td>
                        <td>{row.total}</td>
                        <td>{row.mpt}</td>
                        <td>{row.ooredoo}</td>
                        <td>{row.ooredoo_codapay}</td>
                        <td>{row.telenor}</td>
                        <td>{row.mec}</td>
                        <td>{row.mytel}</td>
                        <td>{row.dtac}</td>
                        <td>{row.kbzpay}</td>
                        <td className="actions-cell">
                          <button
                            className="btn-edit"
                            onClick={() => handleEdit(row)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteConfirm(row)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="stats-pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  ← Previous
                </button>
                <span className="pagination-info">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  Next →
                </button>
              </div>

              {/* Footer */}
              <div className="stats-footer">
                Total Records: {total}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <SalesModal
          mode={modalMode}
          initialData={selectedRow}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <div className="modal-overlay">
          <div className="confirm-dialog">
            <h3 className="confirm-title">Delete Record</h3>
            <p className="confirm-message">
              Are you sure you want to delete the record for <strong>{deleteTarget.date.slice(0, 10)}</strong>? This action cannot be undone.
            </p>
            <div className="confirm-actions">
              <button
                className="modal-btn-cancel"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="confirm-btn-delete"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;