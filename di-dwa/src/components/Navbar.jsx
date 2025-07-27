import { useRef, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
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
  "HOME",
  "ALL CATEGORIES",
  "PRODUCTS",
  "MEAT",
  "MY ORDER",
  "TRACK ORDER",
  "PAYMENT",
  "CONTACT",
];

const Navbar = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    // Swiper will bind navigation in useEffect when DOM is ready
  }, []);

  return (
    <div className="relative">
      {/* Top Navbar */}
      <div className="bg-[#6AC03D] px-4 py-2 flex justify-between items-center gap-4 flex-wrap">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo3} alt="logo" className="h-12 w-12" />
          <h1 className="text-white text-xl font-bold">Di Dwa</h1>
        </div>

        {/* Search */}
        <div className="flex flex-grow max-w-2xl mx-4 bg-white rounded-full overflow-hidden shadow-sm">
          <Select>
            <SelectTrigger className="w-40 border-none focus:ring-0 bg-white text-black cursor-pointer">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              <SelectItem value="fresh" className="cursor-pointer hover:bg-green-100 text-black">
                Fresh Produce
              </SelectItem>
              <SelectItem value="meat" className="cursor-pointer hover:bg-green-100 text-black">
                Meat and Fish
              </SelectItem>
              <SelectItem value="grains" className="cursor-pointer hover:bg-green-100 text-black">
                Grains
              </SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search for more than 6,000 products"
            className="rounded-none border-none focus-visible:ring-0 text-black placeholder:text-gray-400"
          />
          <Button className="bg-yellow-400 text-black font-semibold rounded-none hover:bg-yellow-300">
            SEARCH
          </Button>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3 text-sm font-semibold">
          <Button className="bg-red-600 text-white rounded-xl hover:bg-red-700">
            SIGN UP
          </Button>
          <Button className="bg-red-600 text-white rounded-xl hover:bg-red-700">
            LOGIN
          </Button>
        </div>

        {/* Mobile Drawer */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-black font-semibold hover:text-green-600 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Bottom Nav (Desktop Only) */}
      <div className="hidden md:flex flex-wrap justify-center bg-[#54a10d] text-white font-bold text-sm">
        {navItems.map((item, idx) => (
          <div
            key={idx}
            className={`px-4 py-3 border border-[#46900b] hover:bg-yellow-400 hover:text-black transition-all cursor-pointer ${
              item === "HOME" ? "bg-yellow-400 text-black" : ""
            }`}
          >
            {item === "MY ORDER" ? (
              <span className="flex items-center gap-1">
                MY ORDER <FiShoppingCart size={18} />
              </span>
            ) : (
              item
            )}
          </div>
        ))}
      </div>

      {/* Image Slider */}
      <div className="w-full h-[300px] md:h-[500px] relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500 }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="h-full"
        >
          {[bg1, bg2, bg3].map((bg, i) => (
            <SwiperSlide key={i}>
              <img
                src={bg}
                alt={`slide${i}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Prev/Next Arrows */}
        <button
          ref={prevRef}
          className="absolute top-1/2 left-4 z-20 bg-white text-black p-2 rounded-full shadow hover:bg-yellow-400 transition"
        >
          &#8592;
        </button>
        <button
          ref={nextRef}
          className="absolute top-1/2 right-4 z-20 bg-white text-black p-2 rounded-full shadow hover:bg-yellow-400 transition"
        >
          &#8594;
        </button>

        {/* Overlay Text */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center text-white text-2xl md:text-4xl font-bold bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p>Fresh produce delivered to you</p>
        </motion.div>

        {/* Button */}
        <motion.button
          className="absolute bottom-8 right-8 z-10 bg-yellow-400 px-4 py-2 rounded font-bold text-sm md:text-base hover:bg-yellow-300 transition"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          START SHOPPING
        </motion.button>
      </div>
    </div>
  );
};

export default Navbar;
