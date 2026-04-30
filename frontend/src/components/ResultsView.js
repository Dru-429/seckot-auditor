import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './UI';
import { useTheme } from '../context/ThemeContext';
import { translateVulnerability, getSeverityColor, getScoreGrade } from '../utils/helpers';

export const DeveloperView = ({ scan }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Technical Report</h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Object.entries(scan.summary || {}).map(([severity, count]) => (
            <div key={severity} className={`rounded-lg p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
              <div className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{count}</div>
              <div className={`text-xs capitalize ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{severity}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Vulnerabilities</h3>
        <div className="space-y-3">
          {(scan.vulnerabilities || []).map((vuln, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 border rounded-lg ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{vuln.vulnerabilityType}</h4>
                <Badge severity={vuln.severity}>{vuln.severity}</Badge>
              </div>
              <div className={`space-y-1 text-sm font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <p>📁 {vuln.filePath}:{vuln.lineNumber}</p>
                <p>{vuln.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800 text-slate-100' : 'bg-slate-900 text-white'}`}>
        <h4 className="font-semibold mb-2">Raw Report</h4>
        <pre className={`text-xs overflow-auto max-h-64 p-3 rounded ${isDark ? 'bg-slate-900' : 'bg-slate-800'}`}>
          {JSON.stringify(scan.rawReport, null, 2)}
        </pre>
      </div>
    </motion.div>
  );
};

export const ClientView = ({ scan }) => {
  const scoreGrade = getScoreGrade(scan.score || 0);
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Score Card */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className={`rounded-lg p-8 ${isDark ? 'bg-slate-800 text-slate-100' : 'bg-gradient-to-br from-slate-900 to-slate-800 text-white'}`}
        >
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">{scan.score}</div>
            <div className="text-2xl font-semibold">{scoreGrade.grade}</div>
            <div className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-300'}`}>{scoreGrade.label}</div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <div className={`border rounded-lg p-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Security Status</h4>
            <div className="space-y-2">
              {Object.entries(scan.summary || {}).map(([severity, count]) => (
                <div key={severity} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getSeverityColor(severity)}`} />
                  <span className={`text-sm capitalize ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{severity}: {count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Plain English Issues */}
      <div>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Issues Found</h3>
        <div className="space-y-3">
          {(scan.vulnerabilities || []).map((vuln, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-lg border-l-4 ${
                vuln.severity === 'critical'
                  ? isDark ? 'bg-red-900 border-red-600 text-red-100' : 'bg-red-50 border-red-500 text-slate-900'
                  : vuln.severity === 'high'
                  ? isDark ? 'bg-orange-900 border-orange-600 text-orange-100' : 'bg-orange-50 border-orange-500 text-slate-900'
                  : isDark ? 'bg-yellow-900 border-yellow-600 text-yellow-100' : 'bg-yellow-50 border-yellow-500 text-slate-900'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className={`font-semibold ${isDark && (vuln.severity === 'critical' || vuln.severity === 'high' || vuln.severity === 'medium') ? '' : ''}`}>
                  {translateVulnerability(vuln.vulnerabilityType)}
                </h4>
                <Badge severity={vuln.severity}>{vuln.severity}</Badge>
              </div>
              <p className={`text-sm mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{vuln.description}</p>
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Location: {vuln.filePath}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <div className={`rounded-lg p-6 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
        <h4 className={`font-semibold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Next Steps</h4>
        <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
          <li>✓ Review all identified issues with your development team</li>
          <li>✓ Prioritize fixes based on severity levels</li>
          <li>✓ Track remediation progress</li>
          <li>✓ Re-scan after implementing fixes</li>
        </ul>
      </div>
    </motion.div>
  );
};

export const ResultsPage = ({ scan, userRole }) => {
  const { isDark } = useTheme();
  const id = `results-${scan._id}`;
  const scoreGrade = getScoreGrade(scan.score || 0);
  const scanDurationMinutes = Math.round((scan.scanDuration || 0) / 1000 / 60);

  return (
    <div id={id} className={`p-8 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          Security Audit Report
        </h1>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Repository: {scan.githubUrl}
        </p>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Scanned on {new Date(scan.createdAt).toLocaleDateString()} • {scan.status === 'completed' && `${scanDurationMinutes} min scan`}
        </p>
      </div>

      {/* Score Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-8 rounded-lg p-8 shadow-lg ${isDark ? 'bg-slate-800 text-slate-100' : 'bg-gradient-to-br from-slate-900 to-slate-800 text-white'}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-4">Overall Security Score</h2>
            <div className="flex items-baseline gap-3">
              <div className="text-6xl font-bold">{scan.score || 'N/A'}</div>
              <div className="text-2xl font-semibold">{scoreGrade.grade}</div>
            </div>
            <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-300'}`}>{scoreGrade.label}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(scan.summary || {}).map(([severity, count]) => (
              <div key={severity} className={`rounded-lg p-4 text-center ${isDark ? 'bg-white bg-opacity-5' : 'bg-white bg-opacity-10'}`}>
                <div className="text-2xl font-bold">{count}</div>
                <div className={`text-xs capitalize ${isDark ? 'text-slate-400' : 'text-slate-300'}`}>{severity}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content based on role */}
      {userRole === 'developer' ? (
        <DeveloperView scan={scan} />
      ) : (
        <ClientView scan={scan} />
      )}
    </div>
  );
};
