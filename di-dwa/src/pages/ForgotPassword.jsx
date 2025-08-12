import React, { useState } from 'react';
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import logo from '../assets/Di-dwa.jpg';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate(); // Move this to the top level
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [apiError, setApiError] = useState('');
  const [resendCount, setResendCount] = useState(0);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setApiError(''); // Clear any API errors when user starts typing
    
    if (touched.email) {
      const error = validateEmail(value);
      setErrors(prev => ({ ...prev, email: error }));
    }
  };

  const handleInputBlur = () => {
    setTouched(prev => ({ ...prev, email: true }));
    const error = validateEmail(email);
    setErrors(prev => ({ ...prev, email: error }));
  };

  // Simulate sending reset email
  const sendResetEmail = async (emailAddress) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate different scenarios for testing
        const random = Math.random();
        if (emailAddress.includes('error')) {
          reject(new Error('Server error. Please try again later.'));
        } else if (emailAddress.includes('notfound')) {
          reject(new Error('No account found with this email address.'));
        } else if (random > 0.9) {
          reject(new Error('Network error. Please check your connection.'));
        } else {
          resolve({ success: true });
        }
      }, 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    setErrors({ email: emailError });
    setTouched({ email: true });
    setApiError('');

    if (emailError) {
      return;
    }

    setIsLoading(true);
    
    try {
      await sendResetEmail(email);
      setIsSubmitted(true);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    setApiError('');
    
    try {
      await sendResetEmail(email);
      setResendCount(prev => prev + 1);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryDifferentEmail = () => {
    setIsSubmitted(false);
    setEmail('');
    setErrors({});
    setTouched({});
    setApiError('');
    setResendCount(0);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-500 scale-100 opacity-100">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img src={logo} alt="Di Dwa Logo" className="w-16 h-16 mx-auto rounded-full object-cover shadow-md" />
            </div>

            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
              <p className="text-gray-600 leading-relaxed">
                We've sent a password reset link to
              </p>
              <p className="font-semibold text-green-600 mt-1 break-all">{email}</p>
              {resendCount > 0 && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ Email sent {resendCount > 1 ? `${resendCount} times` : 'again'}
                </p>
              )}
            </div>

            {/* Show API errors on success screen too */}
            {apiError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {apiError}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleResendEmail}
                disabled={isLoading}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Resend Email'
                )}
              </button>

              <button
                onClick={handleTryDifferentEmail}
                className="w-full text-gray-600 hover:text-gray-700 font-semibold py-3 transition-colors duration-200 flex items-center justify-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Try Different Email
              </button>

              <button
                onClick={handleBackToLogin}
                className="w-full text-green-600 hover:text-green-700 font-semibold py-3 transition-colors duration-200 flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 font-medium mb-2">📧 Email not arriving?</p>
              <ul className="text-xs text-blue-600 space-y-1 text-left">
                <li>• Check your spam/junk folder</li>
                <li>• Make sure the email address is correct</li>
                <li>• Wait a few minutes for delivery</li>
                <li>• Try resending if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 translate-y-0 opacity-100">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Di Dwa Logo" className="w-16 h-16 rounded-full object-cover shadow-md" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
            <p className="text-gray-600 mt-2">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          {/* API Error Display */}
          {apiError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg animate-in slide-in-from-top-2 duration-300">
              <p className="text-sm text-red-700 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                {apiError}
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`
                    block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                    transition-all duration-200 hover:border-gray-300 transform focus:scale-[1.01]
                    ${errors.email || apiError ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}
                  `}
                  placeholder="Enter your email address"
                />
                {(errors.email || apiError) && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center mt-1 animate-in slide-in-from-left-2 duration-200">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending Reset Link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleBackToLogin}
              className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors duration-200 flex items-center justify-center mx-auto hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              Remember your password? 
              <button 
                onClick={handleBackToLogin}
                className="text-green-600 hover:text-green-700 font-medium ml-1 transition-colors duration-200 hover:underline"
              >
                Sign in here
              </button>
            </p>
          </div>

          {/* Testing helper */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg border">
            <p className="text-xs text-gray-600 font-medium mb-1">💡 For Testing:</p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Normal email: Works successfully</li>
              <li>• email with "error": Simulates server error</li>
              <li>• email with "notfound": Simulates user not found</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;