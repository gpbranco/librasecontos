define([
	'marionette'
	], function(Marionette) {
		var PageIndicator = Backbone.Model.extend({
			defaults : {
				current : 0,
				max : 1
			},

			nextPage : function() {
				var next = this.get('current') + 1;

				if(next <= this.get('max')){
					this.set('current', next);
				}
			},

			prevPage : function() {
				var prev = this.get('current') - 1;

				if(prev >= 1){
					this.set('current', prev);
				}
			}
		});

		var PageNavigator = Marionette.ItemView.extend({
			template : '#page_navigator_template',
			className : 'page_navigator',

			modelEvents : {
				'change:current' : 'onModelChangedPage'
			},

			triggers : {
				'click .left_arrow' : 'prevPageClicked',
				'click .right_arrow' : 'nextPageClicked'
			},

			initialize : function(args) {
				this.model = new PageIndicator({
					max : args.maxPages
				});
			},

			onShow : function() {
				this.model.nextPage();
			},

			onPrevPageClicked : function() {
				this.model.prevPage();
			},

			onNextPageClicked : function() {
				this.model.nextPage();
			},

			onModelChangedPage : function(model, newValue) {
				this.trigger('changedPage', this);
				this.render();
			}
		});

		return PageNavigator;
	});