import { useEffect, useRef, useState } from 'react';
import { lookImages } from '../data/lookData';
import './ShopTheLook.css';

const ShopTheLook = ({ onProductClick }) => {
  const scrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragged, setDragged] = useState(false);

  // Triple the items for infinite effect: [Clone, Original, Clone]
  const items = [...lookImages, ...lookImages, ...lookImages];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Start in the middle (Original set)
    const originalWidth = scrollContainer.scrollWidth / 3;
    scrollContainer.scrollLeft = originalWidth;

    let animationId;
    const autoScroll = () => {
      if (!isDraggingRef.current) {
        scrollContainer.scrollLeft += 0.8;
        
        if (scrollContainer.scrollLeft >= originalWidth * 2) {
          scrollContainer.scrollLeft -= originalWidth;
        }

        if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft += originalWidth;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    setDragged(false);
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
    
    if (Math.abs(walk) > 5) {
      setDragged(true);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handleItemClick = (img) => {
    if (dragged) return;
    if (onProductClick) {
      // Create a virtual product object from look image
      onProductClick({
        id: `look-${Date.now()}`,
        title: "Shop the Look 상품",
        price: "99,000원", // 임시 가격
        image: img,
        sizes: ["XS", "S", "M", "L", "XL"]
      });
    }
  };

  return (
    <section className="information4_section">
      <div className="title_container">
        <h2>Shop the Look</h2>
        <button className="more_btn">
          <span>더보기</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div 
        className="slide_wrapper"
      >
        <ul 
          className={`slide_container ${isDragging ? 'dragging' : ''}`}
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {items.map((img, index) => (
            <li 
              key={index} 
              role="button"
              onClick={() => handleItemClick(img)}
              style={{ cursor: 'pointer' }}
            >
              <img src={img} alt={`Look ${index}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ShopTheLook;
