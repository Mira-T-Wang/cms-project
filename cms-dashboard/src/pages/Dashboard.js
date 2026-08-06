import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { salesAPI } from '../api/apiService';
import './Dashboard.css';

const COLORS = {
  mpt: '#f5c518',
  ooredoo: '#d4a017',
  telenor: '#60b8e8',
  kbzpay: '#1a3a6e'
};

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await salesAPI.getSummary();
        const raw = res.data.data;

        // Build full 7-day array — fill missing days with 0
        const today = new Date();
        const days = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const key = d.toISOString().slice(0, 10);
          const label = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
          const found = raw.find(r => r.date === key);
          days.push({
            date: label,
            MPT: found ? Number(found.mpt) : 0,
            Ooredoo: found ? Number(found.ooredoo) : 0,
            Telenor: found ? Number(found.telenor) : 0,
            KBZPay: found ? Number(found.kbzpay) : 0
          });
        }
        setChartData(days);
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <TopBar title="Dashboard" />
        <div className="layout-content">

          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title">Revenue by Operator</div>
                <div className="chart-subtitle">Last 7 days</div>
              </div>
            </div>

            {loading ? (
              <div className="chart-loading">Loading...</div>
            ) : (
              <ResponsiveContainer width="100%" height={340}>
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
                  barCategoryGap="30%"
                  barGap={3}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e3a6e"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#7a9cc6', fontSize: 12 }}
                    axisLine={{ stroke: '#1e3a6e' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#7a9cc6', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={60}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0d1b3e',
                      border: '1px solid #1e3a6e',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '13px'
                    }}
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: '20px',
                      fontSize: '13px',
                      color: '#7a9cc6'
                    }}
                  />
                  <Bar dataKey="MPT" fill={COLORS.mpt} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Ooredoo" fill={COLORS.ooredoo} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Telenor" fill={COLORS.telenor} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="KBZPay" fill={COLORS.kbzpay} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;