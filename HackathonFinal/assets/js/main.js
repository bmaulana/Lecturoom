/*
	Spectral by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

	});

})(jQuery);

function onSearch(){
	var search = document.getElementById('searchText').value;
	console.log(search);
	var wifiLevel = document.getElementById('wifi').checked;
	var hasPower = document.getElementById('powerSockets').checked;
	window.location.href = "file:///F:/html5up-spectral/room.html?buildingid=6&roomid=2";
}

function initialize() {
	// Initialize the first location (UCL) on the map
	var mapProp = {
		center: new google.maps.LatLng(51.524329, -0.134454),
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		streetViewControl: true
	};

	var locations = [
		["<a href=''>UCL</a>&thinsp;&thinsp;&thinsp;", 51.524329, -0.134454] // ########### ADD LOCATIONS HERE ###########
	];

	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
	var infowindow = new google.maps.InfoWindow();
	var marker, i;

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map,
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));

		google.maps.event.addListener(map, 'center_changed', function () {
			// Try loading an image from the internet to test connection
			var image = new Image();
			image.onload = function () { }; // Internet connected
			image.onerror = function () { // Internet disconnected
				map.setZoom(17);
				map.panTo(marker.getPosition());
			};
			image.src = 'http://gfx2.hotmail.com/mail/uxp/w4/m4/pr014/h/s7.png?d=' + escape(Date());
		});
	}
}
google.maps.event.addDomListener(window, 'load', initialize);
