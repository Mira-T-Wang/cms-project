import { NavLink } from 'react-router-dom';
import { MdDashboard, MdBarChart } from 'react-icons/md';
import logo from '../assets/image.png';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <img src={logo} alt="logo" className="sidebar-logo" />
        <div>
          <div className="sidebar-brand-name">BaganManagement</div>
          <div className="sidebar-brand-sub">CMS DASHBOARD</div>
        </div>
      </div>

      <div className="sidebar-divider" />

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'sidebar-link active' : 'sidebar-link'
          }
        >
          <MdDashboard className="sidebar-icon" />
          Dashboard
        </NavLink>

        <NavLink
          to="/statistics"
          className={({ isActive }) =>
            isActive ? 'sidebar-link active' : 'sidebar-link'
          }
        >
          <MdBarChart className="sidebar-icon" />
          Statistics
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;