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

            <div className="container mx-auto flex flex-col items-center px-3 sm:px-0 gap-10 mb-10 pt-20">
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

                <div className="flex flex-col items-center justify-center max-w-[600px] shadow-2xl shadow-black w-full rounded-2xl p-5 bg-gradient-to-b to-green-800 via-green-600 from-green-500">
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
