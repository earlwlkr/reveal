'use client';

import { useReducer, useState } from 'react';
import Reveal from './Reveal';
import SettingsDialog from './SettingsDialog';
import { Button } from '@/components/ui/button';

import { getCurrentPrize, getPrizeImage, getPrizeReward } from 'config/config';
import { Candidate, Prizes } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface PrizeRevealState {
  selected: Candidate;
  prizeIndex: number;
  running: boolean;
}

interface PrizeRevealAction {
  type: string;
  payload: any;
}

function reducer(
  state: PrizeRevealState,
  action: PrizeRevealAction
): PrizeRevealState {
  const { type, payload } = action;
  switch (type) {
    case 'start': {
      return {
        ...state,
        selected: payload.selected,
        prizeIndex: payload.nextPrizeIndex,
        running: true,
      };
    }
    case 'set': {
      return {
        ...state,
        prizeIndex: payload.prizeIndex,
      };
    }
    case 'stop': {
      return {
        ...state,
        running: false,
      };
    }
    case 'clearWinner': {
      return {
        ...state,
        prizeIndex: payload.nextPrizeIndex,
        selected: null,
      };
    }
    default:
      throw new Error();
  }
}

function logWinner(prize: number, winner: Candidate, prizes: Prizes) {
  console.log(
    `Winner for prize tier ${getCurrentPrize(prize, prizes)}, draw ${prize}: ${
      winner.name
    }`
  );
}

function initState(prizes: Prizes) {
  return {
    selected: null,
    prizeIndex: Object.values(prizes)
      .map((i) => i.count)
      .reduce((a, b) => a + b, 0),
    running: false,
  };
}

export default function PrizeReveal({
  items,
  prizes,
}: {
  items: Candidate[];
  prizes: Prizes;
}) {
  const [state, dispatch] = useReducer(reducer, prizes, initState);
  const { selected, prizeIndex, running } = state;

  const [remaining, setRemaining] = useState<Candidate[]>(items);
  const prizeImage = getPrizeImage(getCurrentPrize(prizeIndex, prizes), prizes);

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-y-8">
        <div className="flex gap-x-4">
          <Button
            disabled={running || !(remaining?.length > 0 && prizeIndex > 0)}
            onClick={() => {
              if (remaining?.length > 0 && prizeIndex > 0) {
                if (selected) {
                  const nextPrizeIndex = prizeIndex - 1;
                  dispatch({
                    type: 'clearWinner',
                    payload: {
                      nextPrizeIndex,
                    },
                  });
                } else {
                  const winner =
                    remaining[getRandomInt(0, remaining.length - 1)];
                  // const nextPrizeIndex = prizeIndex - 1;
                  dispatch({
                    type: 'start',
                    payload: {
                      nextPrizeIndex: prizeIndex,
                      selected: winner,
                    },
                  });
                  logWinner(prizeIndex, winner, prizes);
                  setRemaining(
                    remaining.filter((candidate) => candidate !== winner)
                  );
                }
              }
            }}
          >
            Start
          </Button>
          <Button
            disabled={running || !(remaining?.length > 0)}
            onClick={() => {
              if (remaining?.length > 0) {
                const winner = remaining[getRandomInt(0, remaining.length - 1)];
                const nextPrizeIndex = prizeIndex;
                dispatch({
                  type: 'start',
                  payload: {
                    nextPrizeIndex,
                    selected: winner,
                  },
                });
                logWinner(nextPrizeIndex, winner, prizes);
                setRemaining(
                  remaining.filter((candidate) => candidate !== winner)
                );
              }
            }}
          >
            Redraw
          </Button>
        </div>
        <div
          className={cn(
            'w-full items-center gap-8',
            prizeImage
              ? 'grid grid-cols-1 lg:grid-cols-[minmax(260px,420px)_minmax(0,1fr)]'
              : 'flex justify-center'
          )}
        >
          {prizeImage && (
            <div className="flex justify-center lg:justify-end">
              <Image
                alt={getPrizeReward(
                  getCurrentPrize(prizeIndex, prizes),
                  prizes
                )}
                src={prizeImage}
                width={400}
                height={400}
                priority
                className="h-auto w-full max-w-[320px] rounded-lg object-contain drop-shadow-2xl sm:max-w-[380px] lg:max-w-[420px]"
              />
            </div>
          )}

          <div
            className={cn(
              'flex min-h-[180px] w-full max-w-3xl flex-col justify-center text-center lg:text-left',
              !prizeImage && 'items-center text-center'
            )}
          >
            <div className="mb-4 text-3xl font-semibold tracking-wide sm:text-4xl">
              {getPrizeReward(getCurrentPrize(prizeIndex, prizes), prizes)}
            </div>
            {selected ? (
              <Reveal
                key={selected.id}
                selected={selected}
                duration={5 - getCurrentPrize(prizeIndex, prizes)}
                onComplete={() => {
                  dispatch({ type: 'stop', payload: null });
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="fixed top-5 right-5 flex gap-x-2">
        <SettingsDialog
          currentIndex={prizeIndex}
          initialData={remaining}
          prizes={prizes}
          onClose={(value: number | null, data: Candidate[]) => {
            if (value != null) {
              dispatch({
                type: 'set',
                payload: {
                  prizeIndex: value + 1,
                },
              });
            }
            setRemaining(data);
          }}
        />
      </div>
    </>
  );
}
