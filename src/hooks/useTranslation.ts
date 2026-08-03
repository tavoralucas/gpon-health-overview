import { useTranslation as useI18nTranslation } from 'react-i18next';

/**
 * Custom hook for translations with better TypeScript support
 * Provides a more convenient API for translations
 */
export function useTranslation(namespace?: string) {
  const { t, i18n } = useI18nTranslation(namespace);
  
  return {
    t,
    i18n,
    changeLanguage: i18n.changeLanguage.bind(i18n),
    language: i18n.language,
    languages: [
      { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
      { code: 'en-US', name: 'English', flag: '🇺🇸' },
      { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
    ],
  };
}