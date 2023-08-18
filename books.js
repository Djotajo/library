const myLibrary = [];

const content = document.querySelector(".content");

const myForm = document.querySelector("#myForm");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read");
const book2 = new Book("LOTR", "J.R.R. Tolkien", 425, "Read");

addBookToLibrary(book1);
addBookToLibrary(book2);

function refresh() {
  content.innerHTML = "";
  myLibrary.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("book");
    const bookInfo = book.info().split(", ");
    bookInfo.splice(0, 2).forEach((info) => {
      const para = document.createElement("p");
      para.innerHTML = info;
      div.appendChild(para);
    });
    const readBook = document.createElement("button");
    if (book.read === "Read") {
      readBook.innerHTML = "Read";
    } else if (book.read === "Not read") {
      readBook.innerHTML = "Not read";
    }
    div.appendChild(readBook);
    readBook.addEventListener("click", () => {
      if (book.read === "Read") {
        book.read = "Not read";
        refresh();
        // readBook.innerHTML = "Not read";
      } else if (book.read === "Not read") {
        book.read = "Read";
        refresh();
      }
    });
    const removeItem = document.createElement("button");
    removeItem.innerHTML = "Remove";
    div.appendChild(removeItem);
    removeItem.addEventListener("click", () => {
      myLibrary.splice(myLibrary.indexOf(book), 1);
      refresh();
    });
    content.appendChild(div);
  });
}

//
//
const showButton = document.getElementById("showDialog");
const addBook = document.getElementById("addBook");
const confirmBtn = addBook.querySelector("#confirmBtn");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const bookStatus = document.querySelector("#status");

let createnew;

showButton.addEventListener("click", () => {
  addBook.showModal();
});

const closeBtn = document.querySelector("#closeBtn");

closeBtn.addEventListener("click", () => {
  addBook.close();
  myForm.reset();
});

confirmBtn.addEventListener("click", (event) => {
  const formCheck = document.getElementById("myForm").checkValidity();
  if (!formCheck) {
    document.getElementById("myForm").reportValidity();
  } else {
    event.preventDefault(); // We don't want to submit this fake form
    createnew = [title.value, author.value, pages.value, bookStatus.value];
    const newbook = new Book(
      createnew[0],
      createnew[1],
      createnew[2],
      createnew[3]
    );
    newbook.number = myLibrary.findIndex(
      (book) => book.title === newbook.title
    );
    addBookToLibrary(newbook);
    refresh();
    addBook.close();
  }
  myForm.reset();
});

refresh();

document.getElementById("myForm").checkValidity();
