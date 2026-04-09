const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: "Book One", authorId: 1 },
  { id: 2, title: "Book Two", authorId: 2 }
];

let authors = [
  { id: 1, name: "Author One" },
  { id: 2, name: "Author Two" }
];

app.get("/books", (req, res) => {
  res.json(books);
});


app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  book ? res.json(book) : res.status(404).json({ message: "Book not found" });
});

app.post("/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    authorId: req.body.authorId
  };
  books.push(newBook);
  res.json(newBook);
});

app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (book) {
    book.title = req.body.title || book.title;
    book.authorId = req.body.authorId || book.authorId;
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.delete("/books/:id", (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.json({ message: "Book deleted" });
});

app.get("/authors", (req, res) => {
  res.json(authors);
});


app.get("/authors/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  author ? res.json(author) : res.status(404).json({ message: "Author not found" });
});


app.post("/authors", (req, res) => {
  const newAuthor = {
    id: authors.length + 1,
    name: req.body.name
  };
  authors.push(newAuthor);
  res.json(newAuthor);
});

app.put("/authors/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (author) {
    author.name = req.body.name || author.name;
    res.json(author);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

app.delete("/authors/:id", (req, res) => {
  authors = authors.filter(a => a.id != req.params.id);
  res.json({ message: "Author deleted" });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});