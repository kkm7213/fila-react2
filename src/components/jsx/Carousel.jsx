import React, { useState, useEffect, useRef } from 'react';
import { carouselVideos } from '../../data/carouselData';
import '../css/Carousel.css';

const Carousel = () => {
  // Infinite loop prep: [Last, ...Original, First]
  const slides = [
    carouselVideos[carouselVideos.length - 1],
    ...carouselVideos,
    carouselVideos[0]
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const transitionTime = 1000; // 1s
  const autoPlayTime = 4000; // 4s

  const moveRight = () => {
    if (currentIndex >= slides.length - 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const moveLeft = () => {
    if (currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Handle jump for infinite loop
  useEffect(() => {
    if (currentIndex === slides.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, transitionTime);
    }
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(slides.length - 2);
      }, transitionTime);
    }
  }, [currentIndex, slides.length]);

  // Auto Play
  useEffect(() => {
    const timer = setInterval(() => {
      moveRight();
    }, autoPlayTime);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="carousel_container">
      <div className="button_container">
        <button type="button" onClick={moveLeft}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button type="button" onClick={moveRight}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <ul 
        className="carousel" 
        style={{ 
          transform: `translateX(-${currentIndex * 100}vw)`,
          transition: isTransitioning ? `transform ${transitionTime}ms ease` : 'none'
        }}
      >
        {slides.map((videoUrl, index) => (
          <li key={index} className="slide">
            <video autoplay muted loop playsinline>
              <source src={videoUrl} type="video/mp4" />
            </video>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Carousel;
