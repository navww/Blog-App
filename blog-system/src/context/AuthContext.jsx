import { createContext, useContext, useState, useEffect } from 'react';
import Toast from '../components/Toast';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const login = (email, password) => {
    // In a real app, you would validate against a backend
    // For demo purposes, we'll use a simple check
    if (email && password) {
      const userData = { email, id: Date.now() };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      showToast('Successfully logged in!', 'success');
      return Promise.resolve(userData);
    }
    showToast('Invalid credentials', 'error');
    return Promise.reject(new Error('Invalid credentials'));
  };

  const register = (email, password) => {
    // In a real app, you would create a user in your backend
    // For demo purposes, we'll just create a local user
    if (email && password) {
      const userData = { email, id: Date.now() };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      showToast('Account created successfully!', 'success');
      return Promise.resolve(userData);
    }
    showToast('Invalid registration data', 'error');
    return Promise.reject(new Error('Invalid registration data'));
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    showToast('Successfully logged out!', 'success');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </AuthContext.Provider>
  );
}; 