const select = {
    templateOf: {
        book: '#template-book',
    },
    containerOf: {
        image: '.book__image',
        list: '.books-list',
    }
  };
const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),

};

function render(){
    for(let book of dataSource.books){
        const bookData= {
            id: book.id,
            name: book.name,
            price: book.price,
            rating: book.rating,
            image: book.image,
        };
        const generatedHTML = templates.book(bookData);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const containerOfList = document.querySelector(select.containerOf.list);
        containerOfList.appendChild(generatedDOM);
    }
}
const favoriteBooks = [];
//console.log('favoriteBooks' , favoriteBooks)

function initAction(){
    const thisBookList = this;
        thisBookList.element = document.querySelector(select.containerOf.list);
    
    thisBookList.element.addEventListener('click', function(event){
        event.preventDefault();
        const image = event.target.offsetParent;
        const bookID = image.getAttribute('data-id');
        if(favoriteBooks.includes(bookID) != true){
            image.classList.add('favorite');
            favoriteBooks.push(bookID);
            } else {
            image.classList.remove('favorite');
            favoriteBooks.splice(bookID);
            }
        });
    }       
render();
initAction();