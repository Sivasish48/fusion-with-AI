// SkeletonLoader.js
import React from 'react';

const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-4 p-4 max-w-4xl mx-auto">
    <div className="flex space-x-4">
      <div className="rounded-full bg-gray-300 h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-11/12"></div>
      <div className="h-4 bg-gray-300 rounded w-10/12"></div>
      <div className="h-4 bg-gray-300 rounded w-9/12"></div>
    </div>
    <div className="flex space-x-4">
      <div className="rounded-full bg-gray-300 h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-11/12"></div>
      <div className="h-4 bg-gray-300 rounded w-10/12"></div>
      <div className="h-4 bg-gray-300 rounded w-9/12"></div>
    </div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-11/12"></div>
      <div className="h-4 bg-gray-300 rounded w-10/12"></div>
      <div className="h-4 bg-gray-300 rounded w-9/12"></div>
    </div>
  </div>
  );
};

export default Skeleton;
