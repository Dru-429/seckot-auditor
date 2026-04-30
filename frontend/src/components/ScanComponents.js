import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';
import { Button, Input, LoadingSpinner, Badge, CircularProgress } from './UI';
import { useTheme } from '../context/ThemeContext';
import { useScan } from '../hooks/useScan';
import { useNavigate } from 'react-router-dom';

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

const getRepoName = (githubUrl) => {
  const match = githubUrl.match(/github\.com\/([^\/]+\/[^\/]+)/);
  return match ? match[1] : githubUrl;
};

const getStatusBadge = (status) => {
  if (status === 'completed') return <Badge severity="success">Completed</Badge>;
  if (status === 'failed') return <Badge severity="danger">Failed</Badge>;
  return <Badge severity="warning">Pending</Badge>;
};

const getScoreValue = (score) => {
  if (score >= 90) return 'success';
  if (score >= 70) return 'warning';
  return 'danger';
};

export const ScanHistoryList = ({ scans, onSelectScan, onDeleteScan, loading }) => {
  const { isDark } = useTheme();
  const [openRow, setOpenRow] = useState(null);
  const navigate = useNavigate();

  const handleActionToggle = (event, id) => {
    event.stopPropagation();
    setOpenRow(openRow === id ? null : id);
  };

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
    <div className="space-y-4">
      {scans.map((scan, idx) => {
        const repoName = getRepoName(scan.githubUrl);
        const status = scan.status || 'pending';
        const scoreValue = scan.score || 0;
        const statusBadge = getStatusBadge(status);

        return (
          <motion.div
            key={scan._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={`group relative rounded-3xl border bg-white p-5 shadow-sm transition hover:shadow-md ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200'}`}
            onClick={() => onSelectScan(scan)}
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{repoName}</p>
                <p className="mt-1 text-sm text-slate-500 truncate">{scan.githubUrl}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {status === 'scanning' ? (
                  <div className="animate-pulse rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                    Pending
                  </div>
                ) : statusBadge}
                <div className="flex items-center gap-3">
                  <CircularProgress value={scoreValue} size={44} />
                  <p className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Score</p>
                </div>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => handleActionToggle(e, scan._id)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
                {openRow === scan._id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-12 z-10 w-40 rounded-2xl border border-slate-200 bg-white py-2 shadow-lg"
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenRow(null);
                        onDeleteScan(scan._id);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-rose-600 transition hover:bg-slate-50"
                    >
                      Delete Scan
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Scanned:</span> {new Date(scan.createdAt).toLocaleDateString()}
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Vulnerabilities:</span> {scan.summary ? Object.values(scan.summary).reduce((sum, count) => sum + count, 0) : 0}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
