let listBooks = [
  {
    title: 'Lorem Ipsum',
    author: 'Testero Testyy',
  },
  {
    title: 'Second Book',
    author: 'Testero Testyy',
  },
];

function addBooks(title, author) {
  listBooks.push({
    title,
    author,
  });
}

function displayBooks(listBooks) {
  const bookSection = document.querySelector('.fav-books');
  bookSection.innerHTML = listBooks.map((book, index) => `
<div>
    <p>${book.title}</p>
    <p>${book.author}</p>
    <button type="button" onclick="removeBooks(${index})" id="remove">remove</button>
    <hr>
</div>
`).join('');
}

function removeBooks(index) {
  listBooks.splice(index, 1);

  displayBooks(listBooks);
  localStorage.setItem('listBooks', JSON.stringify(listBooks));
}

function logSubmit(event) {
  const bookTitle = document.querySelector('#book-title').value;
  const bookAuthor = document.querySelector('#book-author').value;
  addBooks(bookTitle, bookAuthor);
  displayBooks(listBooks);
  localStorage.setItem('listBooks', JSON.stringify(listBooks));

  event.preventDefault();
}
document.querySelector('#submit-button').addEventListener('submit', (e) => logSubmit(e));

if (localStorage.getItem('listBooks') !== null) {
  listBooks = JSON.parse(localStorage.getItem('listBooks'));
  displayBooks(listBooks);
} else {
  displayBooks(listBooks);
}

const indexi = 100;
const remove = removeBooks(indexi);
document.querySelector('.out').innerHTML = remove;