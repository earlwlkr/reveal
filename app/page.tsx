import PrizeReveal from '@/components/PrizeReveal';
import { processCsv } from '@/lib/utils';
import { promises as fs } from 'fs';

async function getData() {
  const file = await fs.readFile(
    process.cwd() + '/public/data/members.csv',
    'utf8'
  );
  const prizes = await fs.readFile(
    process.cwd() + '/public/data/prizes.json',
    'utf8'
  );

  return [processCsv(file), JSON.parse(prizes)];
}

export default async function Home() {
  const [items, prizes] = await getData();

  return (
    <div className="main min-h-screen overflow-hidden text-white">
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center gap-y-10 px-6 py-16">
        <h1 className="text-center text-5xl font-bold sm:text-6xl">
          Lucky <span className="">Draw</span>
        </h1>

        <PrizeReveal items={items} prizes={prizes} />
      </main>
    </div>
  );
}
