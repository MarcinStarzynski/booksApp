/*   */ // eslint-disable-line no-unused-vars

'use strict';
const select = {
  containerOf: {
    books: '.books-list',
    filters: '.filters',
  },

  templateOf: {
    book: '#template-book',
  },

  booksList: {
    clickable: '.book__image',
  },

  formInputs: {
    filter: 'input[name="filter"]',
  },

};

const templates = {
  book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};


class Book {
  constructor(id, data){
    const thisBook = this;

    thisBook.id = id;
    thisBook.data = data;

    thisBook.rednerBook();
    thisBook.getElements();
    thisBook.initActions();

  }

  rednerBook(){
    const thisBook = this;
    /*Generate styles for HTML */
    const ratingBackground = thisBook.ratingBackgroundColor(thisBook.data.rating);
    const ratingWidth = thisBook.data.rating * 10;

    /*Generate HTML code of book*/
    const generatedHTML = templates.book({
      ...thisBook.data,
      ratingBackground,
      ratingWidth,
    });
    /*Generate DOM element from HTML code*/
    thisBook.element = utils.createDOMFromHTML(generatedHTML);
    /*Find Wrapper for Books*/
    const booksWrapper = document.querySelector(select.containerOf.books);
    /*Add books to books list */
    booksWrapper.appendChild(thisBook.element);
  }

  ratingBackgroundColor(){
    const thisBook = this;

    console.log(thisBook.data.rating);

    const rating = thisBook.data.rating;
    let background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
    }
    if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    }
    if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    }
    if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }
    return background;
  }

  getElements(){
    const thisBook = this;

    thisBook.favoriteTrigger = thisBook.element.querySelector(select.booksList.clickable);
    thisBook.details = thisBook.data.details;
    thisBook.filters = document.querySelector(select.containerOf.filters);

    //console.log(dataSource.books.details);

  }

  initActions(){
    const thisBook = this;

    /*Prevent default action on 1click*/
    thisBook.favoriteTrigger.addEventListener('click', function(event){
      event.preventDefault();

    });

    thisBook.favoriteTrigger.addEventListener('dblclick', function(){

      if(!dataSource.favoriteBooks.includes(thisBook.id)){
        dataSource.favoriteBooks.push(thisBook.id);
        thisBook.favoriteTrigger.classList.add('favorite');

      }else{
        for(let id = 0; id < dataSource.favoriteBooks.length; id++){
          if(dataSource.favoriteBooks[id] === thisBook.id){
            dataSource.favoriteBooks.splice(id, 1);
            thisBook.favoriteTrigger.classList.remove('favorite');

          }
        }
      }

    });

  }

}

class Filters {
  constructor(){
    const thisFilter = this;

    thisFilter.getElements();
    thisFilter.filterStart();


  }

  getElements(){
    const thisFilter = this;

    thisFilter.filters = document.querySelectorAll(select.formInputs.filter);
    thisFilter.hiddenTrigger=document.querySelectorAll(select.booksList.clickable);


  }

  filterStart(){
    const thisFilter = this;

    for(let input of thisFilter.filters){
      input.addEventListener('change', function(){
        const checkboxValue = input.getAttribute('value');
        if(input.checked == true && !dataSource.filters.includes(checkboxValue)){
          dataSource.filters.push(checkboxValue);
        }else{
          const id = dataSource.filters.indexOf(checkboxValue);
          if(id >= 0) {
            dataSource.filters.splice(id, 1);
          }
        }
        thisFilter.filterBooks();

      }  );

    }

  }

  filterBooks(){
    for (let book of dataSource.books) {
      const bookToBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;
      for (let filterName of dataSource.filters) {
        if (!book.details[filterName]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        bookToBeHidden.classList.add('hidden');
      } else {
        bookToBeHidden.classList.remove('hidden');
      }
    }
  }

}
const app = {
  initMenu: function(){
    const thisApp = this;

    for(let bookData in thisApp.data.books){
      new Book(thisApp.data.books[bookData].id, thisApp.data.books[bookData]);
    }
  },

  initFilter: function(){
    const thisApp = this;

    thisApp.filter = new Filters();
  },

  initData: function(){
    const thisApp = this;

    thisApp.data = dataSource;
  },

  init: function(){
    const thisApp = this;
    //console.log('*** App starting ***');
    //console.log('thisApp:', thisApp);

    thisApp.initData();
    thisApp.initFilter();
    thisApp.initMenu();

  },
};

app.init();
