// Modal
const modal = document.querySelector(".modal"); // Modal container
const addBookBtn = document.querySelector(".add-book-btn");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookIsRead = document.querySelector("#is-read");

// Buttons
const buttonBook = document.querySelector(".btn-book"); // Button to open modal
const removeBtns = document.querySelectorAll(".btn-remove"); // Removes buttons from each card

// Display Container
const displayContainer = document.querySelector(".book-cards-container");

// Library
let myLibrary = [];

// --- Event Listeners --- //

// Open modal when clicking on button "add book"
buttonBook.addEventListener("click", () => {
  modal.classList.toggle("active");
});

// Close modal when clicking outside of it
document.addEventListener("click", (e) => {
  // Check if the click is outside the modal and not on the buttonBook
  if (!modal.contains(e.target) && e.target !== buttonBook) {
    modal.classList.remove("active");
  }
});

// add book to library when clicking on the button "submit"
addBookBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the form from submitting

  // Validate required fields
  if (
    !validateRequiredFields(bookTitle.value, bookAuthor.value, bookPages.value)
  )
    return;

  addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookIsRead.checked
  ); // Add book to library

  closeModal(); // Close modal after adding book
  resetModal(); // Reset modal fields
});

// --- Constructor Function --- //
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = read;
}

// --- Library Functions --- //

// Add book
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

// Display all books in library
function displayBooks() {
  displayContainer.innerHTML = ""; // Clear existing books

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div"); // Create a new card for each book
    bookCard.classList.add("book-card"); // Add class to the card

    // Add the book details to the card
    bookCard.innerHTML = `
      <p class="text">Title: <span class="sub-text">${book.title}</span></p>
      <p class="text">Author: <span class="sub-text">${book.author}</span></p>
      <p class="text">Pages: <span class="sub-text">${book.pages}</span></p>
      <button class="btn btn-read ${book.isRead ? "read" : "not-read"}">
          ${book.isRead ? "Read" : "Not Read"}
      </button>
      <button class="btn btn-remove" data-id="${index}">Remove</button> 
    `;
    // Append the card to the display container
    displayContainer.appendChild(bookCard);
  });

  // Add event listeners to the remove any cards
  document.querySelectorAll(".btn-remove").forEach((btn) => {
    btn.addEventListener("click", function () {
      removeBookFromLibrary(this.dataset.id);
    });
  });

  // Add event listeners to the read buttons
  document.querySelectorAll(".btn-read").forEach((btn) => {
    btn.addEventListener("click", function () {
      // Find the parent element, which is common to both buttons
      const parentElement = this.closest(".book-card");

      // From the parent, find the "remove button" to access its dataset
      const removeBtn = parentElement.querySelector(".btn-remove");

      // Access the dataset from the remove button
      const dataSetID = removeBtn.dataset.id;

      // Now you can safely access the dataset.id from the remove button
      if (this.classList.contains("not-read")) {
        this.classList.replace("not-read", "read");
        this.textContent = "Read";

        myLibrary[dataSetID].isRead = true; // Update the isRead property
      } else {
        this.classList.replace("read", "not-read");
        this.textContent = "Not Read";

        myLibrary[dataSetID].isRead = false; // Update the isRead property
      }
    });
  });
}

// Remove book from library
function removeBookFromLibrary(bookId) {
  myLibrary.splice(bookId, 1); // Remove the book from the library

  displayBooks(); // Update the UI
}

// --- Modal Functions --- //

// Close Modal
function closeModal() {
  modal.classList.remove("active");
}

// Reset modal fields
function resetModal() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookIsRead.checked = false;
}

// --- Validate Functions --- //
function validateRequiredFields(
  bookTitleValue,
  bookAuthorValue,
  bookPagesValue
) {
  for (const field of [...arguments]) {
    if (!field.trim()) {
      alert("Please fill out all required fields.");
      return;
    }
  }
  return true;
}

// document.querySelectorAll(".btn-remove").forEach((btn) => {
//   btn.addEventListener("click", function () {
//     console.log("Remove button clicked");
//     console.log(this.dataset.id);
//     removeBookFromLibrary(this.dataset.id);
//   });
// });
