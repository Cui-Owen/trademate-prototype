import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useUser } from '../context/UserContext';

const Welcome = ({ onAuthenticate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set user data
      setUser({
        email: formData.email,
        name: formData.email.split('@')[0],
        isFirstTime: true
      });
      
      // Authenticate user
      onAuthenticate(true);
      
      // Navigate to cockpit
      navigate('/cockpit');
      
    } catch (error) {
      console.error('Authentication failed:', error);
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-blue-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-positive opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-accent-positive opacity-20 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Welcome Message */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-8">
            <Logo size="extra-large" showText={false} className="drop-shadow-lg" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
            Welcome to TradeMate
            <br />
            <span className="text-accent-positive">
              Let's make your first practice trade
            </span>
          </h1>
          
          <p className="text-blue-100 text-lg leading-relaxed">
            Join thousands of traders who started their journey with confidence using our guided learning platform.
          </p>
        </div>

        {/* Sign-up Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {errors.general}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`
                  w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-positive focus:border-transparent transition-all duration-200
                  ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                `}
                placeholder="Enter your email address"
                autoComplete="email"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`
                  w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-positive focus:border-transparent transition-all duration-200
                  ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                `}
                placeholder="Create a secure password"
                autoComplete="new-password"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 text-lg
                ${isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-accent-positive hover:bg-opacity-90 hover:shadow-lg transform hover:-translate-y-0.5'
                }
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Getting Started...</span>
                </div>
              ) : (
                'Start Trading Journey'
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <div className="w-5 h-5 bg-accent-positive rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Risk-free practice trading environment</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <div className="w-5 h-5 bg-accent-positive rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Step-by-step guided learning systems </span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <div className="w-5 h-5 bg-accent-positive rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>No commitment required to get started</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-blue-100 text-sm">
          <p>
            By signing up, you agree to our{' '}
            <a href="#" className="text-accent-positive hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-accent-positive hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
