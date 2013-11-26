require.config({
	paths : {
		'jquery'	: '../js/vendor/jquery',
    'underscore' : '../js/vendor/underscore',
    'backbone' : '../js/vendor/backbone',
    'backbone-associations' : '../js/vendor/backbone-associations',
    'marionette' : '../js/vendor/backbone.marionette',
		'youtube' : '../js/vendor/youtube-api'
	},

	shim : {
		'youtube' : {
			exports : 'YT'
		},
		'underscore' : {
      exports : '_'
    },
    'backbone' : {
      deps : ['underscore', 'jquery'],
      exports : 'Backbone'
    },
    'backbone-associations' : ['backbone'],
    'marionette' : {
			deps : ['jquery','underscore', 'backbone'],
			exports : 'Marionette'
    }
	}
});
