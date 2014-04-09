$(document).ready(function () {
	$('.set-player').bind('click', function (e) {
		var $this = $($(this).attr('data-toggle'));

		$this.siblings().removeClass('active');
		$this.addClass('active');
	});

	$('#player-view-1').addClass('active');

	//

	$('.video').bind('click', function (e) {
		var $this = $(this);

		if ($this.parent('.player-view-main').length > 0)
			return;

		var i = $this.attr('class').match(/([0-9])/)[0];

		$('.player-view').each(function () {
			var $this = $(this),
				$source = $this.find('.video-' + i);

			if ($source.length == 0)
				return;

			var $main = $this.find('.player-view-main'),
				$side = $this.find('.player-view-side'),
				$target = $main.find('.video');

			$source.after($target.detach());
			$main.append($source.detach());
		});
	});

	//

	var $seekbar = $('.seekbar'),
		$seekloaded = $seekbar.find('.seekbar-loaded'),
		$seeksegment = $seekbar.find('.seekbar-segment'),
		$seeknow = $seekbar.find('.seekbar-now');

	$('.set-load').bind('click', function (e) {
		var state = $(this).attr('data-toggle');

		if (state.indexOf('all') > -1) {
			$seekloaded.css({
				left: 0,
				right: '100%'
			});
			$seeksegment.css({
				left: 0,
				right: '100%'
			});
			$seeknow.css({
				left: 0
			});

			$seekloaded.animate({
				right: '0%'
			}, 1000);
		} else if (state.indexOf('segment') > -1) {
			$seekloaded.css({
				left: '50%',
				right: '50%'
			});
			$seeksegment.css({
				left: '50%',
				right: '30%'
			});
			$seeknow.css({
				left: '50%'
			});

			$seekloaded.animate({
				right: '0%'
			}, 1000);
		}
	});

	$('.set-play').bind('click', function (e) {
		var state = $(this).attr('data-toggle');

		if (state.indexOf('all') > -1) {
			$seeknow.animate({
				left: '100%'
			}, 15000, 'linear');
		} else if (state.indexOf('segment') > -1) {
			$seeknow.animate({
				left: '70%'
			}, 2000, 'linear');
		}
	});
});
