define([
  'marionette'
  ], function (Marionette) {
    var ShelfBookView = Marionette.ItemView.extend({
      template : '#shelf-book-template',
      tagName : 'li',
      className : 'shelf-book',

      ui : {
        illustration : '.cover-illustration',
        videoButton : '.video-button'
      },

      triggers : {
        'click' : 'bookSelected',
        'click .video-button' : 'videoClicked'
      },

      onRender : function() {
        setupCover.call(this);
        setupVideo.call(this);
      },

      onVideoClicked : function () {
        if(!this.ui.videoButton){
          return;
        }

        this.trigger('showVideo', this.ui.videoButton.data('video'));
      }
    });

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
        this.ui.illustration.css('background-image', 'url('+path+')');
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
