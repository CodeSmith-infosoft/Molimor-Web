import { useEffect, useState } from 'react';
import { GoArrowUp } from 'react-icons/go';

const ScrollToTopButton = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScroll = (scrollTop / (docHeight - winHeight)) * 100;
      setScrollProgress(totalScroll);
      setIsVisible(scrollTop > 50);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 w-10 h-10 flex items-center justify-center cursor-pointer transition-opacity z-30 duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center relative"
        style={{
          background: `conic-gradient(#076536 ${scrollProgress}%, #e6e6e6 ${scrollProgress}%)`,
        }}
      >
        <div className="absolute w-[85%] h-[85%] bg-white rounded-full flex items-center justify-center">
          <span className="absolute text-green text-xl">
            <GoArrowUp className="stroke-1" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScrollToTopButton;
