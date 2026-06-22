import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => {
        const language = e.target.value;
        localStorage.setItem("language", language);
        i18n.changeLanguage(language);
      }}
      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
    >
      <option value="tr">TR</option>
      <option value="en">EN</option>
    </select>
  );
}