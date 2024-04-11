import { CardGames } from "@/components/card-games";

export default function Home() {


  return (
    <main className="">

      <div className="container mx-auto flex py-10">

        <div className="w-full justify-center items-center flex flex-col">
          <h1 className="text-[80px] rubik">F P</h1>
          <p className="uppercase -mt-4">sinais slots</p>
        </div>
      </div>

      <section className="py-10 h-full">
        <div className="container mx-auto">

          <CardGames linkCasa='https://meusinal.vip/bruno/' />

        </div>
      </section>
    </main>
  );
}
