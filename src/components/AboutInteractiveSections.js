"use client";

import { useState } from "react";
import Image from "next/image";

export default function AboutInteractiveSections({
  education,
  currentlyReading,
}) {
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedBook, setSelectedBook] = useState(0);
  const selectedReading = currentlyReading[selectedBook];

  return (
    <>
      <div>
        <h3 className="text-2xl font-medium text-gray-900 mb-8">
          Education & Learning
        </h3>
        <div className="space-y-6">
          {education.map((item, index) => (
            <button
              key={`${item.title}-${item.year}`}
              type="button"
              className={`w-full text-left border rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
                selectedEducation === index
                  ? "border-indigo-200 bg-indigo-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white"
              }`}
              onClick={() =>
                setSelectedEducation(selectedEducation === index ? null : index)
              }
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <time className="text-sm font-medium text-indigo-600">
                      {item.year}
                    </time>
                    <div
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        selectedEducation === index
                          ? "bg-indigo-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <h4 className="text-xl font-medium text-gray-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 font-medium mb-4 text-lg">
                    {item.institution}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {item.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className={`px-3 py-1 text-sm rounded-full font-medium transition-colors duration-300 ${
                          selectedEducation === index
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`ml-6 transition-transform duration-300 ${
                    selectedEducation === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  selectedEducation === index
                    ? "max-h-[450px] opacity-100 mt-8"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="aspect-[3/2] relative rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={`${item.title} at ${item.institution}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm opacity-90">
                      {item.institution} • {item.year}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          💡 Click on any education item to view related images
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-medium text-gray-900 mb-8">
          Currently Reading
        </h3>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex border-b border-gray-100">
            {currentlyReading.map((book, index) => (
              <button
                key={book.title}
                type="button"
                onClick={() => setSelectedBook(index)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                  selectedBook === index
                    ? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-500"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      book.progress === 100 ? "bg-green-500" : "bg-indigo-500"
                    }`}
                  ></div>
                  <span className="hidden sm:inline">{book.title}</span>
                  <span className="sm:hidden">{index + 1}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="sm:col-span-1">
                <div className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-lg group">
                  <Image
                    src={selectedReading.cover}
                    alt={`${selectedReading.title} book cover`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-6">
                <div>
                  <h4 className="text-xl font-medium text-gray-900 mb-2">
                    {selectedReading.title}
                  </h4>
                  <p className="text-gray-600 font-medium text-lg">
                    by {selectedReading.author}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-4 py-2 text-sm font-medium rounded-full ${
                      selectedReading.status === "Recently Finished"
                        ? "bg-green-100 text-green-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {selectedReading.status}
                  </span>
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 text-sm rounded-full">
                    {selectedReading.category}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-700">
                      Reading Progress
                    </span>
                    <span className="text-gray-500">
                      {selectedReading.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        selectedReading.progress === 100
                          ? "bg-green-500"
                          : "bg-indigo-500"
                      }`}
                      style={{ width: `${selectedReading.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-3">
                    💭 My Thoughts
                  </h5>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedReading.thoughts}
                  </p>
                </div>

                {selectedReading.favoriteQuote && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h5 className="font-medium text-gray-700 mb-3">
                      ✨ Favorite Quote
                    </h5>
                    <blockquote className="text-gray-800 italic leading-relaxed">
                      &quot;{selectedReading.favoriteQuote}&quot;
                    </blockquote>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
