import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
const RegistrationSuccess = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  useEffect(() => {
    if (keycloak.authenticated) {
      // Redirect to profile update with Keycloak email
      navigate('/update-profile', {
        state: {
          fromSignup: true,
          email: keycloak.tokenParsed?.email || ''
        }
      });
    }
  }, [keycloak.authenticated, navigate]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
        <p>Redirecting to profile setup...</p>
      </div>
    </div>
  );
};
export default RegistrationSuccess;