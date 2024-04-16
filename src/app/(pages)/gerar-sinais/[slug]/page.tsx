import { gamesSinais } from "@/lib/constants"
import { cn } from "@/lib/utils";


const backgroundMap: Record<string, string> = {
    "fortune-ox": "bg-fortune-ox",
    'fortune-rabbit': 'bg-fortune-rabbit',
    'fortune-tiger': 'bg-fortune-tiger',
    'fortune-mouse': 'bg-fortune-mouse',
    'fortune-dragon': 'bg-fortune-dragon'
}




export default function PageGamesSinais({ params }: { params: { slug: string } }) {


    const game = gamesSinais.find(signal => signal.slug === params.slug);

    return (
        <div>
            <div className={cn("w-full h-[calc(100vh-80px)] mt-20 bg-center bg-contain bg-no-repeat", backgroundMap[game!.slug])} />
        </div>
    )
}
