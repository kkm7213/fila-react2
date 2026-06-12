import React, { useState, useEffect } from 'react';
import './ProductModal.css';
import defaultImg from '@/assets/image/여자(3).webp';

const ProductModal = ({ isOpen, onClose, product, onAddToCart }) => {
  const [displayProducts, setDisplayProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [isSizeSelectorOpen, setIsSizeSelectorOpen] = useState(null);

  // 모달이 열릴 때 초기 데이터 설정 (주 상품 + 연관 상품 2개)
  useEffect(() => {
    if (isOpen && product) {
      const related = [
        { ...product, id: `${product.id}-1`, title: `${product.title} (연관 1)`, price: "49,000원" },
        { ...product, id: `${product.id}-2`, title: `${product.title} (연관 2)`, price: "35,000원" },
        { ...product, id: `${product.id}-3`, title: `${product.title} (연관 3)`, price: "19,000원" },
      ];
      setDisplayProducts(related);
      setSelectedItems(related.map(p => p.id));
      const initialSizes = {};
      related.forEach(p => {
        initialSizes[p.id] = p.sizes ? p.sizes[0] : 'Free';
      });
      setSelectedSizes(initialSizes);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal_container') {
      onClose();
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(displayProducts.map(p => p.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSizeSelect = (id, size) => {
    setSelectedSizes(prev => ({ ...prev, [id]: size }));
    setIsSizeSelectorOpen(null);
  };

  const calculateTotal = () => {
    return displayProducts
      .filter(p => selectedItems.includes(p.id))
      .reduce((acc, p) => acc + parseInt(p.price.replace(/[^0-9]/g, '')), 0);
  };

  const handleConfirmAddToCart = () => {
    if (selectedItems.length === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }
    
    selectedItems.forEach(id => {
      const item = displayProducts.find(p => p.id === id);
      if (item && onAddToCart) {
        onAddToCart({
          ...item,
          selectedSize: selectedSizes[id]
        });
      }
    });

    alert(`${selectedItems.length}개의 상품이 장바구니에 담겼습니다.`);
    onClose();
  };

  return (
    <div className="modal_container" style={{ display: 'flex' }} onClick={handleBackdropClick}>
      <div className="modal">
        <section className="image_section">
          <img src={product.image || defaultImg} alt="Shop the look" />
        </section>

        <section className="form_section">
          <form action="#" onSubmit={(e) => e.preventDefault()}>
            <div className="select_container">
              <div>
                <input 
                  type="checkbox" 
                  id="select_all" 
                  checked={displayProducts.length > 0 && selectedItems.length === displayProducts.length}
                  onChange={handleSelectAll}
                />
                <label htmlFor="select_all">전체선택</label>
              </div>

              <button type="button" className="close_btn" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="product_container">
              <ul>
                {displayProducts.map((item) => (
                  <li key={item.id}>
                    <div className="product_item">
                      <input 
                        type="checkbox" 
                        id={`product-${item.id}`}
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                      <label htmlFor={`product-${item.id}`}>
                        <img src={item.image} alt={item.title} />
                        <b>{item.title}</b>
                        <span>BROWN, BROWN, BROWN</span>
                        <strong>{item.price}</strong>
                      </label>
                    </div>
                    
                    <div className="accordion">
                      <div 
                        className="head" 
                        onClick={() => setIsSizeSelectorOpen(isSizeSelectorOpen === item.id ? null : item.id)}
                      >
                        <strong>{selectedSizes[item.id] || "사이즈 선택"}</strong>
                        <i className="fa-solid fa-caret-down"></i>
                      </div>
                      <div className="body" style={{ display: isSizeSelectorOpen === item.id ? 'grid' : 'none' }}>
                        {(item.sizes || ["XS(85)", "S(90)", "M(95)", "L(100)", "XL(105)"]).map(size => (
                          <button 
                            key={size} 
                            type="button" 
                            className={`size ${selectedSizes[item.id] === size ? 'active' : ''}`}
                            onClick={() => handleSizeSelect(item.id, size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="total_price_container">
              <b>주문금액</b>
              <b>{calculateTotal().toLocaleString()}원</b>
            </div>

            <div className="submit_container">
              <button type="submit" onClick={handleConfirmAddToCart}>장바구니 담기</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ProductModal;
