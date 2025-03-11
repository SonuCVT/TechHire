import "./../assets/css/global.css";
import React, { useState } from "react";
import googleLogo from "./../assets/images/google_G.png";
import microsoftLogo from "./../assets/images/microsoft_logo.jpg";
import signupIllustration from "./../assets/images/signup-illustration.svg";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}/;
    return re.test(password);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
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

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (isValid) {
      console.log("Email:", email);
      console.log("Role:", role);
      console.log("Password:", password);
      navigate("/");
      alert("Signup successful!!");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section: Animated Background */}
      <div className="w-2/3 relative flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
        {/* Floating Animated Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-50">
          {/* Large Floating Circles */}
          <div className="absolute w-32 h-32 bg-white bg-opacity-10 rounded-full top-10 left-20 animate-pulse"></div>
          <div className="absolute w-24 h-24 bg-white bg-opacity-10 rounded-full top-1/2 left-1/4 animate-bounce"></div>
          <div className="absolute w-20 h-20 bg-white bg-opacity-10 rounded-full bottom-16 right-16 animate-spin-slow"></div>

          {/* Smaller Floating Dots */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-4 h-4 bg-white bg-opacity-20 rounded-full animate-float`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 5}s`,
              }}
            ></div>
          ))}

          {/* Rotating Rings */}
          <div className="absolute w-24 h-24 border border-white rounded-full top-14 left-1/3 animate-rotate-circle"></div>
          <div className="absolute w-16 h-16 border border-white rounded-full bottom-12 right-1/4 animate-spin-fast"></div>

          {/* Pulsating Waves */}
          <div className="absolute w-28 h-28 bg-white bg-opacity-5 rounded-full top-28 right-32 animate-wave"></div>
          <div className="absolute w-32 h-32 bg-white bg-opacity-5 rounded-full bottom-32 left-24 animate-wave"></div>

          {/* Floating Squares */}
          <div className="absolute w-14 h-14 bg-indigo-400 bg-opacity-30 rounded-lg top-1/4 left-10 animate-float"></div>
          <div className="absolute w-12 h-12 bg-blue-300 bg-opacity-30 rounded-lg bottom-24 right-12 animate-float-reverse"></div>
          <div className="absolute w-10 h-10 bg-white bg-opacity-20 rounded-lg top-1/3 right-1/4 animate-float"></div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-4xl font-bold text-white z-10 text-center">
          Sign Up
        </h1>
      </div>

      {/* Right Section: Signup Form */}
      <div className="w-1/3 flex flex-col justify-center p-8 relative">
        <div className="absolute left-[-70%] right-[50%] bg-[#fff] p-[30px] translate-[50%, 50%]">
          <div className="mb-4 flex items-center gap-4">
            <div className="">
              <label className="mr-4">
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  checked={role === "candidate"}
                  onChange={() => setRole("candidate")}
                />{" "}
                Candidate
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="hr"
                  checked={role === "hr"}
                  onChange={() => setRole("hr")}
                />{" "}
                HR
              </label>
            </div>
          </div>

          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium">
                Full Name :
              </label>
              <input
                type="email"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 font-medium">Email :</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  emailError ? "border-red-500" : "focus:ring-blue-500"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="mb-4">
              <div className="relative w-full">
                <label className="block text-gray-600 font-medium">
                  Password :
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      passwordError ? "border-red-500" : "focus:ring-blue-500"
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute top-[10px] right-[10px] flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <div className="mb-4">
              <div className="relative w-full">
                <label className="block text-gray-600 font-medium">
                  Repeat Password:
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Please enter your password again"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      confirmPasswordError
                        ? "border-red-500"
                        : "focus:ring-blue-500"
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute top-[10px] right-[10px] flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-sm mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
            >
              Sign Up
            </button>
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
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
