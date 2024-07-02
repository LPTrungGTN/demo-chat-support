export const Language = {
  CHINESE: 'zh',
  ENGLISH: 'en',
  JAPANESE: 'ja',
  KOREAN: 'ko',
  VIETNAMESE: 'vi',
} as const;
export type Language = (typeof Language)[keyof typeof Language];

const LanguageLabels: { [key in Language]?: string } = {
  en: 'Answer in English',
  ja: '日本語の回答',
  ko: '한국어로 답변',
  vi: 'Trả lời bằng Tiếng Việt',
  zh: '用中文回答',
};

export function getLanguageName(code: string): string | undefined {
  if (code in LanguageLabels) {
    return LanguageLabels[code as Language];
  }
  return undefined;
}
