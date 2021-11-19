const select = {
    templateOf: {
        book: '#template-book',
    },
    containerOf: {
        image: '.book__image',
        list: '.books-list',
        filter: '.filters',
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
const filters = [];
//console.log('filters' , filters);

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
        const booksFilter = document.querySelector(select.containerOf.filter);
        booksFilter.addEventListener('click' , function(event){
          const clickedElem = event.target;
          if(clickedElem.tagName == 'INPUT' && clickedElem.name == 'filter' && clickedElem.type == 'checkbox'){
            if(clickedElem.checked){
               filters.push(clickedElem.value);
               //console.log('clickedElem.value' , clickedElem.value)
            } else {
              const noChecked = filters.indexOf(clickedElem.value);
              filters.splice(noChecked, 1);
            }
        }
        filterBooks();
    });
    function filterBooks(){
        for(let book of dataSource.books){
            const filteredBook  = document.querySelector('.book__image[data-id="' + book.id + '"]');
            let shouldBeHidden = false;
            
            for( const filter of filters){
              if(!book.details[filter]){
                shouldBeHidden = true;
                break;
              }
            }
            if(shouldBeHidden === true){
              filteredBook.classList.add('hidden');
            } else {
              filteredBook.classList.remove('hidden');
            }
        }
    }
}       

render();
initAction()