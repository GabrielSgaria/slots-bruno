import Image from "next/image"

export function ChristmasDecorations() {
  return (
    <>
      <div className="w-full absolute z-50 pt-[43px] sm:pt-[55px] md:pt-[35px] lg:pt-[22px] 2xl:pt-[3px] pointer-events-none">
        <Image
          src="/image/natal/cima-site.png"
          alt="Banner de Natal"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain object-bottom"
          priority={true}
          quality={100}
        />
      </div>
      <div className="hidden md:w-full md:h-full md:block md:absolute z-50 pointer-events-none">
        <Image
          src="/image/natal/cantos.png"
          alt="Banner de Natal"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain object-bottom"
          priority={true}
          quality={100}
        />
      </div>
      <div className="md:hidden w-[100px] top-40 left-0 block absolute z-50 pointer-events-none">
        <Image
          src="/image/natal/canto-left.png"
          alt="Banner de Natal"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain object-bottom"
          priority={true}
          quality={100}
        />
      </div>
      <div className="md:hidden w-[100px] top-40 right-0 block absolute z-50 pointer-events-none">
        <Image
          src="/image/natal/canto-right.png"
          alt="Banner de Natal"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain object-bottom"
          priority={true}
          quality={100}
        />
      </div>
    </>
  )
}