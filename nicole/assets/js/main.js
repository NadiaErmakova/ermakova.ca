/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Toggle.
						$sidebar.toggleClass('inactive');

				});

		// Events.

			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.
/*
			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});
*/				

	// Menu.
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

		// Openers.
			$menu_openers.each(function() {

				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});


// Gallery.
$('.gallery')
.wrapInner('<div class="inner"></div>')
.prepend(browser.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
.scrollex({
	top:		'30vh',
	bottom:		'30vh',
	delay:		50,
	initialize:	function() {
		$(this).addClass('is-inactive');
	},
	terminate:	function() {
		$(this).removeClass('is-inactive');
	},
	enter:		function() {
		$(this).removeClass('is-inactive');
	},
	leave:		function() {

		var $this = $(this);

		if ($this.hasClass('onscroll-bidirectional'))
			$this.addClass('is-inactive');

	}
})
.children('.inner')
	//.css('overflow', 'hidden')
	.css('overflow-y', browser.mobile ? 'visible' : 'hidden')
	.css('overflow-x', browser.mobile ? 'scroll' : 'hidden')
	.scrollLeft(0);

// Style #1.
// ...

// Style #2.
$('.gallery')
	.on('wheel', '.inner', function(event) {

		var	$this = $(this),
			delta = (event.originalEvent.deltaX * 10);

		// Cap delta.
			if (delta > 0)
				delta = Math.min(25, delta);
			else if (delta < 0)
				delta = Math.max(-25, delta);

		// Scroll.
			$this.scrollLeft( $this.scrollLeft() + delta );

	})
	.on('mouseenter', '.forward, .backward', function(event) {

		var $this = $(this),
			$inner = $this.siblings('.inner'),
			direction = ($this.hasClass('forward') ? 1 : -1);

		// Clear move interval.
			clearInterval(this._gallery_moveIntervalId);

		// Start interval.
			this._gallery_moveIntervalId = setInterval(function() {
				$inner.scrollLeft( $inner.scrollLeft() + (5 * direction) );
			}, 10);

	})
	.on('mouseleave', '.forward, .backward', function(event) {

		// Clear move interval.
			clearInterval(this._gallery_moveIntervalId);

	});

// Lightbox.
$('.gallery.lightbox')
	.on('click', 'a', function(event) {

		var $a = $(this),
			$gallery = $a.parents('.gallery'),
			$modal = $gallery.children('.modal'),
			$modalImg = $modal.find('img'),
			href = $a.attr('href');

		// Not an image? Bail.
			if (!href.match(/\.(jpg|gif|png|mp4)$/))
				return;

		// Prevent default.
			event.preventDefault();
			event.stopPropagation();

		// Locked? Bail.
			if ($modal[0]._locked)
				return;

		// Lock.
			$modal[0]._locked = true;

		// Set src.
			$modalImg.attr('src', href);

		// Set visible.
			$modal.addClass('visible');

		// Focus.
			$modal.focus();

		// Delay.
			setTimeout(function() {

				// Unlock.
					$modal[0]._locked = false;

			}, 600);

	})
	.on('click', '.modal', function(event) {

		var $modal = $(this),
			$modalImg = $modal.find('img');

		// Locked? Bail.
			if ($modal[0]._locked)
				return;

		// Already hidden? Bail.
			if (!$modal.hasClass('visible'))
				return;

		// Lock.
			$modal[0]._locked = true;

		// Clear visible, loaded.
			$modal
				.removeClass('loaded')

		// Delay.
			setTimeout(function() {

				$modal
					.removeClass('visible')

				setTimeout(function() {

					// Clear src.
						$modalImg.attr('src', '');

					// Unlock.
						$modal[0]._locked = false;

					// Focus.
						$body.focus();

				}, 475);

			}, 125);

	})
	.on('keypress', '.modal', function(event) {

		var $modal = $(this);

		// Escape? Hide modal.
			if (event.keyCode == 27)
				$modal.trigger('click');

	})
	.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
		.find('img')
			.on('load', function(event) {

				var $modalImg = $(this),
					$modal = $modalImg.parents('.modal');

				setTimeout(function() {

					// No longer visible? Bail.
						if (!$modal.hasClass('visible'))
							return;

					// Set loaded.
						$modal.addClass('loaded');

				}, 275);

			});


})(jQuery);