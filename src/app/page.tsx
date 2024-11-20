import { loadData } from "@/lib/utils";
import { ContentPg } from "@/components/content-pg";
import { SectionCards } from "@/components/section-cards-pg";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import Loading from "./loading";

export default async function HomePage() {
  const data = await loadData("pg");

  if (!data || !data.cards || !data.linkCasa || !data.imageBanner || !data.updateTime) {
    return <Loading />;
  }

  const { cards, linkCasa, imageBanner, updateTime } = data;

  return (
    <>
      <NavBar />
      <main>
        <ContentPg updateTime={updateTime} imageBanner={imageBanner} />
        <SectionCards cards={cards} linkCasa={linkCasa} />
      </main>
      <Footer />
    </>
  );
}
