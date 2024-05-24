import { CardGames } from "@/components/card-games";
import { ButtonScrollTop } from "@/components/button-scroll-top";
import { getCards, getLinkCasa } from "@/lib/actions";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { HeaderInfos } from "@/components/header-info";

export default async function Home() {
  const cards = await getCards();
  const novoLink = await getLinkCasa();
  return (
    <main className="">
      <ButtonScrollTop />

      <HeaderInfos />

      <section>
        <div className="container mx-auto items-center justify-center px-3 sm:px-0 flex">
          {novoLink.data ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2 '>
              {cards?.data.map(({ id, porcentagem }) => (
                <CardGames key={id} id={id} porcentagem={porcentagem} linkCasa={novoLink?.data} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <p className="text-zinc-50 text-xl uppercase font-bold flex">Link não encontrado <DotFilledIcon className="size-8 text-red-600 animate-ping text-center" /></p>
              <p className="text-zinc-500">atualize na página do administrador</p>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
