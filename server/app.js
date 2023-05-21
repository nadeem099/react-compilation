const express = require("express");
const app = express();
const cors = require("cors");

const PAGE_SIZE = 2;

const allData = [
  {
    id: "33453",
    user: "Nadeem",
    postTitle: "React",
    tags: ["tech"],
  },
  {
    id: "33563",
    user: "Ahmed",
    postTitle: "Next",
    tags: ["tech"],
  },
  {
    id: "12453",
    user: "Elon",
    postTitle: "Svelte",
    tags: ["tech"],
  },
  {
    id: "33409",
    user: "Musk",
    postTitle: "PHP",
    tags: ["tech"],
  },
  {
    id: "33489",
    user: "John",
    postTitle: "Vue",
    tags: ["tech"],
  },
  {
    id: "33412",
    user: "Hitesh",
    postTitle: "Ember",
    tags: ["tech"],
  },
  {
    id: "33430",
    user: "Steve",
    postTitle: "Angular",
    tags: ["tech"],
  },
];

const allowedOrigins = ["http://127.0.0.1:4000", "http://127.0.0.1:5173"];
app.use(
  cors({
    origin: function (origin, callBack) {
      if (!origin) return callBack(new Error("not allowed"), false);
      if (allowedOrigins.indexOf(origin) <= -1)
        return callBack("this origin not allowed", false);
      callBack(null, true);
    },
  })
);

app.get("/api/allData", (req, res) => {
  res.status(200).json({
    data: allData,
  });
});

app.get("/api/data", (req, res) => {
  console.log("request");
  const page = req.query.page || 1;
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const dataSlice = allData.slice(startIndex, endIndex + 1);
  res.status(200).json({
    data: dataSlice,
    totalPages: Math.ceil(allData.length / PAGE_SIZE),
  });
});

app.listen(3000, () => {
  console.log("server started");
});
