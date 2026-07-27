import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Welcome, {user?.display_name} 👋</h1>
      <p className="dashboard-role">Role: {user?.role}</p>
      <button className="dashboard-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;