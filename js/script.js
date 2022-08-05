// -----------------
//  Book and library
// -----------------
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  set readTogle(bool){
    this.read = bool;
  }
}

let library = {
  library: [],
  init: function() {
    this.cacheDoom();
  },
  cacheDoom: function() {
    this.htmlBooks = document.querySelector('.books');
    this.htmlBtnShowForm = document.querySelector('.btn-show-form');
    this.htmlFormAddBook = document.querySelector('.form');
    this.htmlBtnAddBook = document.querySelector('.btn-add-book');
    this.htmlInputElements = document.querySelectorAll('input');
  },
  bindEvents: function() {
    // Read toggle button
    this.htmlReadbtn = document.querySelectorAll('.book button:not(.btn-red)');
    this.htmlReadbtn.forEach((btn) => {
      let dataId = btn.parentNode.parentNode.getAttribute('data-id');
      btn.addEventListener('click', () => {
        this.readTogle(dataId);
      });
    });

    // Delete button
    this.htmlDelbtn = document.querySelectorAll('.btn-red');
    this.htmlDelbtn.forEach((btn) => {
      let dataId = btn.parentNode.parentNode.getAttribute('data-id');
      btn.addEventListener('click', () => {
        this.removeFromLibrary(dataId);
      });
    });
  },
  render: function() {
    this.htmlBooks.innerHTML = '';
    for (let i = 0; i < this.library.length; i++) {
      let card = document.createElement('div');
      card.classList.add('book');
      card.setAttribute('data-id', i);

      // Card heading
      let cardHeading = document.createElement('div');
      cardHeading.classList.add('card-heading')
      title = document.createElement('h2');
      title.textContent = this.library[i].title;
      cardHeading.appendChild(title);
      card.appendChild(cardHeading);

      // Card content
      let cardContent = document.createElement('div');
      cardContent.classList.add('card-content')
      author = document.createElement('p');
      author.textContent = `Written by ${this.library[i].author}.`;
      pages = document.createElement('p');
      pages.textContent = `The book has ${this.library[i].pages} pages.`;
      read = document.createElement('p');
      read.textContent = `${this.library[i].read ? 'I have read this book.' : 'I have not read this book yet.'}`;
      cardContent.append(author, pages, read);
      card.appendChild(cardContent);

      // Card footer
      cardFooter = document.createElement('div');
      cardFooter.classList.add('card-footer');
      readBtn = document.createElement('button');
      readBtn.textContent = `${this.library[i].read ? 'Read' : 'Not read'}`;
      readBtn.classList.add('btn', `${this.library[i].read ? 'btn-green' : 'btn-yellow'}`) // Different class for read
      delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.classList.add('btn', 'btn-red');
      cardFooter.appendChild(readBtn);
      cardFooter.appendChild(delBtn);
      card.appendChild(cardFooter);

      this.htmlBooks.appendChild(card);
    }
    this.bindEvents();
  },
  addBookToLibrary: function(obj) {
    this.library.push(obj);
    this.render();
  },
  removeFromLibrary: function(id) {
    this.library.splice(id, 1);
    this.render();
  },
  readTogle: function(id) {
    this.library[id].readTogle = this.library[id].read === true ? false : true;
    this.render();
  },
}

library.init();

// -----------------
//  UI
// -----------------
// // Show and animate the form
// btnShowForm.addEventListener('click', () => {
//   formAddBook.setAttribute('open', '')
//   formAddBook.style.display = 'block';
//   btnShowForm.style.display = 'None';
// })

// // When click on button "add book"
// btnAddBook.addEventListener('click', (e) => {
//   // Prevent the submit when clicking the button
//   e.preventDefault();

//   // Get input from form
//   let title = document.querySelector('#title').value;
//   let author = document.querySelector('#author').value;
//   let pages = document.querySelector('#pages').value;
//   let read = document.querySelector('input[name="read"]:checked').id;
//   read = read === 'yes' ? true : false;

//   // If the form fields are empty add an error class
//   if (title === '' || author === '' || pages === '') {
//     if (title === '') document.querySelector('#title').classList.add('error');
//     if (author === '') document.querySelector('#author').classList.add('error');
//     if (pages === '') document.querySelector('#pages').classList.add('error');
//   } else {
//     // Use constructor to create a book
//     let newBook = new Book(title, author, pages, read);

//     // Empty the form
//     formAddBook.reset();

//     // Hide form
//     formAddBook.setAttribute('close', '');

//     formAddBook.addEventListener("animationend", () => {
//       formAddBook.style.display = 'none';
//       formAddBook.removeAttribute('close', '')

//       // Show button to add new book
//       btnShowForm.style.display = 'block';
//     }, { once: true });
//   }
// })

// // Remove error class from form
// inputElements.forEach((input) => {
//   input.addEventListener('focusout', () => {
//     if (input.classList[0] === 'error' && input.value !== '') {
//       input.classList.remove('error');
//     }
//   })
// })

let book1 = new Book('Blood of Elves', 'Andrzej Sapkowski', 320, true);
library.addBookToLibrary(book1);
let book2 = new Book('The Blade Itself', 'Joe Abercrombie', 529, true);
library.addBookToLibrary(book2);
let book3 = new Book('Before They Are Hanged', 'Joe Abercrombie', 539, false);
library.addBookToLibrary(book3);