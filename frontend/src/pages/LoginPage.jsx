import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error || 'Failed to login');
    }
  };

  return (
    <main className="auth-page page">
      <div className="auth-split">
        <div className="auth-image-side" style={{ backgroundImage: "url('/images/hero_bg.png')" }}>
        </div>
        <div className="auth-form-side">
          <div className="auth-form-container">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Enter your credentials to access your Atelier.</p>
            
            {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '1rem', border: '1px solid red' }}>{error}</div>}

            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required 
                />
              </div>
              <div className="form-group">
                <div className="password-header">
                  <label>Password</label>
                  <Link to="#" className="forgot-password">Forgot password?</Link>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required 
                />
              </div>
              
              <button type="submit" className="btn-primary auth-btn">Sign In</button>
            </form>

            <div className="auth-footer">
              <p>Don't have an account? <Link to="/signup" className="auth-link">Create one</Link></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
