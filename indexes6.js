// console.log('ES6 Version')

//book constructor
class Book{
    constructor(name, author, genre) {
        this.name = name
        this.author = author
        this.genre = genre
    }
}

//display constructor
class Display{

    add(book){
            let tableBody = document.getElementById('tableBody')
            let uiString = `  <tr>
                                <td>${book.name}</td>
                                <td>${book.author}</td>
                                <td>${book.genre}</td>
                            </tr>   `
            tableBody.innerHTML += uiString
        }

   clear() {
            let libraryForm = document.getElementById('libraryForm')
            libraryForm.reset()
        }

   validate(book) {
                if(book.name.length<2 || book.author.length<2){
                    return false
                }
                else{
                    return true
                }
        }

  show(type,msg){
    let message = document.getElementById('message')
    message.innerHTML = ` <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>Dear User!</strong> ${msg}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`
        setTimeout(()=>{
            message.innerHTML = ""
        }, 5000)
  }

}

//add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm')
libraryForm.addEventListener('submit', (e) => {
    e.preventDefault()

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