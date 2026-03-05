import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signinSchema } from "../validation/authSchema";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  console.log("USERS:", user);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signinSchema),
    mode: "onSubmit",
  });

  // Redirect if already logged in
  // ✅ Fix 1: Role-aware redirect in useEffect
  useEffect(() => {
    if (user) {
      if (user.role === "customer") {
        navigate("/customer/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  // Load saved email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  // ✅ Fix 2: Remove the navigate from onSubmit entirely
  const onSubmit = async (data) => {
    try {
      setServerError("");
      await login(data); // this updates user in context → triggers useEffect above

      if (rememberMe) {
        localStorage.setItem("rememberEmail", data.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      // ❌ Remove navigate("/dashboard") from here
    } catch (errorMessage) {
      setServerError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-sm border border-gray-100${
          theme === "dark"
            ? "bg-[#312F2C] text-[#FAFAFA]"
            : "bg-[#ECF0FF] text-[#312F2C]"
        }`}>
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="mt-2">Please enter your details to sign in</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-50"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-medium">Password</label>
              <button
                type="button"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                onClick={() => alert("Reset functionality not connected")}>
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-50"
                }`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-medium px-2">
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm cursor-pointer select-none">
              Keep me signed in
            </label>
          </div>

          {/* Server Error Message */}
          {serverError && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
              {serverError}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-800 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-500">
            New here?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline transition-all">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
