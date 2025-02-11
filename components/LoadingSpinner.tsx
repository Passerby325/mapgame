import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div 
      role="status"
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      aria-label="加载中"
    >
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent">
        <span className="sr-only">加载中...</span>
      </div>
    </div>
  );
}; 