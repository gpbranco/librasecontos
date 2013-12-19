define([
  'backbone',
  'backbone-associations'
  ],function (Backbone) {

  /*== Fake Server ==*/
  function getLibrary () {
    return {books : [
    {
      id : 'kauana-on',
      title : {
        text : 'Uma menina chamada Kauana (Online)'
      },
      pages : [{
        type : 'cover',
        color : 'rgb(128,128,128)',
        illustration : "capa.png"
      },{
        text : "Oi! O meu nome é Kauana, o meu sinal é este.",
        illustration : "01.png",
        sw: "sw_01.png",
        video : {
          id : "1OXb6ktvT28"
        }
      },{
        text : "Aquela é a minha casa, ela é amarela.",
        illustration : "02.png",
        sw: "sw_02.png",
        video : {
          id : "z0-0TasW-qc"
        }
      },{
        text : "Olhem, lá está a minha família.",
        illustration : "03.png",
        sw: "sw_03.png",
        video : {
          id : "SyVm_SnZZao"
        }
      },{
        text : "Este é o meu pai e minha mãe.",
        illustration : "04.png",
        sw: "sw_04.png",
        video : {
          id : "2pjqM17iBjE"
        }
      },{
        text : "Esta é a minha cachorra, o nome dela é Catucha",
        illustration : "05.png",
        sw: "sw_05.png",
        video : {
          id : "cbyIXri_SKY"
        }
      },{
        text : "A Catucha é muito levada! Ela gosta de morder meu chinelo",
        illustration : "06.png",
        sw: "sw_06.png",
        video : {
          id : "i0YeOCMorMQ"
        }
      },{
        text : "Perto da minha casa tem um parquinho.",
        illustration : "07.png",
        sw: "sw_07.png",
        video : {
          id : "aVm5fa6RARU"
        }
      },{
        text : "Lá estão os meus amiguinhos. O menino é Júlio e a menina é Juju.",
        illustration : "08.png",
        sw: "sw_08.png",
        video : {
          id : "pCQzTsGZqa8"
        }
      },{
        text : "Tchau! Agora vou brincar no parquinho com meus amiguinhos.",
        illustration : "09.png",
        sw: "sw_09.png",
        video : {
          id : "KBEsn8O0SaU"
        }
      }]
    },{
      id : 'kauana-off',
      title : {
        text : 'Uma menina chamada Kauana'
      },
      pages : [{
        type : 'cover',
        color : 'rgb(128,128,128)',
        illustration : "capa.png"
      },{
        text : "Oi! O meu nome é Kauana, o meu sinal é este.",
        illustration : "01.png",
        sw: "sw_01.png",
        video : {
          type : 'local',
          id : "kauana_01_lowres.mp4"
        }
      },{
        text : "Aquela é a minha casa, ela é amarela.",
        illustration : "02.png",
        sw: "sw_02.png",
        video : {
          type : 'local',
          id : "02.mp4"
        }
      },{
        text : "Olhem, lá está a minha família.",
        illustration : "03.png",
        sw: "sw_03.png",
        video : {
          type : 'local',
          id : "kauana_01_lowres.mp4"
        }
      },{
        text : "Este é o meu pai e minha mãe.",
        illustration : "04.png",
        sw: "sw_04.png",
        video : {
          type : 'local',
          id : "04.mp4"
        }
      },{
        text : "Esta é a minha cachorra, o nome dela é Catucha",
        illustration : "05.png",
        sw: "sw_05.png",
        video : {
          type : 'local',
          id : "05.mp4"
        }
      },{
        text : "A Catucha é muito levada! Ela gosta de morder meu chinelo",
        illustration : "06.png",
        sw: "sw_06.png",
        video : {
          type : 'local',
          id : "06.mp4"
        }
      },{
        text : "Perto da minha casa tem um parquinho.",
        illustration : "07.png",
        sw: "sw_07.png",
        video : {
          type : 'local',
          id : "07.mp4"
        }
      },{
        text : "Lá estão os meus amiguinhos. O menino é Júlio e a menina é Juju.",
        illustration : "08.png",
        sw: "sw_08.png",
        video : {
          type : 'local',
          id : "08.mp4"
        }
      },{
        text : "Tchau! Agora vou brincar no parquinho com meus amiguinhos.",
        illustration : "09.png",
        sw: "sw_09.png",
        video : {
          type : 'local',
          id : "09.mp4"
        }
      }]
    },{
      id : 'castle',
      available : false,
      title : {
        text : 'A tempestade no castelo',
        video : {
          id : "uQVJ5UarJFE",
          start : 27,
          end : 34
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
      available : false,
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
        illustration : '06.jpg'
      }]
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
      available : true,
      title : {
        text : ''
      }
    },

    initialize : function () {
      var pages = this.get('pages');
      pages.add(new Page({
        type : 'feedback'
      }));
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
