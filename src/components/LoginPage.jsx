import { useKeycloak } from '@react-keycloak/web';
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../assets/images/google_G.png";
import microsoftLogo from "../assets/images/microsoft_logo.jpg";
import { useEffect, useState } from 'react';
const LoginPage = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('CANDIDATE');
  const handleKeycloakLogin = () => {
    // For Keycloak direct login
    keycloak.login({
      redirectUri: window.location.origin
    });
  };
  const handleSocialLogin = (provider) => {
    // For social login
    keycloak.login({
      idpHint: provider,
      redirectUri: window.location.origin
    });
  };
  useEffect(() => {
    if (keycloak.authenticated) {
      const userRoles = keycloak.tokenParsed?.realm_access?.roles || [];
      if (userRoles.includes('HR')) {
        navigate('/hr-dashboard');
      } else if (userRoles.includes('CANDIDATE')) {
        navigate('/user-dashboard');
      }
    }
  }, [keycloak.authenticated, navigate, keycloak.tokenParsed]);
  return (
    <div className="flex h-screen items-center justify-center bg-[url('/public/login_page_bg.jpg')] bg-cover bg-center">
      <div className="flex shadow-lg rounded-lg overflow-hidden w-full max-w-xl bg-[#ffffff99] backdrop-blur-xs">
        <div className="w-full p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-center uppercase tracking-[1px]">
            Log In
          </h2>
          {/* Role Selection */}
          {/* <div className="mb-6">
            <label className="block text-sm font-medium mb-2">I want to login as:</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setSelectedRole('CANDIDATE')}
                className={`flex-1 py-2 rounded-md border ${
                  selectedRole === 'CANDIDATE'
                    ? 'bg-[#48596F] text-white border-[#48596F]'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                Candidate
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('HR')}
                className={`flex-1 py-2 rounded-md border ${
                  selectedRole === 'HR'
                    ? 'bg-[#48596F] text-white border-[#48596F]'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                HR
              </button>
            </div>
          </div> */}
          {/* Keycloak Login Button */}
          <button
            onClick={handleKeycloakLogin}
            className="w-full bg-[#48596F] text-white py-2 rounded-md hover:bg-[#3A4A5F] transition mb-4"
          >
            Login with Keycloak
          </button>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          {/* Social Login Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              className="flex-1 border px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition"
              onClick={() => handleSocialLogin('google')}
            >
              <img src={googleLogo} alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button
              type="button"
              className="flex-1 border px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition"
              onClick={() => handleSocialLogin('microsoft')}
            >
              <img src={microsoftLogo} alt="Microsoft" className="w-5 h-5" />
              Microsoft
            </button>
          </div>
          <p className="text-sm text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#48596F] font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;