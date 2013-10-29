define([
	'jquery',
	'underscore',
	'marionette'
	], function ($, _, Marionette) {
		var signTemplate = _.template($("#sign_list_item_template").first().html());

		var SignsView = Marionette.ItemView.extend({
			template : "#signs_template",
			className : "signs_container",

			onRender : function() {
				this.setupSigns();
			},

			ui : {
				list : 'ol'
			},

			setupSigns : function() {
				var signs = this.model.getProperties();

				var signIcon;
				for(var i in signs){
					signIcon = signs[i];
					this.ui.list.append(signTemplate({sign : signIcon}));
				}
			}
		});

		return SignsView;
});

