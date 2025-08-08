import { useState } from 'react';
import { FaGoogle, FaFacebookF, FaInstagram, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, User, Mail, Phone, Lock } from "lucide-react";
import logo from "../assets/Di-dwa.jpg";

const SignUP = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    contact: '',
    email: '',
    password: '',
    confirmpassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidContact = (number) => /^[0-9]{10,15}$/.test(number);
  
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific errors
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Update password strength
    if (field === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'email':
        return !isValidEmail(value) ? 'Please enter a valid email address' : '';
      case 'contact':
        return !isValidContact(value) ? 'Contact must be 10-15 digits' : '';
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters' : '';
      case 'confirmpassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      default:
        return !value.trim() ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required` : '';
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate all fields
    const errors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setErrorMsg('');
    setIsLoading(false);
    alert("Account created successfully!");
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-50 to-green-50 px-4 py-8"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        {/* Logo */}
        <motion.img 
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          src={logo} 
          alt="Di Dwa Logo" 
          className="absolute top-3 right-3 w-10 sm:w-12" 
        />

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-lime-400 rounded-full opacity-60"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full opacity-40"></div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Join Di Dwa</h2>
          <p className="text-gray-600 text-sm">Create your account and start shopping</p>
        </motion.div>

        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              <span className="text-sm">{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          {/* Name Field */}
          <motion.div variants={inputVariants} whileFocus="focus" className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-lime-200 outline-none transition-all ${
                  fieldErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-lime-300'
                }`}
              />
              {formData.name && !fieldErrors.name && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
              )}
            </div>
            <AnimatePresence>
              {fieldErrors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {fieldErrors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Username Field */}
          <motion.div variants={inputVariants} whileFocus="focus" className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Choose a username"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-lime-200 outline-none transition-all ${
                  fieldErrors.username ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-lime-300'
                }`}
              />
              {formData.username && !fieldErrors.username && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
              )}
            </div>
            <AnimatePresence>
              {fieldErrors.username && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {fieldErrors.username}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Field */}
          <motion.div variants={inputVariants} whileFocus="focus" className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                placeholder="Enter your phone number"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-lime-200 outline-none transition-all ${
                  fieldErrors.contact ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-lime-300'
                }`}
              />
              {formData.contact && !fieldErrors.contact && isValidContact(formData.contact) && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
              )}
            </div>
            <AnimatePresence>
              {fieldErrors.contact && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {fieldErrors.contact}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email Field */}
          <motion.div variants={inputVariants} whileFocus="focus" className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-lime-200 outline-none transition-all ${
                  fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-lime-300'
                }`}
              />
              {formData.email && !fieldErrors.email && isValidEmail(formData.email) && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
              )}
            </div>
            <AnimatePresence>
              {fieldErrors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {fieldErrors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Password Field */}
          <motion.div variants={inputVariants} whileFocus="focus" className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Create a password"
                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-lime-200 outline-none transition-all ${
                  fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-lime-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">Password strength:</span>
                  <span className={`font-medium ${
                    passwordStrength <= 2 ? 'text-red-500' : 
                    passwordStrength <= 3 ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  />
                </div>
              </motion.div>
            )}
            
            <AnimatePresence>
              {fieldErrors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {fieldErrors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div variants={inputVariants} whileFocus="focus" className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmpassword}
                onChange={(e) => handleInputChange('confirmpassword', e.target.value)}
                placeholder="Confirm your password"
                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-lime-200 outline-none transition-all ${
                  fieldErrors.confirmpassword ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-lime-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
              </button>
              {formData.confirmpassword && formData.confirmpassword === formData.password && (
                <CheckCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
              )}
            </div>
            <AnimatePresence>
              {fieldErrors.confirmpassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {fieldErrors.confirmpassword}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleSignUp}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </div>

        {/* Social Login Section */}
        <div className="mt-6">
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500 text-sm">or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex justify-center gap-4">
            {[
              { icon: FaGoogle, color: "text-red-500", hoverColor: "hover:bg-red-50" },
              { icon: FaFacebookF, color: "text-blue-600", hoverColor: "hover:bg-blue-50" },
              { icon: FaInstagram, color: "text-pink-500", hoverColor: "hover:bg-pink-50" }
            ].map(({ icon: Icon, color, hoverColor }, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full border border-gray-200 ${hoverColor} transition-all duration-200`}
              >
                <Icon className={`${color} text-xl`} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/login"
              className="text-lime-600 hover:text-lime-700 font-semibold transition-colors"
            >
              Sign in
            </motion.a>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignUP;