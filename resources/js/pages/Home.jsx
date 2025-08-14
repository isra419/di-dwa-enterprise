import React, { useState } from "react";
import { ShoppingCart, Heart, Star, TrendingUp, Grid, List, ChevronRight, Eye, Clock, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Product Images
import lettuceImg from "../assets/lettuce.jpg";
import tomatoesImg from "../assets/Tomatoes.png";
import cabbageImg from "../assets/Cabbage.webp";
import carrotImg from "../assets/Carrot.jpg";
import gardenEggsImg from "../assets/GardenEggs.webp";
import orangeImg from "../assets/Orange.jpg";
import appleImg from "../assets/Apples.jpg";
import bananaImg from "../assets/Banana.webp";
import grapesImg from "../assets/Grapes.jpg";
import pineappleImg from "../assets/Pineapple.webp";
import chickenImg from "../assets/Chicken.jpeg";
import eggImg from "../assets/Eggs.webp";
import fishImg from "../assets/fish.jpg";
import beefImg from "../assets/Beef.webp";
import sardineImg from "../assets/Sardines.jpg";
import oilImg from "../assets/Oil.webp";
import saltImg from "../assets/salt.jpg";
import redOilImg from "../assets/RedOil.jpg";
import maggiImg from "../assets/maggi.png";
import coconutOilImg from "../assets/CoconutOil.webp";
import flourImg from "../assets/Flour.jpg";
import oatsImg from "../assets/Oats.jpg";
import sugarImg from "../assets/Sugar.webp";
import bakingPowderImg from "../assets/Baking.webp";
import groundnutImg from "../assets/Groundnut.jpg";

// Trend Images
import trend2Img from "../assets/Joy.jpg";
import trend3Img from "../assets/Nana.jpg";
import trend4Img from "../assets/trends.jpeg";

// Product Data
const freshProduce = [
  { id: 1, name: "Lettuce", priceRange: "₵5 - ₵100", rating: 4.5, discount: 15, inStock: true, image: lettuceImg },
  { id: 2, name: "Tomatoes", priceRange: "₵5 - ₵100", rating: 4.8, discount: 0, inStock: true, image: tomatoesImg },
  { id: 3, name: "Cabbage", priceRange: "₵10 - ₵100", rating: 4.3, discount: 10, inStock: true, image: cabbageImg },
  { id: 4, name: "Carrot", priceRange: "₵5 - ₵100", rating: 4.6, discount: 0, inStock: false, image: carrotImg },
  { id: 5, name: "Garden Eggs", priceRange: "₵5 - ₵100", rating: 4.2, discount: 20, inStock: true, image: gardenEggsImg },
];

const fruits = [
  { id: 6, name: "Orange", priceRange: "₵5 - ₵100", rating: 4.7, discount: 5, inStock: true, image: orangeImg },
  { id: 7, name: "Apple", priceRange: "₵10 - ₵100", rating: 4.9, discount: 0, inStock: true, image: appleImg },
  { id: 8, name: "Banana", priceRange: "₵5 - ₵100", rating: 4.4, discount: 15, inStock: true, image: bananaImg },
  { id: 9, name: "Grapes", priceRange: "₵5 - ₵100", rating: 4.6, discount: 0, inStock: true, image: grapesImg },
  { id: 10, name: "Pineapple", priceRange: "₵10 - ₵100", rating: 4.8, discount: 25, inStock: true, image: pineappleImg },
];

const proteinsAndMeat = [
  { id: 11, name: "Chicken", priceRange: "₵40 - ₵500", rating: 4.7, discount: 0, inStock: true, image: chickenImg },
  { id: 12, name: "Eggs", priceRange: "₵2.5 - ₵100", rating: 4.9, discount: 10, inStock: true, image: eggImg },
  { id: 13, name: "Fish", priceRange: "₵20 - ₵500", rating: 4.5, discount: 0, inStock: true, image: fishImg },
  { id: 14, name: "Beef", priceRange: "₵15 - ₵500", rating: 4.6, discount: 15, inStock: true, image: beefImg },
  { id: 15, name: "Sardine", priceRange: "₵10 - ₵500", rating: 4.3, discount: 0, inStock: false, image: sardineImg },
];

const oilsAndCondiments = [
  { id: 16, name: "Vegetable Oil", priceRange: "₵35 - ₵700", rating: 4.4, discount: 5, inStock: true, image: oilImg },
  { id: 17, name: "Salt", priceRange: "₵1 - ₵50", rating: 4.8, discount: 0, inStock: true, image: saltImg },
  { id: 18, name: "Red Oil", priceRange: "₵25 - ₵600", rating: 4.6, discount: 20, inStock: true, image: redOilImg },
  { id: 19, name: "Maggi", priceRange: "₵1 - ₵50", rating: 4.7, discount: 0, inStock: true, image: maggiImg },
  { id: 20, name: "Coconut Oil", priceRange: "₵25 - ₵600", rating: 4.5, discount: 10, inStock: true, image: coconutOilImg },
];

const bakingAndBreakfast = [
  { id: 21, name: "Flour", priceRange: "₵10 - ₵200", rating: 4.6, discount: 0, inStock: true, image: flourImg },
  { id: 22, name: "Oats", priceRange: "₵20 - ₵200", rating: 4.8, discount: 15, inStock: true, image: oatsImg },
  { id: 23, name: "Sugar", priceRange: "₵1 - ₵50", rating: 4.4, discount: 0, inStock: true, image: sugarImg },
  { id: 24, name: "Baking Powder", priceRange: "₵7 - ₵100", rating: 4.5, discount: 5, inStock: true, image: bakingPowderImg },
  { id: 25, name: "Groundnut", priceRange: "₵10 - ₵200", rating: 4.7, discount: 20, inStock: true, image: groundnutImg },
];

const trends = [
  { id: 1, title: "Get to know more by catching up with our latest interviews", image: trend2Img, views: "12.5K", readTime: "5 min" },
  { id: 2, title: "Nana Akua Amoako - Founder and Team Lead", image: trend3Img, views: "8.2K", readTime: "8 min" },
  { id: 3, title: "Follow and get updates on interviews, advertisements, discounts and more", image: trend4Img, views: "15.7K", readTime: "3 min" },
];

// Popular search terms
const popularSearches = [
  "Lettuces", "Meat All Kinds", "Fishes", "Onion", "Garden Eggs", "Eggs", "Tomatoes", "Cabbage", "Carrot", "Cocoyam Leaves", "Flour", "Yam",
  "Garden Eggs", "Watermelon", "Oil", "Seasoning Cubes"
];

// --- ProductCard component with real image display ---
function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
          -{product.discount}%
        </div>
      )}
      {!product.inStock && (
        <div className="absolute inset-0 bg-gray-900/60 z-20 flex items-center justify-center rounded-xl">
          <span className="text-white font-bold text-lg">Out of Stock</span>
        </div>
      )}
      <button
        onClick={() => onToggleFavorite(product.id)}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-sm"
      >
        <Heart 
          className={`w-4 h-4 transition-colors duration-200 ${
            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
          }`} 
        />
      </button>
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 text-xs text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="font-medium text-gray-600">{product.rating}</span>
          </div>
        </div>
        <p className="text-lg font-bold text-green-600">{product.priceRange}</p>
        <div className={`flex items-center space-x-2 transition-all duration-300 transform ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="flex-1 bg-red-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center space-x-1"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
          <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductSection({ title, products }) {
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid');

  const handleAddToCart = (product) => console.log('Added to cart:', product);
  const handleToggleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            {products.length} items
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}><Grid className="w-4 h-4" /></button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}><List className="w-4 h-4" /></button>
        </div>
      </div>
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5' : 'grid-cols-1'}`}>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={favorites.has(p.id)}
          />
        ))}
      </div>
    </section>
  );
}

