# Using Photo Relic for Real Travel landing

This skill is vendored for local agents. On the public homepage it currently
drives ambient backgrounds for the second and third screens:

- `#truth` — `light-fade` motion seed
- `#trust` — `ink-assembly` motion seed

Stills live in `/public/relic/*.webp` (compressed from the Paper Beijing examples).

## Regenerate / extend

1. Attach a real destination photograph.
2. Ask the agent:

```text
Use photo-relic-editorial. Make it feel like the "Paper Beijing" series,
with a short four-character Chinese title. Export a vertical artwork suitable
for a dark landing-page ambient backdrop.
```

3. Compress to WebP (~960px wide) and add the path to `src/data/relicSlides.ts`.
