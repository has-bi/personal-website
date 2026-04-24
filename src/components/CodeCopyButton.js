"use client";

export default function CodeCopyButton({ code }) {
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(code);
      }}
      className="absolute top-4 right-4 px-3 py-2 text-xs bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-200 border border-gray-600 font-medium flex items-center gap-2 group"
    >
      <svg
        className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
      Copy
    </button>
  );
}
