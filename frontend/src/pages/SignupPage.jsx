import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthPage.css';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Placeholder signup logic
    window.location.href = '/profile';
  };

  return (
    <main className="auth-page page">
      <div className="auth-split">
        <div className="auth-image-side" style={{ backgroundImage: "url('/images/women_chapter_bg.png')" }}>
        </div>
        <div className="auth-form-side">
          <div className="auth-form-container">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join the Maison WLD Atelier for exclusive access and personalized curation.</p>
            
            <form onSubmit={handleSignup} className="auth-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required 
                  />
                </div>
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
                />
              </div>
              
              <button type="submit" className="btn-primary auth-btn">Create Account</button>
            </form>

            <div className="auth-footer">
              <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
