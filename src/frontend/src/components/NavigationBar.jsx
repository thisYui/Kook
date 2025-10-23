import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';
import { Menu, X } from 'lucide-react';

const NavigationBar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Left Section: DropDown Menu + Logo */}
          <div className="flex items-center space-x-2 z-10">
            {/* DropDown Button*/}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-900 hover:text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold italic">KooK</h1>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex space-x-8 absolute left-1/2 transform -translate-x-1/2 z-20">
            <Link to="/" className="text-gray-900 hover:text-gray-600 font-medium whitespace-nowrap">
              Home
            </Link>
            <Link to="/search" className="text-gray-900 hover:text-gray-600 font-medium whitespace-nowrap">
              Recipes
            </Link>
            <a href="#blog" className="text-gray-900 hover:text-gray-600 font-medium whitespace-nowrap">
              Blog
            </a>
            <a href="/showcase" className="text-gray-900 hover:text-gray-600 font-medium whitespace-nowrap">
              Show Case
            </a>
            <a href="#about" className="text-gray-900 hover:text-gray-600 font-medium whitespace-nowrap">
              About us
            </a>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4 z-30">
            {user ? (
              // Logged in: Show user avatar and dropdown
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={(e) => {
                    // Close dropdown when clicking outside
                    if (!e.currentTarget.parentElement.contains(e.relatedTarget)) {
                      setTimeout(() => setIsDropdownOpen(false), 150);
                    }
                  }}
                >
                  <img
                    src={user.avatar || '/default-avatar.png'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  />
                  <span className="hidden lg:block font-medium text-gray-900">{user.name}</span>
                </button>
                
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                  >
                    <Link 
                      to="/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link 
                      to="/notebook" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Recipes
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                      }}
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Not logged in: Show Sign in and Get Started buttons
              <>
                <Link 
                  to="/login" 
                  className="text-gray-900 hover:text-gray-600 font-medium whitespace-nowrap"
                >
                  Sign in
                </Link>
                <Link to="/signup">
                  <Button
                    name="Get Started"
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors whitespace-nowrap"
                  />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-16 bg-white shadow-lg z-30 border-t">
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/"
                className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/search"
                className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Recipes
              </Link>
              <a
                href="#blog"
                className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="/showcase"
                className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Show Case
              </a>
              <a
                href="#about"
                className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;