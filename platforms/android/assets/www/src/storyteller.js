define([
	'jquery',
	'utils'
], function ($, Utils) {
	var StoryTeller = {
		el : null,
		template : 'section',
		classes : 'storytelling',
		storyboard : null,
		overlay : null,
		contentHolder : null,
		sentenceContainer : null,
		terms : null,

		story : null,
		currentTermIndex : 0,
		sentenceIndex : 0,

		animationDuration : 100,

		init : function(parent, story, sentenceIndex, startingIndex){
			this.el = Utils.createElement(this.template, this.classes);
			parent.append(this.el);
			this.story = story;
			this.sentenceIndex = sentenceIndex;
			this.currentTermIndex = startingIndex;
			this.createOverlay();
			this.createPlayer(startingIndex);
		},

		createOverlay : function () {
			var book = this.el.parent();
			this.overlay = Utils.createElement('div');
			this.el.append(this.overlay);
		},

		createPlayer : function (startingIndex) {
			var player = Utils.createElement('nav');
			this.contentHolder = Utils.createElement('ol', 'content_holder');

			var storyContent = this.story.sentences[this.sentenceIndex].content;
			var termEl = null;

			for(var term in storyContent){
				termEl = this.newTermElement(storyContent[term]);
				this.contentHolder.append(termEl);
			}

			player.append(this.contentHolder);
			this.createNavigationControllers(player);
			this.createSentenceContainer(player);

			this.overlay.append(player);
			this.handleTermSelected();
		},

		createNavigationControllers : function(nav){
			var that = this;
			var createArrow = function(isLeft){
				var sideClass = isLeft ? 'left_arrow' : 'right_arrow';
				var text = isLeft ? '<' : '>';

				var clickHandler = function(evt){
					var changed = false;
					var that = evt.data.this;
					var isLeft = evt.data.isLeft;

					if(isLeft && (that.currentTermIndex >= 1)){
						that.currentTermIndex--;
						changed = true;
					}else if(!isLeft && (that.currentTermIndex < (that.terms.length - 1))){
						that.currentTermIndex++;
						changed = true;
					}

					if(changed){
						that.handleTermSelected();
					}
				};

				var arrow = Utils.createElement('div', ('naviation_button '+sideClass));
				arrow.append('<p>'+text+'</p>');
				arrow.click( {isLeft : isLeft, this : that}, clickHandler);

				return arrow;
			};


			nav.append(createArrow(true));
			nav.append(createArrow(false));
		},

		createSentenceContainer : function(player){
			var container = Utils.createElement('div', 'sentence_container');
			this.sentenceContainer = container;
			player.append(container);
		},

		newTermElement : function (term) {
			var termEl = Utils.createElement('li');
			var that = this;

			var signWrittingContainer = Utils.createElement('div', 'image_replacement');
			signWrittingContainer.css('background-image', 'url(library/'+term.sign+'.png)');

			var label = Utils.createElement('p', 'text');
			label.html(term.text);

			var closeBt = Utils.createElement('div').html('x');
			closeBt.addClass('storyteller_close_bt');
			closeBt.click(function (evt) {
				that.el.trigger('close_storytelling');
			});

			termEl.append([signWrittingContainer, label, closeBt]);
			termEl.click(function(event){
				that.onTermClick(event);
			});

			return termEl;
		},

		onTermClick : function(event){
			var clickedEl = $(event.currentTarget);

			if(clickedEl.hasClass('current_term')){
				return;
			}

			this.currentTermIndex = clickedEl.index();
			this.handleTermSelected();
		},

		handleTermSelected : function (){
			var curIndex = this.currentTermIndex;

			this.handleTermsClasses(curIndex);
			this.handleTermsHighlight(curIndex);
		},

		handleTermsClasses : function (curIndex) {
			if(this.terms === null){
				this.terms = this.overlay.find('li');
			}

			var that = this;

			this.terms.each(function(index, termEl){
				termEl = $(termEl);
				termEl.removeClass();
				termEl.toggleClass('faded', index != curIndex);
				termEl.addClass(that.termClassForIndex(index));
			});

			var currentTerm = $(that.overlay.find('.current_term')[0]);
			var nav = that.contentHolder.parent();
			var curMargin = parseInt(this.contentHolder.css('margin-left'), 10);
			var value = -(currentTerm.offset().left - curMargin) + nav.offset().left + (nav.width() - currentTerm.width())/2;

			this.contentHolder.animate({
				'margin-left' : value
			}, this.animationDuration);
		},

		handleTermsHighlight : function (curIndex) {
			var words = this.story.sentences[this.sentenceIndex].text.split(' ');
			var curTerm = this.story.sentences[this.sentenceIndex].content[curIndex];
			var highlightFirstIndex = 0;
			var highlightLastIndex = 0;

			if(curTerm.range){
				highlightFirstIndex = curTerm.range.start;
				highlightLastIndex = highlightFirstIndex + curTerm.range.count;
			}

			this.sentenceContainer.empty();
			var wordEl = null;

			for(var i in words){
				wordEl = Utils.createElement('span').html(words[i] + '&nbsp');

				if(i >= highlightFirstIndex && i < highlightLastIndex){
					wordEl.addClass('highlighted_term');
				}

				this.sentenceContainer.append(wordEl);
			}
		},

		cleanUp : function () {
			this.terms = null;
		},

		termClassForIndex : function (index){
			var termClass = null;

			if(index == this.currentTermIndex){
				termClass = 'current_term';
			}
			//terms before the last term
			if(index < this.currentTermIndex -1){
				termClass = 'outside_left_term';
			}
			//term just before the current term
			if(index == this.currentTermIndex -1){
				termClass = 'left_term';
			}
			//terms after the next term
			if(index > this.currentTermIndex +1){
				termClass = 'outside_right_term';
			}
			//term after the current term
			if(index == this.currentTermIndex +1){
				termClass = 'right_term';
			}

			return termClass;
		}
	};

	return StoryTeller;
});
