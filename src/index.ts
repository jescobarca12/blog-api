import express, { Request, Response } from "express";
import cors from "cors";
import "./db";
import { errorHandler } from "./middleware/errorHandler";
import postsRouter from "./posts/posts.routes";
import autoresRouter from "./autores/autores.routes";
import authRouter from "./auth/auth.routes";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173", // desarrollo
      process.env.FRONTEND_URL || "https://mi-blog.vercel.app", // producción
    ],
  }),
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "¡Hola desde Express!" });
});

app.use("/posts", postsRouter);
app.use("/autores", autoresRouter);
app.use("/auth", authRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
