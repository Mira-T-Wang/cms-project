import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import apiClient from '../api/apiService';
import './Statistics.css';

const Statistics = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`/sales?page=${page}&limit=20`);
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
        setTotal(res.data.total);
      } catch (error) {
        console.error('Failed to fetch sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <TopBar title="Statistics" />
        <div className="layout-content">

          <div className="stats-header">
            <span className="stats-total">Total Records: {total}</span>
            <span className="stats-page">Page {page} of {totalPages}</span>
          </div>

          {loading ? (
            <div className="stats-loading">Loading...</div>
          ) : (
            <>
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
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row) => (
                      <tr key={row.id}>
                        <td>{row.date.slice(0, 10)}</td>
                        <td>{row.total}</td>
                        <td>{row.mpt}</td>
                        <td>{row.ooredoo}</td>
                        <td>{row.ooredoo_codapay}</td>
                        <td>{row.telenor}</td>
                        <td>{row.mec}</td>
                        <td>{row.mytel}</td>
                        <td>{row.dtac}</td>
                        <td>{row.kbzpay}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;