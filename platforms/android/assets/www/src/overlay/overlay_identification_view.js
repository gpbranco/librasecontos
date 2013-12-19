define([
  'marionette',
], function (Marionette) {
  var OverlayIdentificationView = Marionette.ItemView.extend({
    template: '#overlay-identification-template',
    className: 'identification-container',

    ui : {
      emailInput : '.email-insertion input'
    },

    triggers : {
      'click .email-insertion button' : 'sendClicked'
    },

    onRender: function  () {
      checkIdentification.call(this);
    },

    onSendClicked : function () {
      var email = this.ui.emailInput.val();

      sendIdentification.call(this, email);
    }
  });

  function checkIdentification () {
    $.ajax({
      type: 'GET',
      url: '/api/auth'
    })
    .done(_.bind(isIdentified, this))
    .fail(_.bind(function (err) {
      if(err.status == 401){
        showEmailForm.call(this);
      }else{
        serverUnreachable.call(this);
      }
    }, this))
  }

  function sendIdentification (email) {
    this.$el.removeClass('waiting-email');

    $.ajax({
      type: 'POST',
      url: '/api/auth',
      data: {
        email : email
      }
    })
    .done(_.bind(isIdentified, this))
    .fail(_.bind(function (err) {
      if(err.status == 400){
        showEmailForm.call(this);
      }else{
        serverUnreachable.call(this);
      }
    }, this))
  }

  function isIdentified () {
    this.trigger('identified');
  }

  function showEmailForm () {
    this.$el.addClass('waiting-email');
  }

  function serverUnreachable () {
    this.$el.addClass('server-unreachable');
  }

  return OverlayIdentificationView;
})