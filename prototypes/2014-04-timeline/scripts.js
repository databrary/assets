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
				$source = $this.find('.video-'+i);

			if($source.length == 0)
				return;

			var $main = $this.find('.player-view-main'),
				$side = $this.find('.player-view-side'),
				$target = $main.find('.video');

			$source.after($target.detach());
			$main.append($source.detach());
		});
	});
});
