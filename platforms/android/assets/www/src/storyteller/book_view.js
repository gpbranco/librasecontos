define([
  'marionette',
  'underscore',
  'storyteller/book_right_page_view',
  'storyteller/book_left_page_view',
  'storyteller/book_cover_view',
  'storyteller/feedback_view'
  ], function (Marionette, _, BookRightPageView, BookLeftPageView, BookCoverView, FeedbackView) {
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

      leftPageMedia : 'video',

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
      var isFeedback = currentPage.get("type") == "feedback";
      this.$el.toggleClass("book-cover", isCover);
      this.$el.toggleClass("book-feedback", isFeedback);

      if(isCover){
        renderCover.call(this, currentPage);
      }else if(isFeedback){
        renderFeedback.call(this);
      }else{
        renderPages.call(this, currentPage);
      }
    }

    function renderPages (page) {
      var rightPageView = new BookRightPageView({model : page});
      this.rightPageRegion.show(rightPageView);

      var leftPageView = new BookLeftPageView({model : page, mediaType : this.leftPageMedia});
      leftPageView.on('mediaTypeChanged', _.bind(mediaTypeChanged, this));
      this.leftPageRegion.show(leftPageView);
    }

    function renderCover (coverPage) {
      var coverData = {
          model : coverPage,
          title : this.model.get('title').text,
          video : this.model.get('title').video
        };

      var coverView = new BookCoverView(coverData);
      this.coverRegion.show(coverView);
    }

    function renderFeedback () {
      this.rightPageRegion.close();
      var feedbackView = new FeedbackView({book : this.model});
      this.leftPageRegion.show(feedbackView);
    }

    function mediaTypeChanged (type) {
      this.leftPageMedia = type;
    }

    return BookView;
  });
