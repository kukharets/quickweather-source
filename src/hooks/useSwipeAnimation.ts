import React, { useRef } from 'react';

export const useSwipeAnimation = () => {
  const startY = useRef<number>(0);
  const placeCardRef = useRef<HTMLDivElement | null>(null);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const swipeDistance = startY.current - e.changedTouches[0].clientY;

    if (placeCardRef.current) {
      placeCardRef.current.style.transition = 'margin 0.3s ease, opacity 0.3s ease';

      if (swipeDistance > 30) {
        placeCardRef.current.style.margin = '-500px 0 70px';
        placeCardRef.current.style.opacity = '0.1';
      } else if (swipeDistance < -30) {
        placeCardRef.current.style.opacity = '1';
        placeCardRef.current.style.margin = '0';
      }
    }
  };

  const resetAnimation = () => {
    if (placeCardRef.current) {
      placeCardRef.current.style.opacity = '1';
      placeCardRef.current.style.transition = 'margin 0.3s ease, opacity 0.3s ease';
      placeCardRef.current.style.margin = '0';
    }
  };

  return {
    placeCardRef,
    onTouchStart,
    onTouchEnd,
    resetAnimation,
  };
};
