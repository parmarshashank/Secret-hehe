"use client"
import Image from "next/image";
import { useState } from "react";
import { useSound } from "./hooks/useSound";

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDurations, setSpinDurations] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [revealedQuestions, setRevealedQuestions] = useState<number[]>([]);
  const { playSound } = useSound();

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setRevealedQuestions([]);
    playSound('spin');

    // Set random spin durations for each digit
    const baseDuration = 1000; // Base duration of 1 second
    const randomDurations = Array(8).fill(0).map((_, i) => {
      // Add increasing delay for each digit
      return baseDuration + (i * 500) + (Math.random() * 1000);
    });
    setSpinDurations(randomDurations);

    // Reveal question marks sequentially after spinning
    const maxDuration = Math.max(...randomDurations);
    randomDurations.forEach((duration, index) => {
      setTimeout(() => {
        playSound('stop');
        setRevealedQuestions(prev => [...prev, index]);
      }, duration);
    });

    // Reset spinning state after all animations
    setTimeout(() => {
      setIsSpinning(false);
    }, maxDuration + 100);
  };

  const renderDigitStrip = (index: number) => {
    if (!isSpinning) {
      if (revealedQuestions.includes(index)) {
        return <div>?</div>;
      }
      return <div>{"-"}</div>;
    }

    return Array(10).fill(0).map((_, i) => (
      <div key={i}>{Math.floor(Math.random() * 10)}</div>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="arcade-background"></div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-12">
        {/* Logo collaboration section */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-16">
          <div className="logo-container">
            <Image
              src="/images/vivilogo.png"
              alt="Vividhata Logo"
              width={192}
              height={192}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain hover:scale-110 transition-transform duration-300 vivi-logo"
              priority
            />
          </div>
          
          <span className="collaboration-x">×</span>
          
          <div className="logo-container">
            <Image
              src="/images/yuktilogo.png"
              alt="Yuktikula Logo"
              width={172}
              height={172}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain hover:scale-110 transition-transform duration-300 yukti-logo"
              priority
            />
          </div>
        </div>

        {/* Question marks section */}
        <div className="flex gap-2 sm:gap-4 justify-center my-4 sm:my-8">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <span 
              key={i} 
              className="question-mark"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              ?
            </span>
          ))}
        </div>

        {/* Slot machine countdown */}
        <div className="countdown-container">
          {/* Days */}
          <div className="time-group">
            {[0, 1].map((index) => (
              <div key={index} className="digit-slot">
                <div 
                  className={`digit-strip ${isSpinning ? 'spinning' : ''}`}
                  style={{
                    animationDuration: isSpinning ? `${0.1 + Math.random() * 0.2}s` : '0s',
                    animationIterationCount: isSpinning ? Math.ceil(spinDurations[index] / 100) : 0
                  }}
                >
                  {renderDigitStrip(index)}
                </div>
              </div>
            ))}
          </div>

          <div className="time-separator">:</div>

          {/* Hours */}
          <div className="time-group">
            {[2, 3].map((index) => (
              <div key={index} className="digit-slot">
                <div 
                  className={`digit-strip ${isSpinning ? 'spinning' : ''}`}
                  style={{
                    animationDuration: isSpinning ? `${0.1 + Math.random() * 0.2}s` : '0s',
                    animationIterationCount: isSpinning ? Math.ceil(spinDurations[index] / 100) : 0
                  }}
                >
                  {renderDigitStrip(index)}
                </div>
              </div>
            ))}
          </div>

          <div className="time-separator">:</div>

          {/* Minutes */}
          <div className="time-group">
            {[4, 5].map((index) => (
              <div key={index} className="digit-slot">
                <div 
                  className={`digit-strip ${isSpinning ? 'spinning' : ''}`}
                  style={{
                    animationDuration: isSpinning ? `${0.1 + Math.random() * 0.2}s` : '0s',
                    animationIterationCount: isSpinning ? Math.ceil(spinDurations[index] / 100) : 0
                  }}
                >
                  {renderDigitStrip(index)}
                </div>
              </div>
            ))}
          </div>

          <div className="time-separator">:</div>

          {/* Seconds */}
          <div className="time-group">
            {[6, 7].map((index) => (
              <div key={index} className="digit-slot">
                <div 
                  className={`digit-strip ${isSpinning ? 'spinning' : ''}`}
                  style={{
                    animationDuration: isSpinning ? `${0.1 + Math.random() * 0.2}s` : '0s',
                    animationIterationCount: isSpinning ? Math.ceil(spinDurations[index] / 100) : 0
                  }}
                >
                  {renderDigitStrip(index)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spin button */}
        <button 
          className={`spin-button ${!isSpinning ? 'animate-pulse-grow' : ''}`}
          onClick={() => {
            playSound('click');
            handleSpin();
          }}
          disabled={isSpinning}
        >
          SPIN
        </button>
      </div>

      {/* Arcade decorative elements */}
      <div className="fixed top-0 left-0 w-full h-4 bg-gradient-to-b from-[#ff00ff] to-transparent opacity-30"></div>
      <div className="fixed bottom-0 left-0 w-full h-4 bg-gradient-to-t from-[#ff00ff] to-transparent opacity-30"></div>
      <div className="fixed top-0 left-0 h-full w-4 bg-gradient-to-r from-[#ff00ff] to-transparent opacity-30"></div>
      <div className="fixed top-0 right-0 h-full w-4 bg-gradient-to-l from-[#ff00ff] to-transparent opacity-30"></div>
    </div>
  );
}
