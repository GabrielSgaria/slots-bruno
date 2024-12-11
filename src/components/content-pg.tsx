'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
import { X, Loader } from 'lucide-react'

export interface ContentPgProps {
  updateTime: string;
  imageBanner: string | null | undefined;
}

const UPDATE_INTERVAL = 300000; // 5 minutes in milliseconds

export function ContentPg({ updateTime: initialUpdateTime, imageBanner }: ContentPgProps) {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [timeUntilNextUpdate, setTimeUntilNextUpdate] = useState<number>(UPDATE_INTERVAL);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateTime, setUpdateTime] = useState<string>(initialUpdateTime);
  const nextUpdateTimestampRef = useRef<number>(0);

  const fetchLatestData = useCallback(async () => {
    try {
      const response = await fetch('/api/get-latest-data');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success) {
        setUpdateTime(data.updateTime);
        return true;
      } else {
        throw new Error(data.message || 'Failed to fetch latest data');
      }
    } catch (error) {
      console.error('Error fetching latest data:', error);
      return false;
    }
  }, []);

  const syncWithServer = useCallback(async (force = false) => {
    if (isUpdating && !force) return;
    setIsUpdating(true);
    setError(null);
    try {
      const response = await fetch('/api/update');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success) {
        const serverTimestamp = data.serverTimestamp || Date.now();
        const newNextUpdateTimestamp = Math.ceil(serverTimestamp / UPDATE_INTERVAL) * UPDATE_INTERVAL;
        nextUpdateTimestampRef.current = newNextUpdateTimestamp;
        localStorage.setItem('nextUpdateTimestamp', newNextUpdateTimestamp.toString());
        setTimeUntilNextUpdate(newNextUpdateTimestamp - serverTimestamp);

        // Fetch the latest data
        await fetchLatestData();
      } else {
        throw new Error(data.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Erro ao sincronizar com o servidor:', error);
      setError('Falha ao atualizar. Tentando novamente em breve.');
      // Tenta novamente em 30 segundos
      setTimeout(() => syncWithServer(true), 30000);
    } finally {
      setIsUpdating(false);
    }
  }, [isUpdating, fetchLatestData]);

  useEffect(() => {
    const initializeTimer = async () => {
      const storedNextUpdateTimestamp = localStorage.getItem('nextUpdateTimestamp');
      const now = Date.now();

      if (storedNextUpdateTimestamp) {
        const parsedTimestamp = parseInt(storedNextUpdateTimestamp, 10);
        if (parsedTimestamp > now) {
          nextUpdateTimestampRef.current = parsedTimestamp;
          setTimeUntilNextUpdate(parsedTimestamp - now);
        } else {
          await syncWithServer(true);
        }
      } else {
        await syncWithServer(true);
      }

      // Fetch latest data to ensure we have the most up-to-date information
      await fetchLatestData();
    };

    initializeTimer();
    setIsMounted(true);

    const updateTimer = () => {
      const now = Date.now();
      const timeLeft = Math.max(0, nextUpdateTimestampRef.current - now);
      setTimeUntilNextUpdate(timeLeft);

      if (timeLeft <= 1000 && !isUpdating) {
        syncWithServer(true);
      }
    };

    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, [isUpdating, syncWithServer, fetchLatestData]);

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

  const formatCountdown = (milliseconds: number): string => {
    if (milliseconds <= 0) return "0m 00s";
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem('popupShown', 'true');
    localStorage.setItem('lastImageBanner', imageBanner || '');
    localStorage.setItem('popupTimestamp', Date.now().toString());
  };

  return (
    <div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className="p-0 w-[90vw] max-w-[414px] h-auto max-h-[90vh] border-none bg-transparent rounded-sm"
          onClose={handleCloseModal}
        >
          <div className="relative w-full" style={{ aspectRatio: '414 / 577' }}>
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
        </DialogContent>
      </Dialog>

      <div className="container mx-auto flex flex-col items-center px-2 sm:px-2 mb-2 pt-20">
        <div className="relative w-full max-w-[1200px] shadow-xl shadow-black rounded-lg overflow-hidden">
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
        </div>

        <div className="relative mt-5 flex flex-col items-center justify-center max-w-[600px] w-[100%] h-[220px] py-5">
          <Image
            alt="bg"
            src="/image/banner/botão-site-sem-fundo.png"
            quality={100}
            priority
            fill
            sizes="100vw"
            className="object-contain"
          />
          <div className="text-base uppercase font-bold bottom-16 sm:bottom-14 absolute font-poppins">
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : isUpdating ? (
              <div className="flex items-center justify-center gap-2">
                Atualizando...
                <Loader className="animate-spin size-4" />
              </div>
            ) : (
              <>
                Última atualização às {updateTime}<br />
                <span className="flex items-center justify-center">
                  Próxima atualização em: {isMounted ? formatCountdown(timeUntilNextUpdate) : <Loader className="animate-spin size-3" />}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

