import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
const SignupPage = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  const handleSignup = () => {
    // Method 1: Using Keycloak's built-in register function
    keycloak.register({
      redirectUri: window.location.origin + '/registration-success',
      action: 'register'
    }).catch(err => {
      console.error('Registration error:', err);
      // Method 2: Manual URL fallback
      const authUrl = `${keycloak.authServerUrl}/realms/${
        keycloak.realm
      }/protocol/openid-connect/registrations?client_id=${
        keycloak.clientId
      }&redirect_uri=${
        encodeURIComponent(window.location.origin + '/registration-success')
      }&response_type=code`;
      window.location.href = authUrl;
    });
  };
  return (
    <div className="flex h-screen items-center justify-center bg-[url('/public/login_page_bg.jpg')] bg-cover bg-center">
      <div className="flex shadow-lg rounded-lg overflow-hidden w-full max-w-xl bg-[#ffffff99] backdrop-blur-xs">
        <div className="w-full p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-center uppercase tracking-[1px]">
            Sign Up
          </h2>
          <button
            onClick={handleSignup}
            className="w-full bg-[#48596F] text-white py-2 rounded-md mb-4"
          >
            Create Account
          </button>
          <p className="text-sm text-center">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#48596F] font-medium"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;