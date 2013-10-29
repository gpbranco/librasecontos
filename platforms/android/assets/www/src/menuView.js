define([
	'backbone',
	'marionette',
	'underscore',
	'mediaButton'
], function (Backbone, Marionette, _, MediaButton) {
	var MediaBtModel = Backbone.Model.extend({
		defaults : {
			'type' : null,
			'active' : false,
			'icon' : null,
			'description' : null
		},

		mediaTypes : {
			'video' : {
				icon : 'ico-video.png',
				desc : 'VÍDEO'
			},
			'sign' : {
				icon : 'ico-sign.png',
				desc : 'ESCRITA DE SINAIS'
			}
		},

		initialize : function (type) {
			this.set('type', type);

			var typeArgs = this.mediaTypes[type];
			this.set('icon', typeArgs.icon);
			this.set('description', typeArgs.desc);
		}

	});

	var MenuView = Marionette.Layout.extend({
		template : '#menu_template',
		className : 'media_menu',

		regions : {
			firstMedia : 'li:nth-of-type(1)',
			secondMedia : 'li:nth-of-type(2)',
			thirdMedia : 'li:nth-of-type(3)'
		},

		mediaTypes : ['video', 'sign'],

		maxNumMedias : 3,

		onRender : function() {
			this.setupMedias();
		},

		onMediaButtonClicked :function(args) {
			if(args.model.get('active') === true){
				this.mediaClosed(args.model);
				return;
			}

			this.mediaOpened(args.model);
		},

		mediaOpened : function(openedModel) {
			var model;

			for(var region in this.regions){
				if(!this[region].currentView){
					continue;
				}

				model = this[region].currentView.model;
				model.set('active', model == openedModel);
			}

			this.trigger('mediaOpened', openedModel.get('type'));
		},

		mediaClosed : function(model) {
			model.set('active', false);
			this.trigger('mediaClosed');
		},

		overlayClosed : function() {
			this.deactivateAllButtons();
		},

		deactivateAllButtons : function() {
			for(var region in this.regions){
				if(this[region].currentView){
					this.mediaClosed(this[region].currentView.model);
				}
			}
		},

		setupMedias : function() {
			var btMediaModels = this.findBtMediaModels();
			var regions = [this.firstMedia, this.secondMedia, this.thirdMedia];

			var index = 0;
			var btView;
			for(var i in btMediaModels){
				btView = new MediaButton({model : btMediaModels[i]});
				this.listenTo(btView, 'clicked', this.onMediaButtonClicked);
				regions[index].show(btView);


				if(index++ >= this.maxNumMedias){
					break;
				}
			}
		},

		findBtMediaModels : function() {
			var sentence = this.model.getSentence();
			var models = [];

			for(var i in this.mediaTypes){
				if(sentence.hasOwnProperty(this.mediaTypes[i])){
					models.push(new MediaBtModel(this.mediaTypes[i]));
				}
			}

			return models;
		}
	});

	return MenuView;
});
