class BookList {
  constructor() {
    this.form = document.querySelector('#book-form');
    this.bookListContainer = document.querySelector('#book-list');
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
    this.bookListContainer.addEventListener('click', (e) => {
      if (e.target.className === 'remove') {
        this.removeBook(e.target.dataset.index);
      }
    });
  }
}
const myBookList = new BookList();
myBookList.setupEventListeners();