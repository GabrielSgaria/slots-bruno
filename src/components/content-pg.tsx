'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { bannerImages } from '@/lib/bannerImages';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export interface ContentPgProps {
  updateTime: string;
  imageBanner: string | null | undefined;
}

export function ContentPg({ updateTime, imageBanner }: ContentPgProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const storedPopupShown = localStorage.getItem('popupShown');
    const storedImageBanner = localStorage.getItem('lastImageBanner');
    const storedTimestamp = localStorage.getItem('popupTimestamp');
    const currentTime = Date.now();

    const isTimestampValid =
      storedTimestamp && currentTime - parseInt(storedTimestamp, 10) < 3600000; // 1 hour

    if (!isTimestampValid || storedPopupShown !== 'true' || storedImageBanner !== imageBanner) {
      setShowModal(true);
    }
  }, [imageBanner]);

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem('popupShown', 'true');
    localStorage.setItem('lastImageBanner', imageBanner || '');
    localStorage.setItem('popupTimestamp', Date.now().toString());
  };

  return (
    <div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="p-0 w-[90vw] max-w-[414px] h-auto max-h-[90vh] border-none bg-transparent rounded-sm">
          <div className="relative w-full" style={{ aspectRatio: '414 / 577' }}>
            {/* <div className="absolute -top-7 -left-7  w-[460px] md:w-[465px] z-50 pointer-events-none">
              <Image
                src="/image/natal/card.png"
                alt="Banner de Natal"
                width={915}
                height={980}
                className="w-full h-auto object-contain"
                priority={true}
                quality={100}
              />
            </div> */}
            {imageBanner && (
              <Image
                src={`data:image/png;base64,${imageBanner}`}
                alt="Banner Image"
                layout="fill"
                objectFit="contain"
                quality={100}
                className='rounded-lg'
              />
            )}
          </div>
          <Button
            className="absolute right-2 top-2 h-8 w-8 p-0 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all z-[100]"
            onClick={handleCloseModal}
          >
            <X className="h-4 w-4 text-white" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto flex flex-col items-center px-2 sm:px-2 mb-2 pt-20">
        <motion.div
          className="relative w-full max-w-[1200px] shadow-xl shadow-black rounded-lg overflow-hidden">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            modules={[Autoplay]}
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
        </motion.div>

        <motion.div
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