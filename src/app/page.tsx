import { getCardsPG, getLinkCasa } from "@/lib/actions";
import { ContentPg } from "@/components/content-pg";
import { CardData, SectionCards } from "@/components/section-cards-pg";
import { formatUpdateTime } from "@/lib/utils";
import Loading from '@/components/loading';
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

const CACHE_EXPIRATION_TIME = 300000; // 5 minutos em milissegundos
let cachedData: { cards: CardData[]; linkCasa: string; imageBanner: string; updateTime: string } | null = null;
let cacheTimestamp: number = 0;
let lastUpdatedAt: string | null = null;

async function loadData() {
  const now = Date.now();

  // Verifica se o cache existe e não está expirado
  if (cachedData && (now - cacheTimestamp) < CACHE_EXPIRATION_TIME) {
    console.log("Servindo dados do cache");
    return cachedData;
  }

  // Busca os dados da API
  console.log("Recarregando dados do banco de dados");
  const cardsData = await getCardsPG();
  const propsSettings = await getLinkCasa();

  const cards = cardsData?.data as CardData[];
  const linkCasa = propsSettings.data?.link || '';
  const imageBanner = propsSettings.data?.bannerImage || '';
  const updateTime = cardsData?.data[0]?.updatedAt ? formatUpdateTime(cardsData.data[0].updatedAt) : '';

  // Verifica se o `updatedAt` mudou
  const newUpdatedAt = cardsData?.data[0]?.updatedAt ? new Date(cardsData.data[0].updatedAt).toISOString() : null;
  if (lastUpdatedAt && newUpdatedAt === lastUpdatedAt) {
    console.log("Os dados não foram atualizados. Mantendo o cache.");
    return cachedData; // Retorna os dados em cache se `updatedAt` não mudou
  }

  // Atualiza o cache e o timestamp
  cachedData = { cards, linkCasa, imageBanner, updateTime };
  cacheTimestamp = now;
  lastUpdatedAt = newUpdatedAt;

  console.log("Cache atualizado com novos dados");
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
