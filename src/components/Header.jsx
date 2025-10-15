import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const { isLoggedIn, logout, isAdmin } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const isActive = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-light-cream shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-teal-dark rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-charcoal">HomeServices</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-teal-dark'
                    : 'text-charcoal hover:text-teal-dark'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-teal-dark rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="text-charcoal hover:text-teal-dark px-3 py-2 text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={logout}
                className="text-charcoal hover:text-teal-dark px-3 py-2 text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            )}
            {isLoggedIn && (
              <Link
                to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                className="bg-teal-dark text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-80 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={mobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${mobileMenu ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${mobileMenu ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenu ? 'block' : 'hidden'} md:hidden border-t border-gray-200 bg-light-cream`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.href)
                  ? 'text-teal-dark bg-light-yellow'
                  : 'text-charcoal hover:text-teal-dark hover:bg-light-yellow'
              } transition-colors`}
              onClick={() => setMobileMenu(false)}
            >
              {item.name}
            </Link>
          ))}

          <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md font-medium text-charcoal hover:text-teal-dark hover:bg-light-yellow transition-colors"
                onClick={() => setMobileMenu(false)}
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMobileMenu(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md font-medium text-charcoal hover:text-teal-dark hover:bg-light-yellow transition-colors"
              >
                Sign Out
              </button>
            )}
            {isLoggedIn && (
              <Link
                to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                className="block px-3 py-2 rounded-md font-medium text-white bg-teal-dark hover:bg-opacity-80 transition-colors text-center"
                onClick={() => setMobileMenu(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}