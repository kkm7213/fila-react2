import React, { useState } from 'react';
import '../css/TrendingButtons.css';

const TrendingButtons = ({ activeCategory, setActiveCategory, categories, onScroll }) => {
  return (
    <div className="trending-buttons-nav">
      <ul className="category-list">
        {categories.map((category) => (
          <li 
            key={category} 
            className={activeCategory === category ? 'active' : ''}
          >
            <button 
              type="button" 
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
      <div className="arrow-button-container">
        <button 
          type="button" 
          className="arrow-button border rounded"
          onClick={() => onScroll('left')}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button 
          type="button" 
          className="arrow-button border rounded"
          onClick={() => onScroll('right')}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default TrendingButtons;
