import { useI18n } from "@solid-primitives/i18n";
import { Title } from "solid-start";

export default () => {
  const [t] = useI18n();
  return (
    <main>
      <Title>About</Title>
      <h1>{t("hello_world")}</h1>
      <blockquote>{t("hello")}</blockquote>
    </main>
  );
};
