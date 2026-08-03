import { useTranslation } from '@/hooks/useTranslation';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { t, i18n, languages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
        aria-label={t('common.language')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4" />
        <span className="flex items-center gap-1">
          {currentLanguage.flag}
          <span className="hidden sm:inline">{currentLanguage.name}</span>
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 top-full z-50 mt-1 min-w-[160px] rounded-md border bg-popover p-1 shadow-lg animate-in fade-in-0 zoom-in-95"
          role="listbox"
          aria-label={t('common.language')}
        >
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => changeLanguage(lang.code)}
                role="option"
                aria-selected={i18n.language === lang.code}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
                  i18n.language === lang.code
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
                {i18n.language === lang.code && (
                  <svg className="ml-auto h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}