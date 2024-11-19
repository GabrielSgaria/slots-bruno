import { getCardsPG, getLinkCasa } from "@/lib/actions";
import { ContentPg } from "@/components/content-pg";
import { SectionCards } from "@/components/section-cards-pg";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { formatUpdateTime } from "@/lib/utils";

export default async function HomePage() {
  console.log("Rendering HomePage...");

  // Busca de dados diretamente no servidor
  const [cardsData, linkCasaData] = await Promise.all([getCardsPG(), getLinkCasa()]);

  // console.log("Fetched cardsData:", cardsData);
  // console.log("Fetched linkCasaData:", linkCasaData);

  // Dados processados
  const cards = cardsData?.data || [];
  const linkCasa = linkCasaData?.data?.link || '';
  const imageBanner = linkCasaData?.data?.bannerImage || '';
  const updateTime = cardsData?.data[0]?.updatedAt ? formatUpdateTime(cardsData.data[0].updatedAt) : '';

  // Verificação de dados
  if (!cards.length || !linkCasa || !imageBanner || !updateTime) {
    console.log("Some data is missing. Returning loading message...");
    return <div>Carregando...</div>;
  }

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
