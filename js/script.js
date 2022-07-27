const books = document.querySelector('.books');

let myLibrary = [
  { title: 'Blood of Elves', author: 'Andrzej Sapkowski', pages: '320', read: true },
  { title: 'The Blade Itself', author: 'Joe Abercrombie', pages: '529', read: true },
  { title: 'Before They Are Hanged', author: 'Joe Abercrombie', pages: '539', read: false },
];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

function displayBooks(){
  let card, title, author, pages, read;

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

displayBooks();