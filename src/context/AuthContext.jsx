import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Initialize from sessionStorage on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    // Audit Logging
    const auditLogs = JSON.parse(localStorage.getItem('auditLogs')) || [];
    const newLog = {
      id: Date.now().toString(),
      name: userData.fullName || userData.firstName,
      role: userData.role || 'user',
      loginTime: new Date().toISOString(),
      logoutTime: null
    };
    auditLogs.unshift(newLog); // Add to beginning
    localStorage.setItem('auditLogs', JSON.stringify(auditLogs));

    // Save session ID so logout can find it
    userData.sessionId = newLog.id;

    // Save to sessionStorage so it persists across reloads but clears on close tab
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Record logout time in audit log
    if (user && user.sessionId) {
      const auditLogs = JSON.parse(localStorage.getItem('auditLogs')) || [];
      const updatedLogs = auditLogs.map(log => {
        if (log.id === user.sessionId) {
          return { ...log, logoutTime: new Date().toISOString() };
        }
        return log;
      });
      localStorage.setItem('auditLogs', JSON.stringify(updatedLogs));
    }

    sessionStorage.removeItem('currentUser');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
