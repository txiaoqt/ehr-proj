import React from 'react';
// FIX: Changed import path to explicitly include the file extension (.jsx)
import { NavigationProvider, useNavigation } from './context/NavigationContext.jsx';
// FIX: Changed import path to explicitly include the file extension (.jsx)
import Sidebar from './components/Sidebar.jsx';
// FIX: Changed import path to explicitly include the file extension (.jsx)
import Header from './components/Header.jsx';
// FIX: Changed import path to explicitly include the file extension (.jsx)
import Dashboard from './pages/Dashboard.jsx';

// Placeholder Pages (To be replaced with full page components later)
const PlaceholderPage = ({ view }) => (
    <div className="flex-1 p-8 bg-gray-100 text-gray-900">
        <h1 className="text-2xl font-bold">{view.charAt(0).toUpperCase() + view.slice(1)}</h1>
        <p className="mt-4 text-gray-600">This view is currently under construction. Navigation is working correctly!</p>
    </div>
);

// Router component to switch pages
const Router = () => {
    const { currentView } = useNavigation();

    // Map the current view state to the correct component
    switch (currentView) {
        case 'dashboard':
            return <Dashboard />;
        case 'appointments':
        case 'patients':
        case 'encounters':
        case 'reports':
        case 'inventory':
        case 'admin':
        case 'help':
        case 'settings':
        case 'my-profile':
        case 'login':
            return <PlaceholderPage view={currentView} />;
        default:
            return <PlaceholderPage view="404 Not Found" />;
    }
};

const App = () => {
    return (
        // Global container using the light background color
        <div className="flex h-screen bg-gray-100 font-inter">
            {/* Sidebar (left column) */}
            <Sidebar />

            {/* Main Content Area (Header + Router) */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <Router />
            </div>
        </div>
    );
};


// Wrap the main app with the Navigation Provider
const AppWrapper = () => (
    <NavigationProvider>
        <App />
    </NavigationProvider>
);

export default AppWrapper;