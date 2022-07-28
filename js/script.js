const books = document.querySelector('.books');
const btnAddBook = document.querySelector('.btn-add-book');
const formAddBook = document.querySelector('.form');

let myLibrary = [
  { title: 'Blood of Elves', author: 'Andrzej Sapkowski', pages: '320', read: true },
  { title: 'The Blade Itself', author: 'Joe Abercrombie', pages: '529', read: true },
  { title: 'Before They Are Hanged', author: 'Joe Abercrombie', pages: '539', read: false },
];

// Constructor for books
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(obj) {
  myLibrary.push({
    title: obj.title,
    author: obj.author,
    pages: obj.pages,
    read: obj.read,
  });
}

function displayBooks(){
  let card, title, author, pages, read;

  // Loop through the array "myLibrary" and 
  // create a card for each book with its data.
  // Add the books to the page.
  for (let i = 0; i < myLibrary.length; i++) {
    // Create card
    card = document.createElement('div');
    card.classList.add('book');

    // Create title
    title = document.createElement('h2');
    title.textContent = myLibrary[i].title;

    // Create author
    author = document.createElement('p');
    author.textContent = `Written by ${myLibrary[i].author}.`;

    // Create pages
    pages = document.createElement('p');
    pages.textContent = `The book has ${myLibrary[i].pages} pages.`;

    // Create read
    read = document.createElement('p');
    read.textContent = `${myLibrary[i].read ? 'I have read this book.' : 'I have not read this book yet.'}`;

    // Append elements
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    books.appendChild(card);
  }
}

// Show and animate the form
btnAddBook.addEventListener('click', () => {
  formAddBook.setAttribute('open', '')
  formAddBook.style.display = 'block';
  btnAddBook.style.display = 'None';
})

displayBooks();