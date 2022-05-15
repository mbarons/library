let myLibrary = [];
let cardsContainer = document.querySelector(".main-content");
let checkboxes = [];
let readText;
let removeIcons = [];

//This is a constructor to create books
function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}

//This add the objects Books to the array myLibrary
function addBookToLibrary(book) {
  myLibrary.push(book);
}

//This adds the class show to the ModalBox, so it appears in the screen
function closeModal() {
  modalContainer.classList.remove("show");
}

//This formats the card according to its read status
function readStatus(read, index, card, first) {
  let readSection = document.querySelector(`[data-index='${index}'] .read-section`)

  if (first) { 
    readText = document.createElement("div");
 
  }

  else {
    readText = document.querySelector(`#read-text[data-index='${index}']`);
    readSection.removeChild(readText);
    card.classList.remove("not-read");
    readSection.classList.remove("not-read");
  };

  if (read) {
    readText = document.createElement("div");
    readText.textContent = "Read!";
  }

  else {
    readSection.classList.add("not-read");
    card.classList.add("not-read");
    readText.textContent = "Not read.";
  };

  readText.setAttribute("id", "read-text");
  readText.setAttribute("data-index", index);
  readSection.appendChild(readText);
  
}
//create the trash remove icon to the card
function createRemoveIcon (index) {
  let cardsFooter = document.querySelector(`[data-index='${index}'] .card-footer`);
  let removeIcon = document.createElement("button");
  removeIcon.classList.add("trash-button");
  removeIcon.setAttribute("data-index", index);
  removeIcon.innerHTML = "<span class='mdi mdi-trash-can-outline mdi-24px'>";
  cardsFooter.appendChild(removeIcon);
  removeIcons.push(removeIcon);
}

//create the read checkbox status to the card
function createCheckbox(index, read) {
  let readCheckbox = document.createElement("input");
  let readSection = document.querySelector(`[data-index='${index}'] .read-section`)
  readCheckbox.setAttribute("type", "checkbox");
  readCheckbox.setAttribute("id", "read-check");
  readCheckbox.setAttribute("data-index", index);
  if (read) {
    readCheckbox.checked = true;
  }
  else {
    readCheckbox.checked = false;
  }
  readSection.appendChild(readCheckbox);
  checkboxes.push(readCheckbox);
}

function removeCard(index) {
  let card = document.querySelector(`.card[data-index='${index}`);
  cardsContainer.removeChild(card);
}

//create the card of the book added
function createCard() {
  let book = myLibrary[myLibrary.length - 1];
  let index = myLibrary.length - 1;
    let card = document.createElement("div")
    card.setAttribute("data-index", index);
    card.classList.add("card");
    card.innerHTML = 
    
    `<div>Title: ${book.title}</div>
    <div>Author: ${book.author}</div>
    <div>${book.pages} pages</div>
    <div class="card-footer">
      <div class="read-section">
      </div>`

    cardsContainer.appendChild(card);

    let first = true;

    createRemoveIcon(index);
    createCheckbox(index, book.read);
    readStatus(book.read, index, card, first);
    checkboxes.forEach(check => clickCheckbox(check));
    removeIcons.forEach(icon => clickRemoveIcon(icon));
  };



let openModal = document.querySelector(".add-button");
let modalContainer = document.querySelector(".modal-container");
let submitButton = document.querySelector("#submit");
let modal = document.querySelector(".modal-box");

//opens the modal box when the add button is clicked
openModal.addEventListener("click", () => {
  modalContainer.classList.add("show");
});

//when the add button inside the modal box is clicked it uses the data to create a book using the constructor and then closes the modal box and creates a card of the book
submitButton.addEventListener("click", () => {

  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read-check-modal").checked;

  addBookToLibrary(new Book(title, author, pages, read));
  
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read-check-modal").checked = false;

  closeModal()
  createCard();
}
  );

function clickCheckbox (checkbox) {
  checkbox.addEventListener("click", () => {
    let index = checkboxes.indexOf(checkbox);
    let card = document.querySelector(`.card[data-index='${index}`);
    let read;
    if (checkbox.checked) {
       read = true;
    }
    else {
      read = false;
    }
     readStatus(read, index, card);
  })
  };

  function clickRemoveIcon(icon) {
    icon.addEventListener("click", () => {
      let index = removeIcons.indexOf(icon);
      let removeIcon = document.querySelector(`.trash-button[data-index='${index}`);
      removeCard(index);
  })};

