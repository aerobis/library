document.addEventListener("DOMContentLoaded", () => {
    const myLibrary = [];
    let storedId = 0; /*TO KEEP TRACK OF WHAT BOOK CARD WAS CLICKED*/
    let readStatus = "Read"; /*DEFAULT BOOK_READ STATUS*/

    /*FOR THE FORM MODAL*/
    let modalMode = "add"; 
    let modalContainer = document.querySelector("#book-form");
    let modalHeader = modalContainer.querySelector("h3");

    /* CONSTRUCTOR */
    // function Book(name, author, pages, read_status, id){
    //     if(!new.target){
    //         throw new Error("Error! Please re-do action!");
    //     }
        
    //     this.name = name;
    //     this.author = author;
    //     this.pages = pages;
    //     this.read_status = read_status;
    //     this.id = crypto.randomUUID();
    // }

    class Book{
        constructor(name, author, pages, read_status, id){
            this.name = name;
            this.author = author;
            this.pages = pages;
            this.read_status = read_status;
            this.id = crypto.randomUUID();
        }
    };

    /* ADDING FUNCTION */
    function addBookToLibrary(name, author, pages, read_status){
        let newBook = new Book(name, author, pages, read_status);

        myLibrary.push(newBook);
        displayBooks();
    }

    /* CARD DISPLAY FUNCTION */
    function displayBooks(){
        let container = document.querySelector(".main-page");
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

            /*TOGGLE READ STATUS*/
            let toggleBtn = document.createElement("button");
            toggleBtn.textContent = "Read Status"
            toggleBtn.addEventListener("click", () => toggleRead(book.id));

            card.append(name, author, pages, read_status, editBtn, deleteBtn, toggleBtn);
            container.appendChild(card);
        });
    }

    /*EDIT AND DELETE BUTTONS*/
    function editBook(id){
        const book = myLibrary.find(book => book.id === id);
        if(!book) return;
        storedId = id;

        modalMode = "edit";
        modalHeader.textContent = "Edit existing Book";
        submitBtn.textContent = "Edit Book";
        bookModal.showModal();
    };

    function deleteBook(id){
        const index = myLibrary.findIndex(book => book.id === id);
        if(index !== -1){
            myLibrary.splice(index, 1);
            displayBooks();
        }
    };

    /*TOGGLE BUTTON*/
    function toggleRead(id){
        let book = myLibrary.find(book => book.id === id);
        if(!book) return;
        storedId = id;
        

        if(book.read_status == "Yes"){ 
            book.read_status = "No";
            displayBooks();
        }else{
            book.read_status = "Yes";
            displayBooks();
        }
    }


    /*ADDING NEW BOOK BUTTON*/
    let addBtn = document.querySelector("#add-book-button");
    let bookModal = document.querySelector("#book-form-container");
    console.log(bookModal);
    let closeModalBtn = document.querySelector("#close-modal");
    let submitBtn = document.querySelector("#submit-book");

    addBtn.addEventListener("click", ()=>{
        modalMode = "add";
        modalHeader.textContent = "Add new Book";
        submitBtn.textContent = "Add Book";
        bookModal.showModal();
    })

    closeModalBtn.addEventListener("click", ()=>{
        bookModal.close();
    })

    /* SUBMITTING THE BOOK */
    submitBtn.addEventListener("click", (event)=>{
        event.preventDefault();

        let bookName = document.querySelector("#bookName");
        let bookAuthor = document.querySelector("#bookAuthor");
        let bookPages = document.querySelector("#bookPages");
        let bookRead = document.querySelector("#bookRead");
        if(bookRead.checked){
            bookRead.value = "Yes";
        }else{
            bookRead.value = "No";
        }

        /*IF ADD BOOK BUTTON IS CLICKED*/
        if(modalMode == "add"){
            addBookToLibrary(bookName.value, bookAuthor.value, bookPages.value, bookRead.value);
            bookModal.close();
        }

        /*IF EDIT BUTTON IS CLICKED*/
        if(modalMode == "edit"){
            let book = myLibrary.find(book => book.id === storedId);

            /*IF ANY FIELD IS EMPTY, DON'T CHANGE IT.*/
            if(bookName.value != ""){
                book.name = bookName.value;
            }
            if(bookAuthor.value != ""){
                book.author = bookAuthor.value;
            }
            if(!isNaN(parseFloat(bookPages.value))){
                book.pages = bookPages.value;
            }
            if(bookRead.value != ""){
                book.read_status = bookRead.value;
            }

            bookModal.close();
            displayBooks();
        }
    })


    addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", "180", "Yes");
    console.log(myLibrary);
});

