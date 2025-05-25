// components/ClientMDXComponents.js
"use client";

import React from "react";

// Interactive Code Editor Component
export function ClientCodeEditor({
  children,
  language = "javascript",
  editable = false,
  title,
}) {
  const [code, setCode] = React.useState(children?.toString() || "");

  if (editable) {
    return (
      <div className="my-6 border border-gray-200 rounded-lg overflow-hidden bg-white">
        {title && (
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h4 className="text-sm font-medium text-gray-700">{title}</h4>
          </div>
        )}
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-4 font-mono text-sm bg-gray-900 text-gray-100 border-none outline-none resize-none"
            rows={Math.max(code.split("\n").length, 5)}
            spellCheck={false}
          />
          <div className="absolute top-2 right-2">
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(code);
                }
              }}
              className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 border border-gray-200 rounded-lg overflow-hidden">
      {title && (
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">{title}</h4>
        </div>
      )}
      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto">
          <code>{code}</code>
        </pre>
        <button
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(code);
            }
          }}
          className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
        >
          Copy
        </button>
      </div>
    </div>
  );
}

// Code Tabs Component
export function ClientCodeTabs({ tabs }) {
  const [activeTab, setActiveTab] = React.useState(0);

  if (!tabs || tabs.length === 0) {
    return <div className="text-red-500 my-4">No tabs provided</div>;
  }

  return (
    <div className="my-6 border border-gray-200 rounded-lg overflow-hidden">
      {/* Tab Headers */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-medium border-r border-gray-200 last:border-r-0 transition-colors ${
                activeTab === index
                  ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto">
          <code>{tabs[activeTab]?.code || "No code available"}</code>
        </pre>
        <button
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(tabs[activeTab]?.code || "");
            }
          }}
          className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
