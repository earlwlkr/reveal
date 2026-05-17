export type Candidate = {
  id: number;
  name: string;
  dept: string;
};

export type Prizes = Record<
  string,
  { count: number; reward: string; image?: string }
>;
