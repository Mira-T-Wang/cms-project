import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/apiService';
import { useAuth } from '../utils/AuthContext';
import logo from '../assets/image.png';

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
    <div style={styles.wrapper}>
      <div style={styles.card}>

        <div style={styles.brand}>
          <img src={logo} alt="logo" style={styles.logo} />
          <div>
            <div style={styles.brandName}>BaganManagement</div>
            <div style={styles.brandSub}>CMS DASHBOARD</div>
          </div>
        </div>

        <div style={styles.divider} />

        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Sign in to manage your content</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>USERNAME</label>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}></span>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <label style={styles.label}>PASSWORD</label>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}></span>
            <input
              style={styles.input}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div style={styles.forgotRow}>
            <span style={styles.forgot}>Forgot password?</span>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div style={styles.demo}>
          Demo: <code>bgkadmin</code> / <code>bgkadmin123@#$</code>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#0a0f1e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  },
  card: {
    backgroundColor: '#0d1b3e',
    border: '1px solid #1e3a6e',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '440px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '20px',
  },
  logo: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
  },
  brandName: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  brandSub: {
    color: '#4a90d9',
    fontSize: '11px',
    letterSpacing: '2px',
  },
  divider: {
    borderBottom: '1px solid #1e3a6e',
    marginBottom: '24px',
  },
  title: {
    color: '#ffffff',
    fontSize: '26px',
    fontWeight: 'bold',
    margin: '0 0 6px 0',
  },
  subtitle: {
    color: '#7a9cc6',
    fontSize: '14px',
    marginBottom: '24px',
  },
  error: {
    backgroundColor: '#3a1a1a',
    color: '#ff6b6b',
    padding: '10px 14px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  label: {
    display: 'block',
    color: '#7a9cc6',
    fontSize: '11px',
    letterSpacing: '1.5px',
    marginBottom: '8px',
    marginTop: '16px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0a1628',
    border: '1px solid #1e3a6e',
    borderRadius: '10px',
    padding: '12px 14px',
  },
  icon: {
    marginRight: '10px',
    fontSize: '16px',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: '15px',
  },
  eyeIcon: {
    cursor: 'pointer',
    fontSize: '16px',
  },
  forgotRow: {
    textAlign: 'right',
    marginTop: '10px',
    marginBottom: '24px',
  },
  forgot: {
    color: '#4a90d9',
    fontSize: '13px',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1a6ef5',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
  demo: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#7a9cc6',
    fontSize: '13px',
  },
};

export default Login;