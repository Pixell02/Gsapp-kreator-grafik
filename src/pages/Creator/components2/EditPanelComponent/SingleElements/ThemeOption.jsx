import Select from 'react-select';
import translate from '../../../locales/translate.json';
import useThemeContext from '../../../hooks/useThemeContext';
import { useLanguageContext } from '../../../../../context/LanguageContext';

export default function ThemeOption({ themeOptions }) {
  const { language } = useLanguageContext();
  const { themeColor, setThemeColor } = useThemeContext();
  return (
    <>
      {themeOptions.length > 1 && (
        <>
          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              width: '100%',
            }}>
            {translate.themes[language]}
          </label>

          <Select
            value={themeColor}
            options={themeOptions}
            onChange={(option) => setThemeColor(option)}
            className="select-option"
          />
        </>
      )}
    </>
  );
}
