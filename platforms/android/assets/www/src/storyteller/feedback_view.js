define([
  'marionette',
  'underscore',
  'jquery'
], function (Marionette, _, $) {
  var FeedbackView = Marionette.ItemView.extend({
    template : '#feedback-template',
    className: "feedback",

    ui : {
      button : 'button',
      forms: 'form'
    },

    events : {
      'change input': 'answerClicked',
    },

    triggers : {
      'click button': 'sendClicked'
    },

    answerClicked: function (event) {
      var input = $(event.target);

      input.siblings('label').removeClass('selected');
      input.siblings('label[for='+input.attr('id')+']').addClass('selected');

      checkValid.call(this);
    },

    onSendClicked : function () {
      var feedbackData = formsData.call(this);

      feedbackData.push({
        name : 'title',
        value : this.options.book.get('title').text
      });

      feedbackData.push({
        name : 'id',
        value : this.options.book.get('id')
      });

      $.ajax({
        type: 'POST',
        data: feedbackData,
        datType: 'JSON',
        url: '/api/feedback'
      })
      .done(_.bind(feedbackSent, this))
      .fail(_.bind(feedbackFail, this))
    }
  });

  function checkValid () {
    var data = formsData.call(this);

    if(data.length >= this.ui.forms.length){
      this.ui.button.prop('disabled', false);
    }
  }

  function formsData () {
    var inputValue,
        data = [];

    _.each(this.ui.forms, function (form) {
      inputValue = $(form).serializeArray()[0];

      if(inputValue){
        data.push(inputValue);
      }
    });

    return data;
  }

  function feedbackSent () {
    this.$el.addClass('sent');
  }

  function feedbackFail () {
    console.log(arguments)
    this.$el.addClass('failed');
  }

  return FeedbackView;
});
