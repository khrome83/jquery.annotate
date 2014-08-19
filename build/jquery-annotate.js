(function($) {
	"use strict";
	
	var opts;
	
	$.fn.annotate.defaults = {
		color: "#556f2f",
		backgroundColor: "white",
		defaultAction: function() { console.log("callback"); }
	};	

	$.fn.annotate = function(options, action) {

		opts = $.extend({}, $.fn.annotate.defaults, options);
		
		
		if(action === "open") {
			console.log("open");
		}
		
		if(action === "close") {
			console.log("close");
		}
		
		debug(this);
		doAction(this);
		return this;
		
		/*
			// Used to handle array of items
			return this.each(function() {
			
			
			});
		*/
	};
	
	/* Private Functions */
	function debug(obj) {
	 if (window.console && window.console.log) {
		window.console.log( "hilight selection count: " + obj.length );
		}
	}
	
	function doAction(obj) {
		opts.defaultAction.call(obj);
	}
	
	
	/* Public Exposed Functions */
	$.fn.annotate.publicFunction = function(txt) {
		return "<strong>" + txt + "</strong>";
	};
	
})(jQuery);