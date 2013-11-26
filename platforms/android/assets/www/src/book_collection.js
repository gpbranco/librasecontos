define([
  'backbone',
  'backbone-associations'
  ],function (Backbone) {

  /*== Fake Server ==*/
  function getLibrary () {
    return {books : [
    {
      id : 'castle',
      title : {
        text : 'A tempestade no castelo',
        video : {
          id : "uQVJ5UarJFE"
        }
      },
      pages : [{
        type : 'cover',
        color : 'rgb(128,128,128)',
        illustration : "01.png"
      },{
        text : "Numa noite escura, uma tempestade do lado de fora do castelo. A chuva batia contra as janelas.",
        illustration : "01.png",
        video : {
          id : "uQVJ5UarJFE",
          start : 27,
          end : 34
        }
      },{
        text : "Relâmpagos brilhavam e trovões rugiam",
        illustration : "02.jpg",
        sign : [
        'lightning', 'shine', 'thunder'
        ],
        video : {
          id : "uQVJ5UarJFE",
          start : 34,
          end : 37
        }
      },{
        text : "Até mesmo o vento uivava.",
        illustration : "03.jpg",
        video : {
          id : "uQVJ5UarJFE",
          start : 38,
          end : 41
        }
      },{
        text : "O castelo tremia, e suas paredes rangiam.",
        sign : [
        'castle', 'earthquake', 'wall', 'complain'
        ]
      }]
    },{
      id : 'chapeuzinho',
      title : {
        text : 'Chapeuzinho Vermelho'
      },
      pages : [{
        type : 'cover',
        color : 'rgb(128,0,0)',
        illustration : '01.jpg'
      },{
        text : 'Vocês sabem quem sou eu? Chapeuzinho Vermelho, claro!',
        illustration : '01.jpg',
        video : {
          id : "JuCVU9rGUa8",
          start : 146,
          end : 150
        }
      },{
        text : 'Era uma vez uma linda gartoinha de cabelos cacheados',
        illustration : '02.jpg',
        video : {
          id : "JuCVU9rGUa8",
          start : 150,
          end : 153
        }
      },{
        text : 'que tinha uma vovozinha que gostava muito dela e fazia de tudo para agradá-la.',
        illustration : '03.jpg',
        video : {
          id : "JuCVU9rGUa8",
          start : 153,
          end : 156
        }
      },{
        text : 'A vovó de Chapeuzinho fez para ela uma linda capa vermelha, que a menina usava todos os dias.',
        illustration : '04.jpg',
        video : {
          id : "JuCVU9rGUa8",
          start : 157,
          end : 162
        }
      },{
        text : 'Um dia, de repente, a vovó ficou doente.',
        video : {
          id : "JuCVU9rGUa8",
          start : 165,
          end : 170
        }
      },{
        text : 'Só que a casa dela ficava muito longe, lá no bosque.',
        illustration : '06.jpg',
        video : {
          id : "JuCVU9rGUa8",
          start : 170,
          end : 175
        }
      }]
    },{
      id : 'book3',
      title : {
        text : 'Livro 3'
      },
    },{
      id : 'book4',
      title : {
        text : 'Livro 4'
      },
    }]};
  }

  /*== Model ==*/

  var Page = Backbone.AssociatedModel.extend({
    defaults : {
      type : 'content'
    }
  });

  var Book = Backbone.AssociatedModel.extend({
    relations : [
      {
        type : Backbone.Many,
        key : 'pages',
        relatedModel : Page
      }
    ],
    defaults:{
      id : '',
      title : {
        text : ''
      }
    }
  });

  var Library = Backbone.AssociatedModel.extend({
    relations : [
      {
        type : Backbone.Many,
        key : 'books',
        relatedModel: Book
      }
    ]
  });


  return new Library(getLibrary());
});
