define([
		'marionette',
		'videoView',
		'signsView'
	], function (Marionette, VideoView, SignsView) {
		var Overlay = Marionette.Layout.extend({
			template : "#overlay_template",
			className : "overlay",

			triggers : {
				'click .close_overlay' : 'closeOverlayClicked'
			},

			regions : {
				mediaHolder : '.media_holder'
			},

			onRender : function() {
				this.setupMedia();
			},

			setupMedia : function() {
				switch(this.model.get('type')){
					case 'video':
						this.setupVideo();
						break;
					case 'sign':
						this.setupSign();
						break;
				}
			},

			setupVideo : function() {
				this.mediaHolder.show(new VideoView({model : this.model}));
			},

			setupSign : function() {
				this.mediaHolder.show(new SignsView({model : this.model}));
			}
		});

		return Overlay;
});