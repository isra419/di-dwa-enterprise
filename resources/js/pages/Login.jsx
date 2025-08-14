import { useState } from "react";
import { FaGoogle, FaFacebookF, FaInstagram, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import logo from "../assets/Di-dwa.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific errors
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear general error message when user starts typing
    if (errorMsg) {
      setErrorMsg("");
    }
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'username':
        return !value.trim() ? 'Username or contact is required' : '';
      case 'password':
        return !value.trim() ? 'Password is required' : '';
      default:
        return '';
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate fields
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (formData.username === "admin" && formData.password === "admin123") {
      setErrorMsg("");
      setFieldErrors({});
      alert("Login successful! Welcome back!");
    } else {
      setErrorMsg("Invalid username or password. Please try again.");
    }
    
    setIsLoading(false);
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  const socialButtons = [
    { icon: FaGoogle, color: "text-red-500", hoverColor: "hover:bg-red-50", name: "Google" },
    { icon: FaFacebookF, color: "text-blue-600", hoverColor: "hover:bg-blue-50", name: "Facebook" },
    { icon: FaInstagram, color: "text-pink-500", hoverColor: "hover:bg-pink-50", name: "Instagram" }
  ];

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
          className="absolute top-3 right-3 w-10 sm:w-12 rounded-lg"
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-sm">Sign in to your Di Dwa account</p>
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
          {/* Username Field */}
          <motion.div variants={inputVariants} whileFocus="focus" className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Username or Contact
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Enter your username or contact"
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
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.username}
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
                placeholder="Enter your password"
                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-lime-200 outline-none transition-all ${
                  fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-lime-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
              </button>
            </div>
            <AnimatePresence>
              {fieldErrors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <motion.label 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 rounded focus:ring-lime-500 focus:ring-2"
              />
              <span className="text-gray-600">Remember me</span>
            </motion.label>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#"
              className="text-lime-600 hover:text-lime-700 font-medium transition-colors"
            >
              Forgot Password?
            </motion.a>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleLogin}
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
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </div>

        {/* Create Account Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-600 text-sm mb-3">Don't have an account?</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white border-2 border-lime-500 text-lime-600 hover:bg-lime-50 font-semibold py-3 rounded-xl transition-all duration-200"
          >
            Create New Account
          </motion.button>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="text-center">
          <div className="flex justify-center gap-4">
            {socialButtons.map(({ icon: Icon, color, hoverColor, name }, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full border border-gray-200 ${hoverColor} transition-all duration-200 shadow-sm hover:shadow-md`}
                title={`Continue with ${name}`}
              >
                <Icon className={`${color} text-xl`} />
              </motion.button>
            ))}
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-gray-500 mt-3"
          >
            Quick and secure login with your social accounts
          </motion.p>
        </div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <p className="text-xs text-blue-700 text-center mb-1 font-medium">Demo Credentials:</p>
          <p className="text-xs text-blue-600 text-center">Username: <span className="font-mono">admin</span></p>
          <p className="text-xs text-blue-600 text-center">Password: <span className="font-mono">admin123</span></p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;