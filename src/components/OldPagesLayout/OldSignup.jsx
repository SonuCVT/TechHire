import React, { useState } from "react";
import googleLogo from "./../assets/images/google_G.png";
import microsoftLogo from "./../assets/images/microsoft_logo.jpg";
import signupIllustration from "./../assets/images/signup-illustration.svg";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
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
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-7xl">
        {/* Left Section - Illustration */}
        <div className="w-1/2 bg-blue-50 flex items-center justify-center">
          <img
            src={signupIllustration}
            alt="Signup Illustration"
            className="w-full"
          />
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>
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

export default SignUpPage;
