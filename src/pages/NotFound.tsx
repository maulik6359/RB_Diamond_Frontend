import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleTryAgain = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-red-100 via-white to-blue-100">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8 text-center animate-fade-in-up">
        <div className="mb-6">
          <div className="text-7xl font-extrabold text-red-500 mb-2 animate-bounce">
            404
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-5">
            Oops! Access Denied
          </h1>
          <p className="text-gray-600 text-sm">
            You don't have permission to view this page right now. Try logging
            in again or check with your admin.
          </p>
        </div>

        <div className="space-y-6 mt-6">
          <button
            onClick={handleTryAgain}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition-transform transform hover:scale-105 duration-300"
          >
            🔐 Try Again
          </button>

          <div className="text-sm text-gray-500 italic">
            Think this is a mistake? Reach out to your administrator for help.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
