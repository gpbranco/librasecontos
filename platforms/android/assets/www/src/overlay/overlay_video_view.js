define([
  'marionette',
  'underscore',
  'jquery',
  'youtube'
], function (Marionette, _, $, YouTube) {
  var OverlayVideoView = Marionette.ItemView.extend({
    template: function () {
      return '<div id="video-player"></div>';
    },
    className: 'overlay-video',

    onRender: function () {
      setTimeout(_.bind(playVideo, this, this.options.videoData), 0);
    },

    onClose: function () {
      stopVideo.call(this);
    }
  });

  /*== Video Player ==*/

  function playVideo (videoData) {
    if(this.player){
      this.player.loadVideoById({
        videoId:videoData.id,
        startSeconds:videoData.start,
        endSeconds:videoData.end
      });
    }else{
      createPlayer.call(this, videoData);
    }
  }

  function stopVideo () {
    if(this.player){
      this.player.stopVideo();
      this.player.clearVideo();
    }
  }

  function createPlayer (videoData) {
    var that = this;

    var player = new YouTube.Player('video-player', {
      height: 320,
      width: 560,
      videoId : videoData.id,
      playerVars : {
        autoplay : 0,
        start : videoData.start,
        end : videoData.end,
        wmode : 'transparent',
        rel : 0
      },
      events : {
       'onReady' : _.bind(onPlayerReady, that)
      }
    });
  }

  function onPlayerReady (event) {
    this.player = event.target;

    if(this.$el.is(':visible')){
      this.player.playVideo();
    }else{
      stopVideo.call(this);
    }
  }

  return OverlayVideoView;
})