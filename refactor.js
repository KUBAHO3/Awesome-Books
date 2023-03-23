class BookList {
  constructor() {
    this.form = document.querySelector('#book-form');
    this.bookListContainer = document.querySelector('#book-list');
    this.lists = document.querySelector('#list');
    this.adds = document.querySelector('#add-it');
    this.contacts = document.querySelector('#contact-us');
    this.listsSec = document.querySelector('.book-section');
    this.addsSec = document.querySelector('.add-book-section');
    this.contactsSec = document.querySelector('.contact-section');
    this.books = [{
      title: 'Lorem Ipsum',
      author: 'Testero Testyy',
    },
    {
      title: 'Second Book',
      author: 'Testero Testyy',
    }];
    this.newListBook = {};
    this.loadBooksFromLocalStorage();
    this.displayBooks();
  }

  loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    } else {
      localStorage.setItem('books', JSON.stringify(this.books));
    }
  }

  book(title, author) {
    this.newListBook.title = title;
    this.newListBook.author = author;
    return { title, author };
  }

  viewIt(element, section) {
    return () => {
      this.lists.classList.remove('active-menu');
      this.adds.classList.remove('active-menu');
      this.contacts.classList.remove('active-menu');

      this.listsSec.classList.add('hide');
      this.addsSec.classList.add('hide');
      this.contactsSec.classList.add('hide');

      element.classList.add('active-menu');
      section.classList.remove('hide');
    };
  }

  displayBooks() {
    this.bookListContainer.innerHTML = '';
    this.books.forEach((book, index) => {
      const li = document.createElement('div');
      li.className = 'book';
      li.innerHTML = `<span class="name">&nbsp;"${book.title}"&nbsp;</span> by <span class="names">&nbsp;"${book.author}"&nbsp;</span> `;
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove';
      removeBtn.textContent = 'Remove';
      removeBtn.setAttribute('data-index', index);
      li.appendChild(removeBtn);
      this.bookListContainer.appendChild(li);
    });
    this.form.reset();
  }

  addBook(event) {
    event.preventDefault();
    const title = event.target[0].value;
    const author = event.target[1].value;
    const newBook = this.book(title, author);
    this.books.push(newBook);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  setupEventListeners() {
    this.form.addEventListener('submit', this.addBook.bind(this));
    this.lists.addEventListener('click', this.viewIt(this.lists, this.listsSec));
    this.adds.addEventListener('click', this.viewIt(this.adds, this.addsSec));
    this.contacts.addEventListener('click', this.viewIt(this.contacts, this.contactsSec));
    this.bookListContainer.addEventListener('click', (e) => {
      if (e.target.className === 'remove') {
        this.removeBook(e.target.dataset.index);
      }
    });
  }
}
const myBookList = new BookList();
myBookList.setupEventListeners();

const date = new Date();

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const monthIndex = date.getMonth();
const monthName = monthNames[monthIndex];
const day = date.getDate();
const year = date.getFullYear();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();

const suffix = hour >= 12 ? 'pm' : 'am';
const hour12 = hour % 12 || 12;

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}

const formattedDate = `${monthName} ${day}${getDaySuffix(day)}, ${year}, ${hour12}:${padZero(minute)}:${padZero(second)} ${suffix}`;
document.getElementById('time').innerHTML = formattedDate;
