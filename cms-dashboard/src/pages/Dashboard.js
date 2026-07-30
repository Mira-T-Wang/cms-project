import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <TopBar title="Dashboard" />
        <div className="layout-content">
          <p className="dashboard-empty">Dashboard content coming soon.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;