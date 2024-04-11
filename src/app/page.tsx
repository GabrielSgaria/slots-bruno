'use client'
import { CardGames } from "@/components/card-games";
import Image from "next/image";
import logoFP from '../../public/favicon.png'


export default function Home() {

  return (
    <main>

      <div className="container mx-auto flex justify-center py-20 mt-20">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="w-20 sm:w-40">
            <Image width={9000} height={9000} src={logoFP} alt="Logo Oficial FP" />
          </div>
          <h1 className="text-center text-xl sm:text-2xl">FP PORCENTAGEM DE PAGAMENTO</h1>
        </div>
      </div>

      <section className="">
        <div className="container mx-auto">

          <CardGames
            linkCasa='https://meusinal.vip/bruno/'
          />

        </div>
      </section>
    </main>
  );
}
