import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { getCurrentPrize } from 'config/config';
import { Candidate, Prizes } from '@/lib/types';
import { processCsv } from '@/lib/utils';

export default function SettingsDialog({
  currentIndex,
  initialData,
  prizes,
  onClose,
}: {
  currentIndex: number;
  initialData: Candidate[];
  prizes: Prizes;
  onClose: (value: number | null, data: Candidate[]) => void;
}) {
  const [index, setIndex] = useState(currentIndex);
  const [data, setData] = useState(() => {
    return initialData.map((item) => `${item.name},${item.dept}`).join('\n');
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">⚙️</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Draw
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              onChange={(e) => {
                setIndex(+e.target.value);
              }}
              value={index}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prize" className="text-right">
              Prize
            </Label>
            <p className="my-4 leading-relaxed">
              {getCurrentPrize(index, prizes)}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Data
            </Label>
            <Textarea
              id="data"
              defaultValue={data}
              className="col-span-3"
              onChange={(e) => {
                setData(e.target.value);
              }}
              value={data}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() => {
                const items = processCsv(data);

                onClose(index, items);
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
