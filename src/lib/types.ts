export type CardData = {
    id: number;
    nomeJogo: string;
    categoriaJogo: string;
    porcentagem: number;
    minima: number;
    padrao: number;
    maxima: number;
    colorBgGame: string;
    updatedAt: Date;
};

export type LinkCasaData = {
    id: number;
    casa: string;
    link: string;
    bannerImage: string | null;
};
