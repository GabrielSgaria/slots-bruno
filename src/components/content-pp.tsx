import Image from 'next/image'
import { motion } from 'framer-motion'

export function ContentPp() {

    return (
        <div>
            <div className="container mx-auto flex justify-center pt-28 flex-col items-center px-3 sm:px-0 gap-10 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col justify-center items-center">
                    <Image src="/image/banner/gerar-sinais/pragmatic.png" alt="Logo FP Gerar Sinal" width={500} height={500} quality={100} priority className="w-full max-w-[650px] h-full rounded-xl shadow-lg" />

                </motion.div>
            </div>
        </div>
    )
}