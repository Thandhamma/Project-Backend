import { useState } from 'react';
import './App.css'; // You can add global styles here if needed

// --- 1. Import all your components ---
import Header from './componentsHome/Header.js';
import HeroSection from './componentsHome/HeroSection.js';
import Footer from './componentsHome/Footer.js';
import LoginModal from './componentsHome/LoginModal.js'; // Corrected component name

function App() {
  // --- 2. State Management ---
  // This state lives in the highest-level component (App)
  // so it can be shared between Header (to open) and LoginModal (to close).
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Handler Functions ---
  // Function to open the modal, which we will pass to the Header
  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal, which we will pass to the LoginModal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    // Use a React Fragment (<>) or a div to wrap all components
    <div className="flex flex-col min-h-screen">
      {/* --- 3. Component Assembly & Prop Drilling --- */}

      {/* The Header component receives the 'handleLoginClick' function as a prop.
        When the login button inside Header is clicked, it will call this function,
        which in turn changes the state in this App component.
      */}
      <Header onLoginClick={handleLoginClick} onNavigate={() => {}} />

      {/* The main content of the page */}
      <main className="flex-grow">
        <HeroSection />
      </main>

      {/* The Footer component */}
      <Footer />

      {/* --- 4. Conditional Rendering ---
        This is the magic part. The LoginModal component will ONLY be rendered
        to the screen if 'isModalOpen' is true. We also pass the 'handleCloseModal'
        function so the modal can close itself.
      */}
      {isModalOpen && <LoginModal onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
