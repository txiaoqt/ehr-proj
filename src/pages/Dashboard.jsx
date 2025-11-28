import React, { useEffect, useCallback, useState } from 'react';
// FIX: Explicitly check path from pages/Dashboard to context/NavigationContext
import { useNavigation } from '../context/NavigationContext.jsx';
// FIX: Explicitly check path from pages/Dashboard to supabase/supabaseClient
import { useSupabaseClient } from '../supabase/supabaseClient.js';
// FIX: Explicitly check path from pages/Dashboard to components/StatCard
import StatCard from '../components/StatCard.jsx';
// FIX: Explicitly check path from pages/Dashboard to components/RecentEncounters
import RecentEncounters from '../components/RecentEncounters.jsx';

const Dashboard = () => {
    const { navigate } = useNavigation();
    const { supabase, isReady: isSupabaseReady } = useSupabaseClient();
    
    // State management for data
    const [encounters, setEncounters] = useState([]); 
    const [stats, setStats] = useState({
      patientsCheckedIn: null, 
      encountersToday: null,
      pendingReferrals: null,
    });
    const [dataLoading, setDataLoading] = useState(true);

    // Fixed Button Handlers
    const handleRegisterPatient = () => navigate('patients', { action: 'register' });
    const handleRecordVitals = () => navigate('encounter', { action: 'vitals' });
    const handleExportCensus = () => console.log('Exporting Census (Client-side CSV demo)'); // Retained console log functionality

    // Data Fetching Logic (Identical to previous logic, but using the hook)
    const fetchDashboardData = useCallback(async () => {
        if (!isSupabaseReady || !supabase) {
            console.log("Supabase client not ready. Skipping fetch.");
            return; 
        }
        
        setDataLoading(true);
        try {
            // Fetch Key Stats
            const { data: statsData, error: statsError } = await supabase
                .from('dashboard_stats')
                .select('patients_checked_in, encounters_today, pending_referrals')
                .limit(1)
                .single();
            
            if (statsError) {
                console.error('Error fetching stats:', statsError);
            } else {
                setStats({
                    patientsCheckedIn: statsData?.patients_checked_in || 0,
                    encountersToday: statsData?.encounters_today || 0,
                    pendingReferrals: statsData?.pending_referrals || 0,
                });
            }

            // Fetch Recent Encounters
            const { data: encountersData, error: encountersError } = await supabase
                .from('recent_encounters')
                .select('id, patient_name, complaint, encounter_time') 
                .order('encounter_time', { ascending: false })
                .limit(4);

            if (encountersError) {
                console.error('Error fetching encounters:', encountersError);
            } else {
                const formattedEncounters = encountersData.map(e => ({
                    id: e.id,
                    patient: e.patient_name,
                    complaint: e.complaint,
                    time: new Date(e.encounter_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                }));
                setEncounters(formattedEncounters);
            }

        } catch (error) {
            console.error('Network or unknown error during data fetch:', error);
        } finally {
            setDataLoading(false);
        }
    }, [isSupabaseReady, supabase]);

    // Effect Hooks: Fetch data when client is ready and set up real-time listener
    useEffect(() => {
        if (!isSupabaseReady || !supabase) {
            return;
        }

        fetchDashboardData();

        // Supabase Realtime Subscription
        const encountersChannel = supabase
            .channel('public:recent_encounters')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'recent_encounters' },
                (payload) => {
                    console.log('Realtime change detected:', payload.new);
                    fetchDashboardData();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(encountersChannel);
        };
    }, [isSupabaseReady, fetchDashboardData, supabase]);

    return (
        <div className="flex flex-1 overflow-auto">
            {/* Main Content Area */}
            {/* DESIGN CHANGE: bg-gray-100 retained */}
            <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
                <div className="space-y-8 p-6">
                    {/* Row 1: Key Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard title="Patients checked-in today" value={stats.patientsCheckedIn} />
                        <StatCard title="Encounters today" value={stats.encountersToday} />
                        <StatCard title="Pending referrals" value={stats.pendingReferrals} />
                    </div>

                    {/* Row 2: Charts and Vitals (Placeholders remain) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            {/* DESIGN CHANGE: bg-white retained */}
                            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 h-64">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Visits Over Time</h3>
                                <p className="text-gray-500">[Line chart placeholder]</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 h-48">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Diagnoses Distribution</h3>
                                    <p className="text-gray-500">[Pie chart placeholder]</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 h-48">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Top 5 Chief Complaints</h3>
                                    <p className="text-gray-500">[Bar chart placeholder]</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar: Vitals & Quick Actions */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Vitals Quick View</h3>
                                <p className="text-gray-500">[Sparklines / mini-cards]</p>
                            </div>

                            <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-3">Quick Actions</h3>
                                <div className="space-y-3">
                                    {/* Buttons fixed to navigate */}
                                    <button 
                                        onClick={handleRegisterPatient}
                                        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition duration-150 shadow-md"
                                    >
                                        Register Patient
                                    </button>
                                    <button 
                                        onClick={handleRecordVitals}
                                        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition duration-150 shadow-md"
                                    >
                                        Record Vitals
                                    </button>
                                    <button 
                                        onClick={handleExportCensus}
                                        className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition duration-150 shadow-md"
                                    >
                                        Export Census
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Right Rail (Recent Encounters & Alerts) */}
            <aside className="w-80 flex-shrink-0 border-l border-gray-200 bg-gray-100 p-4 space-y-6">
                <RecentEncounters encounters={encounters} />

                <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-3">Alerts</h3>
                    <div className="space-y-3 text-gray-600">
                        <p className="text-sm">Low stock: Paracetamol (20 left)</p>
                        <p className="text-sm">Correction request: Jane Doe chart</p>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Dashboard;