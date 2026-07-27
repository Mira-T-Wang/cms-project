import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/apiService';
import { useAuth } from '../utils/AuthContext';
import { FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authAPI.login(username, password);
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-brand">
          <img src={logo} alt="logo" className="login-logo" />
          <div>
            <div className="login-brand-name">BaganManagement</div>
            <div className="login-brand-sub">CMS DASHBOARD</div>
          </div>
        </div>

        <div className="login-divider" />

        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">Sign in to manage your content</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="login-label">USERNAME</label>
          <div className="login-input-wrapper">
            <FaUser className="login-input-icon" />
            <input
              className="login-input"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <label className="login-label">PASSWORD</label>
          <div className="login-input-wrapper">
            <FaLock className="login-input-icon" />
            <input
              className="login-input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <span
              className="login-eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash color="#7a9cc6" /> : <FaEye color="#7a9cc6" />}
            </span>
          </div>

          <div className="login-forgot-row">
            <span className="login-forgot">Forgot password?</span>
          </div>

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div className="login-demo">
          Demo: <code>bgkadmin</code> / <code>bgkadmin123@#$</code>
        </div>
      </div>
    </div>
  );
};

export default Login;