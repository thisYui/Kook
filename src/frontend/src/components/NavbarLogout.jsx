import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Brain, CircleQuestionMark, Search, House, ChartLine } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
            {/* Logo section */}
            <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-[--color-primary-start] to-[--color-primary-end] bg-clip-text text-transparent">
                Kook
                </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4 text-[--color-text]">
                <Link to="/" className="flex items-center text-[--color-text] hover:text-gray-900 px-3 py-2 rounded-md">
                    {/* <ChartLine className="w-5 h-5 mr-1" /> */}
                    Analytics
                </Link>
                <Link to="/" className="flex items-center text-[--color-text] hover:text-gray-900 px-3 py-2 rounded-md">
                    {/* <House className="w-5 h-5 mr-1" /> */}
                    Home
                </Link>
                <Link to="/" className="flex items-center text-[--color-text] hover:text-gray-900 px-3 py-2 rounded-md">
                    {/* <Search className="w-5 h-5 mr-1" /> */}
                    Search
                </Link>
                <Link to="/" className="flex items-center text-[--color-text] hover:text-gray-900 px-3 py-2 rounded-md">
                    {/* <Brain className="w-5 h-5 mr-1" /> */}
                    AI Assistant
                </Link>
                <Link to="/" className="flex items-center text-[--color-text] hover:text-gray-900 px-3 py-2 rounded-md">
                    {/* <CircleQuestionMark className="w-5 h-5 mr-1" /> */}
                    Question
                </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4 text-[--color-text]">
                <Link
                    to="/login"
                    className="flex items-center hover:text-gray-900 px-3 py-2 rounded-md"
                    onClick={toggleMenu}
                >
                    Login
                    {/* <User className="w-5 h-5 ml-1" /> */}
                </Link>
                <Link
                    to="/signup"
                    className="flex items-center hover:text-gray-900 px-3 py-2 rounded-md"
                    onClick={toggleMenu}
                >
                    Signup
                    {/* <User className="w-5 h-5 ml-1" /> */}
                </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
                <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
            </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
            <div className="md:hidden bg-white border-t">
                <div className="px-4 py-2">
                <div className="flex flex-col space-y-3 px-3 py-4 border-b">
                    <Link
                    to="/login"
                    className="w-full py-2 px-4 bg-[--color-primary-start] text-white rounded-lg text-center"
                    onClick={toggleMenu}
                    >
                    Login
                    </Link>
                    <Link
                    to="/signup"
                    className="w-full py-2 px-4 border-2 border-[--color-primary-start] text-[--color-primary-start] rounded-lg text-center"
                    onClick={toggleMenu}
                    >
                    Sign up
                    </Link>
                </div>
                
                <div className="space-y-1 py-2">
                    <Link
                    to="/"
                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={toggleMenu}
                    >
                    <ChartLine className="w-5 h-5 mr-3" />
                    Analytics
                    </Link>
                    <Link
                    to="/"
                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={toggleMenu}
                    >
                    <House className="w-5 h-5 mr-3" />
                    Home
                    </Link>
                    <Link
                    to="/"
                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={toggleMenu}
                    >
                    <Search className="w-5 h-5 mr-3" />
                    Search
                    </Link>
                    <Link
                    to="/"
                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={toggleMenu}
                    >
                    <Brain className="w-5 h-5 mr-3" />
                    AI Assistant
                    </Link>
                    <Link
                    to="/"
                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={toggleMenu}
                    >
                    <CircleQuestionMark className="w-5 h-5 mr-3" />
                    Help
                    </Link>
                </div>
                </div>
            </div>
        )}
        </nav>
    );
}
