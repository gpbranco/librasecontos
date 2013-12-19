require.config({
	paths : {
		'jquery'	: '../vendor/js/jquery',
    'underscore' : '../vendor/js/underscore',
    'backbone' : '../vendor/js/backbone',
    'backbone-associations' : '../vendor/js/backbone-associations',
    'marionette' : '../vendor/js/backbone.marionette',
		'youtube' : '../vendor/js/youtube-api'
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
