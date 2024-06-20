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
                    <div className="sm:pt-14 rounded-lg w-full max-h-svh max-w-[484px] px-10 md:px-3">
                        <div className="flex justify-end">
                            <button onClick={handleClose}>
                                <Cross1Icon className="h-7 w-7 text-slate-50 bg-slate-950 hover:bg-slate-700 transition-all rounded-md" />
                            </button>
                        </div>
                        {imagePopup && (

                            <div className="flex justify-center items-center md:mt-2 w-full h-[60vh] md:h-[80vh]">
                                <Image
                                    src={`data:image/png;base64,${imagePopup}`}
                                    alt="Popup Image"
                                    width={900}
                                    height={900}
                                    className="object-fill max-w-full max-h-full rounded-xl drop-shadow-2xl shadow-black"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
}
