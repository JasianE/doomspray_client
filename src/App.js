import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Testimonial from "./components/Testimonial";
import Blocked from "./components/Blocked";
import Footer from "./components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading Auth...</div>; // You can replace with a spinner later
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Testimonial />
              <Blocked />
              <Footer />
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}


export default App;
