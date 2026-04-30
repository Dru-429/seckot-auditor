import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle } from 'lucide-react';
import { Button, Card, Avatar, Badge } from '../components/UI';
import { ScanInput, ScanningAnimation, ScanHistoryList } from '../components/ScanComponents';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useScan } from '../hooks/useScan';

export const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <motion.aside
        className="flex flex-col justify-start relative w-full md:fixed md:left-0 md:top-0 md:w-72 h-auto md:h-screen bg-slate-950 text-white p-5 md:p-6 shadow-2xl z-20"
        initial={{ x: -288 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight">Secko Auditor</h1>
          <p className="text-sm text-slate-400 mt-1">Security scanning hub</p>
        </div>

        <nav className="space-y-2 mb-10">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setShowNewScan(!showNewScan)}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <PlusCircle className="h-5 w-5" />
            New Scan
          </button>
        </nav>

        <div className="mt-auto rounded-3xl border border-white/10 bg-slate-900 p-4">
          <div className="flex items-center gap-3">
            {/* <Avatar name={user?.email || 'User'} size="md" className='' /> */}
            <div>
              <p className="text-sm font-semibold text-white truncate">{user?.email || 'No email available'}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge severity="success" className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]">
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Guest'}
                </Badge>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <ThemeToggle />
            <Button onClick={onLogout} className="border  flex-1 text-sm">
              Logout
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="md:ml-72 min-h-screen p-5 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-500">Home / Dashboard</p>
                <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Dashboard</h2>
                <p className="mt-1 text-sm text-slate-600">Monitor recent repository scans and move quickly from detection to action.</p>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={() => setShowNewScan(!showNewScan)} className="inline-flex items-center gap-2" size="lg">
                  <PlusCircle className="h-4 w-4" />
                  New Scan
                </Button>
              </div>
            </div>

            {showNewScan && (
              <Card className="bg-white border-slate-200 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">Start a new scan</h3>
                    <p className="text-sm text-slate-500">Paste the GitHub URL to run a fresh security audit.</p>
                  </div>
                </div>
                <div className="mt-6">
                  {currentScan?.status === 'scanning' ? (
                    <ScanningAnimation />
                  ) : (
                    <ScanInput onScanSubmit={handleScanSubmit} />
                  )}
                </div>
              </Card>
            )}
          </motion.div>

          <Card className="bg-white border-slate-200 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-950">Recent scans</h3>
                <p className="text-sm text-slate-500">Latest repositories you’ve analyzed with Secko Auditor.</p>
              </div>
            </div>
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
