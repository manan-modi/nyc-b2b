
import { useState, useEffect } from "react";
import { isAuthenticated } from "@/lib/auth";
import AdminLogin from "./AdminLogin";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const isAuth = isAuthenticated();
    setAuthenticated(isAuth);
  };

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  // Loading state
  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!authenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // Show protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
