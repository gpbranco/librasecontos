define([
  'marionette',
  'bookshelf/shelf_book_view',
  'bookshelf/contact_view'
  ], function (Marionette, ShelfBookView, ContactView) {
     var BookshelfView = Marionette.Layout.extend({
      template : '#landing-page-template',
      className : 'landing-page',

      regions : {
        bookListRegion : 'nav'
      },

      ui : {
        presentingVideoBt : 'header .video-button'
      },

      triggers : {
        'click header .video-button' : 'presentingVideoClicked'
      },

      onRender : function() {
        setupBookList.call(this);
      },

      onPresentingVideoClicked : function() {
        announceShowVideo.call(this, this.ui.presentingVideoBt.data('video'));
      }
     });

     function setupBookList () {
       var bookList = new BookList({ collection : this.options.books.get('books')});
        bookList.on('itemview:bookSelected', function (view, args) {
          this.trigger('openBook', args.model);
        }, this);
        bookList.on('itemview:showVideo', function (view, args) {
          announceShowVideo.call(this, args);
        }, this);
        this.bookListRegion.show(bookList);
     }

     function announceShowVideo (videoData) {
       this.trigger('showVideo', videoData);
     }

     var BookList = Marionette.CollectionView.extend({
      tagName: 'ul',
      itemView : ShelfBookView
     });

     return BookshelfView;
  });
