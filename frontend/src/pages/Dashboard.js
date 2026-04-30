import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// import { Button } from '../components/UI';
import { Button, Card } from '../components/UI';
// import { ScanInput } from '../components/ScanComponents';
import { ScanInput, ScanningAnimation, ScanHistoryList } from '../components/ScanComponents';
import { useScan } from '../hooks/useScan';

export const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { scans, currentScan, loading, createScan, getUserScans, deleteScan, getScanById } = useScan();
  const [showNewScan, setShowNewScan] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      await getUserScans();
      setIsLoading(false);
    };
    fetchScans();
  }, []);

  const handleScanSubmit = async (githubUrl) => {
    try {
      const scan = await createScan(githubUrl);
      // Poll for scan completion
      const pollInterval = setInterval(async () => {
        const updatedScan = await getScanById(scan._id);
        if (updatedScan && updatedScan.status === 'completed') {
          clearInterval(pollInterval);
          navigate(`/results/${scan._id}`);
        }
      }, 2000);
    } catch (err) {
      console.error('Error creating scan:', err);
    }
  };

  const handleViewScan = async (scan) => {
    await getScanById(scan._id);
    navigate(`/results/${scan._id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white p-6 shadow-lg"
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Secko Auditor</h1>
          <p className="text-sm text-slate-400">Security Scanning</p>
        </div>

        <nav className="space-y-2 mb-8">
          <a
            href="/dashboard"
            className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#new-scan"
            onClick={() => setShowNewScan(!showNewScan)}
            className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            New Scan
          </a>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-700">
          <div className="mb-4">
            <p className="text-xs text-slate-400">Logged in as</p>
            <p className="text-sm font-semibold">{user?.email}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
          </div>
          <Button className="w-full text-sm bg-zinc-100 text-zinc-900 hover:bg-zinc-800 hover:text-zinc-100" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h2>
            <p className="text-slate-600 mb-8">Welcome back, {user?.email}!</p>
          </motion.div>

          {/* New Scan Section */}
          {showNewScan && (
            <Card className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">New Scan</h3>
              {currentScan?.status === 'scanning' ? (
                <ScanningAnimation />
              ) : (
                <ScanInput onScanSubmit={handleScanSubmit} />
              )}
            </Card>
          )}

          {/* Scan History */}
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Scans</h3>
            <ScanHistoryList
              scans={scans}
              onSelectScan={handleViewScan}
              onDeleteScan={deleteScan}
              loading={isLoading}
            />
          </Card>
        </div>
      </main>
    </div>
  );
};
