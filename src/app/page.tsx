import { getCardsPG, getLinkCasa } from "@/lib/actions";
import { ContentPg } from "@/components/content-pg";
import { CardData, SectionCards } from "@/components/section-cards-pg";
import { formatUpdateTime } from "@/lib/utils";
import Loading from "@/components/loading";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

// Cache local
let cachedData: {
  cards: CardData[];
  linkCasa: string;
  imageBanner: string;
  updateTime: string;
  timestamp: number; // Indica quando os dados foram cacheados
} | null = null;
let lastUpdatedAt: string | null = null;

const CACHE_EXPIRATION_TIME = 300000; // 5 minutos em milissegundos

// Função para carregar os dados
async function loadData() {
  const now = Date.now();

  // Verifica se o cache existe e é válido
  if (cachedData && (now - cachedData.timestamp) < CACHE_EXPIRATION_TIME) {
    if (lastUpdatedAt === cachedData.updateTime) {
      console.log("Servindo dados do cache");
      return cachedData;
    } else {
      console.log("O `updatedAt` mudou. Recarregando os dados.");
    }
  }

  // Busca novos dados da API
  console.log("Recarregando dados do banco de dados");
  const [cardsData, propsSettings] = await Promise.all([getCardsPG(), getLinkCasa()]);

  const cards = cardsData?.data as CardData[] || [];
  const linkCasa = propsSettings?.data?.link || ""; // Garantia de string
  const imageBanner = propsSettings?.data?.bannerImage || ""; // Garantia de string
  const updateTime =
    cards.length > 0 && cards[0].updatedAt
      ? formatUpdateTime(new Date(cards[0].updatedAt))
      : "";

  const newUpdatedAt =
    cards.length > 0 && cards[0].updatedAt
      ? new Date(cards[0].updatedAt).toISOString()
      : "";

  // Atualiza o cache apenas se necessário
  if (!cachedData || newUpdatedAt !== lastUpdatedAt) {
    cachedData = {
      cards,
      linkCasa,
      imageBanner,
      updateTime,
      timestamp: now,
    };
    lastUpdatedAt = newUpdatedAt;

    console.log("Cache atualizado com novos dados.");
  } else {
    console.log("Os dados não foram atualizados. Mantendo o cache.");
  }

  return cachedData;
}

export default async function HomePage() {
  const data = await loadData();

  // Tratamento de falha no carregamento
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
