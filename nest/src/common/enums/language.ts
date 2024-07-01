export const Language = {
  ENGLISH: 'en',
  JAPANESE: 'ja',
  VIETNAMESE: 'vi',
} as const;
export type Language = (typeof Language)[keyof typeof Language];
