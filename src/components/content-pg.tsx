'use client'
import Image from 'next/image';
import logoFP from '../../public/favicon.png';
import { CallBell } from "@phosphor-icons/react";
import { useState, useCallback } from 'react';
import { PopupImage } from './popup';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { bannerImages } from '@/lib/bannerImages';


export interface ContentPgProps {
    updateTime: string | number | undefined;
    // bannerImages: string[]; // Referência para os banners do carrossel
    imageBanner: string | null | undefined; // Referência para o popup
}

export function ContentPg({ updateTime, imageBanner }: ContentPgProps) {

    const [showPopup, setShowPopup] = useState(true);

    const handleClosePopup = useCallback(() => {
        setShowPopup(false);
    }, []);

    return (
        <>
            {showPopup && imageBanner && <PopupImage onClose={handleClosePopup} imagePopup={imageBanner} />}

            <div className="container mx-auto flex flex-col items-center px-3 sm:px-0 gap-10 mb-10 pt-20">
                <div className="relative w-full max-w-[1200px] shadow-xl shadow-black rounded-lg overflow-hidden  ">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper "
                    >
                        {bannerImages.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative h-[330px] hidden md:flex">
                                    <Image
                                        src={image.desktop}
                                        alt={`Banner Desktop ${index + 1}`}
                                        width={1500}
                                        height={530}
                                        quality={100}
                                        className=""
                                    />
                                </div>
                                <div className="relative w-full h-[256px] md:hidden">
                                    <Image
                                        src={image.mobile}
                                        alt={`Banner Mobile ${index + 1}`}
                                        width={1350}
                                        height={1350}
                                        quality={100}
                                        className="object-cover"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* <div className="py-3 shadow-2xl text-center text-base flex flex-col space-x-[3px] max-w-[600px] backdrop-blur-sm bg-zinc-950/20 border border-zinc-950/5 rounded-2xl px-2 sm:p-10">
                    <div className='flex gap-2 items-center justify-center'>
                        <CallBell className='md:size-6' weight="bold" />
                        <span className='font-bold sm:text-lg md:text-xl'>DICA:</span>
                    </div>
                    <p className='w-full text-sm'>
                        Verifique a porcentagem de pagamento dos jogos de slot para escolher os que estão com a taxa mais alta!
                        Isso pode aumentar suas chances de ganhar.
                        Não se esqueça de clicar no menu superior para acessar a página de gerar sinais e aproveitar as melhores oportunidades!
                    </p>
                </div> */}

                <div className="flex flex-col items-center justify-center max-w-[600px] w-full rounded-2xl p-5 bg-gradient-to-b to-green-800 via-green-600 from-green-500 shadow-xl shadow-black">
                    {updateTime && (
                        <h1 className="text-base uppercase font-bold">
                            Última atualização às {updateTime}
                        </h1>
                    )}
                    <p className='text-xs sm:text-base'>Nosso site atualiza automaticamente a cada 5 minutos</p>
                </div>
            </div>
        </>
    );
}
