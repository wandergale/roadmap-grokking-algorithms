import { Router, Request, Response } from 'express';
import chapters from '../content/chapters.json';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const chaptersPreview = chapters.map(chapter => ({
    id: chapter.id,
    title: chapter.title,
    preview: chapter.preview
  }));
  res.json(chaptersPreview);
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const chapter = chapters.find(ch => ch.id === id);

  if (!chapter) {
    return res.status(404).json({ error: 'Chapter not found' });
  }

  res.json(chapter);
});

export default router;
