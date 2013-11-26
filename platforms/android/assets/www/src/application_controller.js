define([
  'marionette',
  'book_collection',
  'landing_page_view',
  'storyteller_view',
  'overlay_view'
  ], function (Marionette, BookCollection, LandingPageView, StorytellerView, OverlayView) {
    var library = BookCollection;

    var ApplicationController = Marionette.Controller.extend({
      initialize : function(options) {
        this.mainRegion = options.mainRegion;
        this.overlayRegion = options.overlayRegion;
        setupRouter.call(this);
        setupOverlayRegion.call(this);
      },

      showLandingPage : function() {
        this.router.navigate('');

        var landingPage = new LandingPageView({books : library});
        landingPage.on('openBook', this.showStoryteller, this);
        landingPage.on('showVideo', showVideo, this);
        this.mainRegion.show(landingPage);
      },

      showStoryteller : function(book, pageNumber) {
        if(!pageNumber){
          pageNumber = 0;
        }

        navigateToBookAtPage.call(this, book.id, pageNumber);

        var storytellerView = new StorytellerView({model : book});
        storytellerView.startingPage = pageNumber;
        storytellerView.on("homeButtonTouched", this.showLandingPage, this);
        storytellerView.on("changedPage", function (pageNumber) {
          navigateToBookAtPage.call(this, book.id, pageNumber);
        }, this);

        this.mainRegion.show(storytellerView);
      },

      openAndShowBook : function(bookId, pageNumber) {
        var book = library.get('books').where({id : ''+bookId})[0];

        if(book){
          this.showStoryteller(book, pageNumber);
        }
      }
    });

    function navigateToBookAtPage (bookId, pageNumber) {
      this.router.navigate('/stories/'+bookId+"/"+pageNumber);
    }

    function setupRouter () {
      this.router = new Marionette.AppRouter({
        controller : this,
        appRoutes : {
          '' : 'showLandingPage',
          'stories/:bookId(/:pageNumber)' : 'openAndShowBook'
        }
      });
    }

    function setupOverlayRegion () {
      var overlayView = new OverlayView({rootElement : this.mainRegion.el});
      overlayView.on('closeOverlay', hideOverlay, this);

      this.overlayRegion.show(overlayView);
    }

    function showVideo (videoData) {
      this.overlayRegion.currentView.showVideo(videoData);
    }

    function hideOverlay () {
      this.overlayRegion.currentView.hideOverlay();
    }

    return ApplicationController;
  });
