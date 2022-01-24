let myLibrary = [];

let displayTable = document.querySelector('.books_table');

function Book(title, author, numberOfPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  // readStatus is boolean
  this.readStatus = readStatus;
  this.info = function() {
    if(readStatus) {
      return `${this.title} by ${this.author}, ${this.numberOfPages} pages, read already.`
    } else {
      return `${this.title} by ${this.author}, ${this.numberOfPages} pages, not read yet.`
    }
  }
}

// Adds book to an array containing all books
function addBookToLibrary(booksArray, book) {
  booksArray.push(book);
}

function displayBooks(booksArray) {
  for(let book in booksArray) {
    const row = document.createElement('tr');

    const bookTitle = document.createElement('td');
    const bookTitleText = document.createTextNode(booksArray[book].title);
    bookTitle.appendChild(bookTitleText);

    const bookAuthor = document.createElement('td');
    const bookAuthorText = document.createTextNode(booksArray[book].author);
    bookAuthor.appendChild(bookAuthorText);

    const bookNumberOfPages = document.createElement('td');
    const bookNumberOfPagesText = document.createTextNode(booksArray[book].numberOfPages);
    bookNumberOfPages.appendChild(bookNumberOfPagesText);

    const bookReadStatus = document.createElement('td');
    const bookReadStatusButton = createReadButton(booksArray[book].readStatus);
    bookReadStatus.appendChild(bookReadStatusButton);

    const bookRemove = document.createElement('td');
    const bookRemoveButton = createRemoveButton();
    bookRemove.appendChild(bookRemoveButton);

    row.appendChild(bookTitle);
    row.appendChild(bookAuthor);
    row.appendChild(bookNumberOfPages);
    row.appendChild(bookReadStatus);
    row.appendChild(bookRemove);

    displayTable.appendChild(row);
  }
}

function createReadButton(readStatus) {
  const bookReadStatusButton = document.createElement('input');
  bookReadStatusButton.type = 'checkbox';
  if(readStatus) {
    bookReadStatusButton.checked = true;
  }
  return bookReadStatusButton;
}

function createRemoveButton() {
  const bookRemoveButton = document.createElement('button');
  bookRemoveButton.style.backgroundColor = 'red';
  bookRemoveButton.style.verticalAlign = 'middle';
  return bookRemoveButton;
}

const hobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, false);
addBookToLibrary(myLibrary, hobbit);

const harryPotter = new Book('Harry Potter and the Goblet of Fire', 'J.K. Rowling', 636, true);
addBookToLibrary(myLibrary, harryPotter);

const theLastWish = new Book('The Last Wish', 'Andrzej Sapkowski', 288, false);
addBookToLibrary(myLibrary, theLastWish);

displayBooks(myLibrary);