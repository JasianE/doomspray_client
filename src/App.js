import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Testimonial from "./components/Testimonial";
import Blocked from "./components/Blocked";
import Footer from "./components/Footer";
import { FocusTrap } from '@headlessui/react';



function App() {
  return (
    <div className="App">
      <Navbar/>
      <Hero/>
      <Testimonial/>
      <Blocked/>
      <Footer/>
    </div>
  );
}

export default App;
