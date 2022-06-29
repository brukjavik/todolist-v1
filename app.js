const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const newTodos = ["Comprar pão", "Varrer o quarto", "Estudar algoritmos"];
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { listTitle: day, newListItem: newTodos });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItem: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/work", function (req, res) {
  const item = req.body.newItem;
  workItems.push(item);

  res.redirect("/work");
});

app.post("/", function (req, res) {
  const newTodo = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(newTodo);
    res.redirect("/work");
  } else {
    newTodos.push(newTodo);
    res.redirect("/");
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000.");
});
