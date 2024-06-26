export const Language = {
  CHINESE: 'zh',
  ENGLISH: 'en',
  JAPANESE: 'ja',
  KOREAN: 'ko',
  VIETNAMESE: 'vi',
} as const;
export type Language = (typeof Language)[keyof typeof Language];
