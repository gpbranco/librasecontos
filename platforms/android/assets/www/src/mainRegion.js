define([
  'marionette'
],
function (Marionette) {
  var TransitionableRegion = Marionette.Region.extend({
    open: function (view) {
      view.$el.addClass('transitionable');
      view.$el.addClass('hidden');

      this.$el.html(view.el);
      setTimeout(function () {
        view.$el.removeClass('hidden');
      }, 100);
    }
  });

  return TransitionableRegion;
});
