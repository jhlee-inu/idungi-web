import Hero from "../components/Hero.jsx";
import BrandStory from "../components/BrandStory.jsx";
import MenuSection from "../components/MenuSection.jsx";
import NextChapter from "../components/NextChapter.jsx";
import VisitSection from "../components/VisitSection.jsx";
import content from "../data/content.json";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <MenuSection content={content} />
      <VisitSection content={content} />
      <BrandStory />
      <NextChapter />
    </main>
  );
}
