import React from 'react';
import { motion } from 'framer-motion';
import { Badge, ProgressBar } from './UI';
import { translateVulnerability, getSeverityColor, getSeverityTextColor, getScoreGrade } from '../utils/helpers';

export const DeveloperView = ({ scan }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Technical Report</h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Object.entries(scan.summary || {}).map(([severity, count]) => (
            <div key={severity} className="bg-slate-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-slate-900">{count}</div>
              <div className="text-xs text-slate-600 capitalize">{severity}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Vulnerabilities</h3>
        <div className="space-y-3">
          {(scan.vulnerabilities || []).map((vuln, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 border border-slate-200 rounded-lg bg-slate-50"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-slate-900">{vuln.type}</h4>
                <Badge severity={vuln.severity}>{vuln.severity}</Badge>
              </div>
              <div className="space-y-1 text-sm text-slate-600 font-mono">
                <p>📁 {vuln.filePath}:{vuln.lineNumber}</p>
                <p>{vuln.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-slate-900 text-white rounded-lg">
        <h4 className="font-semibold mb-2">Raw Report</h4>
        <pre className="text-xs overflow-auto max-h-64 bg-slate-800 p-3 rounded">
          {JSON.stringify(scan.rawReport, null, 2)}
        </pre>
      </div>
    </motion.div>
  );
};

export const ClientView = ({ scan }) => {
  const scoreGrade = getScoreGrade(scan.score || 0);

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
          className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-lg p-8"
        >
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">{scan.score}</div>
            <div className="text-2xl font-semibold">{scoreGrade.grade}</div>
            <div className="text-sm text-slate-300 mt-2">{scoreGrade.label}</div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Security Status</h4>
            <div className="space-y-2">
              {Object.entries(scan.summary || {}).map(([severity, count]) => (
                <div key={severity} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getSeverityColor(severity)}`} />
                  <span className="text-sm text-slate-600 capitalize">{severity}: {count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Plain English Issues */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Issues Found</h3>
        <div className="space-y-3">
          {(scan.vulnerabilities || []).map((vuln, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-lg border-l-4 ${
                vuln.severity === 'critical'
                  ? 'bg-red-50 border-red-500'
                  : vuln.severity === 'high'
                  ? 'bg-orange-50 border-orange-500'
                  : 'bg-yellow-50 border-yellow-500'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-slate-900">
                  {translateVulnerability(vuln.type)}
                </h4>
                <Badge severity={vuln.severity}>{vuln.severity}</Badge>
              </div>
              <p className="text-sm text-slate-700 mb-2">{vuln.description}</p>
              <div className="text-xs text-slate-600">
                Location: {vuln.filePath}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-slate-50 rounded-lg p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Next Steps</h4>
        <ul className="space-y-2 text-sm text-slate-700">
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
  const id = `results-${scan._id}`;

  return (
    <div id={id} className="bg-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {scan.githubUrl}
        </h1>
        <p className="text-sm text-slate-600">
          Scanned on {new Date(scan.createdAt).toLocaleDateString()}
        </p>
      </div>

      {userRole === 'developer' ? (
        <DeveloperView scan={scan} />
      ) : (
        <ClientView scan={scan} />
      )}
    </div>
  );
};
