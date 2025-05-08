import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

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
      navigate('/login');
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

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden mx-auto my-12">
        <div className="bg-blue-600 py-6">
          <div className="flex justify-center">
            <FaUserPlus className="text-white text-5xl" />
          </div>
          <h1 className="text-3xl font-bold text-center text-white mt-2">Create Account</h1>
          <p className="text-center text-blue-200 mt-1">Join GlobeGuide today</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={onSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full py-3 px-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            
            <div className="mb-5">
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
            
            <div className="mb-5">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
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
                  placeholder="Create a strong password"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password2" className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  className="w-full py-3 px-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  id="password2"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Create Account
              </button>
            </div>
            
            <div className="text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;