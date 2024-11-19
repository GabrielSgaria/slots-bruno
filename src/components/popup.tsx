import { Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState, useEffect } from "react";

interface PopupImageProps {
    onClose: () => void;
    imagePopup: string | null; // Considerando que `imagePopup` seja uma string Base64
}

export function PopupImage({ onClose, imagePopup }: PopupImageProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Pequeno atraso para garantir que o banner apareça após o popup estar renderizado
        const timer = setTimeout(() => setShowBanner(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    if (!isOpen || !imagePopup) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-zinc-600 bg-opacity-20 backdrop-blur-sm">
            <div className="relative w-full max-w-[454px] pt-[100px]">
                {showBanner && (
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full max-w-[415px] z-50 pointer-events-none">
                        <Image
                            src="/image/natal/card.png"
                            alt="Banner de Natal"
                            width={415}
                            height={280}
                            className="w-full h-auto object-contain"
                            priority={true}
                            quality={100}
                        />
                    </div>
                )}
                <div className="bg-white rounded-lg overflow-hidden max-h-[calc(100vh-120px)] shadow-lg">
                    <div className="relative p-4">
                        <Image
                            src={`data:image/png;base64,${imagePopup}`}
                            alt="Popup Image"
                            width={900}
                            height={900}
                            className="object-contain w-full h-full rounded-lg"
                        />
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 p-2 bg-zinc-950 text-white rounded-full hover:bg-zinc-800 transition-colors"
                            aria-label="Close Popup"
                        >
                            <Cross1Icon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}