const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username && !password) {
    return res.status(404).json({ message: "Please type an username and/or a password" })
  }


  if (username && password) {
    if (isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop



public_users.get('/', function (req, res) {
  let getBooks = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books))
    }, 6000)
  })

  console.log("Please wait...")
  getBooks.then((books) => {
    console.log(books);
    return res.send(books)
  })
  console.log("Your request is in progress");
});

// Get book details based on ISBN


public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  let getBookByISBN = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books[isbn]))
    }, 6000)
  })
  console.log("Please wait...")
  getBookByISBN.then((books) => {
    console.log(books);
    return res.send(books)
  })
  console.log("Your request is in progress");

});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let getBookByAuthor = new Promise((resolve, reject) => {
    setTimeout(() => {
      let aux = [];

      for (const i in books) {
        if (author === books[i].author) {
          aux.push(books[i]);
        }
      }

      resolve(JSON.stringify(aux))
    }, 6000)
  })
  console.log("Please wait...")
  getBookByAuthor.then((books) => {
    console.log(books);
    return res.send(books)
  })
  console.log("Your request is in progress");

});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let getBookByTitle = new Promise((resolve, reject) => {
    setTimeout(() => {
      let aux = [];

      for (const i in books) {
        if (title === books[i].title) {
          aux.push(books[i]);
        }
      }

      resolve(JSON.stringify(aux))
    }, 6000)
  })
  console.log("Please wait...")
  getBookByTitle.then((books) => {
    console.log(books);
    return res.send(books)
  })
  console.log("Your request is in progress");


});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.send(books[isbn].review);
});

module.exports.general = public_users;
