import React, { useState, useEffect } from 'react';

const SkeletonLoader = ({
  duration = 4,
}) => {
  const [progress, setProgress] = useState(0);
  const [animationType, setAnimationType] = useState('shimmer'); // shimmer, wave, pulse, glow

  useEffect(() => {
    const increment = 100 / (duration * 25);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) return 0;
        return Math.min(prevProgress + increment, 100);
      });
    }, 40);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="w-full px-4 py-6 max-w-[1440px] mx-auto">
      {/* Skeleton Card */}
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="h-2 w-full" />
        <div className="p-4 border-b">
          <div className={`skeleton-item h-4 w-1/3 mb-2 ${animationType}`}></div>
        </div>
        <div className="p-4 flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className={`skeleton-item h-4 w-1/2 mb-4 ${animationType}`}></div>
            {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7].map((delay, i) => (
              <div
                key={i}
                className={`skeleton-item h-4 ${i % 2 === 0 ? 'w-full' : 'w-2/3'} mb-3 ${animationType}`}
                style={{ animationDelay: `${delay}s` }}
              ></div>
            ))}
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="space-y-3">
                  <div className={`skeleton-item h-36 w-full ${animationType}`} style={{ animationDelay: `${item * 0.2}s` }}></div>
                  <div className={`skeleton-item h-4 w-full ${animationType}`} style={{ animationDelay: `${item * 0.15}s` }}></div>
                  <div className={`skeleton-item h-4 w-2/3 ${animationType}`} style={{ animationDelay: `${item * 0.25}s` }}></div>
                  <div className={`skeleton-item h-4 w-1/3 ${animationType}`} style={{ animationDelay: `${item * 0.35}s` }}></div>
                </div>
              ))}
            </div>

            {/* Additional Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="md:col-span-2 space-y-3">
                <div className={`skeleton-item h-4 w-full ${animationType}`} style={{ animationDelay: `0.1s` }}></div>
                <div className={`skeleton-item h-4 w-full ${animationType}`} style={{ animationDelay: `0.2s` }}></div>
                <div className={`skeleton-item h-4 w-2/3 ${animationType}`} style={{ animationDelay: `0.3s` }}></div>
                <div className={`skeleton-item h-4 w-1/4 ${animationType}`} style={{ animationDelay: `0.4s` }}></div>
              </div>
              <div>
                <div className={`skeleton-item w-full aspect-square ${animationType}`} style={{ animationDelay: `0.5s` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white shadow rounded-lg p-4 space-y-3">
            <div className={`skeleton-item h-4 w-2/3 ${animationType}`} style={{ animationDelay: `${item * 0.1}s` }}></div>
            <div className={`skeleton-item h-24 w-full ${animationType}`} style={{ animationDelay: `${item * 0.2}s` }}></div>
            <div className={`skeleton-item h-4 w-full ${animationType}`} style={{ animationDelay: `${item * 0.3}s` }}></div>
            <div className={`skeleton-item h-4 w-1/3 ${animationType}`} style={{ animationDelay: `${item * 0.4}s` }}></div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="bg-white shadow rounded-lg p-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-1">
            <div className={`skeleton-item w-full aspect-square ${animationType}`} style={{ animationDelay: '0.1s' }}></div>
          </div>
          <div className="md:col-span-4 space-y-3">
            <div className={`skeleton-item h-4 w-1/2 ${animationType}`} style={{ animationDelay: '0.2s' }}></div>
            <div className={`skeleton-item h-4 w-full ${animationType}`} style={{ animationDelay: '0.3s' }}></div>
            <div className={`skeleton-item h-4 w-full ${animationType}`} style={{ animationDelay: '0.4s' }}></div>
            <div className={`skeleton-item h-4 w-1/4 ${animationType}`} style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
