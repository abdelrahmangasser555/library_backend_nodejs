const axios = require("axios");
const { get } = require("mongoose");
const url = "http://localhost:3000";
async function addBook(book) {
  try {
    const response = await axios.post(`${url}/addBook`, book);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}
// bellow is the addbook test function
// addBook({
//   title: "The ay kalam",
//   author: "Hamada",
//   price: 10,
// });

async function getAllBooks() {
  const myBooks = await axios.get(`${url}/getAllBooks`);
  console.log(myBooks.data);
}

// bellow is the getallbooks test function

// getAllBooks();

async function updateBook(id, newData) {
  try {
    const response = await axios.put(`${url}/updateBookData/${id}`, newData);
    console.log(response);
  } catch (err) {
    console.log(err.response.data["error"], "this is an error message ");
  }
}

updateBook("660d1e38e76ac4d3c1a0fac9", { title: "hamada_01" });
