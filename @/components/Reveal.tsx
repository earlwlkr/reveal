'use client';

import { useState } from 'react';
import { RandomReveal } from 'react-random-reveal';
import Confetti from 'react-dom-confetti';

const SHOW_PHONE_LENGTH = 8;

const confettiConfig = {
  angle: 147,
  spread: 360,
  startVelocity: 40,
  elementCount: 84,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

export default function Reveal({ selected, duration, onComplete }) {
  const [showName, setShowName] = useState(false);

  return (
    <div className="font-bold">
      <div className="text-5xl">
        <div className="relative left-32">
          <Confetti active={showName} config={confettiConfig} />
        </div>
        <RandomReveal
          isPlaying
          duration={duration || 2}
          // characterSet={'0123456789'.split('')}
          characterSet={'abcdefghijklmnopqrstuvwxyz'.split('')}
          characters={
            selected?.name
            // selected?.name?.slice(
            //   selected.name.length - SHOW_PHONE_LENGTH,
            //   selected.name.length
            // ) || ' '
          }
          onComplete={() => {
            setShowName(true);
            onComplete();
          }}
        />
      </div>
      {showName && <div className="text-4xl mt-2">{selected?.dept}</div>}
    </div>
  );
}
