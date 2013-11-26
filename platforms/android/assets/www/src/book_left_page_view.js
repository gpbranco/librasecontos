define([
  'marionette',
  'youtube'
  ], function (Marionette, YouTube) {
    var BookLeftPage = Marionette.ItemView.extend({
      template : '#book-left-page-template',
      className : 'page-content',

      ui : {
        videoContainer : '.video-container'
      },

      triggers : {
        'click .play-button' : 'playButtonClicked',
        'click .pause-button' : 'pauseButtonClicked',
      },

      onRender : function () {
        setTimeout(loadVideo.bind(this), 0);
      },

      onPlayButtonClicked : function() {
        if(this.player){
          this.player.playVideo();
        }
      },

      onPauseButtonClicked : function () {
        if(this.player){
          this.player.pauseVideo();
        }
      }
    });

    function loadVideo () {
      var videoData = this.model.get('video');

      if(!videoData){
        return;
      }

      var size = {
        height : this.ui.videoContainer.css('height'),
        width : this.ui.videoContainer.css('width')
      };

      var that = this;
      var player = new YouTube.Player('video-player', {
        height: size.height,
        width: size.width,
        videoId : videoData.id,
        playerVars : {
          autoplay : 0,
          start : videoData.start,
          end : videoData.end,
          showinfo : 0,
          disablekb : 1,
          rel : 0,
          controls: 0
        },
        events : {
          'onStateChange' : function () {
            console.log(arguments);
          },
          'onReady' : function (event) {
           that.player = event.target;
           that.player.mute();
          }
        }
      });
    }

    return BookLeftPage;
  });