function TrendCard({ trend }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <img src={trend.image} alt={trend.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className="bg-black/60 rounded-full px-2 py-1 text-white text-xs font-medium flex items-center space-x-1">
            <Eye className="w-3 h-3" /><span>{trend.views}</span>
          </div>
          <div className="bg-black/60 rounded-full px-2 py-1 text-white text-xs font-medium flex items-center space-x-1">
            <Clock className="w-3 h-3" /><span>{trend.readTime}</span>
          </div>
        </div>
      </div>
      <div className="p-4 text-center">
        <h4 className="text-md font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-200">
          {trend.title}
        </h4>
        <button className={`w-full bg-red-600 hover:bg-green-500 text-white font-bold px-4 py-2 rounded-lg transition-transform duration-300 transform ${isHovered ? 'scale-105' : 'scale-100'} flex items-center justify-center space-x-2`}>
          <span>VIEW</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function OurTrendsSection() {
  return (
    <section className="mb-10">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-6 h-6 text-green-600" />
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Our Trends</h2>
        <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold animate-pulse">
          HOT
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trends.map((trend) => <TrendCard key={trend.id} trend={trend} />)}
      </div>
    </section>
  );
}

function PopularSearchSection() {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Others search for</h2>
      <div className="flex flex-wrap gap-3">
        {popularSearches.map((term, index) => (
          <button
            key={index}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm transition-colors duration-200"
          >
            {term}
          </button>
        ))}
      </div>
    </section>
  );
}

