import Image from "next/image";
import logoFP from '../../public/favicon.png'

export function Footer() {
    return (
        <footer className='pb-20 border-t border-zinc-300/30 bg-transparent/95 mt-20'>
            <div className="container mx-auto mt-16 flex flex-col gap-16 text-zinc-50 p-3">
                <div className="flex flex-row justify-around">
                    <div className="flex flex-col justify-around w-full">
                        <h1 className="font-bold text-2xl text-green-700 mb-2">
                            DEFENSORES DO JOGO RESPONSÁVEL
                        </h1>
                        <p className="text-sm max-w-[820px]">
                            Nós do Grupo FP, promovemos o jogo responsável como uma forma de entretenimento.
                            Se o jogo deixar de ser divertido, é hora de parar. Para informações sobre sinais de problemas com jogos de azar,
                            visite BeGambleAware. O jogo é destinado a maiores de 18 anos – é ilegal para menores.
                        </p>
                    </div>
                    <div className="w-full flex items-start justify-end">


                        <Image
                            width={900}
                            height={900}
                            quality={100}
                            src={logoFP}
                            className="w-12"
                            alt="logo FP"
                        />
                    </div>
                </div>

                <div className="max-w-[790px] ">
                    <h1 className="font-bold text-2xl text-green-700 mb-2">
                        AVISO LEGAL
                    </h1>
                    <p className="text-sm">
                    O site grupofpsinais.com.br é uma plataforma independente dedicada a cassinos online e jogos de cassino. Fornecemos análises detalhadas e imparciais, 
                    mas recomendamos sempre verificar as regulamentações locais antes de participar de qualquer atividade de jogo.
                    </p>
                </div>

            </div>

        </footer>
    )
}