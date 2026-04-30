import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, LoadingSpinner } from './UI';
import { useTheme } from '../context/ThemeContext';
import { useScan } from '../hooks/useScan';

export const ScanInput = ({ onScanSubmit }) => {
  const [githubUrl, setGithubUrl] = useState('');
  const [error, setError] = useState('');
  const { loading } = useScan();
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!githubUrl.trim()) {
      setError('Please enter a GitHub URL');
      return;
    }

    if (!githubUrl.includes('github.com')) {
      setError('Please enter a valid GitHub URL');
      return;
    }

    try {
      await onScanSubmit(githubUrl);
      setGithubUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to initiate scan');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="url"
          placeholder="Paste GitHub repository URL (e.g., https://github.com/username/repo)"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          error={error}
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <LoadingSpinner size="sm" />
              Scanning...
            </span>
          ) : (
            'Start Security Scan'
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export const ScanningAnimation = () => {
  const { isDark } = useTheme();

  return (
    <motion.div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-4"
      >
        <div className={`w-16 h-16 border-4 rounded-full ${isDark ? 'border-slate-700 border-t-slate-300' : 'border-slate-200 border-t-slate-900'}`} />
      </motion.div>
      <motion.h3
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
      >
        Analyzing repository...
      </motion.h3>
      <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>This may take a few moments</p>
    </motion.div>
  );
};

export const ScanHistoryList = ({ scans, onSelectScan, onDeleteScan, loading }) => {
  const { isDark } = useTheme();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (!scans || scans.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>No scans yet. Start by running your first scan!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      {scans.map((scan, idx) => (
        <motion.div
          key={scan._id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${isDark ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-50'}`}
          onClick={() => onSelectScan(scan)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className={`font-semibold truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{scan.githubUrl}</h4>
              <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {new Date(scan.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{scan.score || '-'}</div>
              <span
                className={`text-xs font-semibold ${
                  scan.status === 'completed'
                    ? isDark ? 'text-green-400' : 'text-green-600'
                    : scan.status === 'failed'
                    ? isDark ? 'text-red-400' : 'text-red-600'
                    : isDark ? 'text-yellow-400' : 'text-yellow-600'
                }`}
              >
                {scan.status}
              </span>
            </div>
          </div>
          {scan.status === 'completed' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteScan(scan._id);
              }}
              className={`mt-3 text-xs ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
            >
              Delete Scan
            </button>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};
