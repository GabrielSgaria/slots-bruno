'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PopupImage } from './popup';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { bannerImages } from '@/lib/bannerImages';
import { motion } from 'framer-motion';

export interface ContentPgProps {
  updateTime: string;
  imageBanner: string | null | undefined;
}

export function ContentPg({ updateTime, imageBanner }: ContentPgProps) {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const storedPopupShown = localStorage.getItem('popupShown');
    const storedImageBanner = localStorage.getItem('lastImageBanner');
    const storedTimestamp = localStorage.getItem('popupTimestamp');
    const currentTime = Date.now();

    const isTimestampValid =
      storedTimestamp && currentTime - parseInt(storedTimestamp, 10) < 3600000; // 1 hour

    if (!isTimestampValid || storedPopupShown !== 'true' || storedImageBanner !== imageBanner) {
      setShowPopup(true);
    }
  }, [imageBanner]);

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem('popupShown', 'true');
    localStorage.setItem('lastImageBanner', imageBanner || '');
    localStorage.setItem('popupTimestamp', Date.now().toString());
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
        >
          <Image
            alt="bg"
            src="/image/banner/botão-site-sem-fundo.png"
            quality={100}
            priority
            fill
            sizes="100vw"
            className="object-contain"
          />
          {updateTime && (
            <h1 className="text-base uppercase font-bold bottom-16 sm:bottom-14 absolute font-poppins ">
              Última atualização às {updateTime}
            </h1>
          )}
        </motion.div>
      </div>
    </div>
  );
}
