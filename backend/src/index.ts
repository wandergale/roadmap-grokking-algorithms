import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import chaptersRoutes from './routes/chapters';
import notesRoutes from './routes/notes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/chapters', chaptersRoutes);
app.use('/notes', notesRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Grokking Algorithms Roadmap API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
