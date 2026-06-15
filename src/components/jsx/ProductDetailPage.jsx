import React, { useState, useMemo } from 'react';
import '../css/ProductDetailPage.css';

const commonImages = import.meta.glob('@/assets/image/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const getCommonImage = (fileName) => commonImages[`/src/assets/image/${fileName}`];

const ProductDetailPage = ({ product, onAddToCart, reviews, onAddReview, onUpdateReview, onDeleteReview }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [isMainSizeOpen, setIsMainSizeOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({});
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [newReviewContent, setNewReviewContent] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const toggleAccordion = (index) => {
    setOpenAccordions(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      setIsMainSizeOpen(true);
      return;
    }
    if (onAddToCart) {
      onAddToCart({ ...product, selectedSize });
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newReviewContent.trim()) return;
    onAddReview({
      productId: product.id,
      author: "사용자",
      rating: newReviewRating,
      content: newReviewContent,
      image: imagePreview,
      isAdmin: false
    });
    setNewReviewContent("");
    setImagePreview(null);
    setIsReviewFormOpen(false);
  };

  const startEdit = (review) => {
    setEditingId(review.id);
    setEditContent(review.content);
  };

  const handleUpdateSubmit = (id) => {
    onUpdateReview(id, editContent);
    setEditingId(null);
  };

  // 리뷰 통계 계산 로직 (누락된 변수 추가)
  const reviewStats = useMemo(() => {
    const safeReviews = reviews || [];
    const total = safeReviews.length;
    if (total === 0) return { average: "0.0", counts: [0, 0, 0, 0, 0], percents: [0, 0, 0, 0, 0], positiveRate: 0, total: 0 };
    
    const counts = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1점 순
    let sum = 0;
    
    safeReviews.forEach(r => {
      sum += r.rating;
      if (r.rating >= 1 && r.rating <= 5) {
        counts[5 - r.rating]++;
      }
    });
    
    const average = (sum / total).toFixed(1);
    const percents = counts.map(c => Math.round((c / total) * 100));
    const positiveRate = Math.round(((counts[0] + counts[1]) / total) * 100);
    
    return { average, counts, percents, positiveRate, total };
  }, [reviews]);

  if (!product) return <div style={{ padding: '200px', textAlign: 'center' }}>상품을 찾을 수 없습니다.</div>;

  const productImg = product.frontImage || product.image;

  return (
    <div className="product-detail-page">
      <main>
        {/* Main Section */}
        <section id="main">
          <div className="main_image_container">
            <img src={productImg} alt={`${product.title} 메인 이미지`} />
          </div>

          <div className="main_info_container">
            <div className="information">
              <div className="header">
                <div>
                  <span className="tag">{product.gender || "공용"}</span>
                  <span className="tag">의류</span>
                </div>
                <button type="button" className="share">
                  <i className="fa-solid fa-share-nodes"></i>
                </button>
              </div>

              <div className="title">
                <h1>{product.title}</h1>
              </div>

              <div className="group">
                <ul>
                  {(product.thumbnails || []).map((thumb, index) => (
                    <li key={index}>
                      <a href="#" className={index === 0 ? 'active' : ''}>
                        <img src={thumb} alt={`${product.title} thumbnail ${index + 1}`} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="accordion">
                <div className="head" onClick={() => setIsMainSizeOpen(!isMainSizeOpen)} role="button" aria-haspopup="listbox" aria-expanded={isMainSizeOpen} aria-label="사이즈 선택 메뉴">
                  <strong>{selectedSize || "사이즈 선택"}</strong>
                  <i className="fa-solid fa-caret-down" aria-hidden="true"></i>
                </div>
                <div className="body" style={{ display: isMainSizeOpen ? 'grid' : 'none' }} onClick={() => setIsMainSizeOpen(false)} role="listbox">
                  {(product.sizes || ["XS(85)", "S(90)", "M(95)", "L(100)", "XL(105)"]).map(size => (
                    <button 
                      key={size} 
                      type="button" 
                      className={`size ${selectedSize === size ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSize(size);
                        setIsMainSizeOpen(false);
                      }}
                      role="option"
                      aria-selected={selectedSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="cart">
                <button type="button" onClick={handleAddToCart} aria-label={`${product.title} 장바구니에 담기, 가격 ${product.price}`}>
                  <strong>카트에 추가</strong>
                  <strong>{product.price}</strong>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Detail Section */}
        <section id="detail" aria-label="상품 상세 정보">
          <div className="image_container">
            <img src={productImg} alt={`${product.title} 상세 이미지 1`} />
            <img src={getCommonImage('clothes4-2.jpg')} alt={`${product.title} 상세 이미지 2`} />
            <img src={getCommonImage('clothes4-3.webp')} alt={`${product.title} 상세 이미지 3`} />
            <img src={getCommonImage('clothes4-4.jpg')} alt={`${product.title} 상세 이미지 4`} />
          </div>

          <div className="information">
            <div className="description_box">
              <h2 className="sr-only">상품 설명</h2>
              <p className="text">
                빈티지한 무드가 가미된 “MY FAVORITE” 레터링과 실사 느낌의 강아지 조합으로 귀여움에 빈티지 한방울의 감성을 담아 트렌디한 무드를 연출할 수 있습니다.
                워싱된 듯한 컬러 톤과 소프트한 프린트 표현으로 과하지 않게 포인트를 주며, 특히 감각적인 컬러 조합으로 모든 룩에 적당한 포인트가 되어줍니다.
                트렌디한 그래픽과 감각적인 컬러 조합, 세미오버핏으로 간절기부터 한여름까지 평범한 룩에 포인트가 됩니다. 스트릿한 스타일부터 캐쥬얼한 스타일까지, 어떤 스타일에도 부담없이 매치할 수 있습니다.
              </p>
              <span className="text">색상 : BLACK/CHARCOAL GRAY</span>
              <span className="text">상품코드 : 1100FS262RS01X035006</span>
            </div>

            <div className="accordion_group">
              <div className="accordion">
                <div className="head" onClick={() => toggleAccordion(0)} role="button" aria-expanded={openAccordions[0]} aria-controls="accordion-membership">
                  <b>멤버쉽 혜택</b>
                  <i className={`fa-solid ${openAccordions[0] ? 'fa-caret-up' : 'fa-caret-down'}`} aria-hidden="true"></i>
                </div>
                <div id="accordion-membership" className="body membership" style={{ display: openAccordions[0] ? 'flex' : 'none' }}>
                  <ul>
                    <li>신규회원 10,000원 할인 쿠폰</li>
                    <li>첫 구매 30일 후 10,000원 재구매 쿠폰</li>
                    <li>카카오톡 채널 추가 시 10% 할인 쿠폰</li>
                    <li>리뷰 작성 시 최대 30,000P 적립</li>
                  </ul>
                </div>
              </div>

              <div className="accordion">
                <div className="head" onClick={() => toggleAccordion(1)} role="button" aria-expanded={openAccordions[1]} aria-controls="accordion-product-info">
                  <b>상품정보고시</b>
                  <i className={`fa-solid ${openAccordions[1] ? 'fa-caret-up' : 'fa-caret-down'}`} aria-hidden="true"></i>
                </div>
                <div id="accordion-product-info" className="body product_information" style={{ display: openAccordions[1] ? 'flex' : 'none' }}>
                  <div><span>제품소재</span><span>겉감1: 면 100% 겉감2: 면 75% 폴리에스터 25%</span></div>
                  <div><span>사이즈</span><span>XS(085),S(090),M(095),L(100),XL(105)</span></div>
                  <div><span>제조자</span><span>미스토코리아(주)(미스토코리아(주))</span></div>
                  <div><span>제조국</span><span>베트남</span></div>
                  <div><span>제조년월</span><span>202603</span></div>
                  <div><span>세탁방법</span><span>상세 취급방법 제품라벨 참조</span></div>
                  <div><span>품질보증기준</span><span>관련법 및 소비자 분쟁해결기준에 따름</span></div>
                  <div><span>A/S</span><span>미스토코리아㈜ 온라인 고객센터 1577-3472</span></div>
                </div>
              </div>

              <div className="accordion">
                <div className="head" onClick={() => toggleAccordion(2)} role="button" aria-expanded={openAccordions[2]} aria-controls="accordion-fit-guide">
                  <b>핏 & 스펙 가이드</b>
                  <i className={`fa-solid ${openAccordions[2] ? 'fa-caret-up' : 'fa-caret-down'}`} aria-hidden="true"></i>
                </div>
                <div id="accordion-fit-guide" className="body fit_spec_guide" style={{ display: openAccordions[2] ? 'flex' : 'none' }}>
                  <div className="fit_container">
                    <div><span>SLIM</span><span>부담스럽지 않게 날씬해 보이는 효과를 주는 핏</span></div>
                    <div><span>STANDARD</span><span>가장 기본적이고 깔끔한, 조금 여유있는 실루엣의 핏</span></div>
                    <div><span>SEMI-OVER</span><span>편한하고 루즈한 실루엣의 핏</span></div>
                    <div><span>OVER</span><span>자연스러운 스트릿무드의 전체적으로 넉넉한 핏</span></div>
                  </div>

                  <div className="spec_container">
                    <div className="spec">
                      <b>신축성</b>
                      <div className="progress_container" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress parent"><div className="progress child"></div></div>
                        <div><span>없음</span><span>보통</span><span>좋음</span></div>
                      </div>
                    </div>
                    <div className="spec">
                      <b>두께감</b>
                      <div className="progress_container" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress parent"><div className="progress child"></div></div>
                        <div><span>얇음</span><span>보통</span><span>두꺼움</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detail More Section */}
        <section id="detail_more" aria-label="추가 상품 정보">
          <section id="checkpoint">
            <h2>체크포인트</h2>
            <div className="card_container">
              <div className="card">
                <div className="image_container"><img src={getCommonImage('checkpoint_image_1.jpg')} alt="체크포인트 1: 빈티지 무드 그래픽 디테일" /></div>
                <h3>빈티지 무드 그래픽</h3>
                <p>“MY FAVORITE” 레터링과 귀여운 강아지 그래픽을 조합해 빈티지한 감성과 위트 있는 무드를 동시에 담아낸 디자인입니다.</p>
              </div>
              <div className="card">
                <div className="image_container"><img src={getCommonImage('checkpoint_image_2.jpg')} alt="체크포인트 2: 뒤목 로고 디테일" /></div>
                <h3>로고 디테일</h3>
                <p>뒤목 아래에 작은 FILA 로고 프린트를 더해 심플한 디자인 속에서도 브랜드 아이덴티티를 자연스럽게 강조합니다.</p>
              </div>
              <div className="card">
                <div className="image_container"><img src={getCommonImage('checkpoint_image_3.webp')} alt="체크포인트 3: 워싱 컬러 및 프린트 질감" /></div>
                <h3>워싱 컬러 & 소프트 프린트</h3>
                <p>워싱된 듯한 컬러 톤과 부드러운 표현으로 과하지 않게 포인트를 더하며, 자연스럽고 감각적인 스타일을 완성합니다.</p>
              </div>
            </div>
          </section>

          <section id="model_cut">
            <h2>모델컷</h2>
            <p>(여) 165cm / 착용 사이즈: S <br/> *모델 착용 이미지보다 제품컷 이미지의 컬러가 정확합니다.</p>
            <div className="model_container">
              <div className="card"><div className="image_container"><img src={getCommonImage('modelcut_image_1.webp')} alt={`${product.title} 모델 착용 컷 1`} /></div></div>
              <div className="card"><div className="image_container"><img src={getCommonImage('modelcut_image_2.webp')} alt={`${product.title} 모델 착용 컷 2`} /></div></div>
              <div className="card"><div className="image_container"><img src={getCommonImage('modelcut_image_3.webp')} alt={`${product.title} 모델 착용 컷 3`} /></div></div>
            </div>
          </section>
        </section>

        {/* Review Section */}
        <section id="review">
            <div className="review_header_container">
              <h2>REVIEW</h2>
              <button type="button" className="write_review_btn" onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}>
                {isReviewFormOpen ? '작성 취소' : '내 리뷰 작성하기'}
              </button>
            </div>

            {isReviewFormOpen && (
              <div className="review_form_wrapper">
                <form className="review_form_enhanced" onSubmit={handleAddSubmit}>
                  <div className="form_top">
                    <h3>상품은 어떠셨나요?</h3>
                    <div className="star_rating_input">
                      {[5, 4, 3, 2, 1].map(num => (
                        <React.Fragment key={num}>
                          <input 
                            type="radio" 
                            id={`star${num}`} 
                            name="rating" 
                            value={num} 
                            checked={newReviewRating === num} 
                            onChange={() => setNewReviewRating(num)} 
                          />
                          <label htmlFor={`star${num}`} title={`${num}점`}>
                            <i className={`fa-star ${newReviewRating >= num ? 'fa-solid' : 'fa-regular'}`}></i>
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="form_bottom">
                    <div className="upload_container">
                      <div className="image_upload_btn">
                        <input 
                          type="file" 
                          id="review-image-upload" 
                          accept="image/*" 
                          onChange={handleImageChange} 
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="review-image-upload">
                          <i className="fa-solid fa-camera"></i>
                          <span>사진 첨부</span>
                        </label>
                      </div>
                      {imagePreview && (
                        <div className="preview_box">
                          <img src={imagePreview} alt="리뷰 미리보기" />
                          <button type="button" className="remove_img" onClick={handleRemoveImage}>
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      )}
                    </div>

                    <textarea 
                      placeholder="다른 구매자들에게 도움이 될 수 있도록 상품에 대한 솔직한 평가를 남겨주세요. (최소 10자 이상)" 
                      value={newReviewContent} 
                      onChange={(e) => setNewReviewContent(e.target.value)} 
                    />
                    <div className="form_actions">
                      <span className="char_count">{newReviewContent.length} / 500</span>
                      <button type="submit" className="submit_btn">리뷰 등록하기</button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            <div className="ai_review_summary">
              <div className="summary_header">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <span>AI 리뷰 요약</span>
                <i className="fa-solid fa-circle-info info_icon"></i>
              </div>
              <div className="summary_content">
                <p>최신 리뷰를 기다리는 중이에요.</p>
                <p>최신 리뷰가 더 모이면, AI가 내용을 정리해 알려드릴게요.</p>
              </div>
            </div>

            <section className="rating_summary_container">
              <div className="average_rating_box">
                <div className="rating_score">
                  <i className="fa-solid fa-star blue_star"></i>
                  <span>{reviewStats.average}</span>
                </div>
                <div className="rating_text">
                  <span>{reviewStats.positiveRate}%가 <b>만족해요</b> 라고 평가했습니다.</span>
                  <span className="total_count">리뷰 {reviewStats.total}개</span>
                </div>
              </div>

              <div className="rating_bars_box">
                {[
                  { label: "아주 좋아요", idx: 0 },
                  { label: "맘에 들어요", idx: 1 },
                  { label: "보통이에요", idx: 2 },
                  { label: "그냥 그래요", idx: 3 },
                  { label: "별로예요", idx: 4 }
                ].map((item) => (
                  <div key={item.idx} className="rating_bar_item">
                    <span className="bar_label">{item.label}</span>
                    <div className="bar_track">
                      <div 
                        className="bar_fill" 
                        style={{ 
                          width: `${reviewStats.percents[item.idx]}%`,
                          backgroundColor: item.idx <= 1 ? '#000' : '#d1d5db'
                        }}
                      ></div>
                    </div>
                    <span className="bar_count">{reviewStats.counts[item.idx]}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="photo_video">
                <div className="header">
                    <h3>포토&동영상</h3>
                    <button type="button"><span>전체보기</span> <i className="fa-solid fa-angle-right"></i></button>
                </div>
                <ul>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                        <li key={i} className="button image_container" role="button">
                            <img src={getCommonImage(`review_image-${i}.webp`)} alt={`Review ${i}`} />
                            <i className="fa-brands fa-instagram"></i>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="filter">
                <div>
                    <div className="sort_container">
                        <button type="button">최신순</button>
                        <button type="button">별점순</button>
                    </div>
                    <div className="search_container">
                        <button><i className="fa-regular fa-circle-check"></i> <span>포토/동영상 먼저 보기</span></button>
                        <label className="search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="search" placeholder="리뷰 키워드 검색" />
                        </label>
                    </div>
                </div>
            </section>

            <section className="reviews">
                <ul>
                    {reviews.map(review => (
                        <li key={review.id} className="item">
                            <div className="contents">
                                <div className="options"><span>상품 옵션 WM</span></div>
                                <div className="ai_box">
                                    <p>✨ <b>AI 분석</b> 만족도, 디자인, 색상, 스타일 <span>만족해요</span></p>
                                </div>
                                <div className="stars">
                                    {[...Array(review.rating)].map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
                                </div>

                                {editingId === review.id ? (
                                  <div className="edit_mode">
                                    <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                                    <div><button onClick={() => handleUpdateSubmit(review.id)}>저장</button><button onClick={() => setEditingId(null)}>취소</button></div>
                                  </div>
                                ) : (
                                  <p className="content">{review.content}</p>
                                )}

                                {review.image && (
                                  <div className="images">
                                      <div className="image_button">
                                          <img src={review.image} alt="Review content" />
                                          <i className="fa-brands fa-instagram"></i>
                                      </div>
                                  </div>
                                )}

                                <div className="declaration">
                                    <button type="button" onClick={() => startEdit(review)}>수정</button>
                                    <button type="button" onClick={() => onDeleteReview(review.id)}>삭제</button>
                                    <button type="button"><i className="fa-regular fa-thumbs-up"></i> <span>0</span></button>
                                </div>
                            </div>
                            <div className="user_info_container">
                                <div className="user_info">
                                    <p className="id"><b>{review.author}</b> {review.isAdmin && '리뷰'}</p>
                                    <p className="date">{review.date}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
      </main>
    </div>
  );
};

export default ProductDetailPage;
