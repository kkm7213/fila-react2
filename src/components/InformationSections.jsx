import React from 'react';
import './InformationSections.css';
import inform1 from '@/assets/image/inform1.webp';
import inform2 from '@/assets/image/inform2.webp';
import heritageImg from '@/assets/image/2__FILA_HERITAGE_SS26_SUMMER_W_02_189_D.webp';
import steadySellerImg from '@/assets/image/inform4.webp';

const InformationSections = () => {
  return (
    <>
      <section className="information1_section">
        <h2>The beginning of FILA<br />1911 & Everyday</h2>
        <div>
          <a href="#" style={{ backgroundImage: `url(${inform1})` }}>
            <div className="information">
              <h3>Control The Court</h3>
              <p>
                코드 위 퍼포먼스를 위해 설계된<br />
                휠라 테니스 제품을 만나보세요.
              </p>
            </div>
            <button type="button" className="arrow_button rounded"><i className="fa-solid fa-arrow-right"></i></button>
          </a>
          <a href="#" style={{ backgroundImage: `url(${inform2})` }}>
            <div className="information">
              <h3>Pace Your Day</h3>
              <p>
                일상부터 퍼포먼스까지, 당신의 러닝을 <br />
                완성하는 한 켤레를 만나보세요.
              </p>
            </div>
            <button type="button" className="arrow_button rounded"><i className="fa-solid fa-arrow-right"></i></button>
          </a>
        </div>
      </section>

      <section className="information2_section">
        <div>
          <img className="logo" src="//www.fila.co.kr/cdn/shop/files/fila-footer-logo.svg?v=1761708660&amp;width=200" alt="FILA logo" />
          <p className="information">
            FILA 아카이브를 기반으로 브랜드의 <br />
            클래식한 정체성을 담아낸 헤리티지 컬렉션을 소개 <br />
            합니다. <br />
            1911 & Everyday Since
          </p>
          <a href="#">
            <button type="button" className="arrow_button rounded">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </a>
        </div>
        <div>
          <img src={heritageImg} alt="Heritage Image" />
        </div>
      </section>

      <section className="information3_section">
        <p>
          과감한 컬러 미학으로 휠라만의 헤리티지를 쌓아온 115년
          <br />
          휠라의 스테디셀러 에샤페 역시, 감각적인 컬러 팔레트로
          <br />
          다양한 라인업을 선보이며 꾸준히 사랑 받고 있습니다.
        </p>
        <div className="image_container">
          <img src={steadySellerImg} alt="Steady Seller Image" />
        </div>
      </section>
    </>
  );
};

export default InformationSections;
