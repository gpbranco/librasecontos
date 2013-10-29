define([
	'marionette',
  'youtube'
	], function (Marionette, YouTube) {
		var VideoView = Marionette.ItemView.extend({
			template : '#video_template',
			className : 'video_container',

      player : null,

      triggers : {
        'click .player_controllers .play_button' : 'playButtonTouched',
        'click .player_controllers .pause_button' : 'pauseButtonTouched'
      },
			
			onRender : function() {
        setTimeout(this.loadVideo.bind(this), 0);
			},

			loadVideo : function() {
        var videoData = this.model.getProperties();

        var that = this;
				var player = new YouTube.Player('video_player', {
					height: '200',
          width: '356',
          videoId : videoData.id,
          playerVars : {
            autoplay : 1,
            start : videoData.start,
            end : videoData.end,
            showinfo : 0,
            disablekb : 1,
            rel : 0,
            controls: 0
          },
          events : {
            'onStateChange' : this.onPlayerStateChanged.bind(this),
            'onReady' : function (event) {
              that.player = event.target;
              that.player.mute();
            }
          }
				});
			},

      onPlayerStateChanged : function(event) {
        var player = event.target;
        if(event.data == YouTube.PlayerState.PAUSED){
          var videoData = this.model.getProperties();

          if(player.getCurrentTime() == videoData.end){
            //player.pauseVideo();
            //player.seekTo(videoData.start);
          }
        }
      },

      onPlayButtonTouched : function() {
        this.player.playVideo();
      },

      onPauseButtonTouched : function() {
        this.player.pauseVideo();
      }
		});

		return VideoView;
});