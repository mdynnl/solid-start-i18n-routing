import { I18nContext, createI18nContext, useI18n } from "@solid-primitives/i18n";
import { ParentProps, createContext, useContext } from "solid-js";
import { useLocation, useMatch, useNavigate } from "solid-start";

export const DICT = {
  fr: {
    hello: "bonjour {{ name }}, comment vas-tu ?",
    hello_world: "Bonjour le monde!",
  },
  en: {
    hello: "hello {{ name }}, how are you?",
    hello_world: "Hello World!",
  },
};

export const LOCALES = Object.keys(DICT);
export type Locale = keyof typeof DICT;

const I18nRouteContext = createContext<{
  navigate: (s?: string) => void;
  route: (s: string) => string;
  localize: (s: string) => string;
}>();

export const useI18nRoute = () => useContext(I18nRouteContext)!;
const createI18nRouteContext = () => {
  const [, { locale }] = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const localeMatcher = useMatch(() => "/:locale/*url", { locale: LOCALES });

  const localizedRoute = (locale: string) => {
    const match = localeMatcher()?.params;
    return "/" + locale + (match ? "/" + match.url : location.pathname) + location.search;
  };

  const localize = (v: string) => ["", locale(), v].join("/").replace(/\/+/g, "/");

  const switchLocale = (l = locale()) => navigate(localizedRoute(l));
  return { navigate: switchLocale, route: localizedRoute, localize };
};

export const LocaleSwitchProvider = (props: ParentProps) => {
  return (
    <I18nContext.Provider value={createI18nContext(DICT, "en")}>
      <I18nRouteContext.Provider value={createI18nRouteContext()}>{props.children}</I18nRouteContext.Provider>
    </I18nContext.Provider>
  );
};

export function NavigateToLocalizedRoute() {
  useI18nRoute().navigate();
  return null;
}

export function LocaleSwitcher() {
  const [, { locale }] = useI18n();
  const switcher = useI18nRoute();

  return (
    <select onChange={(e) => switcher.navigate(e.target.value)}>
      {Object.keys(DICT).map((l) => (
        <option value={l} selected={l === locale()}>
          {l}
        </option>
      ))}
    </select>
  );
}
