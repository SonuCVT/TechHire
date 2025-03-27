import { useKeycloak } from '@react-keycloak/web';
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../assets/images/google_G.png";
import microsoftLogo from "../assets/images/microsoft_logo.jpg";
const LoginPage = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  const handleKeycloakLogin = () => {
    keycloak.login({
      redirectUri: `${window.location.origin}/auth-loading`
    });
  };
  const handleSocialLogin = (provider) => {
    keycloak.login({
      idpHint: provider,
      redirectUri: `${window.location.origin}/auth-loading`
    });
  };
  return (
    <div className="flex h-screen items-center justify-center bg-[url('/public/login_page_bg.jpg')] bg-cover bg-center">
      <div className="flex shadow-lg rounded-lg overflow-hidden w-full max-w-xl bg-[#ffffff99] backdrop-blur-xs">
        <div className="w-full p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-center uppercase tracking-[1px]">
            Log In
          </h2>
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