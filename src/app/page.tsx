import { CardGames } from "@/components/card-games";
import Image from "next/image";
import logoFP from '../../public/favicon.png'
import { ButtonScrollTop } from "@/components/button-scroll-top";
import { linkBruno } from "@/lib/utils";

export default function Home() {

  return (
    <main>
      <ButtonScrollTop />

      <div className="container mx-auto flex justify-center pt-28 flex-col items-center">
        <div className="flex flex-col justify-center items-center gap-2">

          <div className="w-20">
            <Image width={9000} height={9000} src={logoFP} alt="Logo Oficial FP" />
          </div>

          <h1 className="text-center text-xl sm:text-2xl">
            FP PORCENTAGEM DE PAGAMENTO
          </h1>

        </div>

        <div className="border-b rounded-full border-zinc-500/45 w-[300px] md:w-[400px] lg:w-[600px] my-10" />

      </div>

      <section>
        <div className="container mx-auto">

          <CardGames
            linkCasa={linkBruno}  //LINK DAS CASAS
          />

        </div>
      </section>
    </main>
  );
}
