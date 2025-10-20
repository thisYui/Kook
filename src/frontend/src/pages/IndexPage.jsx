import React from 'react';
import Navbar from '../components/NavigationBar';

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center mb-8">Welcome to KooK</h1>
          <p className="text-center text-gray-600">Your recipe sharing platform</p>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;