// 1) Import
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Profile from './Profile';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
// Level 1 : RoutingApp (npm install react-router-dom @types/react-router-dom)
// 2) Create RoutingApp component
const RoutingApp: React.FC = () => {
    // 2.1 Local state for authentication simulation
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    // 2.2 JSX with routing structure
    return (
        <BrowserRouter>
            {/* 2.2.1) BrowserRouter */}
            <div className="min-h-screen bg-gray-100">

                {/* Nav Bar and Links */}
                <nav className="bg-blue-500 p-4">
                    <ul className="flex space-x-4">
                        {/* 2.3.4) Link */}
                        <li><Link to="/" className="text-white hover:underline">Home</Link></li>
                        <li><Link to="/about" className="text-white hover:underline">About</Link></li>
                        <li><Link to="/contact" className="text-white hover:underline">Contact</Link></li>
                        <li><Link to="/profile" className="text-white hover:underline">Profile</Link></li>
                        <li>
                            {isAuthenticated ? (
                                <button
                                    onClick={() => setIsAuthenticated(false)}
                                    className="text-white hover:underline">
                                    Log Out
                                </button>
                            ) : (
                                <Link to="/login" className="text-white hover:underline">Log In</Link>
                            )}
                        </li>
                    </ul>
                </nav>
                {/* Routes and Route Handling */}
                <div className="max-w-4xl mx-auto">
                    {/* 2.2.2) Routes */}
                    <Routes>
                        {/* 2.2.3) Route and path */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={<Login onLogin={() => setIsAuthenticated(true)} />}
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};
// 3) Export
export default RoutingApp;