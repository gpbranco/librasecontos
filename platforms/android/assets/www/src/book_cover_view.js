define([
  'marionette'
  ], function (Marionette) {
    var CoverView = Marionette.ItemView.extend({
      template : '#book-cover-template',
      className : 'cover-content',

      ui : {
        background : '.cover-background'
      },

      onRender : function() {
        var illustration = this.model.get('illustration');
        var bg = this.ui.background;

        if(illustration){
          bg.css('background-image', 'url('+this.model.imagePath(illustration)+')');
        }

        var color = this.model.get('color');
        if(!color){ color = 'white'; }
        bg.css('background-color', color);
      }
    });

    return CoverView;
  });
