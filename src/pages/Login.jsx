import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { email, favourites: [] };
    login(userData);
    navigate("/"); 
  };

  return (
    <div className="min-h-full flex items-center justify-center mt-8 dark:bg-gray-900">
      <div className="flex dark:bg-gray-800 bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Left Form Section */}
        <div className="w-1/2 p-10">
          <h2 className="dark:text-white text-primary text-2xl font-semibold mb-6">Login</h2>

          <form onSubmit={handleLogin}>
            <label className="block dark:text-gray-400 text-maintext mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              required
              className="w-full p-3 rounded-md dark:bg-gray-700 dark:text-white text-subtitle border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <label className="block dark:text-gray-400 text-maintext mb-2">Password</label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Input your password"
                    required
                    className="w-full p-3 rounded-md dark:bg-gray-700 dark:text-white text-subtitle border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                    className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                >
                {showPassword ? <EyeFilled className="text-gray-400 text-lg" /> : <EyeInvisibleFilled className="text-gray-400 text-lg" />}
                </span>
            </div>

            <button
              type="submit"
              className="w-full mt-6 p-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-gray-400 mt-4 text-sm text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-400 hover:underline cursor-pointer">
              Sign Up here
            </a>
          </p>
        </div>

        {/* Right Welcome Section */}
        <div className="w-1/2 flex items-center justify-center dark:bg-gray-800 bg-white">
          <div className="border border-blue-600 py-24 px-10 rounded-lg text-center">
            <h2 className="text-blue-500 text-6xl font-bold">MORENT</h2>
            <p className="dark:text-white text-lg mt-4">Welcome to MORENT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;