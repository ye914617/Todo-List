const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();

//ejs
app.set("view engine", "ejs");

//static file
app.use(express.static("public"));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//database
const dbURL =
  "mongodb://player333:test123456@todolist-shard-00-00.7otua.mongodb.net:27017,todolist-shard-00-01.7otua.mongodb.net:27017,todolist-shard-00-02.7otua.mongodb.net:27017/whattodo?ssl=true&replicaSet=atlas-iwkza1-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Connected to db"))
  .catch((err) => console.log(err));

//listen request
app.listen(3000);


app.get("/", (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("index", { todolist: result });
    })
    .catch((err) => console.log(err));
});

app.get("/create", (req, res) => {
  res.render("todo");
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("singletodo", { todo: result });
    })
    .catch((err) => console.log(err));
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(id, { title: req.body.title, body: req.body.body })
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => console.log(err));
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => console.log(err));
});

app.post("/create", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

app.use((req, res) => {
  res.status(404).render("404");
});
