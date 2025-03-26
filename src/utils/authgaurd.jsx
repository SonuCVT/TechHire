import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
const AuthGuard = ({ children, allowedRoles }) => {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!initialized) return;
    if (!keycloak.authenticated) {
      keycloak.login();
      return;
    }
    // Only handle the initial signup redirect
    const fromSignup = location.state?.fromSignup;
    if (fromSignup && location.pathname !== '/update-profile') {
      navigate('/update-profile', { state: { fromSignup: true } });
      return;
    }
    // Role-based access control
    if (allowedRoles) {
      const userRoles = keycloak.tokenParsed?.realm_access?.roles || [];
      const hasRequiredRole = allowedRoles.some(role =>
        userRoles.includes(role.toUpperCase())
      );
      if (!hasRequiredRole) {
        navigate('/unauthorized');
      }
    }
  }, [keycloak, initialized, navigate, allowedRoles, location]);
  if (!initialized || !keycloak.authenticated) {
    return <div>Loading...</div>;
  }
  return children;
};
export default AuthGuard;