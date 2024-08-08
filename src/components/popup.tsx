import { Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";

import imagePopup from '../../public/image/background/popupteste.jpeg';

interface PopupImageProps {
    onClose: any,
    imagePopup: any
}

export function PopupImage({ onClose, imagePopup }: PopupImageProps) {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    return (
        isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 bg-opacity-80 backdrop-blur-sm">
                <div className="h-svh w-full fixed top-0 flex items-center justify-center">
                    <div className="sm:pt-14 rounded-lg w-full max-h-svh max-w-[454px] px-10 md:px-3 relative">
                        <div className="relative rounded-lg shadow-lg overflow-hidden max-w-4xl max-h-[90vh] p-2">

                        </div>
                        {imagePopup && (

                            <div className="flex justify-center items-center w-full h-full relative">
                                <Image
                                    src={`data:image/png;base64,${imagePopup}`}
                                    alt="Popup Image"
                                    width={900}
                                    height={900}
                                    className="object-contain max-w-full max-h-full rounded-lg"
                                />
                                <button
                                    onClick={handleClose}
                                    className="absolute top-2 right-2 p-1 bg-zinc-950 text-white rounded-md hover:bg-zinc-950 transition-colors"
                                >
                                    <Cross1Icon className="h-6 w-6" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
}