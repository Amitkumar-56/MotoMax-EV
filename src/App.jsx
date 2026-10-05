import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ElectricScooterBattery from "./pages/ElectricScooterBattery";
import LithiumInverterBattery from "./pages/LithiumInverterBattery";
import SolarStreetLightStorage from "./pages/SolarStreetLightStorage";
import SolidStateBatteries from "./pages/SolidStateBatteries";
import EVCharger from "./pages/EVCharger";
import Inverter from "./pages/Inverter";
import Team from "./pages/Team";
import ProductDetail from "./pages/ProductDetail";
import TwoWheeler from "./pages/TwoWheeler";
import ThreeWheeler from "./pages/ThreeWheeler";
import GolfCart from "./pages/GolfCart";
import PostDetail from "./pages/PostDetail";

import NewsEvents from "./pages/NewsEvents";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

import "./index.css";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Yeh code har baar page change hone par screen ko top par le aayega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-container">
      {/* Hide Navbar on Admin pages */}
      {!isAdminRoute && <Navbar />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/products/electric-scooter-battery" element={<ElectricScooterBattery />} />
          <Route path="/products/lithium-inverter-battery-home" element={<LithiumInverterBattery />} />
          <Route path="/products/solar-street-light-storage" element={<SolarStreetLightStorage />} />
          <Route path="/products/solid-state" element={<SolidStateBatteries />} />
          <Route path="/products/charger" element={<EVCharger />} />
          <Route path="/products/inverter" element={<Inverter />} />
          <Route path="/team" element={<Team />} />

          {/* Footer Products */}
          <Route path="/products/2-wheeler" element={<TwoWheeler />} />
          <Route path="/products/3-wheeler" element={<ThreeWheeler />} />
          <Route path="/products/golf-cart" element={<GolfCart />} />

          {/* Dynamic route for all other missing products */}
          <Route path="/products/:id" element={<ProductDetail />} />

          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          <Route path="/contact-us" element={<Contact />} />

          {/* Admin Panel */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {/* Hide Footer on Admin pages */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
