import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Animated shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/30 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-purple-200/30 rounded-lg rotate-45 animate-float-medium"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-indigo-200/30 rounded-full animate-float-fast"></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-pink-200/30 rounded-lg rotate-12 animate-float-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-teal-200/30 rounded-full animate-float-medium"></div>
      </div>
    </div>
  );
};

export default Background; 