import express from "express";

const app = express();

app.get("/", (req, res) => res.json({ message: "Yo" }));

app.listen(process.env.PORT || 4000, () =>
  console.log(`Listening to port ${process.env.PORT || 4000}\nOrz`)
);
