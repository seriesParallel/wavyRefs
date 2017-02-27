$(document).ready(function() {
	try {
		$('body').ripples({
			resolution: 128,
			dropRadius: 200, //px
			perturbance: 0.07,
            interactive: true
		});
	}
	catch (e) {
		$('.error').show().text(e);
	}

	// Automatic drops
	setInterval(function() {
		var $el = $('main');
		var x = Math.random() * $el.outerWidth();
		var y = Math.random() * $el.outerHeight();
		var dropRadius = 20;
		var strength = 0.04 + Math.random() * 0.04;

		$el.ripples('drop', x, y, dropRadius, strength);
	}, 400);
});
