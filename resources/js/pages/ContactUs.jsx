import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import logo from '../assets/Di-dwa.jpg';
import people from '../assets/people.webp';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneOrEmail: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [focusedField, setFocusedField] = useState('');

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Name is required';
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters';
        }
        if (value.trim().length > 50) {
          return 'Name must be less than 50 characters';
        }
        // Check for valid name characters
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
          return 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }
        return '';

      case 'phoneOrEmail':
        if (!value.trim()) {
          return 'Phone or email is required';
        }
        
        const trimmedValue = value.trim();
        
        // Check if it looks like a phone number (contains digits)
        if (/^\+?[\d\s()-]+$/.test(trimmedValue)) {
          // Phone validation
          const phoneRegex = /^\+?[\d\s()-]{8,15}$/;
          if (!phoneRegex.test(trimmedValue)) {
            return 'Please enter a valid phone number';
          }
        } else if (trimmedValue.includes('@')) {
          // Email validation
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(trimmedValue)) {
            return 'Please enter a valid email address';
          }
        } else {
          return 'Please enter a valid phone number or email address';
        }
        return '';

      case 'message':
        if (!value.trim()) {
          return 'Message is required';
        }
        if (value.trim().length < 10) {
          return 'Message must be at least 10 characters';
        }
        if (value.trim().length > 500) {
          return 'Message must be less than 500 characters';
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

    // Clear submit status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
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
    if (e) e.preventDefault();
    
    // Don't submit if already loading
    if (isLoading) return;
    
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
    setSubmitStatus(null);
    
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          const isSuccess = Math.random() > 0.2; // 80% success rate for demo
          
          if (isSuccess) {
            resolve('Message sent successfully');
          } else {
            reject(new Error('Failed to send message'));
          }
        }, 2000);
      });
      
      console.log('Message sent successfully:', formData);
      setSubmitStatus('success');
      
      // Clear form after successful submission
      setFormData({
        name: '',
        phoneOrEmail: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error sending message:', error.message);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I'd like to get in touch with Di-Dwa.");
    window.open(`https://wa.me/233556789345?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 py-16 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* People Image - Top Right */}
          <div className="absolute top-0 right-0 md:right-10">
            <img 
              src={people} 
              alt="Customer Service Team" 
              className="w-32 h-32 md:w-40 md:h-40 object-contain animate-bounce-slow"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-delay">
            We'd love to hear from you. Reach out anytime
          </p>
          
          {/* Subtitle with animation */}
          <div className="mt-6 text-sm text-gray-500 animate-fade-in-delay-2">
            <p>Questions?</p>
            <p>We warmly</p>
            <p>attend to</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-green-700 font-medium">Message sent successfully! We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-shake">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700 font-medium">Failed to send message. Please try again.</p>
                  </div>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  maxLength="50"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                    errors.name
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : focusedField === 'name'
                      ? 'border-green-500 focus:ring-2 focus:ring-green-200'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm animate-shake">{errors.name}</p>
                )}
              </div>

              {/* Phone or Email Field */}
              <div className="space-y-2">
                <label htmlFor="phoneOrEmail" className="block text-sm font-medium text-gray-700">
                  Phone or email
                </label>
                <input
                  type="text"
                  id="phoneOrEmail"
                  name="phoneOrEmail"
                  value={formData.phoneOrEmail}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('phoneOrEmail')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                    errors.phoneOrEmail
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : focusedField === 'phoneOrEmail'
                      ? 'border-green-500 focus:ring-2 focus:ring-green-200'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter your phone number or email"
                />
                {errors.phoneOrEmail && (
                  <p className="text-red-500 text-sm animate-shake">{errors.phoneOrEmail}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  rows="4"
                  maxLength="500"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all duration-200 resize-none ${
                    errors.message
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : focusedField === 'message'
                      ? 'border-green-500 focus:ring-2 focus:ring-green-200'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Tell us how we can help you..."
                ></textarea>
                <div className="flex justify-between items-center">
                  <div>
                    {errors.message && (
                      <p className="text-red-500 text-sm animate-shake">{errors.message}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formData.message.length}/500
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform flex items-center justify-center ${
                  isLoading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-105 hover:shadow-lg active:scale-95'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    sending message...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="h-5 w-5 mr-2" />
                    send message
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up-delay">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-green-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Location</h3>
                    <p className="text-gray-600 mt-1">Accra, Westland</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <div className="space-y-1 mt-1">
                      <p className="text-gray-600">+233556789345</p>
                      <p className="text-gray-600">+233553456789</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div 
                  onClick={handleWhatsAppClick}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-green-50 transition-colors duration-200 cursor-pointer group"
                >
                  <div className="flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-green-600 mt-1 group-hover:scale-110 transition-transform duration-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-green-700">WhatsApp</h3>
                    <p className="text-gray-600 mt-1 group-hover:text-green-600">Click to chat with us</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-green-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Business Hours</h3>
                    <div className="mt-1">
                      <p className="text-gray-600">Tuesday - Saturday</p>
                      <p className="text-gray-600">8:00am - 6:00pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Section */}
            <div className="flex justify-end">
              <div className="animate-float">
                <img 
                  src={logo} 
                  alt="Di-Dwa Logo" 
                  className="w-24 h-24 md:w-32 md:h-32 object-contain"
                />
              </div>
            </div>
          </div>
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
            transform: translateY(40px);
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.6s ease-out 0.3s both;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }

        .animate-float {
          animation: float 4s infinite ease-in-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ContactUsPage;