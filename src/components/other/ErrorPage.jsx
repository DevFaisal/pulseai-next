import React from "react";

const ErrorPage = ({ message = "Oops! Something went wrong.", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
      <p className="text-lg text-gray-700 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorPage;
