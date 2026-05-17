# Reveal

A generic lucky-draw app built with Next.js. It reveals randomly selected winners from a CSV list and advances through configurable prize tiers.

## Data

Sample data lives in `public/data`.

- `members.csv`: `id,name,group`
- `prizes.json`: prize tiers with `count`, `reward`, and optional `image`

Replace those files with your own event data before running a draw.

## Development

```bash
pnpm install
pnpm dev
```

The reveal animation uses [`react-random-reveal`](https://www.npmjs.com/package/react-random-reveal).
