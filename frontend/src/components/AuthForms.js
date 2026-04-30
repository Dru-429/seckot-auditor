import React from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from './UI';
import { useTheme } from '../context/ThemeContext';

export const LoginForm = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }
    onSubmit(email, password);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={formError}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={error}
      />
      {formError && <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{formError}</p>}
      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </motion.form>
  );
};

export const SignupForm = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    onSubmit(email, password);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password (min. 6 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {formError && <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{formError}</p>}
      {error && <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</p>}
      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </Button>
    </motion.form>
  );
};

export const RoleSelector = ({ onSelectRole, loading }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h3 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>How will you use Secko Auditor?</h3>
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectRole('developer')}
          disabled={loading}
          className={`p-6 border-2 rounded-lg transition-all text-center ${isDark ? 'border-slate-600 hover:border-slate-500 hover:bg-slate-700' : 'border-slate-200 hover:border-slate-900 hover:bg-slate-50'}`}
        >
          <div className="text-2xl mb-2">👨‍💻</div>
          <h4 className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Developer</h4>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Technical details & logs</p>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectRole('client')}
          disabled={loading}
          className={`p-6 border-2 rounded-lg transition-all text-center ${isDark ? 'border-slate-600 hover:border-slate-500 hover:bg-slate-700' : 'border-slate-200 hover:border-slate-900 hover:bg-slate-50'}`}
        >
          <div className="text-2xl mb-2">🏢</div>
          <h4 className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Client</h4>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Plain English reports</p>
        </motion.button>
      </div>
    </motion.div>
  );
};
