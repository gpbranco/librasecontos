define([
    'marionette',
    'underscore',
    'youtube',
    'video_player'
  ], function (Marionette, _, YouTube) {
    var OverlayView = Marionette.ItemView.extend({
      template: '#overlay-template',
      className: 'overlay-curtains',

      triggers : {
        'click .close-overlay-button' : 'closeOverlay'
      },

      onRender : function() {
        this.rootElement = $(this.options.rootElement);
      },

      hideOverlay : function() {
        hide.call(this);
        stopVideo.call(this);
      },

      showVideo : function(videoData) {
        if(!videoData || !videoData.id){
          return;
        }

        playVideo.call(this, videoData);
        show.call(this);
      }
    });

    function show () {
      this.$el.addClass('revealed-overlay');
    }

    function hide () {
      this.$el.removeClass('revealed-overlay');
    }

    function playVideo (videoData) {
      if(this.player){
        this.player.loadVideoById(videoData.id, videoData.start, videoData.end)
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
          wmode : 'transparent',
          rel : 0
        },
        events : {
         'onReady' : _.bind(onPlayerReady, this),
          'onStateChange' : function(state, player) {
            console.log(state);
          }
        }
      });
    }

    function onPlayerReady (event) {
      this.player = event.target;

      if(this.$el.hasClass('revealed-overlay')){
        this.player.playVideo();
      }else{
        stopVideo.call(this);
      }
    }



    return OverlayView;
  });
