
{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      image: '.book__image',
      list: '.books-list',
      filters: '.filters'
    }
  };
  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
  
const filters = [];
const favoriteBooks = [];

class BooksList {
  constructor() {
    this.initData();
    this.initFunctions();
    this.getSelectors();
    this.getTemplates();
    this.getElements();
    this.render();
    this.initAction();
    this.filterBooks();
  }
  initData() {
    this.data = dataSource.books;
  }

  initFunctions() {
    this.createDOMFromHTML = utils.createDOMFromHTML;
  }

  getSelectors() {
    this.select = {
      templateOf: {
        book: '#template-book',
      },
      booksPanel: {
        booksList: '.books-list',
        bookImage: 'book__image',
      },
      filtersForm: {
        filters: '.filters',
      },
    };
  }

  getTemplates() {
    this.templates = {
      book: Handlebars.compile(
        document.querySelector(this.select.templateOf.book).innerHTML
      ),
    };
  }

  getElements() {
    this.booksList = document.querySelector(this.select.booksPanel.booksList);
    this.filters = document.querySelector(this.select.filtersForm.filters);
    this.booksImages = document.querySelectorAll(
      this.select.booksPanel.bookImage
    );
  }

  render() {
    const thisBookList = this;
    for (let book of dataSource.books) {
      const bookData = {
        id: book.id,
        name: book.name,
        price: book.price,
        rating: book.rating,
        image: book.image,
      };
      
      const ratingBgc = thisBookList.determineRatingBgc(bookData.rating);
      bookData.ratingBgc = ratingBgc;
      const ratingWidth = bookData.rating * 10;
      bookData.ratingWidth = ratingWidth;
      
      const generatedHTML = templates.book(bookData);
      thisBookList.element = utils.createDOMFromHTML(generatedHTML);
      const containerOfList = document.querySelector(select.containerOf.list);
      containerOfList.appendChild(thisBookList.element);
    }
  }

  initAction() {
    const thisBookList = this;
    thisBookList.element = document.querySelector(this.select.booksPanel.booksList);

    thisBookList.element.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const image = event.target.offsetParent;
      const bookID = image.getAttribute('data-id');
      if (favoriteBooks.includes(bookID) != true) {
        image.classList.add('favorite');
        favoriteBooks.push(bookID);
      } else {
        image.classList.remove('favorite');
        favoriteBooks.splice(bookID);
      }
    });
    const booksFilter = document.querySelector(select.containerOf.filters);
    booksFilter.addEventListener('click', function (event) {
      const clickedElem = event.target;
      if (clickedElem.tagName == 'INPUT' && clickedElem.name == 'filter' && clickedElem.type == 'checkbox') {
        if (clickedElem.checked) {
          filters.push(clickedElem.value);
          //console.log('clickedElem.value' , clickedElem.value)
        } else {
          const noChecked = filters.indexOf(clickedElem.value);
          filters.splice(noChecked, 1);
        }
      }
      thisBookList.filterBooks();
    });
  }

  filterBooks() {
    //const favoriteBooks = [];
    //console.log('favoriteBooks' , favoriteBooks)
    //const filters = [];
    //console.log('filters' , filters);    
    for (let book of dataSource.books) {
      const filteredBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;

      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden === true) {
        filteredBook.classList.add('hidden');
      } else {
        filteredBook.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
    let background = "";
    if (rating < 6) {
      //background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      //background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      //background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      //background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      //background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      //background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      //background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      //background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      //background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 9) {
      //background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      //background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      //background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }
    return background;
  }
}
new BooksList();
}