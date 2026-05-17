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
    <div className="main h-screen overflow-hidden text-white">
      <main className="flex flex-col justify-center items-center px-4 py-40 gap-y-8">
        <h1 className="text-6xl font-bold">
          Lucky <span className="">Draw</span>
        </h1>

        <PrizeReveal items={items} prizes={prizes} />
      </main>
    </div>
  );
}
