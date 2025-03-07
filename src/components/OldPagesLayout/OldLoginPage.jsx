import React from "react";
import googleLogo from "./../assets/images/google_G.png";
import microsoftLogo from "./../assets/images/microsoft_logo.jpg";
import loginIllustrationImage from "./../assets/images/login-illustration.png";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}/;
    return re.test(password);
  };

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent page refresh
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Please enter a valid password");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      console.log("Email:", email);
      console.log("Password:", password);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-7xl">
        {/* Left Section - Login Form */}
        <div className="w-2/5 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6 custom-h2">Log In</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium">
                Enter Your Email :
              </label>
              <input
                type="email"
                placeholder="Please enter your email address"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  emailError ? "border-red-500" : "focus:ring-blue-500"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => {
                  if (!validateEmail(email)) {
                    setEmailError("Please enter a valid email address");
                  } else {
                    setEmailError("");
                  }
                }}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="mb-4 relative">
              <div className="relative">
                <label className="block text-gray-600 font-medium">
                  Enter Your Password :
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Please enter your password"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    passwordError ? "border-red-500" : "focus:ring-blue-500"
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => {
                    if (!validatePassword(password)) {
                      setPasswordError(
                        "Password must be at least 8 characters long"
                      );
                    } else {
                      setPasswordError("");
                    }
                  }}
                />
                <button
                  type="button"
                  c
                  className="absolute top-[0px] right-3 flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                onClick={handleLogin}
              >
                Log In
              </button>
            </div>
            <div className="text-right mb-4">
              <a href="#" className="text-blue-500 text-sm">
                Forgot password?
              </a>
            </div>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex gap-4">
            <a
              className="flex-1 border px-4 py-2 rounded-md flex items-center justify-center gap-2"
              href="#"
            >
              <img src={googleLogo} alt="Google" className="w-5 h-5" />
              Google
            </a>

            <a
              className="flex-1 border px-4 py-2 rounded-md flex items-center justify-center gap-2"
              href="#"
            >
              <img src={microsoftLogo} alt="Microsoft" className="w-5 h-5" />
              Microsoft
            </a>
          </div>

          <p className="text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right Section - Illustration */}
        <div className="w-3/5 flex items-center justify-center">
          <img
            src={loginIllustrationImage}
            alt="Login Illustration"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
