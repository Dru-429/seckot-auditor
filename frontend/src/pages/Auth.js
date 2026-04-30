import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '../components/UI';
import { LoginForm, RoleSelector, SignupForm } from '../components/AuthForms';
import { useAuth } from '../hooks/useAuth';

export const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const { loading, error, signup, login } = useAuth();

  const handleSignupClick = () => {
    setIsLogin(false);
    setShowRoleSelector(false);
  };

  const handleSelectRole = async (role) => {
    setSelectedRole(role);
    setShowRoleSelector(false);
  };

  const handleSignup = async (email, password) => {
    try {
      const role = selectedRole || 'developer';
      await signup(email, password, role);
      onLoginSuccess();
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      onLoginSuccess();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Secko Auditor</h1>
            <p className="text-slate-600 mt-2">Security scanning made simple</p>
          </div>

          {isLogin ? (
            <>
              <LoginForm
                onSubmit={handleLogin}
                loading={loading}
                error={error}
              />
              <p className="text-center text-sm text-slate-600 mt-6">
                Don't have an account?{' '}
                <button
                  onClick={handleSignupClick}
                  className="text-slate-900 font-semibold hover:underline"
                >
                  Sign up
                </button>
              </p>
            </>
          ) : (
            <>
              {showRoleSelector ? (
                <>
                  <RoleSelector
                    onSelectRole={handleSelectRole}
                    loading={loading}
                  />
                  <p className="text-center text-sm text-slate-600 mt-6">
                    <button
                      onClick={() => setShowRoleSelector(false)}
                      className="text-slate-900 font-semibold hover:underline"
                    >
                      Back
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <SignupForm
                    onSubmit={handleSignup}
                    loading={loading}
                    error={error}
                  />
                  <div className="mt-6">
                    <Button
                      variant="ghost"
                      onClick={() => setShowRoleSelector(true)}
                      className="w-full"
                    >
                      Next →
                    </Button>
                  </div>
                  <p className="text-center text-sm text-slate-600 mt-4">
                    Already have an account?{' '}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="text-slate-900 font-semibold hover:underline"
                    >
                      Login
                    </button>
                  </p>
                </>
              )}
            </>
          )}
        </Card>

        {/* Decorative elements */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-8 left-8 w-32 h-32 bg-slate-200 rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-16 right-16 w-40 h-40 bg-slate-300 rounded-full opacity-10 blur-3xl"
        />
      </motion.div>
    </div>
  );
};
