define([], function(){
	var Story = {
	title : "A tempestade no castelo",
	sentences : [{
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
	};

	return Story;
});

