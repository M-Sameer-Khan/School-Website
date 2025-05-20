import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state, or default to admin dashboard
  const from = location.state?.from?.pathname || '/admin';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Call login from auth context
      await login(username, password);
      
      // Redirect to the intended page
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-600">Enter your credentials to access the admin dashboard</p>
        </div>
        
        <Card shadow="lg">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <Input
              label="Username"
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="mt-6">
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" color="white" showLabel={false} className="mr-2" />
                    Logging in...
                  </>
                ) : 'Login'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
