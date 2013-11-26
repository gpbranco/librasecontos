define([
  'marionette',
  'book_right_page_view',
  'book_left_page_view',
  'book_cover_view'
  ], function (Marionette, BookRightPageView, BookLeftPageView, BookCoverView) {
    var BookView = Marionette.Layout.extend({
      className : 'book-view',
      template : '#book-view-template',

      regions : {
        coverRegion : '.cover-container',
        leftPageRegion : '.left-page',
        rightPageRegion : '.right-page'
      },

      modelEvents : {
        'change:curPageNumber' : 'curPageChanged'
      },

      onRender : function() {
        renderBook.call(this);
      },

      curPageChanged : function() {
        renderBook.call(this);
      }
    });

    function renderBook () {
      var currentPage = this.model.currentPage();
      var isCover = currentPage.get("type") == "cover";
      this.$el.toggleClass("book-cover", isCover);

      if(isCover){
        renderCover.call(this, currentPage);
        return;
      }

      renderPages.call(this, currentPage);
    }

    function renderPages (page) {
      var rightPageView = new BookRightPageView({model : page});
      this.rightPageRegion.show(rightPageView);

      var leftPageView = new BookLeftPageView({model : page});
      this.leftPageRegion.show(leftPageView);
    }

    function renderCover (coverPage) {
      var coverView = new BookCoverView({model : coverPage});
      this.coverRegion.show(coverView);
    }

    return BookView;
  });
