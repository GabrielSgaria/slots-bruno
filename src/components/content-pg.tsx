'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { PopupImage } from './popup';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { bannerImages } from '@/lib/bannerImages';
import Link from 'next/link';
import { InstagramLogo } from '@phosphor-icons/react';


export interface ContentPgProps {
    updateTime: string | number | undefined;
    imageBanner: string | null | undefined;
}

export function ContentPg({ updateTime, imageBanner }: ContentPgProps) {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [isClient, setIsClient] = useState<boolean>(false);
    useEffect(() => {
        setIsClient(true);

        if (isClient) {
            const storedPopupShown = localStorage.getItem('popupShown');
            const storedImageBanner = localStorage.getItem('lastImageBanner');
            const storedTimestamp = localStorage.getItem('popupTimestamp');
            const currentTime = Date.now();

            const isTimestampValid = storedTimestamp && currentTime - parseInt(storedTimestamp, 10) < 3600000; // 1 hour

            if (!isTimestampValid || storedPopupShown !== 'true' || storedImageBanner !== imageBanner) {
                setShowPopup(true);
            }
        }
    }, [imageBanner, isClient]);

    const handleClosePopup = useCallback(() => {
        setShowPopup(false);
        localStorage.setItem('popupShown', 'true');
        localStorage.setItem('lastImageBanner', imageBanner || '');
        localStorage.setItem('popupTimestamp', Date.now().toString());
    }, [imageBanner]);



    return (
        <>
            {showPopup && imageBanner && <PopupImage onClose={handleClosePopup} imagePopup={imageBanner} />}

            <div className="container mx-auto flex flex-col items-center px-3 sm:px-0 gap-5 mb-10 pt-20">
                <div className="relative w-full max-w-[1200px] shadow-xl shadow-black rounded-lg overflow-hidden">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
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
                                        priority
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
                                        priority
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Siga nosso instagram */}

                <div className="mt-5 flex flex-col items-center justify-center max-w-[600px] shadow-2xl shadow-black w-[70%] rounded-2xl p-5 bg-zinc-950/50 backdrop-blur-3xl">
                    <h1>Siga o nosso instagram Oficial! </h1>
                    <div className='flex gap-2 items-center justify-center mt-2'>
                        <span className='text-xs sm:text-base w-5 h-5 relative'>
                            <Image
                                alt="Instagram Icon grupo fp"
                                src="/image/instagram_icon.png"
                                fill
                                quality={100}
                                sizes="(min-width: 808px) 50vw, 100vw"
                                className='object-cover'

                            />
                        </span>
                        <p className='font-semibold flex gap-2 items-center justify-center'>
                            @fpgrupo_oficial
                        </p>
                    </div>
                </div>

                {/* Horário Atualizado */}

                <div className="flex flex-col items-center justify-center max-w-[600px] shadow-2xl shadow-black w-full rounded-2xl p-5 bg-green-600">
                    {updateTime && (
                        <h1 className="text-base uppercase font-bold">
                            Última atualização as {updateTime}
                        </h1>

                    )}
                    <p className='text-xs sm:text-base'>Nosso site atualiza automaticamente a cada 5 minutos</p>
                </div>
            </div>
        </>
    );
}
