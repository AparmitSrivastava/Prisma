import "dotenv/config";
import express from "express";
import { prisma } from "./src/config/db.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome Brother!" });
});



app.post("/api/users", async (req, res) => {
  const { name, email, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required" });
  }
  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid Email" });
  }
  if (typeof name !== "string") {
    return res.status(400).json({ error: "name must be a string" });
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      profile: {
        create: {
          bio,
        },
      },
    },
  });

  return res.json({ user });
});



app.post("/api/posts", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and Content are required" });
  }
  if (typeof title !== "string") {
    return res.status(400).json({ error: "title must be a string" });
  }
  if (typeof content !== "string") {
    return res.status(400).json({ error: "content must be a string" });
  }

  const post = await prisma.post.create({
    data: { title, content, authorId: 1 },
  });

  return res.json({ post });
})



app.get("/api/posts", async (req, res) => {

  const {skip, take} = req.query;

  const posts = await prisma.post.findMany({skip: Number(skip), take: Number(take)});
  return res.json({ posts });
})







app.listen(3000, () => {
  console.log("Server is running on Port: 3000");
});
