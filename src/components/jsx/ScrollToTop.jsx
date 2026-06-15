import React, { useEffect, useState } from 'react';
import '../css/ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`}>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="페이지 최상단으로 이동"
      >
        <i className="fa-solid fa-arrow-up" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default ScrollToTop;
