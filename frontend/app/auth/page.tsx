"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [organizationStatus, setOrganizationStatus] = useState<
    "checking" | "verified" | "not-verified" | null
  >(null);
  const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState(""); // Add this line
  const searchParams = useSearchParams();

  useEffect(() => {
    const form = searchParams.get("form");
    if (form === "signup") {
      setIsLogin(false);
    } else if (form === "login") {
      setIsLogin(true);
    }
  }, [searchParams]);

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const checkOrganizationStatus = async (email: string) => {
    setOrganizationStatus("checking");

    // Mock organization verification - in real implementation, this would call your backend
    const organizationDomains = [
      "university.edu",
      "techclub.org",
      "studentassoc.edu",
      "campusorg.edu",
    ];

    const emailDomain = email.split("@")[1];
    const isOrganization = organizationDomains.includes(emailDomain);

    // Simulate API delay
    setTimeout(() => {
      setOrganizationStatus(isOrganization ? "verified" : "not-verified");
    }, 1000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setUserEmail(email);

    // Reset organization status when email changes
    if (organizationStatus) {
      setOrganizationStatus(null);
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number) => {
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Medium";
    return "Strong";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      // Signup logic
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/signup",
          {
            name,
            email: userEmail,
            password,
          },
          { withCredentials: true } // send cookies to backend
        );

        // Redirect to dashboard after successful signup
        if (response.status === 200) {
          window.location.href = "/dashboard";
        } else {
          alert(response.data?.message || "Signup failed");
        }
      } catch (err: any) {
        alert(
          err?.response?.data?.message || "Signup failed. Please try again."
        );
      }
      return;
    } else {
      // Login logic
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: userEmail,
            password,
          },
          { withCredentials: true } // send cookies to backend
        );

        console.log("Token", document.cookie); // Debugging line
        // Redirect to dashboard after successful login

        if (response.status === 200) {
          window.location.href = "/dashboard";
        } else {
          alert(response.data?.message || "Login failed");
        }
      } catch (err: any) {
        alert(
          err?.response?.data?.message || "Login failed. Please try again."
        );
      }
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? "Welcome Back!" : "Create an Account"}
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? "Sign in to access your campus events"
                : "Join thousands of students discovering amazing events"}
            </p>
            {searchParams.get("redirect") === "organizer" && (
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <AlertCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-purple-800">
                    Organization Verification Required
                  </h3>
                </div>
                <p className="text-sm text-purple-700 mb-3">
                  To access the Event Organizer Dashboard, you must be
                  affiliated with a registered organization.
                </p>
                <div className="text-xs text-purple-600 bg-white/50 rounded-lg p-2">
                  <strong>Accepted domains:</strong> university.edu,
                  techclub.org, studentassoc.edu, campusorg.edu
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Sign Up Fields */}
            {!isLogin && (
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={name} // Add this line
                    onChange={(e) => setName(e.target.value)} // Add this line
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                name="email"
                value={userEmail}
                onChange={handleEmailChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {searchParams.get("redirect") === "organizer" &&
              organizationStatus && (
                <div className="space-y-3">
                  {organizationStatus === "checking" && (
                    <Alert className="border-blue-200 bg-blue-50">
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                        <AlertDescription className="text-blue-700 font-medium">
                          Verifying your organization status...
                        </AlertDescription>
                      </div>
                    </Alert>
                  )}

                  {organizationStatus === "verified" && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <AlertDescription className="text-green-700 font-medium">
                        ✅ Organization Verified! You can now access the
                        Organizer Dashboard.
                      </AlertDescription>
                    </Alert>
                  )}

                  {organizationStatus === "not-verified" && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <AlertDescription className="text-red-700">
                        <div className="space-y-2">
                          <p className="font-medium">
                            ❌ Organization Not Found
                          </p>
                          <p className="text-sm">
                            Your email domain is not associated with a
                            registered organization. Only verified organization
                            members can create and manage events.
                          </p>
                          <p className="text-xs text-red-600">
                            Contact support if you believe this is an error.
                          </p>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

            {/* Password Field */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator (Sign Up Only) */}
            {!isLogin && password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Password Strength:</span>
                  <span
                    className={`font-medium ${
                      passwordStrength <= 2
                        ? "text-red-600"
                        : passwordStrength <= 3
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {getStrengthText(passwordStrength)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(
                      passwordStrength
                    )}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Forgot Password Link (Login Only) */}
            {isLogin && (
              <div className="text-right">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            {/* Terms Checkbox (Sign Up Only) */}
            {!isLogin && (
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) =>
                    setAgreedToTerms(checked as boolean)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-relaxed"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-purple-600 hover:text-purple-700 underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-purple-600 hover:text-purple-700 underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
              disabled={
                (!isLogin && !agreedToTerms) ||
                (searchParams.get("redirect") === "organizer" &&
                  organizationStatus === "not-verified")
              }
            >
              {organizationStatus === "checking"
                ? "Verifying..."
                : isLogin
                ? "Log In"
                : "Sign Up"}
            </Button>

            {searchParams.get("redirect") === "organizer" &&
              !organizationStatus &&
              userEmail && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => checkOrganizationStatus(userEmail)}
                  className="w-full h-12 border-2 border-purple-300 hover:border-purple-400 text-purple-700 font-semibold rounded-lg transition-colors bg-purple-50 hover:bg-purple-100 flex items-center justify-center space-x-3"
                >
                  <AlertCircle className="w-4 h-4" />
                  Verify Organization Status
                </Button>
              )}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google SSO Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors flex items-center justify-center space-x-3 bg-transparent"
              onClick={() => {
                window.location.href = "http://localhost:5000/api/oauth/google";
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </Button>
          </form>

          {/* Toggle Link */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
