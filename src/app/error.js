"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Something went wrong
        </p>
        <h1 className="text-3xl font-light text-gray-900 mb-4">
          Unexpected error
        </h1>
        <p className="text-gray-600 mb-8">
          {error?.message || "An error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
