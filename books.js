console.log("Hi");

const myLibrary = [];

const content = document.querySelector(".content");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function (){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
const book2 = new Book("LOTR", "J.R.R. Tolkien", 425, "read");

addBookToLibrary(book1);
addBookToLibrary(book2);

console.log(myLibrary);

function refresh() {
    content.innerHTML = "";
    myLibrary.forEach(book => {
        let div = document.createElement('div');
        div.classList.add("book");
        let bookInfo = book.info().split(", ");
        bookInfo.forEach(info => {
            let para = document.createElement('p');
            para.innerHTML = info;
            div.appendChild(para);
        });
        let removeItem = document.createElement('button');
        removeItem.innerHTML = "Remove";
        div.appendChild(removeItem);
        removeItem.addEventListener("click", function() {myLibrary.splice(myLibrary.indexOf(book), 1);
            refresh();
        console.log(myLibrary)});
        content.appendChild(div);
        console.log(div.innerHTML);
        console.log(bookInfo);
    });
}

// 
// 
const showButton = document.getElementById("showDialog");
const addBook = document.getElementById("addBook");
const outputBox = document.querySelector("output");
const selectEl = addBook.querySelector("select");
const confirmBtn = addBook.querySelector("#confirmBtn");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const bookStatus = document.querySelector("#status");

let createnew;

showButton.addEventListener("click", () => {
    addBook.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
const closeBtn = document.querySelector("#closeBtn"); 

closeBtn.addEventListener("click", function() {
    addBook.close();
    myForm.reset();
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
    let formCheck = document.getElementById('myForm').checkValidity();
    if (!formCheck) {
        document.getElementById('myForm').reportValidity();
    } else{
    event.preventDefault(); // We don't want to submit this fake form
    createnew = [title.value, author.value, pages.value, bookStatus.value];
    let newbook = new Book(createnew[0], createnew[1], createnew[2], createnew[3]);
    newbook.number = myLibrary.findIndex((book) => book.title ==newbook.title);
    addBookToLibrary(newbook);
    console.log(createnew);
    console.log(newbook.number);
    refresh();
    addBook.close();}
    myForm.reset();
});

refresh();

document.getElementById('myForm').checkValidity();

console.log(myLibrary);