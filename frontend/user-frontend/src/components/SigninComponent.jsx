/*import React, { useState } from 'react';
import { Lock, Mail, UserCheck, Facebook } from 'lucide-react';
import '../styles/SignupComponent.css';

const SigninComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      // Replace this with your real login API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Login successful!");
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign In</h2>
        <form onSubmit={handleLogin}>
          
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="input-icon" size={18} />
          </div>

          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="input-icon" size={18} />
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          
          <div className="remember-me">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          
          <button
            type="submit"
            className={`signup-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : (<><UserCheck size={18} /> Sign In</>)}
          </button>
        </form>

        
        <div className="social-login">
          <button
            className="social-button facebook"
            onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/facebook'}
          >
            <Facebook size={18} />
            Login with Facebook
          </button>

          <button
            className="social-button google"
            onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
          >
            <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninComponent;
*/

import React, { useState } from 'react';
import { Lock, Mail, UserCheck, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupComponent.css';

const SigninComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      // Simulate login (replace with real API call)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Login successful!");
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="input-icon" size={18} />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="input-icon" size={18} />
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="remember-me">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button
            type="submit"
            className={`signup-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : (<><UserCheck size={18} /> Sign In</>)}
          </button>
        </form>

        <div className="social-login">
          <button
            className="social-button facebook"
            onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/facebook'}
          >
            <Facebook size={18} />
            Login with Facebook
          </button>

          <button
            className="social-button google"
            onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
          >
            <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </button>
        </div>

        {/* ✅ Sign Up link */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ color: '#ccc', fontSize: '14px' }}>
            Don't have an account?
          </span>
          <br />
          <button
            type="button"
            onClick={() => navigate('/signup')}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              fontSize: '14px',
              border: '1px solid #3a7bd5',
              background: 'transparent',
              color: '#3a7bd5',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninComponent;
