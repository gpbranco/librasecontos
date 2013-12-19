define([
  'marionette',
  'underscore'
], function (Marionette, _) {
  var ContactView = Marionette.ItemView.extend({
    template: "#contact-template",
    className: "contact",

    triggers: {
      'click input[name=send]': 'sendClicked',
      'click .close-message': 'closeMessageClicked'
    },

    ui: {
      form : 'form'
    },

    onSendClicked: function () {
      this.$el.addClass('sending');
      var formData = this.ui.form.serializeArray();

      setTimeout(_.bind(formSent, this), 1000);
    },

    onCloseMessageClicked: function () {
      this.$el.removeClass('sent');
    }

  });

  function formSent () {
    this.$el.removeClass('sending');
    this.$el.addClass('sent');

    success.call(this);
    //fail.call(this);
  }

  function success () {
    this.$el.addClass('success');
  }

  function fail (argument) {
    this.$el.addClass('fail');
  }

  return ContactView;
})