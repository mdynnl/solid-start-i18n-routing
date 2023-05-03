import { useI18n } from "@solid-primitives/i18n";
import { Title } from "solid-start";
import Counter from "~/components/Counter";

export default function Home() {
  const [t] = useI18n();
  return (
    <main>
      <Title>Hello World</Title>
      <h1>{t("hello_world")}</h1>
      <blockquote>{t("hello")}</blockquote>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
