'use client'
import { TriangleUpIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

export function ButtonScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > window.innerHeight);
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollTop}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-50  bg-zinc-950 shadow-xl transition-all hover:border-green-800  hover:bg-green-800"
        >
          <TriangleUpIcon className="size-10 text-zinc-50 transition-all hover:text-yellow-400 animate-pulse" />
        </button>
      )}
    </div>
  );
}
