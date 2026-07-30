import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import './TopBar.css';

const TopBar = ({ title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="topbar">
      <h1 className="topbar-title">{title}</h1>
      <div className="topbar-right">
        <span className="topbar-username">{user?.display_name}</span>
        <span className="topbar-role">{user?.role}</span>
        <button className="topbar-logout" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;