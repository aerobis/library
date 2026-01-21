document.addEventListener("DOMContentLoaded", () => {
    const myLibrary = [];

    /* CONSTRUCTOR */
    function Book(name, author, pages, read_status, id){
        if(!new.target){
            throw new Error("Error! Please re-do action!");
        }
        
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read_status = read_status;
        this.id = crypto.randomUUID();
    }

    /* ADDING FUNCTION */
    function addBookToLibrary(name, author, pages, read_status){
        let newBook = new Book(name, author, pages, read_status);

        myLibrary.push(newBook);
        displayBooks();
    }

    /* CARD DISPLAY FUNCTION */
    function displayBooks(){
        let container = document.querySelector(".book-section");
        container.innerHTML = "";

        myLibrary.forEach(book => {
            let card = document.createElement("div");
            card.classList.add("dynamic-card");
            card.dataset.id = book.id;

            let name = document.createElement("h3");
            name.textContent = book.name;

            let author = document.createElement("p");
            author.textContent = `by ${book.author}`;

            let pages = document.createElement("p");
            pages.textContent = `${book.pages} pages`;

            let read_status = document.createElement("p");
            read_status.textContent = `Read: ${book.read_status}`;

            /*EDIT BUTTON*/
            let editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", ()=> editBook(book.id));

            /*DELETE BUTTON*/
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", ()=> deleteBook(book.id));

            card.append(name, author, pages, read_status, editBtn, deleteBtn);
            container.appendChild(card);
        });
    }

    /*EDIT AND DELETE BUTTONS*/
    function editBook(id){
        const book = myLibrary.find(book => book.id === id);
        if(!book) return;
    };

    function deleteBook(id){
        const index = myLibrary.find(book => book.id === id);
        if(index !== -1){
            myLibrary.splice(index, 1);
            displayBooks();
        }
    };


    /*ADDING NEW BOOK BUTTON*/
    let addBtn = document.querySelector("#add-book-button");
    let bookModal = document.querySelector("#book-form-container");
    let closeModalBtn = document.querySelector("#close-modal");

    addBtn.addEventListener("click", ()=>{
        bookModal.showModal();
    })

    closeModalBtn.addEventListener("click", ()=>{
        bookModal.close();
    })

    /*SUBMITTING THE FORM*/
    let submitBtn = document.querySelector("#submit-book");
    submitBtn.addEventListener("click", (event)=>{
        event.preventDefault();

        let bookTitle = document.querySelector("#bookTitle");
        let bookAuthor = document.querySelector("#bookAuthor");
        let bookPages = document.querySelector("#bookPages");
        let bookRead = document.querySelector("#bookRead");
        if(bookRead.checked){
            bookRead.value = "Yes";
        }else{
            bookRead.value = "No";
        }

        addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.value);

        bookModal.close();
    })


    addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", "180", "Yes");
    console.log(myLibrary);
});