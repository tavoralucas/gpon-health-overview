# Internationalization (i18n) Setup

This project uses `i18next` with `react-i18next` for internationalization support.

## Supported Languages

- **Portuguese (Brazil)** - `pt-BR` (default)
- **English (US)** - `en-US`
- **Spanish (Spain)** - `es-ES`

## Project Structure

```
src/
├── i18n.ts                    # i18n configuration
├── locales/
│   ├── pt-BR.json             # Portuguese translations
│   ├── en-US.json             # English translations
│   └── es-ES.json             # Spanish translations
├── hooks/
│   └── useTranslation.ts      # Custom hook for translations
└── components/
    └── LanguageSwitcher.tsx   # Language selector component
```

## Adding New Translations

1. Add the translation keys to all three locale files:
   - `src/locales/pt-BR.json`
   - `src/locales/en-US.json`
   - `src/locales/es-ES.json`

2. Use the translation in components:
   ```tsx
   import { useTranslation } from '@/hooks/useTranslation';
   
   export function MyComponent() {
     const { t } = useTranslation();
     
     return <div>{t('common.search')}</div>;
   }
   ```

## Translation Key Organization

Keys are organized by feature/namespace:
- `common` - Shared/common translations
- `navigation` - Navigation/menu items
- `dashboard` - Dashboard page
- `panorama360` - Panorama 360 pages
- `costManagement` - Cost Management pages
- `finops360` - Finops 360 pages
- `mangue` - Mangue pages
- `dci` - DCI pages
- `gpon360` - GPON 360 pages
- `novidades` - News/Updates pages
- `pages` - Page titles
- `sidebar` - Sidebar content
- `aiChat` - AI Chat panel
- `footer` - Footer content

## Using Interpolation

For dynamic values:
```json
"found": "{{count}} result{{count, plural, one {} other {s}} found"
```

Usage:
```tsx
t('common.found', { count: results.length })
```

## Language Detection

The language is detected in this order:
1. `localStorage` (saved preference)
2. Browser navigator language
3. HTML lang attribute
4. Fallback to `pt-BR`

The selected language is persisted in `localStorage`.

## Adding a New Language

1. Create a new locale file in `src/locales/` (e.g., `fr-FR.json`)
2. Add the language to the `resources` object in `src/i18n.ts`
3. Add the language to the `languages` array in `src/hooks/useTranslation.ts`
4. Add the language flag and name