import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../validation/authSchema";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      await signup(data);
      console.log("Signup success");

      navigate("/login", {
        replace: true,
        state: { success: "Account created successfully." },
      });
      reset();
    } catch (err) {
      console.error("Signup error:", err);
      alert(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div
        className={`w-full max-w-lg p-10 rounded-2xl shadow-sm border border-gray-100 ${
          theme === "dark"
            ? "bg-[#312F2C] text-[#FAFAFA]"
            : "bg-[#ECF0FF] text-[#312F2C]"
        }`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Create an account
          </h2>
          <p className="mt-2">Join us and start your professional journey</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Username</label>
            <input
              type="text"
              placeholder="johndoe"
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
                errors.username
                  ? "border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-50"
              }`}
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1.5 ml-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
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

          {/* Password Grid (Two Columns for desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-[10px] font-bold tracking-widest px-2">
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Confirm
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-50"
                  }`}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-[10px] font-bold tracking-widest px-2">
                  {showConfirmPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Account Type
            </label>
            <select
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-[#312F2C] text-[#FAFAFA]"
                  : "bg-[#ECF0FF] text-[#312F2C]"
              } ${
                errors.role
                  ? "border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-50"
              }`}
              {...register("role")}>
              <option value="">Select a role</option>
              <option value="user">User</option>
              <option value="customer">Customer</option>
              <option value="admin">Administrator</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1.5 ml-1">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-900 active:scale-[0.98] transition-all disabled:opacity-70">
              {isSubmitting ? "Creating account..." : "Get Started"}
            </button>

            <button
              type="button"
              onClick={reset}
              className="w-full bg-transparent text-gray-500 font-medium py-2 text-sm hover:text-gray-700 transition-colors">
              Clear form
            </button>
          </div>

          {/* Footer Link */}
          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline transition-all">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
