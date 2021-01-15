/*   */ // eslint-disable-line no-unused-vars

'use strict';
const select = {
  containerOf: {
    books: '.books-list',
  },

  templateOf: {
    book: '#template-book',
  },
  booksList: {
    clickable: '.book__image',
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

    /*Generate HTML code of book*/
    const generatedHTML = templates.book(thisBook.data);
    /*Generate DOM element from HTML code*/
    thisBook.element = utils.createDOMFromHTML(generatedHTML);
    /*Find Wrapper for Books*/
    const booksWrapper = document.querySelector(select.containerOf.books);
    /*Add books to books list */
    booksWrapper.appendChild(thisBook.element);
  }

  getElements(){
    const thisBook = this;

    thisBook.favoriteTrigger = thisBook.element.querySelector(select.booksList.clickable);

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

const app = {
  initMenu: function(){
    const thisApp = this;

    for(let bookData in thisApp.data.books){
      new Book(thisApp.data.books[bookData].id, thisApp.data.books[bookData]);
    }
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
    thisApp.initMenu();
  },
};

app.init();
