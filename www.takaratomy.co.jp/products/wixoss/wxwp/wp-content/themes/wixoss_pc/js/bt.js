// JavaScript Document
jQuery(document).ready(function($) {
$(document).ready(function () {
	var images = $("img");
	for(var i=0; i < images.size(); i++) {
		if(images.eq(i).attr("src").match("_off.")) {
			$("img").eq(i).hover(function() {
				$(this).attr('src', $(this).attr("src").replace("_off.", "_on."));
			}, function() {
				$(this).attr('src', $(this).attr("src").replace("_on.", "_off."));
			});
		}
	}
});
});

//スクロール
jQuery(document).ready(function () {
	jQuery('a[href^=#]').click(function(){
		var speed = 200;
		var href= jQuery(this).attr("href");
		var target = jQuery(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		jQuery("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});
