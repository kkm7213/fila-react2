import { useState } from 'react';
import '../css/Header.css';
import logoDark from '@/assets/image/logo/header-logo.png';
import logoWhite from '@/assets/image/logo/header-logo-white.svg';

const menuData = [
  {
    title: "Women",
    subMenus: [
      { title: "의류", items: ["전체보기", "반팔", "바람막이/집업", "맨투맨/후디", "긴팔", "쇼츠", "팬츠", "브라탑", "스커트/원피스", "트레이닝 셋업", "테니스", "러닝", "Heritage Collection"] },
      { title: "신발", items: ["전체보기", "라이프스타일", "테니스", "러닝", "샌들/슬리퍼", "에샤페", "리트모", "글리오", "하레핀", "인터런"] },
      { title: "용품", items: ["전체보기", "테니스", "피클볼", "백팩", "숄더/토트백", "메신저/크로스백", "짐백", "슬링백/힙색", "모자", "양말", "기타"] },
      { title: "언더웨어", items: ["전체보기", "BEST", "브라+팬티 SET", "컬렉션", "쿨웨이브", "최화정's버터소프트", "와이어브라", "노와이어브라", "브라탑", "팬티", "사각드로즈", "파자마", "이지웨어", "Accessories"] },
      { title: "스포츠", items: ["테니스", "러닝", "트레이닝", "피트니스", "피크볼"] }
    ]
  },
  {
    title: "Men",
    subMenus: [
      { title: "의류", items: ["전체보기", "반팔", "바람막이/집업", "맨투맨/후디", "긴팔", "쇼츠", "팬츠", "트레이닝 셋업", "테니스", "러닝", "Heritage Collection"] },
      { title: "신발", items: ["전체보기", "라이프스타일", "테니스", "러닝", "샌들/슬리퍼", "에샤페", "리트모", "하레핀", "인터런"] },
      { title: "용품", items: ["전체보기", "테니스", "피클볼", "백팩", "메신저/크로스백", "숄더/짐백", "슬링백/힙색", "모자", "양말", "기타"] },
      { title: "언더웨어", items: ["전체보기", "BEST", "패키지", "쿨웨이브", "스포르트/스포츠웨어", "드로즈", "트렁크", "스포츠", "파자마", "이지웨어", "Accessories"] },
      { title: "스포츠", items: ["테니스", "러닝", "트레이닝", "피크볼"] }
    ]
  },
  {
    title: "Kids",
    subMenus: [
      { title: "의류", items: ["전체보기", "FILA KIDS ❤ TEENIEPING", "상하희 셋업", "티셔츠", "쇼츠", "팬츠/레깅스", "바람박이/집업/자켓", "후드티/맨투맨", "스커트", "원피스", "스윔웨어"] },
      { title: "신발", items: ["전체보기", "어반크릭샌들", "리틀에샤페", "레인저/레인저코어", "인터런 키즈", "휠라꾸미", "샌들", "운동화(130~160mm)", "운동화(170~240mm)", "레인부츠"] },
      { title: "용품", items: ["전체보기", "26 신학기 책가방", "책가방", "보조가방", "모자", "양말", "기타"] }
    ]
  },
  {
    title: "Tennis",
    subMenus: [
      { title: "New & Featured", items: ["The Court Is Yours", "Jaqueline Cristian", "AXILUS 3 T9", "Tennis Shoes Guide"] },
      { title: "여성", items: ["의류", "신발", "용품"] },
      { title: "남성", items: ["의류", "신발", "용품"] }
    ]
  },
  {
    title: "F.H.C",
    subMenus: [
      { title: "FILA Heritage Collection", items: ["SS26"] }
    ]
  }
];

const Header = ({ isBannerVisible, onMenuClick, cartCount, onCartClick, forceDark = false }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = forceDark || activeMenu !== null || isMobileMenuOpen;

  const handleMenuClick = (e, title) => {
    e.preventDefault();
    if (onMenuClick) {
      onMenuClick(title);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`${isDark ? 'header_dark' : 'header_light'} ${activeMenu ? 'header_menu_open' : ''} ${isMobileMenuOpen ? 'mobile_menu_open' : ''}`}
      onMouseLeave={() => setActiveMenu(null)}
      style={{ paddingTop: isBannerVisible ? '54px' : '20px' }}
    >
      <button 
        className="mobile_toggle_btn" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isMobileMenuOpen}
      >
        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      <a className="home_btn" href="/" onClick={(e) => handleMenuClick(e, 'Home')} aria-label="FILA 홈으로 이동">
        <img
          src={isDark ? logoDark : logoWhite}
          alt="FILA 브랜드 로고"
        />
      </a>

      <ul className={`main_menu ${isMobileMenuOpen ? 'active' : ''}`}>
        {menuData.map((menu) => (
          <li
            key={menu.title}
            onMouseEnter={() => setActiveMenu(menu.title)}
          >
            <a href="#" onClick={(e) => handleMenuClick(e, menu.title)} aria-haspopup="true" aria-expanded={activeMenu === menu.title}>{menu.title}</a>
            <div className="sub_menu_container" style={{ display: (activeMenu === menu.title || isMobileMenuOpen) ? 'flex' : 'none' }} role="group" aria-label={`${menu.title} 서브 메뉴`}>
              {menu.subMenus.map((subMenu) => (
                <div key={subMenu.title} className="sub_menu_column">
                  <h3 className="sub_menu_title">
                    <a href="#">{subMenu.title}</a>
                  </h3>
                  <ul className="sub_menu_list">
                    {subMenu.items.map((item) => (
                      <li key={item}>
                        <a href="#">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <nav aria-label="사용자 메뉴">
        <ul>
          <li><a href="#" aria-label="매장 찾기"><i className="fa-solid fa-map-location" aria-hidden="true"></i></a></li>
          <li><a href="#" aria-label="검색"><i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i></a></li>
          <li><a href="#" aria-label="마이페이지"><i className="fa-solid fa-user" aria-hidden="true"></i></a></li>
          <li className="cart_nav_item" onClick={onCartClick}>
            <a href="#" onClick={(e) => e.preventDefault()} role="button" aria-label={`장바구니, ${cartCount}개의 아이템`}>
              <i className="fa-solid fa-bag-shopping" aria-hidden="true"></i>
              {cartCount > 0 && <span className="cart_count">{cartCount}</span>}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
