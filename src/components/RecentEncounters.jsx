import React from 'react';

const RecentEncounters = ({ encounters }) => (
  // Retained light theme styling
  <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-200">
    <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-4">Recent Encounters</h2>
    <ul className="space-y-4">
      {encounters.length === 0 ? (
        <li className="text-gray-500 text-sm">No recent encounters found.</li>
      ) : (
        encounters.map((e) => (
          <li key={e.id} className="flex justify-between items-center text-gray-700 hover:text-red-600 transition-colors duration-150 cursor-pointer">
            <div>
              <div className="font-medium text-sm">{e.patient}</div>
              <div className="text-xs text-gray-500">{e.complaint}</div>
            </div>
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">{e.time}</span>
          </li>
        ))
      )}
    </ul>
  </div>
);

export default RecentEncounters;