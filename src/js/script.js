/*   */ // eslint-disable-line no-unused-vars

'use strict';
const select = {
  containerOf: {
    books: '.books-list',
  },

  templateOf: {
    book: '#template-book',
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
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);

    thisApp.initData();
    thisApp.initMenu();
  },
};

app.init();
