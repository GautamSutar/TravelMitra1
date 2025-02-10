import React, { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import TopDestinations from './component/TopDestinations';
import PlanTrip from './component/PlanTrip';
import Testimonials from './component/Testimonials';
import Newsletter from './component/Newsletter';
import ScrollSection from './component/ScrollSection';
import IndoreStats from './component/IndoreStats';


function App() {
  const location = useLocation();
  const footerRef = useRef(null);
  const hideNavFooter = ['/signup', '/login'].includes(location.pathname);
  const hideComponents = ['/login', '/signup', '/category', '/planedtrip', '/travel-mitra-trips',
    '/events', '/iconic', '/hidden', '/details', '/fact', '/about',
    '/fest', '/hotel', '/hotel', '/calendar', '/fetchBookingDetails'].includes(location.pathname) || location.pathname.startsWith("/booking/");;

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {!hideNavFooter && <Navbar scrollToFooter={scrollToFooter} />}
      <Outlet />
      {!hideComponents && (
        <>
          <IndoreStats />
          <ScrollSection />
          <TopDestinations />
          <PlanTrip />
          <Testimonials />    
          <Newsletter />
        </>
      )}
      {!hideNavFooter && <Footer ref={footerRef} />}
    </>
  );
}

export default App;
