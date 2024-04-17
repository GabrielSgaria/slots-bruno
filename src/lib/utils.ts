import {type ClassValue, clsx} from 'clsx' 
import { twMerge } from 'tailwind-merge';

export const getRandomPorcentagem = () => Math.floor(Math.random() * (100 - 2 + 1)) + 2;

export const getRandomColor = () => {
    const colors = ['#3f6212', '#65a30d', '#0d9488', '#7e22ce', '#db2777'];
    return colors[Math.floor(Math.random() * colors.length)];
};


export function cn(...inputs: ClassValue[]){
    return twMerge(clsx(inputs))
}