define([
  'marionette',
  'underscore',
  'youtube'
  ], function (Marionette, _, YouTube) {
    var BookLeftPage = Marionette.ItemView.extend({
      template: '#book-left-page-template',
      className: 'page-content',

      ui: {
        videoContainer: '.video-container',
        mediaFrame: '.media-frame',
        videoFrame: '.video-frame',
        videoPlayer: '#video-player',
        swFrame: '.sw-frame',
        mediaToggler: '.media-toggler',
        videoToggle: '.video-toggle',
        swToggle: '.sw-toggle'
      },

      triggers: {
        'click .play-button': 'playButtonClicked',
        'click .pause-button': 'pauseButtonClicked',
        'click .media-toggler.reveal .video-toggle': 'toggleVideo',
        'click .media-toggler.reveal .sw-toggle': 'toggleSW',
      },

      initialize: function (options) {
        this.mediaType = options.mediaType;
      },

      onRender : function () {
        handleMedia.call(this);
      },

      onPlayButtonClicked : function() {
        if(this.player){
          this.player.playVideo();
        }else if(this.localPlayer){
          this.localPlayer.play();
        }
      },

      onPauseButtonClicked : function () {
        if(this.player){
          this.player.pauseVideo();
        }else if(this.localPlayer){
          this.localPlayer.pause();
        }
      },

      onToggleVideo : function () {
        if(this.mediaType == 'video'){
          return;
        }

        setMediaTime.call(this, 'video');
        handleMediaTogglers.call(this, true);
        handleMedia.call(this);
      },

      onToggleSW : function () {
        if(this.mediaType == 'sw'){
          return;
        }

        setMediaTime.call(this, 'sw');
        handleMediaTogglers.call(this, false);
        handleMedia.call(this);
      }
    });

    function handleMedia () {
      var videoData = this.model.get('video');
      var swData = this.model.get('sw');

      if(_.isUndefined(videoData) && _.isUndefined(swData)){
        return;
      }

      var isVideo = mustShowVideo.call(this, videoData);

      this.ui.videoFrame.toggleClass('reveal', isVideo);
      this.ui.swFrame.toggleClass('reveal', !isVideo);

      this.ui.mediaFrame.addClass('reveal');

      if(isVideo){
        loadVideo.call(this, videoData);
      }else{
        showSW.call(this, swData);
      }

      if(videoData && swData){
        this.ui.mediaToggler.addClass('reveal');
      }

      handleMediaTogglers.call(this, isVideo);
    }

    function mustShowVideo (videoData) {
      var must = (!_.isUndefined(videoData) && this.mediaType == "video");
      return must;
    }

    function showSW (swData) {
      var swPath = this.model.imagePath(swData);

      this.ui.swFrame.css('background-image', 'url('+swPath+')');
    }

    function loadVideo (videoData) {
      var videohandler = videoData.type == 'local' ? loadLocalVideo : loadYoutubeVideo;
      setTimeout(videohandler.bind(this, videoData), 0);
    }

    function loadLocalVideo (videoData) {
      var size = videoSize.call(this);

      var data = _.extend({
        videoPath: this.model.imagePath(videoData.id)
      }, size);

      var playerTemplate = '<video width=<%=width%> height=<%=height%>><source src="<%=videoPath%>" type="video/mp4"></video>';
      this.ui.videoPlayer.html(_.template(playerTemplate, data));

      var player = this.localPlayer = this.ui.videoPlayer.find('video')[0];

      player.volume = 0;
      player.addEventListener('ended', function () {
        this.load();
      });
    }

    function loadYoutubeVideo (videoData) {
      var size = videoSize.call(this);

      var that = this;
      var player = new YouTube.Player(this.ui.videoPlayer.attr('id'), {
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
          wmode : 'transparent',
          controls: 0
        },
        events : {
          'onReady' : function (event) {
           that.player = event.target;
           that.player.mute();
          }
        }
      });
    }

    function videoSize () {
      return {
        height : this.ui.videoContainer.css('height'),
        width : this.ui.videoContainer.css('width')
      };
    }

    function handleMediaTogglers (isVideo) {
      this.ui.videoToggle.toggleClass('selected', isVideo);
      this.ui.swToggle.toggleClass('selected', !isVideo);
    }

    function setMediaTime (type) {
      this.mediaType = type;

      this.trigger('mediaTypeChanged', type)
    }

    return BookLeftPage;
  });
