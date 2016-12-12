/**
 * @requires jquery.js
 */
/* ----------------------------------------------------------------------------------- */



function RolloverImages(className, onSuffix, aSuffix) {
	if (!document.getElementById || !document.images) return;

	this.buttons = [];
	this.images = [];
	this.targetClassName = className || "rollover";
	this.onSuffix = onSuffix || "on";
	this.aSuffix  = aSuffix;

	this.init();
}


RolloverImages.prototype = {

	init : function() {
		var _this  = this;
		var imgs   = [];
		var inputs = [];
		var rolloverObj    = [];

		var selectors = [
			"img." + this.targetClassName,
			"input." + this.targetClassName
		];

		jQuery(selectors.join(", ")).each(function(i) {
			var el = jQuery(this);
			rolloverObj.push(this);
		});

		jQuery.each(rolloverObj, function(i) { _this.registButton(this); });
		//this.preloadImages();
	},


	registButton : function(el) {
		if (el.RolloverImagesID) return;
		el.RolloverImagesID = this.buttons.length;
		
		var _this = this;
		var btn = new Object();
		btn.src = el.src;
		btn.filetype = btn.src.substring(btn.src.lastIndexOf('.'));
		btn.basename = btn.src.substring(0, btn.src.length-btn.filetype.length);
		btn.onsrc = btn.basename + this.onSuffix + btn.filetype;

		el.offsrc = btn.src;
		el.onsrc  = btn.onsrc;
		el.lock   = false;
		if (this.aSuffix) {
			btn.activesrc = btn.basename + this.aSuffix + btn.filetype;
			el.activesrc = btn.activesrc;
		}

		this.buttons.push(el);
		this.preloadImage(el);

		if (!this.aSuffix) {
			jQuery(el).bind('mouseover', function() { _this.swapImage(el, 'on'); });
			jQuery(el).bind('mouseout',  function() { _this.swapImage(el, 'off'); });
			if (el.parentNode && el.parentNode.tagName=="A") {
				var p = el.parentNode;
				jQuery(p).bind('focus', function() { _this.swapImage(el, 'on'); });
				jQuery(p).bind('blur',  function() { _this.swapImage(el, 'off'); });
			}
		}
		else {
			jQuery(el).bind('mouseover', function() { if (!el.lock) _this.swapImage(el, 'on'); });
			jQuery(el).bind('mouseout',  function() { if (!el.lock) _this.swapImage(el, 'off'); });
			jQuery(el).bind('mouseup',   function() {
				jQuery(_this.buttons).each(function(i) {
					_this.deactivate(this)
				});
				_this.activate(el);
			});

			if (el.parentNode && el.parentNode.tagName=="A") {
				var p = el.parentNode;
				jQuery(p).bind('focus', function() { if (!el.lock) _this.swapImage(el, 'on'); });
				jQuery(p).bind('blur',  function() { if (!el.lock) _this.swapImage(el, 'off'); });

				jQuery(p).bind('keypress',  function(e) {
					if (jQuery.browser.msie || (!jQuery.browser.msie && e.keyCode == 13)) {
						//Event.stop(e);
						jQuery(_this.buttons).each(function(i) {
							_this.deactivate(this)
						});
						_this.activate(el);
					}
				});
			}
		}
	},


	observe : function(id) {
		if (!id || !document.getElementById(id)) return;
		var _this = this;
		jQuery("#"+id).mouseover(function(e) {
			var cname = _this.targetClassName;
			var node = (function(node) {
				return (jQuery(node).hasClass(cname)) ?
									node :
									(node.parentNode) ?
										arguments.callee(node.parentNode) :
										null;
			})(e.target);
			if (node && typeof node.RolloverImagesID != "number") {
				_this.registButton(node);
				_this.swapImage(node, 'on');
			}
		});
	},	


	preloadImages : function() {
		for (var i = 0,len = this.buttons.length; i < len; i++) {
			preloadImage(this.buttons[i]);
		}
	},

	preloadImage : function(img) {
		var img_on = new Image();
		img_on.src = img.onsrc;
		this.images.push(img_on);
		if (img.activesrc) {
			var img_act = new Image();
			img_act.src = img.activesrc;
			this.images.push(img_act);
		}
	},

	swapImage : function(obj, status) {
		if (!obj || !obj[status+"src"]) return;
		if (!obj.lock)
			obj.src = obj[status+"src"];
	},

	activate : function(el) {
		this.swapImage(el, 'active');
		this.lock(el);
	},

	deactivate : function(el) {
		this.unlock(el);
		this.swapImage(el, 'off');
	},

	lock : function(obj) {
		if (obj.lock == 'undefined') return;
		if (!obj.lock) obj.lock = true;
	},

	unlock : function(obj) {
		if (obj.lock == 'undefined') return;
		if (obj.lock) obj.lock = false;
	}

}

/*
jQuery(function() {
	new RolloverImages('rollover', 'on');
});
*/

