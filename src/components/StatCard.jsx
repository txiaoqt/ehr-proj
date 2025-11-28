import React from 'react';

const StatCard = ({ title, value, unit }) => (
  // Retained light theme styling
  <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200 transition duration-150 hover:border-red-500">
    <div className="text-3xl font-bold text-gray-900">
      {/* Loading state retained */}
      {value !== null ? value : <div className="animate-pulse bg-gray-300 h-8 w-1/3 rounded"></div>}
    </div>
    <div className="text-sm font-medium text-gray-500 mt-1">{title}</div>
    {unit && <div className="text-xs text-red-600 mt-1">{unit}</div>}
  </div>
);

export default StatCard;