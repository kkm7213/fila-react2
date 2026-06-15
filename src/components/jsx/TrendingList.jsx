import React, { useRef, useState, useEffect } from 'react';
import { trendingData } from '../../data/trendingData';
import '../css/TrendingList.css';

const TrendingList = ({ activeCategory, scrollRef }) => {
  const products = trendingData[activeCategory] || [];
  const internalRef = useRef(null);
  const containerRef = scrollRef || internalRef;

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setDragged(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    containerRef.current.scrollLeft = scrollLeft - walk;
    
    if (Math.abs(walk) > 5) {
      setDragged(true);
    }
  };

  const handleClick = (e) => {
    if (dragged) {
      e.preventDefault();
    }
  };

  // 카테고리 변경 시 스크롤 초기화
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [activeCategory, containerRef]);

  return (
    <div className="trending-list-container">
      <ul 
        className={`product-grid ${isDragging ? 'dragging' : ''}`}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <a href="#" onClick={handleClick}>
              <div className="image-container">
                <img src={product.image} alt={product.title} />
              </div>
              <span className="tag">{product.tag}</span>
              <strong className="title">{product.title}</strong>
              <strong className="price">{product.price}</strong>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingList;
