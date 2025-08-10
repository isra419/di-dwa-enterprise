import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar, Package, Truck, CheckCircle, Phone, MessageCircle, ArrowLeft } from 'lucide-react';
import logo from '../assets/Di-dwa.jpg';
import carrot from '../assets/Carrot.jpg';
import fish from '../assets/fish.jpg';
import eggs from '../assets/Eggs.webp';


const TrackOrderPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [animateProgress, setAnimateProgress] = useState(false);
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      name: 'Carrots',
      quantity: '1kg',
      price: 15.00,
      image: './assets/carrots.jpg'
    },
    {
      id: 2,
      name: 'Fresh Fish',
      quantity: '5kg',
      price: 105.00,
      image: './assets/fresh-fish.jpg'
    },
    {
      id: 3,
      name: 'Eggs',
      quantity: 'Crate',
      price: 90.00,
      image: './assets/eggs.jpg'
    }
  ]);

  const [deliveryInfo, setDeliveryInfo] = useState({
    address: 'Accra,Legon campus',
    time: '11:30am',
    date: '21th July,2025'
  });

  // Calculate total
  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price, 0);
  };

  // Auto-progress simulation
  useEffect(() => {
    setAnimateProgress(true);
    const timer = setTimeout(() => {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const trackingSteps = [
    { 
      id: 1, 
      label: 'Order Placed', 
      icon: <Package className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    { 
      id: 2, 
      label: 'Sending order', 
      icon: <Truck className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    { 
      id: 3, 
      label: 'Delivered', 
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const trackingIllustrations = [
    {
      step: 1,
      title: 'Order Processing',
      icon: '📱',
      description: 'Your order is being prepared'
    },
    {
      step: 2,
      title: 'Out for Delivery',
      icon: '🏍️',
      description: 'Your order is on the way'
    },
    {
      step: 3,
      title: 'Order Delivered',
      icon: '👥',
      description: 'Your order has been delivered'
    },
    {
      step: 4,
      title: 'Customer Happy',
      icon: '🎉',
      description: 'Enjoy your fresh groceries!'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Tracking Order</h1>
          </div>
          <img 
            src={logo} 
            alt="Di-Dwa Logo" 
            className="w-12 h-12 object-contain animate-pulse"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Order Items Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in">
          <div className="space-y-4">
            {orderItems.map((item, index) => (
              <div 
                key={item.id}
                className={`flex items-center space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-102 animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center animate-pulse overflow-hidden">
                  <img 
                    src={item.name === 'Carrots' ? carrot : 
                       item.name === 'Fresh Fish' ? fish : 
                        eggs} 
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">Gh{item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
            
            {/* Total Section */}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">Total:</span>
                <div className="bg-green-100 px-4 py-2 rounded-lg">
                  <span className="text-xl font-bold text-green-700">
                    Gh{calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in-delay">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-300">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Delivery address</p>
                <p className="font-semibold text-gray-800">{deliveryInfo.address}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors duration-300">
              <Clock className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Delivery time</p>
                <p className="font-semibold text-gray-800">{deliveryInfo.time}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-300">
              <Calendar className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Delivery date</p>
                <p className="font-semibold text-gray-800">{deliveryInfo.date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Tracking Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-slide-up-delay">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Order Tracking</h2>
          
          {/* Progress Bar */}
          <div className="relative mb-12">
            <div className="flex justify-between items-center">
              {trackingSteps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      currentStep >= step.id 
                        ? `${step.bgColor} ${step.color} scale-110 animate-bounce` 
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className={`text-sm font-medium mt-2 transition-colors duration-300 ${
                    currentStep >= step.id ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10">
              <div 
                className={`h-full bg-gradient-to-r from-green-400 to-purple-400 transition-all duration-1000 ease-out ${
                  animateProgress ? 'animate-pulse' : ''
                }`}
                style={{ width: `${((currentStep - 1) / (trackingSteps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Track Your Order Illustration */}
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in-delay-2">
          <h3 className="text-xl font-bold text-center text-gray-800 mb-8">TRACK YOUR ORDER</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trackingIllustrations.map((item, index) => (
              <div 
                key={item.step}
                className={`text-center p-4 rounded-xl transition-all duration-500 transform hover:scale-105 ${
                  currentStep >= item.step ? 'bg-green-50 animate-bounce-slow' : 'bg-gray-50'
                } ${currentStep === item.step ? 'ring-2 ring-green-400' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-3 animate-float">{item.icon}</div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-600">{item.description}</p>
                
                {currentStep === item.step && (
                  <div className="mt-2 animate-pulse">
                    <div className="w-2 h-2 bg-green-500 rounded-full mx-auto"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Connecting Lines */}
          <div className="hidden md:block relative mt-4">
            <div className="absolute top-0 left-1/8 right-1/8 h-0.5 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Call Delivery</span>
          </button>
          
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Chat Support</span>
          </button>
        </div>

        {/* Order Status Message */}
        <div className="mt-8 text-center">
          <div className={`inline-block px-6 py-3 rounded-full ${
            currentStep === 1 ? 'bg-yellow-100 text-yellow-800' :
            currentStep === 2 ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }`}>
            {currentStep === 1 && '🔄 Your order is being prepared...'}
            {currentStep === 2 && '🚚 Your order is on the way...'}
            {currentStep === 3 && '✅ Your order has been delivered!'}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.6s ease-out 0.4s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out both;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 0.6s ease-out 0.3s both;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default TrackOrderPage;