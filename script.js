let myLibrary = [];

let displayTable = document.querySelector(".books_table");

function Book(title, author, numberOfPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  // readStatus is boolean
  this.readStatus = readStatus;
  this.info = function () {
    if (readStatus) {
      return `${this.title} by ${this.author}, ${this.numberOfPages} pages, read already.`;
    } else {
      return `${this.title} by ${this.author}, ${this.numberOfPages} pages, not read yet.`;
    }
  };
}

// Adds book to an array containing all books
function addBookToLibrary(booksArray, book) {
  booksArray.push(book);
}

function displayBooks(booksArray) {
  for (let book in booksArray) {
    const row = document.createElement("tr");

    const bookTitle = document.createElement("td");
    const bookTitleText = document.createTextNode(booksArray[book].title);
    bookTitle.appendChild(bookTitleText);

    const bookAuthor = document.createElement("td");
    const bookAuthorText = document.createTextNode(booksArray[book].author);
    bookAuthor.appendChild(bookAuthorText);

    const bookNumberOfPages = document.createElement("td");
    bookNumberOfPages.classList.add("centered_column");
    const bookNumberOfPagesText = document.createTextNode(
      booksArray[book].numberOfPages
    );
    bookNumberOfPages.appendChild(bookNumberOfPagesText);

    const bookReadStatus = document.createElement("td");
    bookReadStatus.classList.add("centered_column");
    const bookReadStatusButtonList = createReadButton(
      booksArray[book].readStatus,
      book,
      booksArray
    );
    const bookReadStatusButton = bookReadStatusButtonList[0];
    const bookReadStatusButtonLabel = bookReadStatusButtonList[1];
    bookReadStatus.appendChild(bookReadStatusButton);
    bookReadStatus.appendChild(bookReadStatusButtonLabel);

    const bookRemove = document.createElement("td");
    bookRemove.classList.add("centered_column");
    const bookRemoveButton = createRemoveButton(booksArray);
    bookRemove.appendChild(bookRemoveButton);

    row.appendChild(bookTitle);
    row.appendChild(bookAuthor);
    row.appendChild(bookNumberOfPages);
    row.appendChild(bookReadStatus);
    row.appendChild(bookRemove);

    displayTable.appendChild(row);
  }
}

function createReadButton(readStatus, index, booksArray) {
  const bookReadStatusButton = document.createElement("input");
  bookReadStatusButton.classList.add("read_status_table_checkbox");
  bookReadStatusButton.id = index;
  bookReadStatusButton.type = "checkbox";
  const bookReadStatusButtonLabel = document.createElement("label");
  bookReadStatusButtonLabel.htmlFor = index;
  bookReadStatusButtonLabel.classList.add("read_status_table_label");
  if (readStatus) {
    bookReadStatusButton.checked = true;
    bookReadStatusButtonLabel.textContent = "Read";
  } else {
    bookReadStatusButtonLabel.textContent = "Not read";
  }

  // If someone presses checkbox
  bookReadStatusButton.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      // If it was unchecked (unread) and now it is read, then it
      // changes its text content and Object readStatus
      bookReadStatusButtonLabel.textContent = "Read";
      booksArray[index].readStatus = true;
    } else {
      bookReadStatusButtonLabel.textContent = "Not read";
      booksArray[index].readStatus = false;
    }
  });

  return [bookReadStatusButton, bookReadStatusButtonLabel];
}

function createRemoveButton(booksArray) {
  const bookRemoveButton = document.createElement("button");
  bookRemoveButton.classList.add("remove_button");
  bookRemoveButton.textContent = "Remove";
  bookRemoveButton.addEventListener("click", () => {
    const row = bookRemoveButton.closest("tr");
    // rowIndex counts title_row too, therefore we need to do minus one
    booksArray.splice(row.rowIndex - 1, 1);
    row.remove();
  });
  return bookRemoveButton;
}

const popup = document.querySelector(".new_book_popup");

const addBookButton = document.querySelector(".add_book");
addBookButton.addEventListener("click", () => {
  popup.classList.add("show");
});

const closeNewBookPopupButton = document.querySelector(".close_form_button");
closeNewBookPopupButton.addEventListener("click", () => {
  popup.classList.remove("show");
});

const submitNewBookButton = document.querySelector(".add_new_book_form_button");
submitNewBookButton.addEventListener("click", () => {
  const titleInput = document.querySelector("#ftitle");
  const authorInput = document.querySelector("#fauthor");
  const pagesInput = document.querySelector("#fpages");
  const readInput = document.querySelector("#fread");
  if (
    titleInput.value === "" ||
    authorInput.value === "" ||
    pagesInput === ""
  ) {
    alert("Please fill all the fields!");
    return;
  }
  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.checked
  );
  addBookToLibrary(myLibrary, newBook);
  while (displayTable.firstChild) {
    displayTable.firstChild.remove();
  }
  displayBooks(myLibrary);
  popup.classList.remove("show");
});

const hobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
addBookToLibrary(myLibrary, hobbit);

const harryPotter = new Book(
  "Harry Potter and the Goblet of Fire",
  "J.K. Rowling",
  636,
  true
);
addBookToLibrary(myLibrary, harryPotter);

const theLastWish = new Book("The Last Wish", "Andrzej Sapkowski", 288, false);
addBookToLibrary(myLibrary, theLastWish);

displayBooks(myLibrary);
