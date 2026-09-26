# Thousand Shades of Women

Real stories from real women, one shade at a time.

A storytelling platform where women share personal stories about career, motherhood, identity, and overcoming hardship. Each story is one "shade." Built with **Next.js (App Router)** and **Tailwind CSS**, deployed on **Vercel**. **Supabase** will be added in Phase 2.

See [NOTES.md](NOTES.md) for the roadmap and current status.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  page.tsx                 homepage
  about/page.tsx           mission
  guidelines/page.tsx      privacy & content guidelines
  stories/page.tsx         all stories (filter with ?category=)
  stories/[slug]/page.tsx  a single story
content/stories/           stories as Markdown files
lib/stories.ts             reads and parses the stories
```

## Git workflow

- `main` is what's live. Keep it working.
- For each new feature, start a branch from an up-to-date `main`:
  ```bash
  git switch main
  git pull
  git switch -c feature/waitlist
  ```
- Commit as you go, then push the branch and open a pull request on GitHub:
  ```bash
  git push -u origin feature/waitlist
  ```
- After merging on GitHub, run `git switch main && git pull` to get the latest code.

## Scripts

- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm run lint`: ESLint
