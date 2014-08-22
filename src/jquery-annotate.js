(function ($) {
	"use strict";

	var opts,
		svgNamespace = "http://www.w3.org/2000/svg";

//	The Plugin Main Code
	$.fn.annotate = function (options, action) {

		opts = $.extend({}, $.fn.annotate.defaults, options);


		if (action === "open") {
			console.log("open");
		}

		if (action === "close") {
			console.log("close");
		}

		debug(this);
		doAction(this);
		drawSVG(this);
		return this;

		/*
			// Used to handle array of items
			return this.each(function() {
			
			
			});
		*/
	};

//	Public Settings
	$.fn.annotate.defaults = {
		color: "#556f2f",
		backgroundColor: "white",
		defaultAction: function () {
			console.log("callback");
		}
	};

//	Private Functions
	function debug(obj) {
		if (window.console && window.console.log) {
			window.console.log("hilight selection count: " + obj.length);
		}
	}

	function doAction(obj) {
		opts.defaultAction.call(obj);
	}

	function drawSVG(obj) {
		var shape = document.createElementNS(svgNamespace, "circle");
		shape.setAttribute("cx", 25);
		shape.setAttribute("cy", 25);
		shape.setAttribute("r", 20);
		shape.setAttribute("fill", "green");
		
		obj.append("<svg></svg>");
		obj.find("svg").append(shape);
	}

//	Public Functions
	$.fn.annotate.publicFunction = function (txt) {
		return "<strong>" + txt + "</strong>";
	};

})(jQuery);