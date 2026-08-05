# Media

Drop the quiz assets here and reference them by file name from
`src/data/questions.ts`:

```ts
{ kind: 'year',  …, photo: 'kontoret-2013.jpg' }
{ kind: 'price', …, photo: 'laks.jpg' }
{ kind: 'sound', …, clip: 'klipp-01.mp3' }
```

- **Photos** are cropped to fill (4:3 on the phone, 16:9 on the projector),
  so keep the subject away from the edges. 1600 px wide is plenty.
- **Clips** play on the presenter's device only. MP3 or M4A; keep them under
  ten seconds and normalise the level — they go through a room, not headphones.

A question without a file still works: the photo becomes a placeholder block
and the play button simulates a three second clip.
