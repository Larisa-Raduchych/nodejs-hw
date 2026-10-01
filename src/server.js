import "dotenv/config";
import express from "express";
import cors from "cors";
// import pino from "pino-http";
import { connectMongoDB } from './db/connectMongoDB.js';
// import { Student } from './models/student.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import studentsRoutes from './routes/studentsRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Глобальні middleware
app.use(logger);         // 1. Логер першим — бачить усі запити
app.use(express.json()); // 2. Парсинг JSON-тіла
app.use(cors());         // 3. Дозвіл для запитів з інших доменів

// app.use(pino({
//     transport: {
//       target: "pino-pretty",
//       options: { colorize: true },
//     },
//   }));
// app.use(cors());
// app.use(express.json());

app.get("/notes", (req, res) => {
  res.status(200).json({ message: "Retrieved all notes" });
});

app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

app.get("/test-error", () => {
  throw new Error("Simulated server error");
});

// app.get('/students', async (req, res) => {
//   const students = await Student.find();
//   res.status(200).json(students);
// });

// app.get('/students/:studentId', async (req, res) => {
//   const { studentId } = req.params;
//   const student = await Student.findById(studentId);

//   if (!student) {
//     return res.status(404).json({ message: 'Student not found' });
//   }

//   res.status(200).json(student);
// });

app.use(studentsRoutes);

app.use(notFoundHandler);

// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

app.use(errorHandler);

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

// підключення до MongoDB
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
