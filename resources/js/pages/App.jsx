import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import MyOrder from "@/pages/Myorder";
import AdminLoginPage from "@/pages/Admin";
import ContactUsPage from "@/pages/ContactUs";
import AboutPage from "@/pages/About";
import TrackOrderPage from "@/pages/Track";
import PaymentPage from "@/pages/Payment";
import ForgotPasswordPage from "@/pages/ForgotPassword";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

// Helper component to control layout
function MainApp() {
  const location = useLocation();

  // Team here's where I've defined routes that should NOT show the navbar and footer
  const noLayoutRoutes = ["/login", "/signup", "/order", "/Admin","/ContactUs","/About", "/Track", "/Payment", "/ForgotPassword"];
  
  const shouldShowLayout = !noLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Team-NB: Navbar - only show on certain pages */}
      {shouldShowLayout && <Navbar />}
      
      {/*Team-NB: Main content area - takes up remaining space */}
      <main className={shouldShowLayout ? "flex-1" : "min-h-screen"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<MyOrder />} />
          <Route path="/Admin" element={<AdminLoginPage />} />
          <Route path="/ContactUs" element={<ContactUsPage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Track" element={<TrackOrderPage />} />
          <Route path="/Payment" element={<PaymentPage />} />
          <Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
        </Routes>
      </main>
      
      {/* Team-NB: Footer - only show on certain pages */}
      {shouldShowLayout && <Footer />}
    </div>
  );
}

export default App;