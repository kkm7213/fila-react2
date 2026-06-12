

const trendingImages = import.meta.glob('@/assets/image/Trending/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const commonImages = import.meta.glob('@/assets/image/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const getTrendingImage = (fileName) => trendingImages[`/src/assets/image/Trending/${fileName}`];
const getCommonImage = (fileName) => commonImages[`/src/assets/image/${fileName}`];

export const trendingData = {
  "메리제인": [
    { id: 1, tag: "라이프스타일ㅣ여성", title: "에샤페 벨크로 메리제인 초코", price: "99,900원", image: getTrendingImage('mary1.webp') },
    { id: 2, tag: "라이프스타일ㅣ여성", title: "에샤페 벨크로 메리제인", price: "99,000원", image: getTrendingImage('mary2.webp') },
    { id: 3, tag: "라이프스타일ㅣ여성", title: "에샤페 벨크로 메리제인", price: "99,000원", image: getTrendingImage('mary3.webp') },
    { id: 4, tag: "공용ㅣ라이프스타일", title: "휠라 글리오 메리제인", price: "99,900원", image: getTrendingImage('mary4.webp') },
    { id: 5, tag: "공용ㅣ라이프스타일", title: "휠라 글리오 메리제인", price: "99,900원", image: getTrendingImage('mary5.webp') }
  ],
  "마이티셔츠": [
    { id: 1, tag: "공용", title: "<우즈 착용>마이티셔츠 유니 세미오버핏", price: "49,900원", image: getCommonImage('clothes1.png') },
    { id: 2, tag: "여성", title: "<한소희 착용> 마이티셔츠 여성 오버핏", price: "49,900원", image: getCommonImage('clothes2.webp') },
    { id: 3, tag: "여성", title: "<아일릿 착용> 마이티셔츠 여성 스탠다드", price: "49,900원", image: getCommonImage('clothes3.webp') },
    { id: 4, tag: "공용", title: "마이티셔츠 유니 세미오버핏", price: "49,900원", image: getCommonImage('clothes4-1.webp') },
    { id: 5, tag: "여성", title: "마이티셔츠 여성 오버핏", price: "49,900원", image: getCommonImage('clothes5.webp') }
  ],
  "글리오": [
    { id: 1, tag: "라이프스타일ㅣ여성", title: "휠라 글리오 실버문", price: "109,000원", image: getTrendingImage('glio.webp') },
    { id: 2, tag: "라이프스타일ㅣ여성", title: "휠라 글리오 크림", price: "109,000원", image: getTrendingImage('glio2.webp') },
    { id: 3, tag: "라이프스타일ㅣ여성", title: "휠라 글리오 핑크", price: "109,000원", image: getTrendingImage('glio3.webp') },
    { id: 4, tag: "공용ㅣ라이프스타일", title: "휠라 글리오 메리제인", price: "99,900원", image: getTrendingImage('mary4.webp') },
    { id: 5, tag: "라이프스타일ㅣ여성", title: "휠라 글리오 메리제인", price: "99,900원", image: getTrendingImage('mary5.webp') }
  ],
  "샌들": [
    { id: 1, tag: "공용", title: "슬릭 웨이비 샌틀 v3", price: "99,900원", image: getTrendingImage('sandals1.webp') },
    { id: 2, tag: "공용", title: "슬릭 웨이비 샌틀 v3", price: "99,900원", image: getTrendingImage('sandals2.webp') },
    { id: 3, tag: "공용", title: "페이토 샌들 v2", price: "89,900원", image: getTrendingImage('sandals3.webp') },
    { id: 4, tag: "공용", title: "페이토 샌들 v2", price: "89,900원", image: getTrendingImage('sandals4.webp') },
    { id: 5, tag: "공용", title: "페이토 샌들 v2", price: "89,900원", image: getTrendingImage('sandals5.webp') }
  ],
  "테니스": [
    { id: 1, tag: "여성ㅣ테니스", title: "테니스 여성 골지 크롭 카라 반팔티", price: "69,900원", image: getTrendingImage('tennis1.webp') },
    { id: 2, tag: "여성ㅣ테니스", title: "테니스 소로나 카라 원피스", price: "109,000원", image: getTrendingImage('tennis2.webp') },
    { id: 3, tag: "여성ㅣ테니스", title: "테니스 파워넷 게더 원피스", price: "139,000원", image: getTrendingImage('tennis3.webp') },
    { id: 4, tag: "여성ㅣ테니스", title: "테니스 Drywave 클럽매치 자카드 카라티", price: "99,900원", image: getTrendingImage('tennis4.webp') },
    { id: 5, tag: "여성ㅣ테니스", title: "테니스 헨리넥 자카드 반팔티", price: "79,900원", image: getTrendingImage('tennis5.webp') }
  ],
  "냉감티셔츠": [
    { id: 1, tag: "공용", title: "Coldwave 에센셜 기능성 반팔티", price: "39,900원", image: getTrendingImage('cold1.webp') },
    { id: 2, tag: "공용", title: "Coldwave 에센셜 기능성 반팔티", price: "39,900원", image: getTrendingImage('cold2.webp') },
    { id: 3, tag: "여성", title: "여성 Coldwave 에센셜 기능성 반팔티", price: "39,900원", image: getTrendingImage('cold3.webp') },
    { id: 4, tag: "공용", title: "Coldwave 에센셜 소로나 반팔티", price: "39,900원", image: getTrendingImage('cold4.webp') },
    { id: 5, tag: "공용", title: "Coldwave 에센셜 소로나 반팔티", price: "39,900원", image: getTrendingImage('cold5.webp') }
  ],
  "에샤페": [
    { id: 1, tag: "공용ㅣ라이프스타일", title: "<우즈 착용> 휠라 에샤페 실버문", price: "109,000원", image: getTrendingImage('eschape1.webp') },
    { id: 2, tag: "공용ㅣ라이프스타일", title: "<차정원 착용> 휠라 에샤페 v2 실버", price: "119,000원", image: getTrendingImage('eschape2.webp') },
    { id: 3, tag: "공용ㅣ라이프스타일", title: "<김나영 착용> 휠라 에샤페 LX 블루", price: "119,000원", image: getTrendingImage('eschape3.webp') },
    { id: 4, tag: "공용ㅣ라이프스타일", title: "<한소희 착용> 휠라 에샤페 LX 크림", price: "119,000원", image: getTrendingImage('eschape4.webp') },
    { id: 5, tag: "공용ㅣ라이프스타일", title: "<한소희 착용> 휠라 에샤페 LX 초코", price: "119,000원", image: getTrendingImage('eschape5.webp') }
  ],
  "F.H.C": [
    { id: 1, tag: "공용", title: "FHC 젤라또 그래픽 박시 반팔티", price: "59,900원", image: getTrendingImage('fhc1.webp') },
    { id: 2, tag: "공용", title: "FHC 젤라또 그래픽 박시 반팔티", price: "59,900원", image: getTrendingImage('fhc2.webp') },
    { id: 3, tag: "공용", title: "FHC 바운스 반팔티", price: "59,900원", image: getTrendingImage('fhc3.webp') },
    { id: 4, tag: "공용", title: "FHC 바운스 그래픽 반팔티", price: "59,900원", image: getTrendingImage('fhc4.webp') },
    { id: 5, tag: "공용", title: "FHC 바운스 그래픽 반팔티", price: "59,900원", image: getTrendingImage('fhc5.webp') }
  ]
};
