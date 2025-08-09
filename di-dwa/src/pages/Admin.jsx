import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail } from 'lucide-react';
import admin from '../assets/admin.png'; 


const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const validateField = (name, value) => {
    switch (name) {
      case 'emailOrUsername':
        if (!value.trim()) {
          return 'Email or username is required';
        }
        
        // Remove leading/trailing spaces
        const trimmedValue = value.trim();
        
        // Check if it contains @ symbol (likely email)
        if (trimmedValue.includes('@')) {
          // Email validation
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(trimmedValue)) {
            return 'Please enter a valid email address';
          }
          
          // Check email length
          if (trimmedValue.length > 254) {
            return 'Email address is too long';
          }
        } else {
          // Username validation
          if (trimmedValue.length < 3) {
            return 'Username must be at least 3 characters';
          }
          if (trimmedValue.length > 30) {
            return 'Username must be less than 30 characters';
          }
          
          // Username should only contain letters, numbers, underscores, and hyphens
          const usernameRegex = /^[a-zA-Z0-9_-]+$/;
          if (!usernameRegex.test(trimmedValue)) {
            return 'Username can only contain letters, numbers, underscores, and hyphens';
          }
          
          // Username should not start with numbers or special characters
          if (!/^[a-zA-Z]/.test(trimmedValue)) {
            return 'Username must start with a letter';
          }
        }
        return '';
        
      case 'password':
        if (!value) {
          return 'Password is required';
        }
        
        if (value.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        
        if (value.length > 128) {
          return 'Password is too long (maximum 128 characters)';
        }
        
        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(value)) {
          return 'Password must contain at least one uppercase letter';
        }
        
        // Check for at least one lowercase letter
        if (!/[a-z]/.test(value)) {
          return 'Password must contain at least one lowercase letter';
        }
        
        // Check for at least one number
        if (!/\d/.test(value)) {
          return 'Password must contain at least one number';
        }
        
        // Check for at least one special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          return 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)';
        }
        
        // Check for common weak passwords
        const commonPasswords = ['password', '12345678', 'password123', 'admin123', 'qwerty123'];
        if (commonPasswords.includes(value.toLowerCase())) {
          return 'This password is too common. Please choose a stronger password';
        }
        
        // Check for repeated characters (more than 3 in a row)
        if (/(.)\1{3,}/.test(value)) {
          return 'Password cannot contain more than 3 repeated characters in a row';
        }
        
        return '';
        
      default:
        return '';
    }
  };

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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
    setFocusedField('');
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
      // Focus on the first field with error
      const firstErrorField = Object.keys(newErrors)[0];
      const fieldElement = document.getElementById(firstErrorField);
      if (fieldElement) {
        fieldElement.focus();
      }
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate login process with error handling
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          const isSuccess = Math.random() > 0.3; // 70% success rate for demo
          
          if (isSuccess) {
            resolve('Login successful');
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 2000);
      });
      
      console.log('Login successful:', formData);
      // Handle successful login here
      // e.g., redirect to dashboard, store token, etc.
      
    } catch (error) {
      // Handle login errors
      setErrors({
        general: 'Invalid email/username or password. Please try again.'
      });
      console.error('Login error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Handle forgot password logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 to-green-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-blue-800 tracking-wider">
            DIRECT ADMIN
          </h1>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 pt-16 transform transition-all duration-300 hover:shadow-3xl animate-slide-up relative">
          {/* Logo inside the form - positioned at the top */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce-slow border-4 border-gray-100">
              { <img 
                src={admin} 
                alt="Di-Dwa Admin" 
                className="w-16 h-16 object-contain rounded-full" 
              />}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error Message */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 animate-shake">
                <p className="text-red-600 text-sm text-center font-medium">{errors.general}</p>
              </div>
            )}

            {/* Email/Username Field */}
            <div className="space-y-2">
              <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors duration-200 ${
                    focusedField === 'emailOrUsername' ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('emailOrUsername')}
                  onBlur={handleBlur}
                  placeholder="Enter your email or username"
                  maxLength="254"
                  autoComplete="username"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                    errors.emailOrUsername 
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                      : focusedField === 'emailOrUsername'
                      ? 'border-blue-500 focus:ring-2 focus:ring-blue-200'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              {errors.emailOrUsername && (
                <p className="text-red-500 text-sm animate-shake">{errors.emailOrUsername}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors duration-200 ${
                    focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  maxLength="128"
                  autoComplete="current-password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                    errors.password 
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                      : focusedField === 'password'
                      ? 'border-blue-500 focus:ring-2 focus:ring-blue-200'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm animate-shake">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-left">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-600 hover:text-blue-800 text-sm underline transition-colors duration-200 hover:no-underline"
              >
                forgetpassword?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform ${
                isLoading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-105 hover:shadow-lg active:scale-95'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default AdminLoginPage;