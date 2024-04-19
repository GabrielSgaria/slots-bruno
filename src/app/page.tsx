import { CardGames } from "@/components/card-games";
import Image from "next/image";
import logoFP from '../../public/favicon.png'
import { ButtonScrollTop } from "@/components/button-scroll-top";
import { getCards } from "@/lib/actions";
import { linkBruno } from "@/lib/utils";


export default async function Home() {
  const cards = await getCards();
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

          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
            {cards?.data.map(({ id, porcentagem }) => (
              <CardGames key={id} id={id} porcentagem={porcentagem} linkCasa={linkBruno} />

            ))}

          </div>

        </div>
      </section>
    </main>
  );
}
