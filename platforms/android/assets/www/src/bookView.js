define([
  'jquery',
  'backbone',
  'marionette',
  'pageNavigationView',
  'pageView',
  'menuView',
  'overlay'
], function ($, Backbone, Marionette, PageNavigationView, PageView, MenuView, Overlay) {
  var Page = Backbone.Model.extend({
    getPath : function() {
      return this.get('path');
    },

    getSentence : function() {
      return this.get('sentence');
    }
  });

  var Media = Backbone.Model.extend({
    getType : function() {
      return this.get('type');
    },

    getProperties : function () {
      return this.get('properties');
    }
  });

  var BookView = Marionette.Layout.extend({
    template : "#book_template",
    tagName : 'section',
    className : 'book',

    regions : {
      page : '.pages_container',
      menu : '.menu_container',
      pageNavigation : '.page_navigation_container',
      overlay : '.overlay_container'
    },

    currentPage : null,

    onRender : function() {
      this.setupPageController();
    },

    setupPageController : function() {
      var pageNavigation = new PageNavigationView({maxPages : this.model.getStory().length});
      this.listenTo(pageNavigation, 'changedPage', this.showPage.bind(this));

      this.pageNavigation.show(pageNavigation);
    },

    showPage : function(pageNavigation) {
      var pageNumber = pageNavigation.model.get('current') -1;

      var currentPage = {
        model : new Page({
          sentence: this.model.getStory()[pageNumber],
          path : this.model.getPath()
        })
      };

      this.page.show(new PageView(currentPage));

      var menu = new MenuView(currentPage);
      this.listenTo(menu, 'mediaOpened', this.onMediaOpened);
      this.listenTo(menu, 'mediaClosed', this.onMediaClosed);
      this.menu.show(menu);

      this.currentPage = currentPage.model;
    },

    showOverlay : function(media) {
      var overlay = new Overlay({model : media});
      this.listenTo(overlay, 'closeOverlayClicked', this.onCloseOverlayClicked);
      this.overlay.show(overlay);
    },

    onCloseOverlayClicked : function() {
      this.menu.currentView.deactivateAllButtons();
    },

    onMediaOpened : function(type) {
      var media = new Media({
        type : type,
        text : this.currentPage.getSentence().text,
        properties : this.currentPage.getSentence()[type]
      });

      this.showOverlay(media);
      this.toggleSmallMenu(true);
    },

    onMediaClosed : function() {
      this.closeOverlay();
      this.toggleSmallMenu(false);
    },

    toggleSmallMenu: function(small) {
      this.menu.$el.toggleClass('small', small);
    },

    closeOverlay :function() {
      this.overlay.close();
    }
  });

  return BookView;
});
