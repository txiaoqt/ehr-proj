import React, { useState } from 'react';
// FIX: Changed import path to explicitly include the file extension (.jsx)
import { useNavigation } from '../context/NavigationContext.jsx';

const Header = () => {
  const { navigate } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  // Fixed button functionality using navigate()
  const handleNewEncounter = () => navigate('encounter');
  
  return (
    // Retained light theme styling
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 h-16 shadow-lg flex-shrink-0">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-900">Staff Dashboard</h1>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search patient name or stu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // Retained input styling
            className="bg-gray-100 text-gray-900 placeholder-gray-500 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 w-64"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</span>
        </div>
        <span className="text-sm text-gray-600">Fri, Nov 28, 2025 — 4:47:00 PM (Simulated)</span>
        <div className="relative">
          <button className="text-gray-600 hover:text-gray-900 p-2 rounded-full bg-gray-100 relative">
            🔔
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              3
            </span>
          </button>
        </div>
        <button 
          onClick={handleNewEncounter}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition duration-150"
        >
          New Encounter
        </button>
      </div>
    </header>
  );
};

export default Header;