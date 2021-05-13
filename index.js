console.log('Hi!')

//constructor
function Book(name, author, genre) {
    this.name = name
    this.author = author
    this.genre = genre
}

//display constructor
function Display() {

}

//add methods to display prototype
Display.prototype.add = function (book) {
    console.log('Added to UI')
    tableBody = document.getElementById('tableBody')
    let uiString = `  <tr>
                          <td>${book.name}</td>
                          <td>${book.author}</td>
                          <td>${book.genre}</td>
                      </tr>   `
    tableBody.innerHTML += uiString
}

//implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm')
    libraryForm.reset()
}

//implement the validate function
Display.prototype.validate = function (book) {
    if(book.name.length<2 || book.author.length<2){
        return false
    }
    else{
        return true
    }
}
Display.prototype.show = function(type,msg){
    let message = document.getElementById('message')
    message.innerHTML = ` <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>Dear User!</strong> ${msg}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`
    setTimeout(()=>{
        message.innerHTML = ""
    }, 2000)
}

//add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm')
libraryForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('You have submitted the form!')

    let name = document.getElementById('bookName').value
    let author = document.getElementById('bookAuthor').value
    let genre;

    let fiction = document.getElementById('fiction')
    let scifi = document.getElementById('scifi')
    let coding = document.getElementById('coding')

    if (fiction.checked) {
        genre = fiction.value
    }
    else if (scifi.checked) {
        genre = scifi.value
    }
    else if (coding.checked) {
        genre = coding.value
    }
    let book = new Book(name, author, genre)
    console.log(book)

    let display = new Display()
    if(display.validate(book)){
        display.add(book)
        display.clear()
        display.show('success', ' The book has been added to Cart!')
    }
    else{
        display.show('danger', ` Sorry this book doesn't exist`)
    }
})

