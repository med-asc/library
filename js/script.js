const books = document.querySelector('.books');
const btnShowForm = document.querySelector('.btn-show-form');
const formAddBook = document.querySelector('.form');
const btnAddBook = document.querySelector('.btn-add-book');
const inputElements = document.querySelectorAll('input');
let bookIdCounter = 0;

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
  let card, cardHeading, cardContent, cardFooter, title, author, pages, read, delBtn;

  // Count books on page for knowing how many are missing
  let countPresentedBooks = books.childElementCount === 0 ?
    0 : 
    myLibrary.length - (myLibrary.length - books.childElementCount);

  // Loop through the array "myLibrary" and 
  // create a card for each book with its data.
  // If only some books are presented, add the ones missing.
  // Add the books to the page.
  for (let i = countPresentedBooks; i < myLibrary.length; i++) {
    // Create card
    card = document.createElement('div');
    card.classList.add('book');
    bookIdCounter++
    card.setAttribute('data-index', bookIdCounter);

    // Create Card heading div
    cardHeading = document.createElement('div');
    cardHeading.classList.add('card-heading')

    // Create Card content div
    cardContent = document.createElement('div');
    cardContent.classList.add('card-content')

    // Create Card footer div
    cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer')

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

    // Create delet btn
    delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.classList.add('btn', 'btn-red');

    // Append elements
    cardHeading.appendChild(title);
    card.appendChild(cardHeading);

    cardContent.append(author, pages, read);
    card.appendChild(cardContent);

    cardFooter.appendChild(delBtn)
    card.appendChild(cardFooter);

    books.appendChild(card);
  }

  // Delete function
  // If click on delete button, grab
  // data-index attribute and delete that index in array
  const btnDel = document.querySelectorAll('.btn-red')
  btnDel.forEach((button) => {
    button.addEventListener('click', () => {
      let bookId = button.parentElement.parentElement.getAttribute('data-index');
      let bookIndex = myLibrary.findIndex(object => {
        return object.id === bookId;
      });
  
      myLibrary.splice(bookIndex, 1);
      button.parentElement.parentElement.remove();
    })
  })
}

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

  // If form field empty add error class
  if (title === '' || author === '' || pages === '') {
    if (title === '') document.querySelector('#title').classList.add('error');
    if (author === '') document.querySelector('#author').classList.add('error');
    if (pages === '') document.querySelector('#pages').classList.add('error');

  } else {
    // Use constructor to create a book
    let newBook = new Book(title, author, pages, read);

    // Add book to library
    addBookToLibrary(newBook);

    // Display the new book
    displayBooks();

    // Empty the form
    formAddBook.reset();

    // Hide form
    formAddBook.setAttribute('close', '')

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

displayBooks();