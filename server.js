import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).json({ live: true }));

app.post("/createNote", async (req, res) => {
  const { note } = req.body;

  await db.Note.create({
    data: {
      note: note,
    },
  });

  res.send(200);
});

app.get("/listNotes", async (req, res) => {
  const notes = await db.Note.findMany({
    take: 100,
  });

  res.send(notes);
});

app.listen(3000, () => {
  console.log("server is running");
});
