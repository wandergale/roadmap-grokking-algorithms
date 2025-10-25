# Grokking Algorithms Roadmap

A visual roadmap web application for the book "Grokking Algorithms" by Aditya Bhargava. This project features a React frontend with TypeScript and a Node.js backend with JWT authentication, allowing users to explore algorithm chapters and add personal notes.

## Features

- 📚 **Chapter Navigation**: Browse all chapters from Grokking Algorithms
- 🔐 **Authentication**: JWT-based user authentication (register/login)
- 📝 **Personal Notes**: Add, edit, and delete notes for each chapter
- 🎨 **Modern UI**: Clean design with CSS Modules and smooth animations
- 🔒 **Secure**: Password hashing with bcrypt, protected API routes
- 💾 **Database**: PostgreSQL with Prisma ORM

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Axios
- CSS Modules

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt

## Project Structure

```
roadmap-algorithms/
├── backend/
│   ├── src/
│   │   ├── content/
│   │   │   └── chapters.json
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── chapters.ts
│   │   │   └── notes.ts
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.ts
    │   ├── components/
    │   │   ├── AuthModal.tsx
    │   │   ├── Card.tsx
    │   │   ├── Navbar.tsx
    │   │   └── NotesPanel.tsx
    │   ├── context/
    │   │   └── AuthContext.tsx
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   └── Chapter.tsx
    │   ├── styles/
    │   │   └── global.css
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── .env
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/grokking_algorithms"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=5000
```

4. Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Chapters
- `GET /api/chapters` - Get all chapters
- `GET /api/chapters/:id` - Get specific chapter

### Notes (Protected)
- `GET /api/notes?chapterId=:id` - Get notes for a chapter
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Usage

1. Open the application in your browser at `http://localhost:5173`
2. Browse the chapter cards on the home page
3. Click on any chapter to view its details, summary, topics, and algorithm code
4. Register/Login to add personal notes to chapters
5. Add, edit, or delete notes as needed
6. Press ESC to go back from chapter view

## Database Schema

### User
- `id`: String (UUID)
- `email`: String (unique)
- `name`: String
- `password`: String (hashed)
- `createdAt`: DateTime
- `notes`: Note[]

### Note
- `id`: String (UUID)
- `text`: String
- `chapterId`: String
- `userId`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `user`: User

## Development

### Backend Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Security Notes

- Change the `JWT_SECRET` in production
- Use environment variables for sensitive data
- Passwords are hashed using bcrypt
- API routes are protected with JWT middleware
- CORS is configured for development

## License

MIT

## Author

Built with ❤️ for algorithm learners
