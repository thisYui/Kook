import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, CircleUser } from "lucide-react";

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
                    to="/"
                    className="flex items-center hover:text-gray-900 px-3 py-2 rounded-md"
                >
                    USERNAME
                    <CircleUser className="w-5 h-5 ml-2" />
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
                <div className="flex items-center space-x-3 px-3 py-4 border-b">
                    <CircleUser className="w-8 h-8" />
                    <div>
                    <p className="font-semibold">USERNAME</p>
                    <p className="text-sm text-gray-500">View profile</p>
                    </div>
                </div>
                
                <div className="space-y-1 py-2">
                    <Link
                    to="/"
                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={toggleMenu}
                    >
                    Analytics
                    </Link>
                    <Link
                    to="/"
                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={toggleMenu}
                    >
                    Home
                    </Link>
                    <Link
                    to="/"
                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={toggleMenu}
                    >
                    Search
                    </Link>
                    <Link
                    to="/"
                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={toggleMenu}
                    >
                    AI Assistant
                    </Link>
                    <Link
                    to="/"
                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={toggleMenu}
                    >
                    Help
                    </Link>
                </div>
                </div>
            </div>
        )}
        </nav>
    );
}
