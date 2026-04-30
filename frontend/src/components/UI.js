import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const Button = ({
  children,
  variant = 'default',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  const { isDark } = useTheme();
  const baseStyles =
    'font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    default: isDark 
      ? 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400'
      : 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500',
    outline: isDark
      ? 'border-2 border-slate-600 text-slate-100 hover:bg-slate-800'
      : 'border-2 border-slate-200 text-slate-900 hover:bg-slate-50',
    ghost: isDark
      ? 'text-slate-300 hover:bg-slate-800'
      : 'text-slate-700 hover:bg-slate-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, className = '', ...props }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`${
        isDark 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-slate-200'
      } border rounded-lg p-6 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const Input = ({
  placeholder = '',
  value,
  onChange,
  type = 'text',
  className = '',
  error = null,
  ...props
}) => {
  const { isDark } = useTheme();
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2.5 ${
          isDark
            ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-slate-400'
            : 'bg-white border-slate-200 text-slate-900 placeholder-slate-500 focus:ring-slate-900'
        } border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export const Badge = ({ children, severity = 'info', className = '' }) => {
  const { isDark } = useTheme();
  
  const severityStyles = {
    critical: isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
    high: isDark ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800',
    medium: isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
    low: isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
    info: isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-800',
    success: isDark ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-100 text-emerald-800',
    warning: isDark ? 'bg-amber-900 text-amber-200' : 'bg-amber-100 text-amber-800',
    danger: isDark ? 'bg-rose-900 text-rose-200' : 'bg-rose-100 text-rose-800',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
        severityStyles[severity] || severityStyles.info
      } ${className}`}
    >
      {children}
    </span>
  );
};

export const Avatar = ({ name = '', src, size = 'md', className = '' }) => {
  const initials = name
    .split(' ')
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  const sizes = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-22 h-12 text-base',
    lg: 'w-14 h-14 text-lg',
  };

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full bg-slate-200 text-slate-700 ${sizes[size]} ${className}`}>
      {src ? (
        <img src={src} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : (
        <span className="font-semibold">{initials || 'U'}</span>
      )}
    </div>
  );
};

export const CircularProgress = ({ value = 0, size = 48 }) => {
  const { isDark } = useTheme();
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, value));
  const offset = circumference - (progress / 100) * circumference;
  const trackColor = isDark ? '#1f2937' : '#e2e8f0';
  const progressColor = progress >= 90 ? '#16a34a' : progress >= 70 ? '#ca8a04' : '#dc2626';

  return (
    <div className="inline-flex items-center justify-center"> 
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={`absolute text-xs font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{Math.round(progress)}</span>
    </div>
  );
};

export const ProgressBar = ({ value = 0, max = 100, showLabel = true }) => {
  const { isDark } = useTheme();
  const percentage = (value / max) * 100;

  return (
    <div className="w-full">
      <div className={`w-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'} rounded-full h-2 overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className={isDark ? 'bg-slate-300' : 'bg-slate-900'}
        />
      </div>
      {showLabel && (
        <p className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} text-right`}>{percentage.toFixed(0)}%</p>
      )}
    </div>
  );
};

export const Modal = ({ isOpen, onClose, title, children }) => {
  const { isDark } = useTheme();
  
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className={`${
          isDark ? 'bg-slate-800' : 'bg-white'
        } rounded-lg shadow-xl p-6 max-w-md w-full mx-4`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{title}</h2>
          <button
            onClick={onClose}
            className={`${isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'} text-2xl`}
          >
            ×
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
};

export const Table = ({ columns, data, onRowClick }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`border ${isDark ? 'border-slate-700' : 'border-slate-200'} rounded-lg overflow-hidden`}>
      <table className="w-full">
        <thead>
          <tr className={`border-b ${isDark ? 'border-slate-700 bg-slate-700' : 'border-slate-200 bg-slate-50'}`}>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-6 py-3 text-left text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={`border-b ${isDark ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-50'} cursor-pointer transition-colors`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td key={col.key} className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const LoadingSpinner = ({ size = 'md' }) => {
  const { isDark } = useTheme();
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClass[size]} border-3 ${isDark ? 'border-slate-600 border-t-slate-300' : 'border-slate-200 border-t-slate-900'} rounded-full`}
    />
  );
};
