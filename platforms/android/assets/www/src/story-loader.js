define([
	'jquery'
], function ($) {
	const HistoryPath = 'histories/';

	var Loader = {
		load : function(filename, callback){
			var url = HistoryPath + filename;

			$.ajax({
				url : url,
				dataType : 'json',
				success : function(data){
					callback(data);
				},
				error : function(){
					console.log(arguments);
				}
			});
		}
	};

	return Loader;
})