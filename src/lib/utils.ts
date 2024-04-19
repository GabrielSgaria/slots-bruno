import {type ClassValue, clsx} from 'clsx' 
import { twMerge } from 'tailwind-merge';

export const getRandomPorcentagem = () => Math.floor(Math.random() * 100) + 1;

// export const getRandomColor = () => {
//     const colors = ['#3f6212', '#65a30d', '#0d9488', '#7e22ce', '#db2777'];
//     return colors[Math.floor(Math.random() * colors.length)];
// };

export const getRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}?v=${new Date().getTime()}`; // Adiciona um timestamp como parâmetro de consulta
    return randomColor;
};

export function cn(...inputs: ClassValue[]){
    return twMerge(clsx(inputs))
}

export function generateRandomNumber(): number {
    return Math.floor(Math.random() * (16 - 3 + 1)) + 3;
}

export function calculateEndTime(): string {
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 5);
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const linkBruno = "https://vinhopg.com/?id=72851548&currency=BRL&type=2"