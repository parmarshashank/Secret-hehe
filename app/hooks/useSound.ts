import { useEffect, useRef } from 'react';

type SoundEffects = {
  spin: HTMLAudioElement;
  stop: HTMLAudioElement;
  click: HTMLAudioElement;
};

export const useSound = () => {
  const sounds = useRef<Partial<SoundEffects>>({});

  useEffect(() => {
    // Create audio elements only on client side
    sounds.current = {
      spin: new Audio('/sounds/slot-machine-spin.mp3'),
      stop: new Audio('/sounds/slot-machine-stop.mp3'),
      click: new Audio('/sounds/button-click.mp3')
    };

    // Configure audio elements
    Object.values(sounds.current).forEach(audio => {
      if (audio) {
        audio.volume = 0.5;
      }
    });

    return () => {
      // Cleanup audio elements
      Object.values(sounds.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);

  const playSound = (type: keyof SoundEffects) => {
    const audio = sounds.current[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  };

  return { playSound };
}; 