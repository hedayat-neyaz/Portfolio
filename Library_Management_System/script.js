document.addEventListener("DOMContentLoaded", loadBooks);

const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");
const searchInput = document.getElementById("search");

bookForm.addEventListener("submit", saveBook);
searchInput.addEventListener("input", searchBooks);

function saveBook(event) {
    event.preventDefault();

    const id = document.getElementById("book-id").value || Date.now();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const available = document.getElementById("available").checked;

    const book = { id, title, author, genre, available };
    let books = getBooks();
    const existingIndex = books.findIndex(b => b.id == id);

    if (existingIndex !== -1) {
        books[existingIndex] = book;
    } else {
        books.push(book);
    }

    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
    bookForm.reset();
}

function loadBooks() {
    const books = getBooks();
    bookList.innerHTML = "";

    books.forEach(book => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.available ? "Yes" : "No"}</td>
            <td class="actions">
                <button class="edit" onclick="editBook(${book.id})">Edit</button>
                <button class="delete" onclick="deleteBook(${book.id})">Delete</button>
            </td>
        `;
        bookList.appendChild(row);
    });
}

function editBook(id) {
    const books = getBooks();
    const book = books.find(b => b.id == id);

    if (book) {
        document.getElementById("book-id").value = book.id;
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("genre").value = book.genre;
        document.getElementById("available").checked = book.available;
    }
}

function deleteBook(id) {
    let books = getBooks();
    books = books.filter(book => book.id != id);
    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
}

function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

function searchBooks() {
    const query = searchInput.value.toLowerCase();
    const rows = Array.from(bookList.querySelectorAll("tr"));

    rows.forEach(row => {
        const title = row.children[1].textContent.toLowerCase();
        const author = row.children[2].textContent.toLowerCase();
        row.style.display = title.includes(query) || author.includes(query) ? "" : "none";
    });
}
