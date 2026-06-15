import React, { useState, useEffect } from 'react';
import '../css/CartPage.css';

const CartPage = ({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity, onUpdateOption }) => {
  const [selectedItems, setSelectedProductIds] = useState([]);

  // Initialize selected items when cartItems changes
  useEffect(() => {
    setSelectedProductIds(cartItems.map(item => item.cartId));
  }, [cartItems, isOpen]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProductIds(cartItems.map(item => item.cartId));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleSelectItem = (cartId) => {
    setSelectedProductIds(prev => 
      prev.includes(cartId) 
        ? prev.filter(id => id !== cartId) 
        : [...prev, cartId]
    );
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach(id => onRemove(id));
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.cartId))
      .reduce((acc, item) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        return acc + (price * (item.quantity || 1));
      }, 0);
  };

  const subtotal = calculateTotal();

  const handleBackdropClick = (e) => {
    if (e.target.className === 'cart_drawer_overlay active') {
      onClose();
    }
  };

  return (
    <div className={`cart_drawer_overlay ${isOpen ? 'active' : ''}`} onClick={handleBackdropClick}>
      <div className={`cart_drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer_header">
          <h2>장바구니 ({cartItems.length})</h2>
          <button type="button" className="close_drawer_btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer_content">
          <section className="cart_control">
            <div className="select_all_container">
              <input 
                type="checkbox" 
                id="select_all_drawer" 
                checked={cartItems.length > 0 && selectedItems.length === cartItems.length}
                onChange={handleSelectAll}
              />
              <label htmlFor="select_all_drawer">전체선택</label>
            </div>
            <button type="button" className="delete_selected_btn" onClick={handleDeleteSelected}>
              선택삭제
            </button>
          </section>

          <div className="cart_list_container">
            {cartItems.length === 0 ? (
              <div className="empty_cart">장바구니가 비어 있습니다.</div>
            ) : (
              <ul className="cart_list">
                {cartItems.map((item) => (
                  <li key={item.cartId} className="cart_item_drawer">
                    <div className="item_check">
                      <input 
                        type="checkbox" 
                        checked={selectedItems.includes(item.cartId)}
                        onChange={() => handleSelectItem(item.cartId)}
                      />
                    </div>

                    <div className="item_image">
                      <img src={item.frontImage || item.image} alt={item.title} />
                    </div>

                    <div className="item_info">
                      <b className="title">{item.title}</b>
                      
                      <div className="item_option">
                        {item.sizes ? (
                          <select 
                            value={item.selectedSize}
                            onChange={(e) => onUpdateOption(item.cartId, e.target.value)}
                          >
                            {item.sizes.map(size => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                        ) : (
                          <span>{item.selectedSize || 'Free'}</span>
                        )}
                      </div>

                      <div className="item_quantity_drawer">
                        <button onClick={() => onUpdateQuantity(item.cartId, -1)}>-</button>
                        <span>{item.quantity || 1}</span>
                        <button onClick={() => onUpdateQuantity(item.cartId, 1)}>+</button>
                      </div>

                      <div className="item_price_drawer">
                        <strong>{(parseInt(item.price.replace(/[^0-9]/g, '')) * (item.quantity || 1)).toLocaleString()}원</strong>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      className="item_delete_btn" 
                      onClick={() => onRemove(item.cartId)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="drawer_footer">
          <div className="summary_details">
            <div className="summary_row_sub">
              <span>총 상품금액</span>
              <span>{subtotal.toLocaleString()}원</span>
            </div>
            <div className="summary_row_sub">
              <span>상품 할인금액</span>
              <span>- 0원</span>
            </div>
            <div className="summary_row_sub">
              <span>배송비</span>
              <span>0원</span>
            </div>
          </div>
          <div className="summary_row_total">
            <span>총 주문 금액</span>
            <b>{subtotal.toLocaleString()}원</b>
          </div>
          <button type="button" className="checkout_btn" onClick={() => alert('주문 페이지로 이동합니다.')}>
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
