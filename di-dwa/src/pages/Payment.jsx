import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowLeft, Clock, MapPin, Phone, X, Edit3 } from 'lucide-react';

import carrot from '../assets/Carrot.jpg'
import fish from '../assets/fish.jpg'
import eggs from '../assets/Eggs.webp';
import logo from '../assets/Di-dwa.jpg';
import tele from '../assets/tele.png';
import tigo from '../assets/tigo.jpg';
import mtn from '../assets/mtn.jpg';
import ecobank from '../assets/Ecobank.png';
import zenith from '../assets/zenith.png';
import gh from '../assets/Ghana.png';

const PaymentPage = ({ onNavigateToTrack = () => {} }) => {
  const [selectedPayment, setSelectedPayment] = useState('mobile');
  const [isDeliveryOn, setIsDeliveryOn] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [confirmNumber, setConfirmNumber] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Address and delivery states
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(true);
  const [deliveryInfo, setDeliveryInfo] = useState({ day: '', time: '' });
  
  // Bank form states
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  
  // Validation states
  const [errors, setErrors] = useState({});

  // Calculate delivery time based on current date
  useEffect(() => {
    const calculateDelivery = () => {
      const now = new Date();
      const currentHour = now.getHours();
      let deliveryDate = new Date();
      
      // If it's after 6 PM, delivery is next day
      if (currentHour >= 18) {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
      }
      
      // Skip Sundays for delivery
      if (deliveryDate.getDay() === 0) {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
      }
      
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const deliveryDay = days[deliveryDate.getDay()];
      
      // Delivery time between 9 AM - 5 PM
      const deliveryTime = deliveryDate.getDate() === now.getDate() && currentHour < 18 
        ? `${currentHour + 2}:00 - ${currentHour + 4}:00`
        : '10:00 AM - 2:00 PM';
      
      setDeliveryInfo({ day: deliveryDay, time: deliveryTime });
    };
    
    calculateDelivery();
  }, []);

  const handleTrackOrder = () => {
    onNavigateToTrack();
  };

  const handleClosePage = () => {
    setShowPaymentPage(false);
  };

  if (!showPaymentPage) {
    return null;
  }

  const orderItems = [
    {
      name: 'Carrots',
      quantity: '1kg',
      price: 15.00,
      image: carrot 
    },
    {
      name: 'Fresh Fish',
      quantity: '5kg',
      price: 105.00,
      image: fish
    },
    {
      name: 'Eggs',
      quantity: 'Crate',
      price: 90.00,
      image: eggs 
    }
  ];

  const total = orderItems.reduce((sum, item) => sum + item.price, 0);

  const paymentMethods = [
    { id: 'mobile', label: 'Mobile Money', icon: '📱' },
    { id: 'bank', label: 'Bank payment', icon: '🏦' },
    { id: 'delivery', label: 'Pay on delivery', icon: '🚚' }
  ];

  const mobileNetworks = [
    { id: 'mtn', name: 'MTN', color: 'bg-yellow-500' },
    { id: 'vodafone', name: 'Vodafone', color: 'bg-red-500' },
    { id: 'airteltigo', name: 'AirtelTigo', color: 'bg-blue-500' }
  ];

  const banks = [
    { id: 'zenith', name: 'Zenith Bank', color: 'bg-orange-500' },
    { id: 'ecobank', name: 'Ecobank', color: 'bg-blue-500' },
  ];

  // Validation functions
  const validateMobileNumber = (number) => {
    const ghanaNumberRegex = /^0[0-9]{9}$/;
    return ghanaNumberRegex.test(number);
  };

  const validateCardNumber = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    return /^\d{16}$/.test(cleanNumber);
  };

  const validateExpiryDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(date)) return false;
    
    const [month, year] = date.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    return parseInt(year) > currentYear || 
           (parseInt(year) === currentYear && parseInt(month) >= currentMonth);
  };

  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!deliveryAddress.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    if (selectedPayment === 'mobile') {
      if (!selectedNetwork) {
        newErrors.network = 'Please select a mobile network';
      }
      if (!mobileNumber || !validateMobileNumber(mobileNumber)) {
        newErrors.mobileNumber = 'Please enter a valid 10-digit Ghana mobile number';
      }
      if (!confirmNumber || confirmNumber !== mobileNumber) {
        newErrors.confirmNumber = 'Phone numbers do not match';
      }
    }

    if (selectedPayment === 'bank') {
      if (!selectedBank) {
        newErrors.bank = 'Please select a bank';
      }
      if (!cardNumber || !validateCardNumber(cardNumber)) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!expiryDate || !validateExpiryDate(expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }
      if (!cvv || !validateCVV(cvv)) {
        newErrors.cvv = 'Please enter a valid 3-4 digit CVV';
      }
      if (!cardholderName.trim()) {
        newErrors.cardholderName = 'Cardholder name is required';
      }
    }

    if (selectedPayment === 'delivery' && !isDeliveryOn) {
      newErrors.delivery = 'Please turn on pay on delivery to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderConfirmed(true);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 2000);
  };

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.slice(0, 10);
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    const limited = digits.slice(0, 16);
    return limited.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2, 4);
    }
    return digits;
  };

  const getSuccessMessage = () => {
    if (selectedPayment === 'delivery') {
      return {
        title: 'Order Confirmed!',
        subtitle: 'Payment will be collected upon delivery'
      };
    }
    return {
      title: 'Payment Successful!',
      subtitle: 'Your order has been confirmed'
    };
  };

  const getButtonText = () => {
    if (isProcessing) {
      return selectedPayment === 'delivery' ? 'Confirming Order...' : 'Processing Payment...';
    }
    if (orderConfirmed) {
      return selectedPayment === 'delivery' ? 'Order Confirmed' : 'Payment Confirmed';
    }
    return selectedPayment === 'delivery' ? 'Confirm Order' : 'Confirm Payment';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 text-center animate-bounce-in">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{getSuccessMessage().title}</h2>
            <p className="text-gray-600">{getSuccessMessage().subtitle}</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Payment Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleClosePage}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold">Payment Method</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <img src={logo} alt="Di-Dwa" className="w-8 h-8" />                
              </div>
              <button 
                onClick={handleClosePage}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3 mb-6">
            {paymentMethods.map((method) => (
              <div key={method.id} className="relative">
                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-green-300 transition-all duration-200 hover:shadow-md">
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-5 h-5 text-green-500"
                  />
                  <span className="text-2xl">{method.icon}</span>
                  <span className="font-medium text-gray-700">{method.label}</span>
                  
                  {method.id === 'mobile' && selectedPayment === 'mobile' && (
                    <div className="flex gap-2 ml-auto">
                      <img src={mtn} alt="MTN" className="w-8 h-6" />
                      <img src={tele} alt="Vodafone" className="w-8 h-6" />
                      <img src={tigo} alt="AirtelTigo" className="w-8 h-6" />
                    </div>
                  )}
                  
                  {method.id === 'bank' && selectedPayment === 'bank' && (
                    <div className="flex gap-2 ml-auto">
                      <img src={zenith} alt="Zenith" className="w-8 h-6" />
                      <img src={ecobank} alt="Ecobank" className="w-8 h-6" />                                        
                    </div>
                  )}
                  
                  {method.id === 'delivery' && selectedPayment === 'delivery' && (
                    <div className="flex gap-3 ml-auto">
                      <button
                        type="button"
                        onClick={() => setIsDeliveryOn(true)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          isDeliveryOn ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        Turn on
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsDeliveryOn(false)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          !isDeliveryOn ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        Turn off
                      </button>
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>

          {/* Mobile Money Details */}
          {selectedPayment === 'mobile' && (
            <div className="animate-slide-in">
              <h3 className="font-semibold mb-4">Mobile Money Details</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Select Network</label>
                <select
                  value={selectedNetwork}
                  onChange={(e) => {
                    setSelectedNetwork(e.target.value);
                    setErrors(prev => ({ ...prev, network: '' }));
                  }}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${
                    errors.network ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Choose your mobile network</option>
                  {mobileNetworks.map((network) => (
                    <option key={network.id} value={network.id}>
                      {network.name}
                    </option>
                  ))}
                </select>
                {errors.network && <p className="text-red-500 text-sm mt-1">{errors.network}</p>}
              </div>

              {selectedNetwork && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${mobileNetworks.find(n => n.id === selectedNetwork)?.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">
                        {selectedNetwork === 'mtn' ? 'M' : selectedNetwork === 'vodafone' ? 'V' : 'A'}
                      </span>
                    </div>
                    <span className="font-medium">
                      {mobileNetworks.find(n => n.id === selectedNetwork)?.name} Selected
                    </span>
                  </div>
                </div>
              )}

              {selectedNetwork && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Mobile number</label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                        <img src={gh} alt="Ghana" className="w-6 h-4 mr-2" />
                        <span className="text-sm">+233</span>
                      </div>
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => {
                          setMobileNumber(formatPhoneNumber(e.target.value));
                          setErrors(prev => ({ ...prev, mobileNumber: '' }));
                        }}
                        className={`flex-1 p-3 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors.mobileNumber ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="0599890066"
                      />
                    </div>
                    {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Confirm number</label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                        <img src={gh} alt="Ghana" className="w-6 h-4 mr-2" />
                        <span className="text-sm">+233</span>
                      </div>
                      <input
                        type="tel"
                        value={confirmNumber}
                        onChange={(e) => {
                          setConfirmNumber(formatPhoneNumber(e.target.value));
                          setErrors(prev => ({ ...prev, confirmNumber: '' }));
                        }}
                        className={`flex-1 p-3 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors.confirmNumber ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="0599890066"
                      />
                    </div>
                    {errors.confirmNumber && <p className="text-red-500 text-sm mt-1">{errors.confirmNumber}</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bank Transfer Details */}
          {selectedPayment === 'bank' && (
            <div className="animate-slide-in space-y-4">
              <h3 className="font-semibold mb-4">Bank Payment Details</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Select Bank</label>
                <select
                  value={selectedBank}
                  onChange={(e) => {
                    setSelectedBank(e.target.value);
                    setErrors(prev => ({ ...prev, bank: '' }));
                  }}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${
                    errors.bank ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Choose your bank</option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
                </select>
                {errors.bank && <p className="text-red-500 text-sm mt-1">{errors.bank}</p>}
              </div>

              {selectedBank && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${banks.find(b => b.id === selectedBank)?.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">
                        {banks.find(b => b.id === selectedBank)?.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium">
                      {banks.find(b => b.id === selectedBank)?.name} Selected
                    </span>
                  </div>
                </div>
              )}

              {selectedBank && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => {
                        setCardNumber(formatCardNumber(e.target.value));
                        setErrors(prev => ({ ...prev, cardNumber: '' }));
                      }}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => {
                          setExpiryDate(formatExpiryDate(e.target.value));
                          setErrors(prev => ({ ...prev, expiryDate: '' }));
                        }}
                        placeholder="MM/YY"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">CVV</label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => {
                          setCvv(e.target.value.replace(/\D/g, '').slice(0, 4));
                          setErrors(prev => ({ ...prev, cvv: '' }));
                        }}
                        placeholder="123"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors.cvv ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardholderName}
                      onChange={(e) => {
                        setCardholderName(e.target.value);
                        setErrors(prev => ({ ...prev, cardholderName: '' }));
                      }}
                      placeholder="John Doe"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        errors.cardholderName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pay on Delivery Info */}
          {selectedPayment === 'delivery' && (
            <div className="animate-slide-in">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-800 mb-2">Pay When Delivered</h3>
                <p className="text-blue-700 text-sm">
                  You can pay cash to our delivery agent when your order arrives. 
                  Please have the exact amount ready: <span className="font-semibold">Gh₵{total.toFixed(2)}</span>
                </p>
              </div>
              {errors.delivery && <p className="text-red-500 text-sm mt-1">{errors.delivery}</p>}
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
              isProcessing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : orderConfirmed 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-500 hover:bg-red-600 hover:shadow-lg transform hover:-translate-y-1'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {getButtonText()}
              </div>
            ) : orderConfirmed ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                {getButtonText()}
              </div>
            ) : (
              getButtonText()
            )}
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center mb-2">
              <img src={logo} alt="Di-Dwa" className="w-10 h-10" />
            </div>
          </div>

          <h2 className="font-bold text-lg mb-6">Order Summary</h2>

          {/* Order Items */}
          <div className="space-y-4 mb-6">
            {orderItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Gh₵{item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Address */}
          <div className="border-t pt-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Delivery Address</span>
              </div>
              {!isEditingAddress && (
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  Edit
                </button>
              )}
            </div>
            
            {isEditingAddress ? (
              <div>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => {
                    setDeliveryAddress(e.target.value);
                    setErrors(prev => ({ ...prev, address: '' }));
                  }}
                  placeholder="Enter your delivery address (e.g., Accra, Legon Campus, Akuafo Hall, Room 123)"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-20 text-sm ${
                    errors.address ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      if (deliveryAddress.trim()) {
                        setIsEditingAddress(false);
                      }
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                    disabled={!deliveryAddress.trim()}
                  >
                    Save Address
                  </button>
                  <button
                    onClick={() => {
                      setDeliveryAddress('');
                      setIsEditingAddress(false);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 ml-6 text-sm bg-gray-50 p-3 rounded-lg">
                {deliveryAddress || 'No address specified'}
              </p>
            )}
            
            {/* Delivery Time Info */}
            <div className="flex items-center gap-2 mt-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <div className="text-sm">
                <span className="text-gray-600">Estimated delivery: </span>
                <span className="font-medium text-green-600">
                  {deliveryInfo.day}, {deliveryInfo.time}
                </span>
              </div>
            </div>
            
            {/* Delivery Note */}
            <div className="mt-2 text-xs text-gray-500 ml-6 bg-yellow-50 p-2 rounded border-l-2 border-yellow-300">
              <strong>Note:</strong> Orders placed after 6:00 PM will be delivered the next business day. 
              No deliveries on Sundays.
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span>Gh₵{total.toFixed(2)}</span>
            </div>
            {selectedPayment === 'delivery' && (
              <p className="text-sm text-amber-600 mt-1">
                💰 Pay Gh₵{total.toFixed(2)} in cash upon delivery
              </p>
            )}
          </div>

          {/* Track Order Button */}
          <button 
            onClick={handleTrackOrder}
            disabled={!orderConfirmed}
            className={`w-full py-3 rounded-xl font-semibold border-2 transition-colors ${
              orderConfirmed
                ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
                : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
            }`}
          >
            {orderConfirmed ? '📍 Track Your Order' : 'Complete Payment to Track'}
          </button>

          {/* Contact Info */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-3 h-3" />
              <span>Need help? Call: +233 50 123 4567</span>
            </div>
          </div>

          {/* Bottom Logo */}
          <div className="text-center mt-6">
            <div className="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center">
              <img src={logo} alt="Di-Dwa" className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slide-in {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;