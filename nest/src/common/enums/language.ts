export const Language = {
  CHINESE: 'zh',
  ENGLISH: 'en',
  JAPANESE: 'ja',
  KOREAN: 'ko',
  VIETNAMESE: 'vi',
} as const;
export type Language = (typeof Language)[keyof typeof Language];

const LanguageNames: { [key in Language]?: string } = {
  en: 'English',
  ja: 'Japanese',
  ko: 'Korean',
  vi: 'Vietnamese',
  zh: 'Chinese',
};

export function getLanguageName(code: string): string | undefined {
  if (code in LanguageNames) {
    return LanguageNames[code as Language];
  }
  return undefined;
}
