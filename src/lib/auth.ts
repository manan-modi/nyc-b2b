
// Simple hash function for password verification
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

// Default admin password - you can change this
const ADMIN_PASSWORD_HASH = simpleHash('admin123');
const SESSION_KEY = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface Session {
  token: string;
  expiresAt: number;
}

export const login = (password: string): boolean => {
  const passwordHash = simpleHash(password);
  
  if (passwordHash === ADMIN_PASSWORD_HASH) {
    const session: Session = {
      token: Date.now().toString() + Math.random().toString(36),
      expiresAt: Date.now() + SESSION_DURATION
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }
  
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = (): boolean => {
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) return false;
    
    const session: Session = JSON.parse(sessionData);
    
    // Check if session has expired
    if (Date.now() > session.expiresAt) {
      logout();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking authentication:', error);
    logout();
    return false;
  }
};
