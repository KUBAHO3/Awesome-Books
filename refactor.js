class BookList {
  constructor() {
    this.form = document.querySelector('#book-form');
    this.bookListContainer = document.querySelector('#book-list');
    this.books = [];
    this.newListBook = {};
    this.loadBooksFromLocalStorage();
    this.displayBooks();
  }

  
book(title, author) {
    this.newListBook.title = title;
    this.newListBook.author = author;
    return this.newListBook;
  }

  displayBooks() {
    this.bookListContainer.innerHTML = '';
    this.books.forEach((book, index) => {
      const li = document.createElement('div');
      li.className = 'book';
      li.innerHTML = `<span class="name">"${book.title}"</span> by <span class="names">${book.author}</span> `;
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