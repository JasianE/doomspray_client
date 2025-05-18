'use client';

import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


import React from 'react';

const Navbar = (props) => {
  const [showNav, setShowNav] = useState(false);

  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      loginWithRedirect({
        appState: { returnTo: "/dashboard" }
      });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setShowNav(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-4 left-0 z-50 w-full flex justify-center transition-all duration-500 ${
        showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}
    >
      <div className="w-[90%] max-w-5xl flex justify-between items-center px-6 py-3 rounded-2xl bg-blue-100 bg-opacity-70 border border-blue-500 shadow-[0_0_15px_2px_rgba(0,200,255,0.4)] backdrop-blur-md">
        <div className="text-3xl font-Khand text-blue-700">DS</div>

        <div className="text-4xl font-Khand text-blue-700">DoomSpray</div>

        <button onClick={handleLogin} className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-500 text-white font-Khand shadow-lg transition" onClick={props.render}>
          Go To Scanner
        </button>
      </div>
    </div>
  );
};

export default Navbar;
