// console.log('ES6 Version')

showBooks()

function showBooks(){
    let notesObj;
    let notes = localStorage.getItem('MyBooks')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }

        //print 
        let tableBody = document.getElementById('tableBody')
        tableBody.innerHTML = '';
        notesObj.forEach(function (element,index) {
            tableBody.innerHTML += `  <tr class='txt'>
                                <td>${element.NAME}</td>
                                <td>${element.AUTHOR}</td>
                                <td class ='srch'>${element.GENRE}</td>
                                <td><button id='${index}' onclick='deleteNote(this.id)' class="btn btn-primary">Remove</button></td>
                            </tr>   `
            })   
}


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
    add(){
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
       
        let notesObj;
        let notes = localStorage.getItem('MyBooks')
        if (notes == null) {
            notesObj = []
        }
        else {
            notesObj = JSON.parse(notes)
        }
        let myObj = {
            NAME: name ,
            AUTHOR: author ,
            GENRE: genre
        }
        notesObj.push(myObj)
        localStorage.setItem('MyBooks', JSON.stringify(notesObj)) 

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
        display.add()
        display.clear()
        display.show('success', ' The book has been added to Cart!')
    }
    else{
        display.show('danger', ` Sorry this book doesn't exist`)
    }
    showBooks()
})

//delete book
function deleteNote(index){
    let notes = localStorage.getItem('MyBooks')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
  notesObj.splice(index, 1)
  localStorage.setItem('MyBooks', JSON.stringify(notesObj))
  showBooks()
}

//search book
let search = document.getElementById('search');
search.addEventListener('input', function(){
   let inputval= search.value ;

    let txt =document.getElementsByClassName('txt')
    Array.from(txt).forEach(function(element){
        let booktxt = element.getElementsByClassName('srch')[0].innerText ;

       if(booktxt.includes(inputval)){
           element.style.display=''
        }
        else{
            element.style.display ='none'
       }
    })
})