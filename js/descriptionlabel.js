$('#blueimp-gallery').on('slide', function (event, index, slide) {
	$(this).children('.description')
		.text($('#links a').eq(index).data('description'));
});