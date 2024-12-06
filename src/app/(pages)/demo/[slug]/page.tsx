
import GamePageClient from '@/components/games-demo';
import { getLinkCasa } from '@/lib/actions';


const games = [
  { name: 'Fortune Tiger', slug: 'fortune-tiger', id: '126', image: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/e3a5c3bb-4658-46c9-ac5a-2d6b02e56f00/public', bgImage: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/1d70fcc2-a6d9-40b7-d55c-84ad35078100/public' },
  { name: 'Fortune Rabbit', slug: 'fortune-rabbit', id: '1543462', image: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/268fcfd5-c2d3-4267-538d-7babc1b8ea00/public', bgImage: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/28f81fb1-4d7c-4712-92ff-3ba26a0e7900/public' },
  { name: 'Fortune Ox', slug: 'fortune-ox', id: '98', image: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/321ceb3a-cb3c-42b7-7f5f-7c2df8dbd500/public', bgImage: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/a466b706-d8e1-4e1c-e526-c8d1f5a6a500/public' },
  { name: 'Fortune Mouse', slug: 'fortune-mouse', id: '68', image: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/7b3350b7-27d4-4d7e-aa8c-515160187c00/public', bgImage: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/c8d8c8ac-c108-4ff3-2dc2-86b8a1af9a00/public' },
  { name: 'Fortune Dragon', slug: 'fortune-dragon', id: '1695365', image: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/07001f8e-4183-40e7-8793-4524eaba5100/public', bgImage: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/dcabbfb9-d598-41c3-9a35-302d4a80d300/public'},
]

export default async function GamePage({ params }: { params: { slug: string } }) {
  const getLink = await getLinkCasa();
  const novoLink = getLink.data?.link;

  const gameName = params.slug.replace(/%20/g, '-').toLowerCase();
  const currentGame = games.find(game => game.slug === gameName);

  if (!currentGame) {
    return <div>Jogo não encontrado</div>;
  }

  return <GamePageClient currentGame={currentGame} otherGames={games.filter(game => game.slug !== gameName)} novoLink={novoLink}/>;
}

