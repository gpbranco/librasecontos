define([
  'marionette'
  ], function (Marionette) {
    var ShelfBookView = Marionette.ItemView.extend({
      template : '#shelf-book-template',
      tagName : 'li',
      className : 'shelf-book',

      ui : {
        videoButton : '.video-button'
      },

      triggers : {
        'click' : 'clicked', //bookSelected
        'click .video-button' : 'videoClicked'
      },

      onRender : function() {
        checkAvailability.call(this);
        setupCover.call(this);
        setupVideo.call(this);
      },

      onVideoClicked : function () {
        if(!this.ui.videoButton){
          return;
        }

        this.trigger('showVideo', this.ui.videoButton.data('video'));
      },

      onClicked : function () {
        if(!this.$el.hasClass('disabled')){
          this.trigger('bookSelected', this, arguments);
        }
      }
    });

    function checkAvailability  () {
      if(!this.model.get('available')){
        this.$el.addClass('disabled');
      }
    }

    function setupCover () {
      var pages = this.model.get('pages');

      if(!pages){
        return;
      }

      var cover = pages.at(0);

      if(cover.get('type') != 'cover'){
        return;
      }

      if(cover.get('illustration')){
        var path = '/histories/'+this.model.id+'/'+cover.get('illustration');
        this.$el.css('background-image', 'url('+path+')');
      }

      var coverColor = cover.get('color');
      if(coverColor){
        this.$el.css('background-color', coverColor);
      }
    }

    function setupVideo () {
      var videoData = this.model.get('title').video;

      if(videoData){
        this.ui.videoButton.data('video', videoData);
      }else{
        this.ui.videoButton.remove();
      }
    }

    return ShelfBookView;
  });
