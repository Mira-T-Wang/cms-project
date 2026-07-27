import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: '#fff', padding: '40px' }}>
      <h1>Welcome, {user?.display_name} 👋</h1>
      <p style={{ color: '#7a9cc6' }}>Role: {user?.role}</p>
      <button
        onClick={handleLogout}
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#1a6ef5', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;