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

// -----------------
//  UI
// -----------------
let form = {
  init: function() {
    this.cacheDoom();
    this.bindEvents();
  },
  cacheDoom: function() {
    this.htmlBtnShowForm = document.querySelector('.btn-show-form');
    this.htmlForm = document.querySelector('.form');
    this.htmlBtnAddBook = document.querySelector('.btn-add-book');
    this.htmlTitle = document.querySelector('#title');
    this.htmlAuthor = document.querySelector('#author');
    this.htmlPages = document.querySelector('#pages');
    this.htmlRead = document.querySelector('input[name="read"]');
  },
  bindEvents: function() {
    this.htmlBtnShowForm.addEventListener('click', () => {
      this.showForm();
    });

    this.htmlBtnAddBook.addEventListener('click', (e) => {
      this.createBook(e);
    });
  },
  showForm: function() {
    this.htmlForm.setAttribute('open', '')
    this.htmlForm.style.display = 'block';
    this.htmlBtnShowForm.style.display = 'None';
  },
  hideForm: function() {
    this.htmlForm.addEventListener("animationend", () => {
      this.htmlForm.style.display = 'none';
      this.htmlForm.removeAttribute('close', '')

      // Show button to add new book
      this.htmlBtnShowForm .style.display = 'block';
    }, { once: true });
  },
  createBook: function(e) {
    // The if statement is for keeping the HTML form validation.
    if (this.htmlTitle.value !== '' && this.htmlAuthor.value !== '' && this.htmlPages.value !== '') {
      // Prevent form submit
      e.preventDefault();

      let newBook = new Book(
        this.htmlTitle.value,
        this.htmlAuthor.value,
        this.htmlPages.value,
        this.htmlRead.checked
      );
      library.addBookToLibrary(newBook);
      this.htmlForm.reset();
      this.htmlForm.setAttribute('close', '');
      this.hideForm();
    }
  }
}

library.init();
form.init();

let book1 = new Book('Blood of Elves', 'Andrzej Sapkowski', 320, true);
library.addBookToLibrary(book1);
let book2 = new Book('The Blade Itself', 'Joe Abercrombie', 529, true);
library.addBookToLibrary(book2);
let book3 = new Book('Before They Are Hanged', 'Joe Abercrombie', 539, false);
library.addBookToLibrary(book3);