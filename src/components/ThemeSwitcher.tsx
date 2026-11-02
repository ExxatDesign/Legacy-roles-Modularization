import { useEffect, useState } from "react";
import {
  PRISM_COLOR_THEME_OPTIONS,
  PRISM_COLOR_THEME_STORAGE_KEY,
  applyPrismColorTheme,
  parsePrismColorTheme,
  type PrismColorTheme,
} from "../lib/prism-themes";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<PrismColorTheme>("theme-blue-light");

  useEffect(() => {
    const stored = parsePrismColorTheme(localStorage.getItem(PRISM_COLOR_THEME_STORAGE_KEY));
    setTheme(stored);
    applyPrismColorTheme(stored);
  }, []);

  function onChange(next: PrismColorTheme) {
    setTheme(next);
    applyPrismColorTheme(next);
  }

  return (
    <div className="um-theme-switcher" role="region" aria-label="Prism theme switcher">
      <p className="um-theme-switcher__title">Theme</p>
      <div>
        {PRISM_COLOR_THEME_OPTIONS.map((opt) => (
          <label key={opt.id} className="um-theme-switcher__option">
            <input
              type="radio"
              name="prism-theme"
              value={opt.id}
              checked={theme === opt.id}
              onChange={() => onChange(opt.id)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
