(function(ga) {
	"use strict"
	
	//loop through all necessary mappers, produce spawns.
	var gaFathers = $('div[data-ga-map]');
	gaFathers.each(function(_, el) {
		var $el = $(el);
		(function(f) {
			var gaAttribute = f.attr('data-ga-map'); 
			f.children('a').each(function(_, v) {
				$(v).attr('data-ga', gaAttribute);
			});
		})($el);
	});
	
	//implement google analysis logic
	var gaElements = $('a[data-ga]');
	gaElements.each(function(_, el) {
		var $el = $(el);
		(function(f) {
			
			var trigger = $el.data('ga-trigger') || 'click';
			var events = $el.data('ga').split('|');
			if (trigger === 'hover') {
				f.mouseover(function() {
					try {
						ga('send', 'event', events[0], events[1], events[2]);
					} catch (e) {}
				});
				return;
			}
			
			if (trigger === 'click') {
				f.click(function() {
					var $this = $(this);
					var redirect = false;
					
					var linkable = true;
					
					if ($this.data('ga-no-link')) {
						linkable = false;
					}
					
					if (! linkable || $this.attr('target') === '_blank') {
						try {
							ga('send', 'event', events[0], events[1], events[2]);
						} catch (e) {}
						return;
					}
					
					try {
						ga('send', 'event', events[0], events[1], events[2], {
							hitCallback:  function() {
								redirect = true;
								location = $this.attr('href');
							}
						});
					} catch (e) {}
					
					setTimeout(function() {
						if (! redirect) {
							location = $this.attr('href');
						}
					}, 2000);
					
					return false;
				});
			}
			
		})($el);
	});
	
})(ga);