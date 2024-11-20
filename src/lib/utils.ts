import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, toZonedTime } from "date-fns-tz";
import { getCacheData, isCacheEmpty, updateCardsCache, updateSettingsCache } from "./cache";
import { getCardsPG, getCardsPP, getLinkCasa } from "./actions";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getRandomPorcentagem = () => {
    return Math.floor(Math.random() * 91) + 10;
};

export const getPorcentagemAjustada = (minValue: number) => {
    // Decide se vai adicionar 1 ou 3 ao maior valor
    const offset = Math.random() < 0.5 ? 1 : 3;
    return Math.min(minValue + offset, 98);
};


export function formatUpdateTime(horario: string | Date, offsetMinutes: number = 0) {
    const date = typeof horario === 'string' ? new Date(horario) : horario;
    if (offsetMinutes > 0) {
        date.setTime(date.getTime() + offsetMinutes * 60 * 1000);
    }

    const timeZone = 'America/Sao_Paulo';
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, 'HH:mm:ss', { timeZone });
}


export const getRandomColor = () => {
    const colors = ['#3f6212', '#65a30d', '#0d9488', '#7e22ce', '#db2777'];
    return colors[Math.floor(Math.random() * colors.length)];
};

export const getRandomClass = () => {
    const colors = [
        'verde-escuro',
        'rosa',
        'verde2',
        'azul',
        'roxo',
        'amarelo-escuro',
        'laranja-claro',
        'azul-marinho',
        'cinza-claro',
        'rosa-claro',
        'roxo-escuro',
        'verde-lima',
        'azul-ciano',
        'amarelo-verde',
        'laranja-vermelho',
        'azul-celeste',
        'rosa-forte',
        'roxo-claro',
        'amarelo-ouro',
        'vermelho-marrom'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};



export function generateRandomNumber(): number {
    return Math.floor(Math.random() * (9 - 3 + 1)) + 3;
}

export function calculateEndTime(): string {
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 5);
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export async function loadData(category: "pg" | "pp") {
    // Verifica se o cache está vazio
    if (isCacheEmpty()) {
      console.log("Cache vazio. Buscando dados do banco de dados...");
  
      // Busca os dados do banco de dados
      const cardsData = category === "pg" ? await getCardsPG() : await getCardsPP();
      const settings = await getLinkCasa();
  
      // Atualiza o cache
      updateCardsCache(cardsData.data);
      updateSettingsCache(settings.data?.link || "", settings.data?.bannerImage || "");
  
      console.log("Cache atualizado com dados do banco.");
    } else {
      console.log("Dados carregados do cache.");
    }
  
    // Retorna os dados do cache
    const cache = getCacheData();
    const formattedUpdateTime = formatUpdateTime(cache.updateTime, 0); // Formata o horário
  
    return {
      cards: cache.cards.filter((card) => card.categoriaJogo === category.toUpperCase()), // Filtra por categoria
      linkCasa: cache.linkCasa,
      imageBanner: cache.imageBanner,
      updateTime: formattedUpdateTime, // Horário formatado
    };
  }







