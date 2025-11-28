import { useState, useEffect } from 'react';

// NOTE: Replace these placeholder values with your actual Supabase URL and Key
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Global variable for the client instance
let supabase = null;

export const useSupabaseClient = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // If the client is already initialized, skip
        if (supabase) {
            setIsReady(true);
            return;
        }

        // Load Supabase via standard script tag to avoid module errors
        const scriptId = 'supabase-script';
        if (document.getElementById(scriptId)) {
            if (window.supabase) {
                supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                setIsReady(true);
            }
            return;
        }

        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"; // Using a stable version
        script.id = scriptId;
        
        script.onload = () => {
            if (window.supabase) {
                // Initialize client from the global object
                supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                setIsReady(true);
            } else {
                console.error("Supabase script loaded but 'supabase' object not found on window.");
            }
        };
        document.head.appendChild(script);

    }, []); 

    return { supabase, isReady };
};