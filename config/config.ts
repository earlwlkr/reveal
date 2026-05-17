import { Prizes } from '@/lib/types';

export function getCurrentPrize(index: number, prizes: Prizes): number {
  let acc = 0;
  for (let [prize, details] of Object.entries(prizes)) {
    acc += details.count;
    if (index <= acc) {
      return Number(prize);
    }
  }
  return Number(Object.keys(prizes)[0]);
}

export function getPrizeReward(prize: number, prizes: Prizes) {
  return prizes[prize] ? prizes[prize].reward : prizes[1].reward;
}

export function getPrizeImage(prize: number, prizes: Prizes) {
  return prizes[prize] ? prizes[prize].image : prizes[1].image;
}
