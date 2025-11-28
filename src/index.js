import React from 'react';
import ReactDOM from 'react-dom/client';
// Import the monolithic file
import AppWrapper from './App.jsx'; 

// FIX: Change the ID to 'app-root' to match your original HTML structure, 
// allowing the React app to successfully mount.
const rootElement = document.getElementById('app-root'); 

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>,
  );
} else {
  // Console error updated to reflect the new expected ID.
  console.error("Failed to find the root element to render the React application ('app-root'). Please check your public/index.html file.");
}