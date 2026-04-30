import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/UI';
import { ResultsPage } from '../components/ResultsView';
import { useScan } from '../hooks/useScan';
import { useTheme } from '../context/ThemeContext';
import { generatePDFReport } from '../utils/helpers';


export const Results = ({ user, onBack }) => {
  const navigate = useNavigate();
  const { scanId } = useParams();
  const { currentScan, loading, error, getScanById } = useScan();
  const { isDark } = useTheme();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    if (scanId) {
      console.log('Fetching scan with ID:', scanId);
      getScanById(scanId);
    }
  }, [scanId, getScanById]);

  // Poll for scan updates if still scanning
  useEffect(() => {
    if (currentScan && currentScan.status === 'scanning') {
      const pollInterval = setInterval(() => {
        console.log('Polling for scan updates...');
        getScanById(scanId);
      }, 2000);
      return () => clearInterval(pollInterval);
    }
  }, [currentScan, scanId, getScanById]);

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      await generatePDFReport(`results-${scanId}`, `audit-report-${scanId}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="text-center">
          <div className={`w-12 h-12 border-3 rounded-full mx-auto animate-spin ${isDark ? 'border-slate-700 border-t-slate-300' : 'border-slate-200 border-t-slate-900'}`} />
          <p className={`mt-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Loading results...</p>
        </div>
      </div>
    );
  }

  if (!currentScan) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="text-center">
          <p className={`mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            {error || 'Scan not found'}
          </p>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Scan ID: {scanId}
          </p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  if (currentScan.status === 'failed') {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="text-center">
          <p className={`mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>Scan failed: {currentScan.errorMessage}</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`border-b p-6 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
      >
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Audit Results</h1>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Repository scan completed</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
            <Button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? 'Generating PDF...' : 'Download Report'}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-5xl mx-auto p-8"
      >
        {currentScan.status === 'completed' ? (
          <ResultsPage scan={currentScan} userRole={user?.role} />
        ) : (
          <div className="text-center py-12">
            <div className={`w-12 h-12 border-3 rounded-full mx-auto animate-spin ${isDark ? 'border-slate-700 border-t-slate-300' : 'border-slate-200 border-t-slate-900'}`} />
            <p className={`mt-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Scan in progress...</p>
          </div>
        )}
      </motion.main>
    </div>
  );
};
