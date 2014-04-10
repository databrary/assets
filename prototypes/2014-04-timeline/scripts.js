$(document).ready(function () {
	$.fn.qtip.defaults.position.target = 'mouse';
	$.fn.qtip.defaults.position.adjust.x = 10;
	$.fn.qtip.defaults.position.adjust.y = 10;
	$.fn.qtip.defaults.show.delay = 1;
	$.fn.qtip.defaults.style.classes = 'qtip-light qtip-shadow';

	var q = function (selector, content) {
		$(selector).qtip({
			content: content
		});
	};

	//

	var playCursor = 'The <b>play cursor</b> represents the current point in time.';

	q('.player-view-main .video', 'Click the <b>main video</b> to play/pause all files in the timeline.');
	q('.player-view-side .video', 'Click any <b>thumbnail video</b> to send it to the viewport.');

	q('.seekbar', 'Click the <b>seekbar</b> to jump to the point on the timeline. The seekbar represents the entirety of the session.');
	q('.seekbar-segment', 'The seekbar highlights the current <b>selection</b> on the timeline.');
	q('.seekbar-now', playCursor);

	q('.typcn-media-rewind', 'Click the <b>rewind button</b> to jump to the beginning of the selection, then the beginning of the session. Right-click to adjust reverse play-rate.');
	q('.typcn-media-play', 'Click the <b>play button</b> to play/pause all files in the timeline, reseting play-rate. Drag horizontally to scrub in either direction.');
	q('.typcn-media-fast-forward', 'Click the <b>fast-forward button</b> to jump to the end of the selection, then the end of the session. Right-click to adjust forward play-rate.');

	var timelineActions = 'Click to jump the play cursor, drag to create a new selection, or right-click for available actions.';

	q('.ruler', 'The <b>ruler</b> represents time at the current zoom level. ' + timelineActions);
	q('.tracks', 'The <b>timeline</b> shows all session files with temporal metadata. ' + timelineActions);

	var fileActions = 'Click to create selection from end-points or right-click for available actions.';

	q('.track-temporal .file', '<b>Video files</b> are (currently) the only files supported by the player. ' + fileActions);
	q('.track-audio .file', '<b>Audio files</b> will play with videos, but are not visible in the player. ' + fileActions);
	q('.track-instant .file', '<b>Documents</b> may be positioned in time, but are neither played, nor visible in the player. ' + fileActions);

	q('.locked', 'This file contains <b>identifying data</b>, and can only be played/downloaded with requisite permissions.');
	q('.unlocked', 'This file is <b>deidentified</b>, and can be played/downloaded by anyone who can see it.');

	q('.commbar', 'The <b>comment bar</b> shows all selections with comment threads. ' + timelineActions);
	q('.comment', 'Click a <b>comment thread</b> to switch to the comments pane and select that region on the timeline.');

	q('.cursor.play', playCursor);

	q('', '');
	q('', '');

	q('.grip.left', 'Drag <b>left grip</b> horizontally to zoom, adjusting view start.');
	q('.grip.right', 'Drag <b>right grip</b> horizontally to zoom, adjusting view end.');
	q('.stretch', 'Drag <b>middle grip</b> vertically to zoom, maintaing view center.');
	q('.scroller', 'Drag <b>scrollbar</b> to move view horizontally.');

	//

	$('.set-player').bind('click', function (e) {
		var $this = $($(this).attr('data-toggle'));

		$this.siblings().removeClass('active');
		$this.addClass('active');

		var i = $this.attr('id').match(/([0-9])/)[0];

		$('.track').each(function () {
			var $this = $(this);

			if (!$this.attr('id'))
				return;

			if ($this.attr('id').match(/([0-9])/)[0] <= i || i >= 3)
				$this.removeClass('hidden');
			else
				$this.addClass('hidden');
		});
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
		$seeknow = $seekbar.find('.seekbar-now'),
		$play = $('.cursor.play');

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
			$play.css({
				left: '1px'
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
			$play.css({
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
			$play.animate({
				left: '100%'
			}, 15000, 'linear');
		} else if (state.indexOf('segment') > -1) {
			$seeknow.animate({
				left: '70%'
			}, 2000, 'linear');
			$play.animate({
				left: '70%'
			}, 2000, 'linear');
		}
	});
});
