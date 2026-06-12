import React from 'react';
import './CouponBanner.css';

const CouponBanner = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="coupon_banner">
      <span>
        FILA 카카오 플러스친구 추가 시 10% 무료
      </span>
      <button type="button" onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default CouponBanner;
