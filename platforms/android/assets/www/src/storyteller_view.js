define([
    'backbone',
    'marionette',
    'underscore',
    'book_view',
    'backbone-associations',
  ], function (Backbone, Marionette, _, BookView) {
    var StorytellerView = Marionette.Layout.extend({
      template : '#open-book-section-template',
      className : 'storyteller',

      regions : {
        bookContainer : '.book-container'
      },

      ui : {
        prevButton : '.prev-page',
        nextButton : '.next-page',
        titleVideoButton : 'header .video-button'
      },

      triggers : {
        'click .prev-page' : 'prevButtonTouched',
        'click .next-page' : 'nextButtonTouched',
        'click .home-button' : 'homeButtonTouched'
      },

      onRender : function() {
        handleTitle.call(this);
        this.book = new OpenBook(this.model.toJSON());
        this.book.set('curPageNumber', parseInt(this.startingPage, 10));

        this.book.on('change:curPageNumber', checkButtonsEnabled, this);
        checkButtonsEnabled.call(this);

        var bookView = new BookView({model : this.book});
        this.bookContainer.show(bookView);
      },

      onPrevButtonTouched : function() {
        if(this.book.prevPage()){
          announcePageChanged.call(this);
        }
      },

      onNextButtonTouched : function() {
        if(this.book.nextPage()){
          announcePageChanged.call(this);
        }
      }
    });

    function handleTitle () {
      var title = this.model.get('title');

      if(title.video){
        this.ui.titleVideoButton.data('video', title.video);
      }else{
        this.ui.titleVideoButton.remove();
      }
    }

    function checkButtonsEnabled () {
      this.ui.prevButton.prop("disabled", !this.book.hasPrevPage());
      this.ui.nextButton.prop("disabled", !this.book.hasNextpage());
    }

    function announcePageChanged () {
      this.trigger('changedPage', this.book.get('curPageNumber'));
    }

    var Page = Backbone.AssociatedModel.extend({
      imagePath : function(image) {
        return '/histories/'+this.get('path')+'/'+image;
      }
    });

    var OpenBook = Backbone.AssociatedModel.extend({
      defaults : {
        curPageNumber : 0,
      },

      relations : [
        {
          type : Backbone.Many,
          key : 'pages',
          relatedModel : Page
        }
      ],

      initialize : function() {
        this.get('pages').each(function (page) {
          page.set('path', this.id);
        }, this);
      },

      currentPage : function () {
        return this.get('pages').at(this.get('curPageNumber'));
      },

      hasNextpage : function() {
        return this.get('curPageNumber')+1 < this.get('pages').length;
      },

      hasPrevPage : function() {
        return this.get('curPageNumber') > 0;
      },

      prevPage : function() {
        if(this.hasPrevPage()){
          return this.set('curPageNumber', this.get('curPageNumber')-1);
        }

        return null;
      },

      nextPage : function() {
        if(this.hasNextpage()){
          return this.set('curPageNumber', this.get('curPageNumber')+1);
        }

        return null;
      }
    });

    return StorytellerView;
  });
