define([
    'marionette',
    'underscore',
    'jquery',
    'overlay/overlay_video_view',
    'overlay/overlay_identification_view'
  ], function (Marionette, _,  $, OverlayVideoView, OverlayIdentificationView) {
    var OverlayView = Marionette.Layout.extend({
      template: '#overlay-template',
      className: 'overlay-curtains',

      triggers : {
        'click .close-overlay-button' : 'closeOverlay'
      },

      regions : {
        contentRegion : '.content-container'
      },

      onRender : function() {
        this.rootElement = $(this.options.rootElement);
      },

      hideOverlay : function() {
        hide.call(this);
        this.contentRegion.close();
      },

      showVideo : function(videoData) {
        if(!videoData || !videoData.id){
          this.hideOverlay();
          return;
        }

        show.call(this);
        var videoView  = new OverlayVideoView({videoData: videoData});
        this.contentRegion.show(videoView);
      },

      identify : function () {
        show.call(this);
        var idView  = new OverlayIdentificationView();
        idView.on('identified', function () {
          this.trigger('identified');
          hide.call(this);
        }, this);
        this.contentRegion.show(idView);
      }
    });

    function show () {
      this.$el.addClass('revealed-overlay');
    }

    function hide () {
      this.$el.removeClass('revealed-overlay');
    }

    return OverlayView;
  });
