define([
	'jquery',
	'backbone',
	'marionette',
	'bookView'
], function ($, Backbone, Marionette, BookView) {
	var AppRouter = Backbone.Router.extend({
		routes : {
			'*path' : 'defaultRoute'
		}
	});

	var Book = Backbone.Model.extend({
		initialize: function (args) {
			this.set({
				story: args.story.sentences,
				title: args.story.title
			});
		},

		getPath : function() {
			return this.get('path');
		},

		getStory : function() {
			return this.get('story');
		},

		getTitle : function() {
			return this.get('title');
		}
	});

	var Application = Marionette.Application.extend({
		start : function() {
			var app_router = new AppRouter();

			var that = this;

			app_router.on('route:defaultRoute', function(path) {
				path = '/histories/castelo/';

				var story = require(['..'+path+'index'], function(data){
					that.setupBook(new Book({
						path: path,
						story : data
					}));
				});
			});

			Backbone.history.start();
		},

		setupBook : function(book) {
			this.addRegions({
				bookRegion : '.app',
			});

			this.bookRegion.show(new BookView({model : book}));
		}

	});

	return Application;

	/*
	var Application = {
		bookEl : null,
		currentStory : null,
		currentSentenceIndex : 0,
		currentPageEl: null,
		totalPagesEl: null,
		demo : true,

		start : function () {



			var that = this;
			var path = "histories/castelo/";

			if(this.demo){
				var story = require(['../'+path+'index'], function(data){
					that.currentStory = data;
					that.onStoryLoaded(data, path);
				});
			}else{
				StoryLoader.load('direito.json', function(data){
					that.currentStory = data;
					that.onStoryLoaded(data);
				});
			}
		},

		onStoryLoaded : function(story, path){
			this.bookEl = $('.book');
			this.createBookTitle();
			Storyboard.init(this.bookEl, story, path);
			this.createPageController();
		},

		createBookTitle : function(){
			var title = this.currentStory.title;

			this.bookEl.append('<header><h1></h1></header>');
			this.bookEl.find('h1').html(title);
		},

		createPageController : function () {
			var that = this;
			var createArrow = function(isLeft){
				var sideClass = isLeft ? 'left_arrow' : 'right_arrow';
				var text = isLeft ? '<' : '>';

				var clickHandler = function(evt){
					var changed = false;
					var isLeft = evt.data.isLeft;

					that.changePage(!isLeft);
				};

				var arrow = Utils.createElement('div', ('naviation_button '+sideClass));
				arrow.append('<p>'+text+'</p>');
				arrow.click( {isLeft : isLeft, this : that}, clickHandler);

				return arrow;
			};

			var pageController = Utils.createElement('nav', 'page_controller');

			var pageIndicator = Utils.createElement('div', 'page_indicator');

			this.currentPageEl = Utils.createElement('span').html(this.currentSentenceIndex + 1);
			var pageSeparator = Utils.createElement('span').html("/");
			this.totalPagesEl = Utils.createElement('span').html(this.currentStory.sentences.length);

			pageIndicator.append([this.currentPageEl, pageSeparator, this.totalPagesEl]);

			pageController.append([createArrow(true), pageIndicator, createArrow(false)]);

			this.bookEl.append(pageController);
		},

		changePage : function(forward){
			var nextIndex = 0;
			var changed = false;

			if(forward && this.currentSentenceIndex < this.currentStory.sentences.length - 1){
				nextIndex = this.currentSentenceIndex + 1;
				changed = true;
			}else if(!forward && this.currentSentenceIndex > 0){
				nextIndex = this.currentSentenceIndex - 1;
				changed = true;
			}

			if(changed){
				this.currentSentenceIndex = nextIndex;
				Storyboard.sentenceIndex = this.currentSentenceIndex;
				Storyboard.storySetup();

				this.currentPageEl.html(this.currentSentenceIndex + 1);
				this.totalPagesEl.html(this.currentStory.sentences.length);
			}
		}
	};

	return Application;
*/
});
