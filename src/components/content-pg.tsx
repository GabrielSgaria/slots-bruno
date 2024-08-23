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
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

export interface ContentPgProps {
    updateTime: string | number | undefined;
    imageBanner: string | null | undefined;
}

export function ContentPg({ updateTime: initialUpdateTime, imageBanner }: ContentPgProps) {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [isClient, setIsClient] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [updateTime, setUpdateTime] = useState<string | number | undefined>(initialUpdateTime);
    const router = useRouter();

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

    const calculateTimeLeft = useCallback(() => {
        if (typeof updateTime === 'string') {
            const now = new Date();
            const [hours, minutes, seconds] = updateTime.split(':').map(Number);
            const lastUpdate = new Date(now);

            lastUpdate.setHours(hours, minutes, seconds, 0);

            const nextUpdate = new Date(lastUpdate.getTime() + 5 * 60 * 1000);

            if (nextUpdate.getDate() !== lastUpdate.getDate()) {
                nextUpdate.setDate(lastUpdate.getDate() + 1);
            }

            const timeDifference = nextUpdate.getTime() - now.getTime();
            setTimeLeft(timeDifference > 0 ? timeDifference : 0);
        }
    }, [updateTime]);

    const refreshUpdateTime = useCallback(() => {
        setIsUpdating(true);
        const now = new Date();
        const formattedTime = now.toTimeString().split(' ')[0];
        setUpdateTime(formattedTime);
        calculateTimeLeft();
        setIsUpdating(false);
    }, [calculateTimeLeft]);

    useEffect(() => {
        calculateTimeLeft();

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1000) {
                    setIsUpdating(true);
                    refreshUpdateTime();
                    return 0;
                } else if (prevTime > 0) {
                    return prevTime - 1000;
                } else {
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft, refreshUpdateTime]);

    const formatTime = (ms: number) => {
        if (isUpdating) return 'BUSCANDO DADOS';
        if (ms <= 0) return '0s';
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        return `${minutes > 0 ? `${minutes}m ` : ''}${seconds}s`;
    };
    
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

                <div className="flex flex-col items-center justify-center max-w-[600px] w-full rounded-2xl p-5 bg-gradient-to-b to-green-800 via-green-600 from-green-500 shadow-xl shadow-black">
                    <h1 className="text-base uppercase font-bold">
                        Última atualização às {updateTime}
                    </h1>
                    {isUpdating ? (
                        <p className='text-xs sm:text-base flex flex-row gap-2 font-bold items-center justify-center'>
                            {formatTime(timeLeft)} <ReloadIcon className='animate-spin text-lg font-bold' />
                        </p>
                    ) : (
                        <p className='text-xs sm:text-base'>
                            Próxima atualização em: {formatTime(timeLeft)}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
