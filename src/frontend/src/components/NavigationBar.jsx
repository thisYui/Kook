import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';
import Button from './Button';
import { AuthorAvatar } from './AuthorInfo';
import { Menu, X } from 'lucide-react';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import SettingPopup from './IndexComponents/SettingPopup';


const NavigationBar = () => {

  const { t }= useTranslation();

  const { logout } = useAuth();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  //Test setting popup
  const [isSettingOpen, setIsSettingOpen] = useState(false);

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
              {t("navigation.home")}
            </Link>
            <Link to="/search" className="text-gray-900 hover:text-gray-600 font-medium whitespace-nowrap">
              {t("navigation.search")}
            </Link>
            <Link to="/post" className="text-gray-900 hover:text-gray-600 font-medium whitespace-nowrap">
              {t("navigation.newFeed")}
            </Link>
            <Link to="/question" className="text-gray-900 hover:text-gray-600 font-medium whitespace-nowrap">
              {t("navigation.question")}
            </Link>
            <Link to="/ai" className="text-gray-900 hover:text-gray-600 font-medium whitespace-nowrap">
              {t("navigation.aiAssistant")}
            </Link>
            <Link to="/profile" className="text-gray-900 hover:text-gray-600 font-medium whitespace-nowrap">
              {t("navigation.profile")}
            </Link>
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
                  <AuthorAvatar
                    src={user.avatar}
                    name={user.name}
                    size="md"
                  />
                  <span className="hidden lg:block font-medium text-gray-900">{user.name}</span>
                </button>
                
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                  >
                    <Button 
                      name={t("navigation.dropdown.setting")}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsSettingOpen(true)}
                    />
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                      }}
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      {t("navigation.dropdown.signout")}
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
                  {t("navigation.signin")}
                </Link>
                <Link to="/signup">
                  <Button
                    name={t("navigation.getStarted")}
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
                {t("navigation.home")}
              </Link>
              <Link
                to="/search"
                className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navigation.newFeed")}
              </Link>
              <a
                href="#blog"
                className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navigation.question")}
              </a>
              <a
                to="/ai"
                className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navigation.aiAssistant")}
              </a>
              <a
                href="#about"
                className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navigation.profile")}
              </a>
            </div>
          </div>
        )}
        <SettingPopup
          isOpen={isSettingOpen}
          onClose={() => setIsSettingOpen(false)}
          size="sm"
        />
      </div>
    </nav>
  );
};

export default NavigationBar;