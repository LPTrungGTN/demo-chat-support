/* eslint-disable sort-keys-custom-order/object-keys */
export const Language = {
  ENGLISH: 'en',
  JAPANESE: 'ja',
  VIETNAMESE: 'vi',
  CHINESE: 'zh',
  KOREAN: 'ko',
} as const;
export type Language = (typeof Language)[keyof typeof Language];
