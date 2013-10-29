define([
	'jquery'
], function ($) {
	var Utils = {
		createElement : function (type, classes) {
			var el = $(document.createElement(type)).addClass(classes);
			return el;
		},

		isNullOrUndefined : function (variable) {
			var is = false;

			if(typeof variable == 'undefined'){
				is = true;
			}

			if(variable === null){
				is = true;
			}

			return is;
		}
	};

	return Utils;
});