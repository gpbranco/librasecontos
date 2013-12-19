define([
  'marionette'
  ], function (Marionette) {
    var BookRightPage = Marionette.ItemView.extend({
      template : '#book-right-page-template',
      className : 'page-content',

      serializeData : function () {
        var illustration = this.model.get('illustration');

        var data = {
          text : this.model.get('text')
        };

        if(illustration){
          data['illustrationPath'] = this.model.imagePath(illustration);
        }

        return data;
      }

    });

    return BookRightPage;
  });
