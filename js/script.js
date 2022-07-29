const btnShowForm = document.querySelector('.btn-show-form');
const formAddBook = document.querySelector('.form');
const btnAddBook = document.querySelector('.btn-add-book');
const inputElements = document.querySelectorAll('input');

const books = document.querySelector('.books');
let bookIdCounter = 0;
let myLibrary = [];

// -----------------
//  Book and library
// -----------------

// Constructor for books
function Book(title, author, pages, read) {
  this.id = ++bookIdCounter;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.addBookToLibrary();
}

// Adds books to array, then creates the html with values
// that is added to the page
Book.prototype.addBookToLibrary = function() {
  // Add book to array MyLib
  myLibrary.push({
    id: this.id,
    title: this.title,
    author: this.author,
    pages: this.pages,
    read: this.read,
  });

  // Create the html for card
  let card, cardHeading, cardContent, cardFooter, title, author, pages, read, delBtn
  // Create Card
  card = document.createElement('div');
  card.classList.add('book');
  card.setAttribute('data-id', this.id);

  // Create Card heading div
  cardHeading = document.createElement('div');
  cardHeading.classList.add('card-heading')
  title = document.createElement('h2');
  title.textContent = this.title;
  cardHeading.appendChild(title);
  card.appendChild(cardHeading);

  // Create Card content div
  cardContent = document.createElement('div');
  cardContent.classList.add('card-content')
  author = document.createElement('p');
  author.textContent = `Written by ${this.author}.`;
  pages = document.createElement('p');
  pages.textContent = `The book has ${this.pages} pages.`;
  read = document.createElement('p');
  read.textContent = `${this.read ? 'I have read this book.' : 'I have not read this book yet.'}`;
  cardContent.append(author, pages, read);
  card.appendChild(cardContent);

  // Create Card footer div
  cardFooter = document.createElement('div');
  cardFooter.classList.add('card-footer')
  delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.classList.add('btn', 'btn-red');
  cardFooter.appendChild(delBtn)
  card.appendChild(cardFooter);

  books.appendChild(card);

  delBtn.addEventListener('click', () => this.deleteBook())
};

Book.prototype.deleteBook = function() {
  // Remove from array
  let index = myLibrary.findIndex(x => x.id === this.id);
  myLibrary.splice(index, 1);

  // Remove the html
  let book = document.querySelector(`div[data-id="${this.id}"]`);
  book.remove()
}

// -----------------
//  UI
// -----------------
// Show and animate the form
btnShowForm.addEventListener('click', () => {
  formAddBook.setAttribute('open', '')
  formAddBook.style.display = 'block';
  btnShowForm.style.display = 'None';
})

// When click on button "add book"
btnAddBook.addEventListener('click', (e) => {
  // Prevent the submit when clicking the button
  e.preventDefault();

  // Get input from form
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let read = document.querySelector('input[name="read"]:checked').id;
  read = read === 'yes' ? true : false;

  // If the form fields are empty add an error class
  if (title === '' || author === '' || pages === '') {
    if (title === '') document.querySelector('#title').classList.add('error');
    if (author === '') document.querySelector('#author').classList.add('error');
    if (pages === '') document.querySelector('#pages').classList.add('error');
  } else {
    // Use constructor to create a book
    let newBook = new Book(title, author, pages, read);

    // Empty the form
    formAddBook.reset();

    // Hide form
    formAddBook.setAttribute('close', '');

    formAddBook.addEventListener("animationend", () => {
      formAddBook.style.display = 'none';
      formAddBook.removeAttribute('close', '')

      // Show button to add new book
      btnShowForm.style.display = 'block';
    }, { once: true });
  }
})

// Remove error class from form
inputElements.forEach((input) => {
  input.addEventListener('focusout', () => {
    if (input.classList[0] === 'error' && input.value !== '') {
      input.classList.remove('error');
    }
  })
})

let book1 = new Book('Blood of Elves', 'Andrzej Sapkowski', 320, true);
let book2 = new Book('The Blade Itself', 'Joe Abercrombie', 529, true);
let book3 = new Book('Before They Are Hanged', 'Joe Abercrombie', 539, false);