function PromotionalSection() {
  const [message, setMessage] = useState('');

  return (
    <section className="mb-10 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left side - Promotional Banner */}
        <div className="bg-yellow-400 p-8 flex items-center justify-center relative">
          <div className="text-center">
            {/* Phone mockup */}
            <div className="relative mb-6">
              <div className="w-48 h-80 bg-black rounded-3xl p-2 mx-auto relative">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  <div className="bg-green-500 h-20 flex items-center justify-center">
                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                      <div className="w-8 h-6 bg-green-500 rounded-sm flex items-center justify-center">
                        <div className="text-white text-xs font-bold">🥬</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="text-xs text-gray-600">Fresh Vegetables</div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-red-500 rounded"></div>
                      <div className="w-8 h-8 bg-green-500 rounded"></div>
                      <div className="w-8 h-8 bg-orange-500 rounded"></div>
                    </div>
                    <div className="bg-green-500 text-white text-xs p-2 rounded text-center">
                      Order Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text content */}
            <div className="text-left max-w-md">
              <h3 className="text-2xl font-bold text-black mb-2">INTRODUCING...</h3>
              <h2 className="text-4xl font-bold text-yellow-200 mb-2 stroke-text">SAME DAY</h2>
              <h2 className="text-4xl font-bold text-black mb-4">ORDERS!</h2>
              <p className="text-black font-semibold mb-2">Order by 9am prompt!</p>
              <p className="text-black font-semibold mb-6">Receive same day!</p>
              <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold inline-block">
                TERMS & CONDITIONS APPLY
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Signup and Contact */}
        <div className="p-8 space-y-8">
          {/* Signup Section */}
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <h2 className="text-2xl font-bold text-black">Get to enjoy some special offers by signing up</h2>
              <div className="absolute -top-2 -right-8 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-12">
                Special Offer
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Just Sign Up & Register it now to become member.
            </p>
            <Link to="/SignUp">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 w-full max-w-xs">
              SIGN UP NOW
            </button>
            </Link>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-gray-700 font-medium">Get to chat directly with our workers</span>
            </div>
            
            <div className="space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="ENTER YOUR MESSAGE HERE"
                className="w-full p-4 border border-gray-300 rounded-lg resize-none h-24 text-sm placeholder-gray-400"
              />
              
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors duration-200">
                WHATSAPP US
              </button>
              
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition-all duration-200">
                INSTAGRAM
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="space-y-10 py-8 px-4 md:px-16 bg-gray-50 min-h-screen">
      <ProductSection title="Fresh Produce" products={freshProduce} />
      <ProductSection title="Fruits" products={fruits} />
      <ProductSection title="Proteins & Meat" products={proteinsAndMeat} />
      <ProductSection title="Oils & Condiments" products={oilsAndCondiments} />
      <ProductSection title="Baking & Breakfast" products={bakingAndBreakfast} />
      <OurTrendsSection />
      <PopularSearchSection />
      <PromotionalSection />
    </main>
  );
}