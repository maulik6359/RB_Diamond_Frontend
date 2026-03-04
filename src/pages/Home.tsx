import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to Our SaaS Platform
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Get started with your journey
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Ready to get started?
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Sign up for an account or log in to continue
              </p>
            </div>

            <div className="flex space-x-4">
              <a
                href="/register"
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 transition duration-200"
              >
                Sign Up
              </a>
              <a
                href="/login"
                className="flex-1 bg-gray-200 text-gray-900 py-2 px-4 rounded-md text-center hover:bg-gray-300 transition duration-200"
              >
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
