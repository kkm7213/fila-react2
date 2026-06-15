import React, { useEffect, useRef, useState } from 'react';
import '../css/FilaEdit.css';

// 이미지 임포트 (1~15)
import main1 from '@/assets/image/Fila_Edit/main1.webp';
import main2 from '@/assets/image/Fila_Edit/main2.webp';
import main3 from '@/assets/image/Fila_Edit/main3.webp';
import main4 from '@/assets/image/Fila_Edit/main4.webp';
import main5 from '@/assets/image/Fila_Edit/main5.webp';
import main6 from '@/assets/image/Fila_Edit/main6.webp';
import main7 from '@/assets/image/Fila_Edit/main7.webp';
import main8 from '@/assets/image/Fila_Edit/main8.webp';
import main9 from '@/assets/image/Fila_Edit/main9.jpg';
import main10 from '@/assets/image/Fila_Edit/main10.webp';
import main11 from '@/assets/image/Fila_Edit/main11.webp';
import main12 from '@/assets/image/Fila_Edit/main12.webp';
import main13 from '@/assets/image/Fila_Edit/main13.webp';
import main14 from '@/assets/image/Fila_Edit/main14.webp';
import main15 from '@/assets/image/Fila_Edit/main15.webp';

import sub1 from '@/assets/image/Fila_Edit/sub1.webp';
import sub2 from '@/assets/image/Fila_Edit/sub2.webp';
import sub3 from '@/assets/image/Fila_Edit/sub3.jpg';
import sub4 from '@/assets/image/Fila_Edit/sub4.webp';
import sub5 from '@/assets/image/Fila_Edit/sub5.webp';
import sub6 from '@/assets/image/Fila_Edit/sub6.webp';
import sub7 from '@/assets/image/Fila_Edit/sub7.webp';
import sub8 from '@/assets/image/Fila_Edit/sub8.webp';
import sub9 from '@/assets/image/Fila_Edit/sub9.webp';
import sub10 from '@/assets/image/Fila_Edit/sub10.webp';
import sub11 from '@/assets/image/Fila_Edit/sub11.jpg';
import sub12 from '@/assets/image/Fila_Edit/sub12.jpg';
import sub13 from '@/assets/image/Fila_Edit/sub13.webp';
import sub14 from '@/assets/image/Fila_Edit/sub14.webp';
import sub15 from '@/assets/image/Fila_Edit/sub15.webp';

const editData = [
  { main: main1, sub: sub1, label: "아일릿" },
  { main: main2, sub: sub2, label: "다영" },
  { main: main3, sub: sub3, label: "피클볼" },
  { main: main4, sub: sub4, label: "썸머 이벤트" },
  { main: main5, sub: sub5, label: "메리제인" },
  { main: main6, sub: sub6, label: "메쉬" },
  { main: main7, sub: sub7, label: "쿨링반팔" },
  { main: main8, sub: sub8, label: "테니스" },
  { main: main9, sub: sub9, label: "Speed-Serve 2.0" },
  { main: main10, sub: sub10, label: "클럽매치" },
  { main: main11, sub: sub11, label: "SEOUL" },
  { main: main12, sub: sub12, label: "슬릭 실루엣" },
  { main: main13, sub: sub13, label: "Heritage" },
  { main: main14, sub: sub14, label: "썸머 슈즈" },
  { main: main15, sub: sub15, label: "ARC" },
];

const FilaEdit = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2초마다 자동 인덱스 변경
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % editData.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <section className="edit_section" ref={sectionRef}>
      <h2>Fila Edit</h2>
      <div className={`image_container ${isActive ? 'active' : ''}`}>
        <img className="main" src={editData[currentIndex].main} alt="메인 이미지" />
        <img className="sub" src={editData[currentIndex].sub} alt="서브 이미지" />
      </div>

      <div className="label_container">
        <div>
          {editData.map((item, index) => (
            <React.Fragment key={item.label}>
              <a 
                href="#" 
                className={currentIndex === index ? 'active' : ''}
                onMouseEnter={() => setCurrentIndex(index)}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex(index);
                }}
              >
                {item.label}
              </a>
              {index < editData.length - 1 && <span className="comma">,</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilaEdit;
