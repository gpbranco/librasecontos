define([
	'jquery',
	'backbone',
	'marionette',
	'application_controller'
], function ($, Backbone, Marionette, ApplicationController) {
	var Application = new Marionette.Application();

	Application.addRegions({
		mainRegion : {
			selector : '.application',
			regiontType : Marionette.Region
		},
		overlayRegion : {
			selector : '.overlay',
			regionType : Marionette.Region
		}
	});

	Application.addInitializer(function (options) {
		var applicationController = new ApplicationController({
			mainRegion : this.mainRegion,
			overlayRegion : this.overlayRegion
		});

		Backbone.history.start();
	});

	return Application;
});
