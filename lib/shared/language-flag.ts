import { US, PT, ES } from 'country-flag-icons/react/3x2';

export interface LanguageOption {
  code: string;
  name: string;
  flag: React.ComponentType<{ className?: string; title?: string }>;
}

export const languageOptions: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    flag: US,
  },
  {
    code: 'pt',
    name: 'Português',
    flag: PT,
  },
  {
    code: 'es',
    name: 'Español',
    flag: ES,
  },
];

export const getLanguageOption = (code: string): LanguageOption | undefined => {
  return languageOptions.find((option) => option.code === code);
};