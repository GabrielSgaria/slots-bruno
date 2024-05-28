import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge';
import { getLinkCasa } from './actions';
import { useRef, useState } from 'react';

export const getRandomPorcentagem = () => Math.floor(Math.random() * 100) + 1;

export const getRandomColor = () => {
    const colors = ['#3f6212', '#65a30d', '#0d9488', '#7e22ce', '#db2777'];
    return colors[Math.floor(Math.random() * colors.length)];
};

export const getRandomClass = () => {
    const colors = [
        'verde-escuro',
        'rosa',
        'verde2',
        'azul',
        'roxo',
        'amarelo-escuro',
        'laranja-claro',
        'azul-marinho',
        'cinza-claro',
        'rosa-claro',
        'roxo-escuro',
        'verde-lima',
        'azul-ciano',
        'amarelo-verde',
        'laranja-vermelho',
        'azul-celeste',
        'rosa-forte',
        'roxo-claro',
        'amarelo-ouro',
        'vermelho-marrom'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateRandomNumber(): number {
    return Math.floor(Math.random() * (9 - 3 + 1)) + 3;
}

export function calculateEndTime(): string {
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 5);
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

