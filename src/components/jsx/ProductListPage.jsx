import React, { useState, useMemo } from 'react';
import { menProducts } from '../../data/menProductData';
import '../css/ProductListPage.css';

const categories = ['의류', '신발', '용품', '언더웨어', '스포츠'];
const sortOptions = ['신상품순', '리뷰순', '판매순', '낮은 가격순', '높은 가격순'];

const ProductListPage = ({ onProductClick, onAddToCart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const currentProducts = useMemo(() => {
    if (currentPage === 1) {
      return menProducts.slice(0, itemsPerPage);
    } else {
      // 1페이지가 아닐 경우 데이터 순서를 섞거나 변형하여 페이지 이동 효과 시뮬레이션
      // 원래 id를 유지해야 상세 페이지 연결이 가능함
      const startIndex = ((currentPage - 1) % 5) * 4;
      const simulatedProducts = [...menProducts];
      
      if (currentPage % 2 === 0) {
        simulatedProducts.reverse();
      }
      
      return simulatedProducts.slice(0, itemsPerPage).map((item, index) => ({
        ...item,
        virtualId: `p${currentPage}-${item.id}-${index}`,
        frontImage: currentPage % 3 === 0 ? item.backImage : item.frontImage,
        backImage: currentPage % 3 === 0 ? item.frontImage : item.backImage
      }));
    }
  }, [currentPage]);

  const handlePageChange = (page, e) => {
    e.preventDefault();
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleQuickAdd = (event, product, size) => {
    event.stopPropagation();
    if (onAddToCart) {
      onAddToCart({ ...product, selectedSize: size });
    }
  };

  return (
    <div className="product-list-page">
      <main className="product-list-main">
        <section className="text_section">
          <div className="title_container">
            <h1>MEN</h1>
            <span>670</span>
          </div>

          <div className="category_container">
            <ul className="category_list">
              {categories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </div>

          <div className="filter_container">
            <button type="button">
              <i className="fa-solid fa-sliders" aria-hidden="true"></i>
              <span>필터 보기</span>
            </button>

            <select defaultValue={sortOptions[0]} aria-label="정렬">
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="product_container" aria-label="상품 목록">
          <ul className="product_list active">
            {currentProducts.map((product) => (
              <li key={product.id} className="product_item">
                <div className="product_image" onClick={() => handleProductClick(product)} role="button" aria-label={`${product.title} 상세보기`}>
                  <img className="front-image" src={product.frontImage} alt={`${product.title} 전면 이미지`} />
                  <div className="image-overlay">
                    <img className="back-image" src={product.backImage} alt={`${product.title} 후면 이미지`} />
                    <div className="quick_add_container" onClick={(event) => event.stopPropagation()} aria-label="빠른 사이즈 선택 및 장바구니 담기">
                      <div>
                        <span>QUICK ADD</span>
                      </div>
                      <ul role="group" aria-label="사이즈 선택">
                        {product.sizes.map((size) => (
                          <li 
                            key={size} 
                            onClick={(e) => handleQuickAdd(e, product, size)}
                            style={{ cursor: 'pointer' }}
                            role="button"
                            aria-label={`${size} 사이즈 담기`}
                          >
                            {size}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="product_image_list">
                  {product.thumbnails.map((thumb, index) => (
                    <img
                      key={`${product.id}-${index}`}
                      src={thumb}
                      alt={`${product.title} 색상 ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="product_explanation">
                  <span className="gender">{product.gender}</span>
                  <strong onClick={() => handleProductClick(product)}>{product.title}</strong>
                  <div className="price_container">
                    <span>{product.price}</span>
                    {product.originalPrice && <span>{product.originalPrice}</span>}
                    {product.discount && <span>{product.discount}</span>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="pagination" aria-label="페이지 선택">
          <ul>
            {[1, 2, 3, 4, 5].map((page) => (
              <li 
                key={page} 
                className={page === currentPage ? 'active' : ''} 
                onClick={(e) => handlePageChange(page, e)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                <a href="#" aria-label={`${page}번 페이지로 이동`}>{page}</a>
              </li>
            ))}
            <li className="unset" aria-hidden="true">...</li>
            <li onClick={(e) => handlePageChange(34, e)}>
              <a href="#" aria-label="34번 페이지로 이동">34</a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); if(currentPage < 34) setCurrentPage(prev => prev + 1); window.scrollTo(0,0); }} aria-label="다음 페이지로 이동">
                <i className="fa-solid fa-angle-right" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ProductListPage;
