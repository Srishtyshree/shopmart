import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthPage.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error || 'Failed to create account');
    }
  };

  return (
    <main className="auth-page page">
      <div className="auth-split">
        <div className="auth-image-side signup-image" style={{ backgroundImage: "url('/images/women_products_bg.png')" }}>
        </div>
        <div className="auth-form-side">
          <div className="auth-form-container">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join MAISON·WLD for exclusive access.</p>
            
            {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '1rem', border: '1px solid red' }}>{error}</div>}

            <form onSubmit={handleSignup} className="auth-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  required 
                />
              </div>
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
                <label>Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required 
                  minLength="6"
                />
              </div>
              
              <button type="submit" className="btn-primary auth-btn">Create Account</button>
            </form>

            <div className="auth-footer">
              <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
