const buttonBook = document.querySelector(".btn-book");
const modal = document.querySelector(".modal");

// open dialog when clicking on button
buttonBook.addEventListener("click", () => {
  modal.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  // Check if the click is outside the modal and not on the buttonBook
  if (!modal.contains(e.target) && e.target !== buttonBook) {
    modal.classList.remove("active");
  }
});

const myLibrary = [];

// constructor function
function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}
