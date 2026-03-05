import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const Settings = () => {
  const { user } = useContext(AuthContext);
  const { theme, themeToggle } = useContext(ThemeContext);
  const { fetchUserData } = useContext(UserContext);

  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [profileStatus, setProfileStatus] = useState(null); // "success" | "error"
  const [passwordStatus, setPasswordStatus] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // ── Update Profile ──────────────────────────────────────────
  const handleProfileUpdate = async () => {
    if (!profileData.username.trim() || !profileData.email.trim()) return;
    setProfileLoading(true);
    setProfileStatus(null);
    try {
      await axios.put(
        `${import.meta.env.VITE_USER_URL}/${user._id}`,
        { username: profileData.username, email: profileData.email },
        { withCredentials: true },
      );
      await fetchUserData();
      setProfileStatus("success");
    } catch (err) {
      console.error("Profile update error:", err.response?.data || err.message);
      setProfileStatus("error");
    } finally {
      setProfileLoading(false);
      setTimeout(() => setProfileStatus(null), 3000);
    }
  };

  // ── Change Password ─────────────────────────────────────────
  const handlePasswordChange = async () => {
    setPasswordError("");
    setPasswordStatus(null);

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("All fields are required.");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setPasswordLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_USER_URL}/${user._id}/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { withCredentials: true },
      );
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordStatus("success");
    } catch (err) {
      const msg = err.response?.data?.message || "Password update failed.";
      setPasswordError(msg);
      setPasswordStatus("error");
    } finally {
      setPasswordLoading(false);
      setTimeout(() => setPasswordStatus(null), 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-6 font-sans antialiased">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-light tracking-tight">Settings</h1>
        <p className="text-sm mt-1 text-gray-400">
          Manage your studio profile and preferences.
        </p>
      </header>

      <div className="space-y-12">
        {/* ── Profile Section ── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
            Profile
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="group">
              <label className="block text-xs font-medium mb-1 group-focus-within:text-blue-500 transition-colors">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({ ...profileData, username: e.target.value })
                }
                className="w-full bg-transparent border-b py-2 outline-none focus:border-blue-500 transition-all"
                placeholder="Your name"
              />
            </div>
            <div className="group">
              <label className="block text-xs font-medium mb-1 group-focus-within:text-blue-500 transition-colors">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full bg-transparent border-b py-2 outline-none focus:border-blue-500 transition-all"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={handleProfileUpdate}
              disabled={profileLoading}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50 transition-colors">
              {profileLoading ? "Saving..." : "Update Profile"}
            </button>
            {profileStatus === "success" && (
              <span className="text-xs text-green-500 font-medium">
                ✓ Profile updated
              </span>
            )}
            {profileStatus === "error" && (
              <span className="text-xs text-red-500 font-medium">
                ✗ Update failed
              </span>
            )}
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* ── Change Password Section ── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
            Change Password
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {/* Current Password */}
            <div className="group relative">
              <label className="block text-xs font-medium mb-1 group-focus-within:text-blue-500 transition-colors">
                Current Password
              </label>
              <div className="flex items-center border-b focus-within:border-blue-500 transition-all">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="flex-1 bg-transparent py-2 outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      current: !showPasswords.current,
                    })
                  }
                  className="text-[10px] font-bold text-gray-400 hover:text-gray-600 px-1">
                  {showPasswords.current ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="group relative">
              <label className="block text-xs font-medium mb-1 group-focus-within:text-blue-500 transition-colors">
                New Password
              </label>
              <div className="flex items-center border-b focus-within:border-blue-500 transition-all">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="flex-1 bg-transparent py-2 outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      new: !showPasswords.new,
                    })
                  }
                  className="text-[10px] font-bold text-gray-400 hover:text-gray-600 px-1">
                  {showPasswords.new ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="group relative">
              <label className="block text-xs font-medium mb-1 group-focus-within:text-blue-500 transition-colors">
                Confirm New Password
              </label>
              <div className="flex items-center border-b focus-within:border-blue-500 transition-all">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="flex-1 bg-transparent py-2 outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      confirm: !showPasswords.confirm,
                    })
                  }
                  className="text-[10px] font-bold text-gray-400 hover:text-gray-600 px-1">
                  {showPasswords.confirm ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>
          </div>

          {/* Password strength indicator */}
          {passwordData.newPassword && (
            <div className="mt-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      passwordData.newPassword.length >= level * 3
                        ? level <= 1
                          ? "bg-red-400"
                          : level <= 2
                            ? "bg-amber-400"
                            : level <= 3
                              ? "bg-yellow-400"
                              : "bg-green-500"
                        : "bg-gray-100"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                {passwordData.newPassword.length < 4
                  ? "Too short"
                  : passwordData.newPassword.length < 7
                    ? "Weak"
                    : passwordData.newPassword.length < 10
                      ? "Fair"
                      : "Strong"}
              </p>
            </div>
          )}

          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={handlePasswordChange}
              disabled={passwordLoading}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50 transition-colors">
              {passwordLoading ? "Updating..." : "Change Password"}
            </button>
            {passwordStatus === "success" && (
              <span className="text-xs text-green-500 font-medium">
                ✓ Password updated
              </span>
            )}
          </div>
          {passwordError && (
            <p className="text-xs text-red-500 mt-2">{passwordError}</p>
          )}
        </section>

        <hr className="border-gray-100" />

        {/* ── Preferences Section ── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
            Preferences
          </h2>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </p>
              <p className="text-xs text-gray-400">
                Switch to {theme === "dark" ? "light" : "dark"} theme.
              </p>
            </div>
            <button
              onClick={themeToggle}
              className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${theme === "dark" ? "bg-blue-600" : "bg-gray-200"}`}>
              <div
                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-200 ${theme === "dark" ? "left-6" : "left-1"}`}
              />
            </button>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* ── Security Section ── */}
        <section>
          <div className="flex flex-col gap-4 items-start">
            {user?.role === "admin" && (
              <>
                <h2 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-6">
                  Security
                </h2>
                <button className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors">
                  Delete Account
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
