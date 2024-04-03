const express = require("express");
const cors = require("cors");
const port = 3000;
const app = express();
const mongoose = require("mongoose");
const Book = require("./book");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
// this is the backend for a book store app
app.use(middleWare);

app.get("/", (req, res) => {
  res.send("Welcome to the book store");
});

app.post("/addBook", async (req, res) => {
  try {
    console.log(req.body);
    const book = new Book(req.body);
    await book.save();
    res.send("Book added successfully");
  } catch (err) {
    res.send("Error adding book");
  }
});
app.get("/getAllBooks", async (req, res) => {
  try {
    const data = await Book.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: "an error occurred getting the data books from the books store",
    });
  }
});

app.put("/updateBookData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    console.log(newData, "new data is here from the route it self");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "in valid id" });
      return;
    }
    const updatedData = await Book.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (!updatedData) {
      res.status(404).json({ error: "not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "updated successfully", data: updatedData });
  } catch (err) {
    res.status(500).json({ error: "an error in the server have occured " });
  }
});

app.delete("/deleteById/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(300).json({ error: "invalid id" });
      return;
    }

    const deletedBook = await Book.findByIdAndDelete(id);
  } catch (error) {}
});
async function middleWare(req, res, next) {
  try {
    // console.log(JSON.parse(req));
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/hamada?serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1"
    );
    console.log("Connected to the database", mongoose.connection.readyState);
    await next();
    return;
  } catch (err) {
    throw new Error("Error connecting to the database");
  }
}
app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
