import React, { useState } from 'react';
// FIX: Changed import path to explicitly include the file extension (.jsx)
import { useNavigation } from '../context/NavigationContext.jsx'; 

const initialSidebarItems = [
  { label: 'Overview', icon: '📊', view: 'dashboard' },
  { label: 'Appointments', icon: '📅', view: 'appointments' },
  { label: 'Patients', icon: '👤', view: 'patients' },
  { label: 'Encounters', icon: '📝', view: 'encounters' },
  { label: 'Reports', icon: '📈', view: 'reports' },
  { label: 'Inventory', icon: '📦', view: 'inventory' },
  { label: 'Administration', icon: '⚙️', view: 'admin' },
];

const NavItem = ({ icon, label, isActive, onClick }) => (
  // Retained NavItem styling
  <a
    href="#"
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className={`flex items-center p-3 rounded-lg transition-colors duration-150 ${
      isActive
        ? 'bg-red-600 text-white shadow-lg'
        : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
    }`}
  >
    <span className="w-5 h-5 mr-3">{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </a>
);

const Sidebar = () => {
  const { currentView, navigate } = useNavigation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Hardcoded avatar/logo paths for demo; adjust if moved
  // NOTE: These paths assume the assets are available at the root relative path in the final build.
  const logoSrc = "src/assets/images/tupehrlogo.jpg"; 
  const avatarSrc = "src/assets/images/avatar-placeholder.jpg"; 

  // Handlers for profile actions
  const handleSignOut = () => {
    // Implement actual sign out/auth context logic here
    console.log("Signing out...");
    navigate('login'); // Assuming a 'login' view exists
    setIsProfileMenuOpen(false);
  };
  const handleViewProfile = () => {
    navigate('my-profile');
    setIsProfileMenuOpen(false);
  };
  const handleSettings = () => {
    navigate('settings');
    setIsProfileMenuOpen(false);
  };

  return (
    // Retained Sidebar container styling
    <div className="flex flex-col flex-shrink-0 bg-white border-r border-gray-200 w-64 p-4 rounded-lg shadow-xl m-4">
      <div className="flex items-center justify-between h-16 border-b border-gray-200">
        <div className="flex items-center">
          {/* Using placeholder image URL */}
          <img src={logoSrc} alt="TUP Clinic Logo" className="w-8 h-8 mr-2 rounded-md"/>
          <span className="text-xl font-bold text-red-600">TUP</span>
          <span className="text-sm text-gray-500 ml-1">Clinic</span>
        </div>
        <button 
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700 focus:outline-none relative"
        >
          {/* Using placeholder image URL */}
          <img src={avatarSrc} alt="Profile" className="w-8 h-8 rounded-full" />
        </button>
        
        {/* Profile Dropdown Menu */}
        {isProfileMenuOpen && (
          // Fixed positioning to be relative to the sidebar container (m-4 is outside)
          <div className="absolute right-6 top-6 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-2">
            <div className="p-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 cursor-pointer rounded-md" onClick={handleViewProfile}>View Profile</div>
            <div className="p-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 cursor-pointer rounded-md" onClick={handleSettings}>Settings</div>
            <div className="p-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer rounded-md border-t border-gray-100 mt-1 pt-2" onClick={handleSignOut}>Sign Out</div>
          </div>
        )}
      </div>

      <nav className="flex-grow py-4 space-y-2 overflow-y-auto">
        {initialSidebarItems.map((item) => (
          <NavItem
            key={item.view}
            icon={item.icon}
            label={item.label}
            isActive={currentView === item.view}
            onClick={() => navigate(item.view)}
          />
        ))}

        <div className="pt-4 mt-4 border-t border-gray-200">
          <NavItem icon="❓" label="Help" isActive={currentView === 'help'} onClick={() => navigate('help')} />
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 text-xs">
        <p className="text-gray-600">Logged in as: Dr. Rivera</p>
        <p className="text-gray-600">Last backup: 2 days ago</p>
        <div className="flex justify-between mt-2">
          <button className="text-red-600 hover:text-red-700" onClick={() => navigate('settings')}>Settings</button>
          <button className="text-red-600 hover:text-red-700" onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;