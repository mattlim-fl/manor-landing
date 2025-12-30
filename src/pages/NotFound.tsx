import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col leopard-bg text-white">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 
            className="font-blur font-bold text-6xl md:text-8xl mb-4"
            style={{ color: '#E59D50' }}
          >
            404
          </h1>
          <p 
            className="text-xl font-acumin mb-8"
            style={{ color: '#E59D50' }}
          >
            Oops! Page not found
          </p>
          <Link 
            to="/" 
            className="nav-btn inline-block font-blur font-bold px-10 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
