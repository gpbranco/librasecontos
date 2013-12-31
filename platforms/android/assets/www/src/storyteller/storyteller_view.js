define([
    'backbone',
    'marionette',
    'underscore',
    'jquery',
    'storyteller/book_view',
    'backbone-associations',
  ], function (Backbone, Marionette, _, $, BookView) {
    var StorytellerView = Marionette.Layout.extend({
      template : '#open-book-section-template',
      className : 'storyteller',

      regions : {
        bookContainer : '.book-container'
      },

      ui : {
        prevButton : '.prev-page',
        nextButton : '.next-page',
        titleVideoButton : 'header .video-button',
        select: 'select'
      },

      triggers : {
        'click .prev-page' : 'prevButtonTouched',
        'click .next-page' : 'nextButtonTouched',
        'click .home-button' : 'homeButtonTouched',
        'change select': 'pageSelectorChanged'
      },

      initialize : function () {
        this.$el.on('click', '.video-button', _.bind(function (event) {
          this.trigger('showVideo', $(event.target).data('video'));
        }, this));
      },

      onRender : function() {
        handleTitle.call(this);
        this.book = new OpenBook(this.model.toJSON());
        this.book.set('curPageNumber', parseInt(this.startingPage, 10));

        this.book.on('change:curPageNumber', checkButtonsEnabled, this);

        var bookView = new BookView({model : this.book});
        this.bookContainer.show(bookView);
        this.bindUIElements();
        populateSelect.call(this);
        checkButtonsEnabled.call(this);
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
      },

      onPageSelectorChanged : function () {
        var pageToGo = parseInt(this.ui.select.val());

        this.book.set('curPageNumber', pageToGo);
        announcePageChanged.call(this);
      }
    });

    function populateSelect () {
      var optTemplate = '<option value="<%=index%>"><%=name%></option>';
      var options = '';
      _.each(this.model.get('pages').models, function (page, index) {
        options += _.template(optTemplate, {
          index: index,
          name: nameForPage(page, index)
        });
      });

      this.ui.select.html(options);
      refreshPageSelector.call(this);
    }

    function refreshPageSelector () {
      this.ui.select.val(this.book.get('curPageNumber'));
    }

    function nameForPage (page, index) {
      var type = page.get('type');
      var name;

      if(type == 'cover'){
        name = 'Capa';
      }else if(type == 'feedback'){
        name = 'Opinião';
      }else {
        name = 'Pág '+index;
      }

      return name;
    }

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
      refreshPageSelector.call(this);
    }

    var Page = Backbone.AssociatedModel.extend({
      imagePath : function(image) {
        return 'histories/'+this.get('path')+'/'+image;
      },
	  videoPath : function(video) {
        //return '/data/data/com.bravisoftware.librasecontos/files/'+video;
		return 'file:///android_asset/video/'+video;
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
