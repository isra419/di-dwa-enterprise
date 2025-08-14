import React, { useState } from 'react';
import { Facebook, Instagram, MessageCircle, Chrome, Music } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(null);

  const handleSubmit = (e) => {
    // Handle newsletter subscription
    if (email.trim()) {
      console.log('Newsletter subscription:', email);
      setEmail('');
    }
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/didwaenterprise', color: 'hover:text-blue-600', name: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/di_dwa', color: 'hover:text-pink-500', name: 'Instagram' },
    { icon: MessageCircle, href: 'https://wa.me/233123456789', color: 'hover:text-green-500', name: 'WhatsApp' },
    { icon: Chrome, href: 'https://google.com/business/didwaenterprise', color: 'hover:text-red-500', name: 'Google' },
    { icon: Music, href: 'https://tiktok.com/@di_dwa', color: 'hover:text-gray-800', name: 'TikTok' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'My Order', href: '#' },
    { name: 'Payment', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  const aboutLinks = [
    { name: 'How It Work', href: '#' },
    { name: 'Our Products', href: '#' },
    { name: 'Special Offers', href: '#' }
  ];

  const helpLinks = [
    { name: 'Payments', href: '#' },
    { name: 'Delivery', href: '#' },
    { name: 'Product Returns', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Checkout', href: '#' },
    { name: 'Other Issues', href: '#' }
  ];

  return (
    <footer className="bg-gray-100 text-gray-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Social Media Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo Grid */}
            <div className="grid grid-cols-2 gap-2 w-24">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="text-xs font-bold text-white text-center leading-tight">
                    <div className="text-red-500 text-[6px]">🥕🍅</div>
                    <div className="text-[4px]">Di Dwa</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Handles */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm">social handles</h3>
              <p className="text-gray-600 font-medium">@di_dwa</p>
              
              {/* Social Icons */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`p-2 rounded-full bg-white shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 ${social.color}`}
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(null)}
                      aria-label={social.name}
                    >
                      <IconComponent 
                        size={18} 
                        className={`transition-colors duration-300 ${isHovered === index ? social.color.replace('hover:', '') : 'text-gray-600'}`}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-green-600 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">About</h3>
            <ul className="space-y-3">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-green-600 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Centre */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">Help Centre</h3>
            <ul className="space-y-3">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-green-600 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">Our Trends</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Follow us on our media handles to get updates on services and about our grand offers.
            </p>
            
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-4 py-3 pr-20 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  onClick={handleSubmit}
                  className="absolute right-1 top-1 bottom-1 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-md hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-300 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-500 text-sm">
            © 2025 Di Dwa. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Designed by Jezzerr Labs
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;