import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiSearch, FiUser, FiMenu } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion, AnimatePresence } from "framer-motion";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import logo3 from "../assets/logo3.png";
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.avif";
import bg3 from "../assets/bg3.webp";

const navItems = [
  { name: "HOME", active: true },
  { name: "ALL CATEGORIES", active: false },
  { name: "MY ORDER", active: false, icon: FiShoppingCart },
  { name: "TRACK ORDER", active: false },
  { name: "PAYMENT", active: false },
  { name: "ABOUT", active: false },
  { name: "CONTACT", active: false },
];

const categories = [
  { value: "fresh", label: "Fresh Produce", emoji: "🥬" },
  { value: "fruit", label: "Fruits", emoji: "🍎" },
  { value: "meat", label: "Proteins & Meat", emoji: "🥩" },
  { value: "oil", label: "Oils & Condiments", emoji: "🫒" },
  { value: "baking", label: "Baking & Breakfast", emoji: "🍞" },
];

const heroSlides = [
  {
    image: bg1,
    title: "Fresh Groceries Delivered",
    subtitle: "Shop from over 6,000+ products",
    cta: "Shop Now"
  },
  {
    image: bg2,
    title: "Quality You Can Trust",
    subtitle: "Premium ingredients for your family",
    cta: "Explore Products"
  },
  {
    image: bg3,
    title: "Fast & Reliable Delivery",
    subtitle: "Get your groceries delivered in hours",
    cta: "Order Today"
  }
];

const Navbar = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartCount] = useState(3); // Demo cart count
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchValue, "in category:", selectedCategory);
    // Add your search logic here
  };

  const slideVariants = {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  return (
    <div className="relative">
      {/* Top Navbar */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gradient-to-r from-[#6AC03D] to-[#5a9d35] px-4 py-3 shadow-lg"
      >
        <div className="flex justify-between items-center gap-4 flex-wrap max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <motion.img 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              src={logo3} 
              alt="logo" 
              className="h-12 w-12 rounded-lg shadow-md" 
            />
            <div>
              <h1 className="text-white text-xl font-bold">Di Dwa</h1>
              <p className="text-green-100 text-xs">Fresh & Fast</p>
            </div>
          </motion.div>

          {/* Enhanced Search */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`flex flex-grow max-w-2xl mx-4 bg-white rounded-full overflow-hidden shadow-lg transition-all duration-300 ${
              isSearchFocused ? 'ring-2 ring-yellow-400 shadow-xl' : ''
            }`}
          >
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 border-none focus:ring-0 bg-white text-black cursor-pointer rounded-l-full">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black border-gray-200 shadow-xl">
                {categories.map((category) => (
                  <SelectItem 
                    key={category.value}
                    className='cursor-pointer hover:bg-lime-100 transition-colors' 
                    value={category.value}
                  >
                    <span className="flex items-center gap-2">
                      <span>{category.emoji}</span>
                      {category.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="relative flex-grow">
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search for more than 6,000 products..."
                className="rounded-none border-none focus-visible:ring-0 text-black placeholder:text-gray-400 h-full"
              />
              {searchValue && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearchValue("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </motion.button>
              )}
            </div>
            
            <Button 
              onClick={handleSearch}
              className="bg-yellow-400 text-black font-semibold rounded-none rounded-r-full hover:bg-yellow-300 transition-all duration-200 px-6"
            >
              <Search className="w-4 h-4 mr-2" />
              SEARCH
            </Button>
          </motion.div>

          {/* Auth Buttons & Cart */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center space-x-3 text-sm font-semibold"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 bg-white/20 rounded-full cursor-pointer"
              >
                <ShoppingBag className="w-6 h-6 text-white" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.div>
            </div>
            
            <Link to="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-md">
                  <FiUser className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </motion.div>
            </Link>
            <Link to="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-md">
                  LOGIN
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Enhanced Mobile Drawer */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="icon" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                    <Menu className="w-5 h-5" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent className="bg-white">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <img src={logo3} alt="logo" className="h-10 w-10 rounded-lg" />
                    <div>
                      <h2 className="font-bold text-lg">Di Dwa</h2>
                      <p className="text-sm text-gray-600">Fresh & Fast</p>
                    </div>
                  </div>
                  
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 10 }}
                      className="text-black font-semibold hover:text-green-600 cursor-pointer flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition-all"
                    >
                      {item.icon && <item.icon className="w-5 h-5" />}
                      {item.name}
                    </motion.div>
                  ))}
                  
                  <div className="border-t pt-4 space-y-3">
                    <Link to="/login" className="block">
                      <Button className="w-full bg-lime-600 hover:bg-lime-700 text-white">
                        LOGIN
                      </Button>
                    </Link>
                    <Link to="/SignUp" className="block">
                      <Button variant="outline" className="w-full border-lime-600 text-lime-600 hover:bg-lime-50">
                        SIGN UP
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Bottom Nav (Desktop Only) */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="hidden md:flex justify-center bg-gradient-to-r from-[#54a10d] to-[#46900b] text-white font-bold text-sm shadow-lg"
      >
        {navItems.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -2, backgroundColor: "#fbbf24" }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-4 border-r border-[#46900b] cursor-pointer transition-all duration-200 ${
              item.active ? "bg-yellow-400 text-black" : "hover:text-black"
            }`}
          >
            {item.name === "MY ORDER" ? (
  <Link to="/order" className="flex items-center gap-2">
    <span className="flex items-center gap-2">
      {item.name}
      <FiShoppingCart size={18} />
      {cartCount > 0 && (
        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </span>
  </Link>
) : (
  item.name
)}
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Image Slider */}
      <div className="w-full h-[350px] md:h-[550px] relative overflow-hidden bg-gray-900">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          effect="fade"
          autoplay={{ 
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active",
            bulletClass: "swiper-pagination-bullet"
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="h-full"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={slide.image}
                  alt={`slide${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20" />
                
                {/* Slide Content */}
                <motion.div
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 text-white"
                >
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-6xl font-bold mb-4 max-w-2xl leading-tight"
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg md:text-xl mb-8 max-w-lg text-gray-200"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.button
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.05, backgroundColor: "#fbbf24" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all duration-200 shadow-lg"
                  >
                    {slide.cta} →
                  </motion.button>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Enhanced Navigation Arrows */}
        <motion.button
          ref={prevRef}
          whileHover={{ scale: 1.1, backgroundColor: "#fbbf24" }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-1/2 left-6 z-20 bg-white/80 backdrop-blur text-black p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          ref={nextRef}
          whileHover={{ scale: 1.1, backgroundColor: "#fbbf24" }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-1/2 right-6 z-20 bg-white/80 backdrop-blur text-black p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2 }}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                currentSlide === index ? 'bg-yellow-400 w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;