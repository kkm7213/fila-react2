const commonImages = import.meta.glob('@/assets/image/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const getCommonImage = (fileName) => commonImages[`/src/assets/image/${fileName}`];

export const lookImages = [
  getCommonImage('여자1(1).webp'),
  getCommonImage('여자1(2).webp'),
  getCommonImage('여자(3).webp'),
  getCommonImage('남여1(1).webp'),
  getCommonImage('남여1(2).webp'),
  getCommonImage('여자2(1).webp'),
  getCommonImage('여자2(2).webp'),
  getCommonImage('여자3(1).webp'),
  getCommonImage('여자3(2).webp')
];
