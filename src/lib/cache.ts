export let cardsCache: { 
    pg: any[] | null; 
    pp: any[] | null; 
    linkCasa: { link: string; bannerImage: string;} | null; 
} = {
    pg: null, // Cache para PG
    pp: null, // Cache para PP
    linkCasa: null, // Cache para o linkCasa e bannerImage
};
