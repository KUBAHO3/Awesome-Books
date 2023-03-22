class BookList {
  constructor() {
    this.form = document.querySelector('#book-form');
    this.bookListContainer = document.querySelector('#book-list');
    this.books = [];
    this.newListBook = {};
    this.loadBooksFromLocalStorage();
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