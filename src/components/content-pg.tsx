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
import { motion } from 'framer-motion'
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

    const updateData = useCallback(async () => {
        setIsUpdating(true);
        try {
            const response = await fetch('/api/update');
            const updateResult = await response.json();

            if (updateResult.success) {
                router.refresh; // Recarrega os dados da página
            } else {
                console.error('Falha ao atualizar os dados.');
            }
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error);
        } finally {
            setIsUpdating(false);
        }
    }, [router]);

    useEffect(() => {
        calculateTimeLeft();

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1000 && !isUpdating) {
                    updateData(); // Chama a função de atualização quando o tempo chegar a 0
                    return 0;
                } else if (prevTime > 0) {
                    return prevTime - 1000;
                } else {
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft, isUpdating, updateData]);

    const formatTime = (ms: number) => {
        if (isUpdating) return 'Buscando Dados...';
        if (ms <= 0) return '0s';
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        return `${minutes > 0 ? `${minutes}m ` : ''}${seconds}s`;
    };

    return (
        <div>
            {showPopup && imageBanner && <PopupImage onClose={handleClosePopup} imagePopup={imageBanner} />}

            <div className="container mx-auto flex flex-col items-center px-2 sm:px-2 gap-5 mb-2 pt-20">

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



                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mt-5 flex flex-col items-center justify-center max-w-[600px] w-[100%] h-[220px] py-5"
                ><Image
                        alt='bg'
                        src="/image/banner/botão-site-sem-fundo.png"
                        quality={100}
                        priority
                        fill
                        sizes='100vw'
                        className='object-contain'
                    />
                    {updateTime && (
                        <h1 className="text-base uppercase font-bold bottom-16 sm:bottom-14 absolute font-poppins ">
                            Última atualização às {updateTime}
                        </h1>
                    )}
                </motion.div>

                {/* Horário Atualizado */}

                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center max-w-[600px] shadow-2xl shadow-black w-full rounded-2xl p-5 bg-green-600"
                >
                    {updateTime && (
                        <h1 className="text-base uppercase font-bold">
                            Última atualização às {updateTime}
                        </h1>
                    )}
                    <p className='text-xs sm:text-base'>Nosso site atualiza automaticamente a cada 5 minutos</p>
                </motion.div> */}
            </div >
        </div >
    );
}
