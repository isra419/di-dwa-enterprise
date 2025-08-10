import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Phone, Mail, ShoppingCart, Users, Award, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import logo from '../assets/Di-dwa.jpg';
import map from '../assets/map.png';
import members from '../assets/members.jpg';
import nana from '../assets/Nana.jpg';
import team from '../assets/dwa.jpg';
import father from '../assets/father.jpeg';
import joy from '../assets/joy.jpg';
import market from '../assets/market.webp';
const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeFeature, setActiveFeature] = useState(0);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id^="section-"]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Same Day / Next Day Delivery",
      description: "Order today, cook today",
      color: "text-blue-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Fresh Local Produce",
      description: "Straight from the market",
      color: "text-green-600"
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Simple Ordering",
      description: "Pay via MoMo or less with ease",
      color: "text-purple-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Friendly Support",
      description: "Always ready on WhatsApp",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        id="section-hero"
        className={`bg-gradient-to-br from-green-50 to-green-100 py-16 px-4 transition-all duration-1000 ${
          isVisible['section-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={logo}
                  alt="Di Dwa Logo" 
                  className="w-20 h-20 object-contain animate-bounce"
                />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 animate-fade-in">
                    About Di Dwa
                  </h1>
                  <p className="text-lg text-gray-600 animate-fade-in-delay">
                    Eat your favourite Fresh, Real, and Local
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm animate-slide-up">
                <p className="text-sm text-gray-600">
                  Since 2020 | Trusted by Busy Households | Pickup & Delivery Available Tue - Sat
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={market}
                  alt="Fresh Vegetables" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full animate-pulse">
                  <Star className="w-5 h-5 inline mr-1" />
                  Fresh Daily
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div 
        id="section-who-we-are"
        className={`py-16 px-4 transition-all duration-1000 delay-200 ${
          isVisible['section-who-we-are'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Who We Are</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <p className="text-gray-600 leading-relaxed text-center max-w-4xl mx-auto">
              Di Dwa is a local grocery and fresh food delivery service dedicated to bringing your favourite ingredients right to your doorstep.
              Whether you're preparing jollof, kontomire, or just a good old bowl of rice, we deliver the freshness you trust.

            </p>
          </div>
        </div>
      </div>

      {/* Mission and Vision */}
      <div 
        id="section-mission-vision"
        className={`py-16 px-4 bg-white transition-all duration-1000 delay-300 ${
          isVisible['section-mission-vision'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To make quality local groceries accessible, affordable, and convenient for every home in Ghana 
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Award className="w-8 h-8 text-green-600 mr-3" />
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted and accessible online market for fresh food and groceries across Ghana.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div 
        id="section-why-choose-us"
        className={`py-16 px-4 bg-gray-50 transition-all duration-1000 delay-400 ${
          isVisible['section-why-choose-us'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Us ?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-500 cursor-pointer ${
                  activeFeature === index ? 'scale-110 shadow-2xl' : 'hover:scale-105'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`${feature.color} mb-4 transform transition-transform duration-300 ${
                  activeFeature === index ? 'animate-bounce' : ''
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
                
                {activeFeature === index && (
                  <div className="mt-4 flex items-center text-green-600 animate-fade-in">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Learn More</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Founder and Team Section */}
      <div 
        id="section-team"
        className={`py-16 px-4 bg-white transition-all duration-1000 delay-500 ${
          isVisible['section-team'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Workers</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Founder */}
            <div className="text-center group">
              <div className="relative mb-6">
                <img 
                  src={nana}
                  alt="Nana Akua Amoako" 
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-green-200 group-hover:border-green-400 transition-colors duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Nana Akua Amoako</h3>
              <p className="text-green-600 font-medium">Founder and Team Lead</p>
            </div>
            
            {/* Team Sections */}
            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 group-hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={team}
                  alt="Delivery Team" 
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">Delivery Team</h3>
              </div>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 group-hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={members}
                  alt="Team Members" 
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">Team Members</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Control Section */}
      <div 
        id="section-quality"
        className={`py-16 px-4 bg-gray-50 transition-all duration-1000 delay-600 ${
          isVisible['section-quality'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Props</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group">
              <img 
                src={father} 
                alt="Quality Control Process" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Control</h3>
                <p className="text-gray-600">We carefully select only the freshest produce from trusted local suppliers.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group">
              <img 
                src={joy} 
                alt="Quality Assurance" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Assurance</h3>
                <p className="text-gray-600">Every item goes through our rigorous quality check before delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div 
        id="section-location"
        className={`py-16 px-4 bg-white transition-all duration-1000 delay-700 ${
          isVisible['section-location'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Where We Operate</h2>
              <p className="text-gray-600 mb-6">
                Currently serving Accra Westland behind Star Bite. 
                Embed a street map or use location pins
              </p>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-6 h-6 text-green-600 mr-2" />
                  Follow Us / Get intouch
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600">📧 @Di.dwa</p>
                  <p className="text-gray-600">📱 0553456789 / +233556789</p>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 hover:bg-pink-200">
                    <Instagram className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 hover:bg-blue-200">
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 hover:bg-gray-700">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </div>
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 hover:bg-red-200">
                    <Youtube className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 hover:bg-green-200">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={map} 
                alt="Location Map" 
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg animate-pulse">
                <MapPin className="w-5 h-5 text-green-600 inline mr-2" />
                <span className="text-sm font-medium">We're Here!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;