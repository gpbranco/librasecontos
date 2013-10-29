define([
		'marionette'
	], function (Marionette) {
		var MediaButton = Marionette.Layout.extend({
			template : '#menu_button_template',
			tagName : 'button',

			triggers : {
				'click' : 'clicked'
			},

			modelEvents : {
				'change:active' : 'activeChanged'
			},

			activeChanged : function(model, newValue) {
				this.$el.toggleClass('active', newValue);
			}

		});

		return MediaButton;
	});