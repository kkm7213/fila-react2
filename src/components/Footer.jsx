import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer_top">
        <section className="site_nav">
          <div>
            <h4>Corporate</h4>
            <ul>
              <li><a href="#">About FILA</a></li>
              <li><a href="#">Athletes</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Collaboration</a></li>
              <li><a href="#">Misto Holdings IR</a></li>
            </ul>
          </div>
          <div>
            <h4>Partnership</h4>
            <ul>
              <li><a href="#">단체판매</a></li>
              <li><a href="#">대리점 개설문의</a></li>
              <li><a href="#">입찰 참여 안내</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="#">공지사항</a></li>
              <li><a href="#">고객센터</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">1:1문의</a></li>
              <li><a href="#">멤버혜택</a></li>
            </ul>
          </div>
        </section>

        <div className="footer_right">
          <section className="sns_nav">
            <nav>
              <ul>
                <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
              </ul>
            </nav>
          </section>

          <section className="me_information">
            <div className="name">김경민</div>
            <div className="email">kkm7213@gmail.com</div>
            <div className="text">평일 월 - 금 : 09시 - 18시 (공휴일 제외)</div>
          </section>
        </div>
      </div>

      <hr />

      <div className="footer_bottom">
        <section className="corp_information">
          <div>
            <div>
              <span>미스토코리아(주) 대표이사 : 김지헌</span>
              <span>서울특별시 성북구 보문로 35</span>
              <span>사업자등록번호 : 716-81-01573 사업자정보확인</span>
            </div>
            <div>
              <span>통신판매업신고 : 제 2024-서울성북-0914 호</span>
              <span>개인정보 보호책임자 : 이학우</span>
            </div>
          </div>
        </section>

        <section className="site_information">
          <div>본 사이트는 실제로 동작하는 사이트가 아닙니다.</div>
          <div>본 사이트의 상품이미지 저작권은 미스토코리아(주)에 있으며, 사이트의 내용은 법적 효력이 없습니다.</div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
