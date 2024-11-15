import { getCardsPG, getLinkCasa } from "@/lib/actions";
import { ContentPg } from "@/components/content-pg";
import { CardData, SectionCards } from "@/components/section-cards-pg";
import { formatUpdateTime } from "@/lib/utils";
import Loading from './loading';
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

const CACHE_EXPIRATION_TIME = 200; 
let cachedData: { cards: CardData[]; linkCasa: string; imageBanner: string; updateTime: string } | null = null;
let cacheTimestamp: number = 0;

async function loadData() {
  const now = Date.now();

  // Verifica se o cache existe e não está expirado
  if (cachedData && (now - cacheTimestamp) < CACHE_EXPIRATION_TIME) {
    return cachedData;
  }

  // Se o cache estiver expirado, recarrega os dados
  const cardsData = await getCardsPG();
  const propsSettings = await getLinkCasa();

  const cards = cardsData?.data as CardData[];
  const linkCasa = propsSettings.data?.link || '';
  const imageBanner = propsSettings.data?.bannerImage || '';
  const updateTime = cardsData?.data[0]?.updatedAt ? formatUpdateTime(cardsData.data[0].updatedAt) : '';

  // Atualiza o cache e o timestamp
  cachedData = { cards, linkCasa, imageBanner, updateTime };
  cacheTimestamp = now;

  return cachedData;
}

export default async function HomePage() {
  const data = await loadData();

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
