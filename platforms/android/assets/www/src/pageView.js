define([
	'jquery',
	'marionette',
	'utils'
], function ($, Marionette, Utils) {
	var Storyboard = Marionette.Layout.extend({
		template : '#book_page_template',
		className : 'book_page',
		
		ui : {
			sentence : '.sentence_container p'
		},

		pageNumber : 0,
		story : null,

		onRender : function() {
			this.setupIllustration();
		},

		setupIllustration : function() {
			var illustration = this.model.getSentence().illustration;

			if(Utils.isNullOrUndefined(illustration)){
				return;
			}

			var illustrationPath = '.'+this.model.getPath()+illustration;

			this.$el.css('background-image', 'url("'+illustrationPath+'")');
			this.$el.addClass('custom_bg');
		}
	});

	return Storyboard;
});
	/*
	var a = {
		storySetup : function(){
			this.el.empty();

			//this.createTermsList();
			this.setupBookPage();
			this.createSentenceContainer();
			this.createTranslationControllers();
		},

		createSentenceContainer : function () {
			var text = this.sentence().text;
			var container = Utils.createElement('p', 'full_sentence');
			container.html(text);

			this.page.append(container);
		},

		createTranslationControllers : function() {
			if(!Utils.isNullOrUndefined(this.sentence().video)){
				this.createVideoController();
			}

			if(!Utils.isNullOrUndefined(this.sentence().sign)){
				this.createSignController();
			}
		},

		createVideoController : function () {
			this.createMediaButton('Vídeo', 'video-button', this.onVideoButtonTouched.bind(this));

			VideoController.init(this.page, this.sentence().video);
		},

		onVideoButtonTouched : function(event) {
			if(VideoController.isShowing){
				VideoController.hide();
			}else{
				SignController.hide();
				VideoController.show();
			}
		},

		createSignController : function() {
			this.createMediaButton('Escrita de Sinais', 'sign-button', this.onSWButtonTouched.bind(this));
			SignController.init(this.page, this.sentence().sign);
		},

		onSWButtonTouched : function(event) {
			if(SignController.isShowing){
				SignController.hide();
			}else{
				VideoController.hide();
				SignController.show();
			}
		},

		createMediaButton : function(text, classes, callback) {
			var button = Utils.createElement('button', classes);
			button.html(text);
			button.click(callback);

			this.page.append(button);
		},

		createTermsList : function (){
			var story = this.story.sentences[this.sentenceIndex].content;
			var termList = Utils.createElement('ol');

			for(var term in story){
				termList.append(this.createTermElement(story[term]));
			}

			this.el.append(termList);
		},

		createTermElement : function(termData){
			var li = Utils.createElement('li');

			var signWrittingContainer = Utils.createElement('div', 'image_replacement');
			signWrittingContainer.css('background-image', 'url(library/'+termData.sign+'.png)');

			var label = Utils.createElement('p', 'text');
			label.html(termData.text);

			li.append([signWrittingContainer, label]);

			return li;
		},
	};
*/
