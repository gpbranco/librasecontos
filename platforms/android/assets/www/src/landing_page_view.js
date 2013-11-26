define([
  'marionette',
  'shelf_book_view'
  ], function (Marionette, ShelfBookView) {
     var LandingPageView = Marionette.Layout.extend({
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
        var bookList = new BookList({ collection : this.options.books.get('books')});
        bookList.on('itemview:bookSelected', function (view, args) {
          this.trigger('openBook', args.model);
        }, this);
        bookList.on('itemview:showVideo', function (view, args) {
          announceShowVideo.call(this, args)
        }, this);
        this.bookListRegion.show(bookList);
      },

      onPresentingVideoClicked : function() {
        announceShowVideo.call(this, this.ui.presentingVideoBt.data('video'));
      }
     });

     function announceShowVideo (videoData) {
       this.trigger('showVideo', videoData  );
     }

     var BookList = Marionette.CollectionView.extend({
      tagName: 'ul',
      itemView : ShelfBookView
     });

     return LandingPageView;
  });
