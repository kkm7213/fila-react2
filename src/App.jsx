import React, {useState, useEffect, useCallback, useRef} from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CouponBanner from './components/jsx/CouponBanner';
import Header from './components/jsx/Header';
import Carousel from './components/jsx/Carousel';
import TrendingButtons from './components/jsx/TrendingButtons';
import TrendingList from './components/jsx/TrendingList';
import FilaEdit from './components/jsx/FilaEdit';
import InformationSections from './components/jsx/InformationSections';
import ShopTheLook from './components/jsx/ShopTheLook';
import Footer from './components/jsx/Footer';
import ProductModal from './components/jsx/ProductModal';
import ProductListPage from './components/jsx/ProductListPage';
import ProductDetailPage from './components/jsx/ProductDetailPage';
import CartPage from './components/jsx/CartPage';
import { menProducts } from './data/menProductData';
import './App.css';

const categories = [
  "메리제인", "마이티셔츠", "글리오", "샌들", "테니스", "냉감티셔츠", "에샤페", "F.H.C"
];

// 상세 페이지를 위한 래퍼 컴포넌트
const ProductDetailContainer = ({ addToCart, reviews, addReview, updateReview, deleteReview }) => {
  const { id } = useParams();
  const product = menProducts.find(p => p.id === parseInt(id));
  
  return (
    <>
      {product && (
        <Helmet>
          <title>{`${product.title} | FILA 공식 온라인 스토어`}</title>
          <meta name="description" content={`${product.title} - ${product.price}. FILA(휠라) 공식몰에서 만나보세요.`} />
          <meta property="og:title" content={`${product.title} | FILA 공식 온라인 스토어`} />
          <meta property="og:description" content={`${product.title} - ${product.price}. 지금 바로 확인하세요.`} />
          <meta property="og:image" content={product.frontImage} />
        </Helmet>
      )}
      <ProductDetailPage
        product={product}
        onAddToCart={addToCart}
        reviews={reviews.filter(r => r.productId === product?.id)}
        onAddReview={addReview}
        onUpdateReview={updateReview}
        onDeleteReview={deleteReview}
      />
    </>
  );
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("메리제인");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lookProduct, setLookProduct] = useState(null);

  const openLookModal = (product) => {
    setLookProduct(product);
    setIsModalOpen(true);
  };
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productId: 5, // Default for testing
      author: "FILA 관리자",
      rating: 5,
      content: "#광고 🐩 톤다운 브라운에 그린 컬러 조합 너무 귀여운 MY FAVORITE 강쥐 그래픽 티셔츠🐶🐾 봄 여름에 편하게 포인트 주기 딱❕❕",
      date: "2026. 5. 11.",
      isAdmin: true
    }
  ]);

  const handleMenuClick = (page) => {
    if (page === 'Home' || page === 'home') navigate('/');
    else if (page === 'Men' || page === 'men') navigate('/men');
    else if (page === 'Women' || page === 'women') navigate('/women');
    else if (page === 'Kids' || page === 'kids') navigate('/kids');
    else if (page === 'Tennis' || page === 'tennis') navigate('/tennis');
    else if (page === 'F.H.C' || page === 'f.h.c') navigate('/fhc');
    else navigate(`/${page.toLowerCase()}`);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
    window.scrollTo(0, 0);
  };

  const addToCart = (product) => {
    const selectedSize = product.selectedSize || (product.sizes ? product.sizes[0] : 'Free');
    
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItemIndex > -1) {
        return prev.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, { ...product, cartId: Date.now(), quantity: 1, selectedSize }];
      }
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartId, change) => {
    setCartItems(prev => prev.map(item => 
      item.cartId === cartId 
        ? { ...item, quantity: Math.max(1, item.quantity + change) } 
        : item
    ));
  };

  const updateCartOption = (cartId, newSize) => {
    setCartItems(prev => prev.map(item => 
      item.cartId === cartId 
        ? { ...item, selectedSize: newSize } 
        : item
    ));
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  // Review CRUD
  const addReview = (newReview) => {
    setReviews(prev => [{ ...newReview, id: Date.now(), date: new Date().toLocaleDateString() }, ...prev]);
  };

  const updateReview = (id, updatedContent) => {
    setReviews(prev => prev.map(rev => rev.id === id ? { ...rev, content: updatedContent } : rev));
  };

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(rev => rev.id !== id));
  };

  const trendingListRef = useRef(null);

  const handleTrendingScroll = (direction) => {
    if (trendingListRef.current) {
      const scrollAmount = 446; // item width (426) + margin (20)
      trendingListRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="App">
      <CouponBanner
        isVisible={isBannerVisible}
        onClose={() => setIsBannerVisible(false)}
      />
      <Header
        isBannerVisible={isBannerVisible}
        onMenuClick={handleMenuClick}
        cartCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        forceDark={location.pathname !== '/'}
      />

      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Helmet>
                <title>FILA 공식 온라인 스토어 | 스타일과 퍼포먼스의 결합</title>
              </Helmet>
              <Carousel />
              <section className="trending_section">
                <h2>Trending Now</h2>
                <TrendingButtons
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  categories={categories}
                  onScroll={handleTrendingScroll}
                />
                <TrendingList 
                  activeCategory={activeCategory} 
                  scrollRef={trendingListRef}
                />
              </section>
              <FilaEdit />
              <InformationSections />
              <ShopTheLook onProductClick={openLookModal} />
            </>
          } />
          
          <Route path="/men" element={
            <>
              <Helmet>
                <title>남성 컬렉션 | FILA 공식 온라인 스토어</title>
                <meta name="description" content="FILA 남성 의류, 신발, 용품 컬렉션을 만나보세요. 스타일과 기능성을 모두 잡은 최신 아이템들을 소개합니다." />
              </Helmet>
              <ProductListPage 
                onProductClick={handleProductClick} 
                onAddToCart={addToCart}
              />
            </>
          } />
          
          <Route path="/product/:id" element={<ProductDetailContainer 
            addToCart={addToCart} 
            reviews={reviews} 
            addReview={addReview} 
            updateReview={updateReview} 
            deleteReview={deleteReview} 
          />} />
          
          <Route path="*" element={
            <div style={{ padding: '200px 48px', textAlign: 'center' }}>
              <h1>Page is under construction</h1>
              <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#000', color: '#fff', cursor: 'pointer' }}>
                Back to Home
              </button>
            </div>
          } />
        </Routes>

        <Footer />
      </main>

      <CartPage 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
        onUpdateOption={updateCartOption}
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={lookProduct}
        onAddToCart={addToCart}
      />
    </div>
  );
}

export default App;
