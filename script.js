const myLibrary = [];

function Book(name, author, pages, read_status, id){
    if(!new.target){
        throw error("Error! Please re-do action!");
    }
    
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read_status = read_status;
    this.id = id;
}

function addBookToLibrary(){
    let name;
    let author;
    let pages;
    let read_status;
    let id = crypto.randomUUID();

    let newBook = new Book(name, author, pages, read_status, id);

    myLibrary.push(newBook);
}

