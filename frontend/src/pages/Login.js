import { useState, useEffect } from 'react';
import { FaSignInAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden mx-auto my-12">
        <div className="bg-blue-600 py-6">
          <div className="flex justify-center">
            <FaSignInAlt className="text-white text-5xl" />
          </div>
          <h1 className="text-3xl font-bold text-center text-white mt-2">Welcome Back</h1>
          <p className="text-center text-blue-200 mt-1">Sign in to access your account</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  className="w-full py-3 px-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  className="w-full py-3 px-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
            
            <div className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Create one
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;