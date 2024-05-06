import { CardGames } from "@/components/card-games";
import Image from "next/image";
import logoFP from '../../public/favicon.png'
import { ButtonScrollTop } from "@/components/button-scroll-top";
import { getCards, getLinkCasa } from "@/lib/actions";
import { DotFilledIcon } from "@radix-ui/react-icons";

export default async function Home() {
  const cards = await getCards();
  const novoLink = await getLinkCasa();
  return (
    <main>
      <ButtonScrollTop />

      <div className="container mx-auto flex justify-center pt-28 flex-col items-center">
        <div className="flex flex-col justify-center items-center gap-2">

          <div className="w-20">
            <Image width={9000} height={9000} src={logoFP} alt="Logo Oficial FP" />
          </div>

          <h1 className="text-center text-xl sm:text-2xl font-bold">
            PORCENTAGEM GRUPO FP OFICIAL
          </h1>

        </div>

        <div className="border-b rounded-full border-zinc-500/45 w-[300px] md:w-[400px] lg:w-[600px] my-10" />

      </div>

      <section>
        <div className="container mx-auto">
          {novoLink.data ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
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
