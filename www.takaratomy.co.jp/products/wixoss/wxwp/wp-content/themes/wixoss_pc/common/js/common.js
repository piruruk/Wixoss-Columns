/**
 * @requires jquery.js
 * @requires styleswitcher.js
 * @requires rollover.js
 */
/* ----------------------------------------------------------------------------------- */

/**
 * @namespace 
 */
var TKRLIB = {};


TKRLIB.COMMON_DIR_NAME = "common";



/* ----------------------------------------------------------------------------------- */
TKRLIB.SmoothScroll = function () {
	this.selector      = jQuery('a[href^=#], area[href^=#]');
	this.goToPageTop   = "#headContainer";
	this.speed         = 600;
	this.easing        = "easeOutExpo";
	this.noScrollCName = "no-scroll";

	if (this.selector.length) {
		this.init();
	}
}

TKRLIB.SmoothScroll.prototype.init = function () {
	var _this = this;
	this.selector.each(function () {
		if (!jQuery(this).hasClass(_this.noScrollCName)) {
			var fi = jQuery(this).attr("href");
			if (fi == "#") return;//return false;
			var el = (jQuery(fi).length) ? jQuery(fi) : jQuery("a[name="+fi.replace(/#/,"")+"]");
			if (el.length) {
				jQuery(this).click(function(e) {
//					e.preventDefault();
					var target = el[0];
					jQuery.scrollTo(target, {
						speed: _this.speed,
						easing: _this.easing,
						onAfter: function() {
							location.hash = "#"+fi.split("#")[1];;
						}
					});
					return false;
				});
			}
		}
	});
}


/* ----------------------------------------------------------------------------------- */
/**
 * @returns {String} 相対パスを返す。'../../common/'など。
 * 
*/

TKRLIB.getCommonDir = function() {
	var dirName = arguments.length? arguments[0] : TKRLIB.COMMON_DIR_NAME;
	var links   = document.getElementsByTagName('LINK');
	var reg = new RegExp( "(.*\/?" + dirName + "\/).+$" );
	if( links ){
		for( var i=0; i<links.length; i++ ){
			if( links[i].getAttribute("rel") && links[i].getAttribute("rel").indexOf("stylesheet") != -1 ) {
				if( links[i].href && links[i].href.match( reg ) )
					return RegExp.$1;
			}
		}
	}
	return '/'+ dirName +'/';
}



/* ----------------------------------------------------------------------------------- */


TKRLIB.PdfLinkDetection = function () {
	this.regPdfLink = new RegExp("(\.pdf$|\.PDF$|\.pdf#.*)", "i");
	this.targetNode = jQuery("#contents a,#subNav a");
	this.bannerBlock = jQuery("#pdfBannerBlock");
	this.bannerBlock2 = jQuery(".topPluginBox");
	this.pdfLinkNodes = [];

	if (this.targetNode.length) {
		this.init();
	}
}

TKRLIB.PdfLinkDetection.prototype.init = function () {
	if (this.detectPdfLink() && this.bannerBlock.length) {
		this.bannerBlock.css({"display":"block"});
	}
	if (this.detectPdfLink() && this.bannerBlock2.length) {
		this.bannerBlock2.css({"display":"block"});
	}
}

TKRLIB.PdfLinkDetection.prototype.detectPdfLink = function () {
	var _this = this;
	this.targetNode.each(function () {
		var href = jQuery(this).attr("href");
		if (href.match(_this.regPdfLink)) {
			_this.pdfLinkNodes.push(this);
			this.setAttribute("target", "_blank");
		}
	});
	return _this.pdfLinkNodes.length ? true : false;
}



/* ----------------------------------------------------------------------------------- */
/**
 * 
 * 
*/

jQuery(function() {

	if (jQuery.browser.msie && jQuery.browser.version == 6) {
		try {
			document.execCommand("BackgroundImageCache", false, true);
		} catch(err) {}
	}

	var roi = new RolloverImages('rollover', 'on');

	for (module in TKRLIB) {
		var obj = TKRLIB[module];
		if (obj && typeof obj == "function") {
			new TKRLIB[module]();
		}
	}
});



/* ----------------------------------------------------------------------------------- */


jQuery(function(){  

	for (var i=0; i<jQuery(".contentsMenuCol").length; i++) {
		var contentsMenuCol = jQuery(".contentsMenuCol").eq(i).height();
		if (jQuery.browser.msie && jQuery.browser.version == 6 ){
			jQuery(".contentsMenuCol .col01").eq(i).css("height",contentsMenuCol);
			jQuery(".contentsMenuCol .col02").eq(i).css("height",contentsMenuCol);
			jQuery(".contentsMenuCol .col03").eq(i).css("height",contentsMenuCol);
		}
		else {
			jQuery(".contentsMenuCol .col01").eq(i).css("min-height",contentsMenuCol);
			jQuery(".contentsMenuCol .col02").eq(i).css("min-height",contentsMenuCol);
			jQuery(".contentsMenuCol .col03").eq(i).css("min-height",contentsMenuCol);
		}
	}

	for (var i=0; i<jQuery(".contentsMenuCol02").length; i++) {
		var contentsMenuCol02 = jQuery(".contentsMenuCol02").eq(i).height();
		if (jQuery.browser.msie && jQuery.browser.version == 6 ){
			jQuery(".contentsMenuCol02 .col01").eq(i).css("height",contentsMenuCol02);
			jQuery(".contentsMenuCol02 .col02").eq(i).css("height",contentsMenuCol02);
		}
		else {
			jQuery(".contentsMenuCol02 .col01").eq(i).css("min-height",contentsMenuCol02);
			jQuery(".contentsMenuCol02 .col02").eq(i).css("min-height",contentsMenuCol02);
		}
	}

	for (var i=0; i<jQuery(".productInfoCol").length; i++) {
		var TopProductCol = jQuery(".productInfoCol").eq(i).height();
		if (jQuery.browser.msie && jQuery.browser.version == 6 ){
			jQuery(".productInfoCol .productInfoCol01").eq(i).css("height",TopProductCol);
			jQuery(".productInfoCol .productInfoCol02").eq(i).css("height",TopProductCol);
		}
		else {
			jQuery(".productInfoCol .productInfoCol01").eq(i).css("min-height",TopProductCol);
			jQuery(".productInfoCol .productInfoCol02").eq(i).css("min-height",TopProductCol);
		}
	}

	for (var i=0; i<jQuery(".productsListCol01").length; i++) {
		var TopProductCol = jQuery(".productsListCol01").eq(i).height();
		if (jQuery.browser.msie && jQuery.browser.version == 6 ){
			jQuery(".productsListCol01").eq(i).find(".col").css("height",TopProductCol);
			jQuery(".productsListCol01").eq(i).find(".col02").css("height",TopProductCol);
		}
		else {
			jQuery(".productsListCol01").eq(i).find(".col").css("min-height",TopProductCol);
			jQuery(".productsListCol01").eq(i).find(".col02").css("min-height",TopProductCol);
		}
	}

	for (var i=0; i<jQuery(".colWrap").length; i++) {
		var colWrap = jQuery(".colWrap").eq(i).height();
		if (jQuery.browser.msie && jQuery.browser.version == 6 ){
			jQuery(".colWrap .procol01").eq(i).css("height",colWrap);
			jQuery(".colWrap .procol02").eq(i).css("height",colWrap);
			jQuery(".colWrap .procol03").eq(i).css("height",colWrap);
			jQuery(".colWrap .procol04").eq(i).css("height",colWrap);
		}
		else {
			jQuery(".colWrap .procol01").eq(i).css("min-height",colWrap);
			jQuery(".colWrap .procol02").eq(i).css("min-height",colWrap);
			jQuery(".colWrap .procol03").eq(i).css("min-height",colWrap);
			jQuery(".colWrap .procol04").eq(i).css("min-height",colWrap);
		}
	}



	var ProductsBox = jQuery(".sitemapBox02").height();
	if (jQuery.browser.msie && jQuery.browser.version == 6 ){
		jQuery(".sitemapBox02 .colLeft").css("height",ProductsBox);
		jQuery(".sitemapBox02 .colRight").css("height",ProductsBox);
	}
	else {
		jQuery(".sitemapBox02 .colLeft").css("min-height",ProductsBox);
		jQuery(".sitemapBox02 .colRight").css("min-height",ProductsBox);
	}



	jQuery(".contentsMenuCol div dl dt a").each(function(){
		var Href = jQuery(this).attr("href");
		jQuery(this).parent().parent().parent().click(function() {
			var Target = jQuery(this).find("a").attr("target");
			if(Target == "_blank"){
				window.open(Href,"_blank");
			}
			else {
				window.open(Href,"_self");
			}
			return false;
		});

	});

	jQuery(".contentsMenuCol02 div dl dt a").each(function(){
		var Href = jQuery(this).attr("href");
		jQuery(this).parent().parent().parent().click(function() {
			var Target = jQuery(this).find("a").attr("target");
			if(Target == "_blank"){
				window.open(Href,"_blank");
			}
			else {
				window.open(Href,"_self");
			}
			return false;
		});

	});
	
	jQuery(".contentsMenuCol div").hover(
		function(){
			jQuery(this).addClass("colOn");
			jQuery(".contentsMenuCol div dl dt").addClass("largeIconLink02");
		},
		function(){
			jQuery(this).removeClass("colOn");
			jQuery(".contentsMenuCol div dl dt").removeClass("largeIconLink02");
		}
	);
	jQuery(".contentsMenuCol02 div").hover(
		function(){
			jQuery(this).addClass("colOn");
			jQuery(".contentsMenuCol02 div dl dt").addClass("largeIconLink02");
		},
		function(){
			jQuery(this).removeClass("colOn");
			jQuery(".contentsMenuCol02 div dl dt").removeClass("largeIconLink02");
		}
	);

	jQuery(".personalTopColWrap01 .personalTopMenu01 div").hover(
		function(){
			jQuery(this).addClass("colOn");
			jQuery(".personalTopColWrap01 .personalTopMenu01 dl dt").addClass("largeIconLink02");
		},
		function(){
			jQuery(this).removeClass("colOn");
			jQuery(".personalTopColWrap01 .personalTopMenu01 dl dt").removeClass("largeIconLink02");
		}
	);

	jQuery(".personalTopMenu02 div").hover(
		function(){
			jQuery(this).addClass("colOn");
			jQuery(".personalTopMenu02 dl dt").addClass("largeIconLink02");
		},
		function(){
			jQuery(this).removeClass("colOn");
			jQuery(".personalTopMenu02 dl dt").removeClass("largeIconLink02");
		}
	);

	jQuery(".indexMenuCol01 div").hover(
		function(){
			jQuery(this).addClass("colOn");
			jQuery(".indexMenuCol01 dl dt").addClass("largeIconLink02");
		},
		function(){
			jQuery(this).removeClass("colOn");
			jQuery(".indexMenuCol01 dl dt").removeClass("largeIconLink02");
		}
	);

	jQuery(".indexMenuCol02 div").hover(
		function(){
			jQuery(this).addClass("colOn");
			jQuery(".indexMenuCol02 dl dt").addClass("largeIconLink02");
		},
		function(){
			jQuery(this).removeClass("colOn");
			jQuery(".indexMenuCol02 dl dt").removeClass("largeIconLink02");
		}
	);


}); 




jQuery(function(){
	jQuery("#srchInput").val("知りたいキーワードを入れてください")
	   .css("color","#b8b8b8");
	jQuery("#srchInput").focus(function(){
		if(this.value == "知りたいキーワードを入れてください"){
			jQuery(this).val("").css("color","#666666");
		}
	});
	jQuery("#srchInput").blur(function(){
		if(this.value == ""){
			jQuery(this).val("知りたいキーワードを入れてください").css("color","#b8b8b8");
		}
		if(this.value != "知りたいキーワードを入れてください"){
			jQuery(this).css("color","#666666");
		}
	});

});


jQuery(function(){
	jQuery("#srchInput2").val("（入力例）トミカ")
	   .css("color","#b8b8b8");
	jQuery("#srchInput2").focus(function(){
		if(this.value == "（入力例）トミカ"){
			jQuery(this).val("").css("color","#666666");
		}
	});
	jQuery("#srchInput2").blur(function(){
		if(this.value == ""){
			jQuery(this).val("（入力例）トミカ").css("color","#b8b8b8");
		}
		if(this.value != "（入力例）トミカ"){
			jQuery(this).css("color","#666666");
		}
	});

});




jQuery(function(){
	jQuery("#srchInput3").val("（入力例）　トミカ　リカちゃん")
	   .css("color","#b8b8b8");
	jQuery("#srchInput3").focus(function(){
		if(this.value == "（入力例）　トミカ　リカちゃん"){
			jQuery(this).val("").css("color","#666666");
		}
	});
	jQuery("#srchInput3").blur(function(){
		if(this.value == ""){
			jQuery(this).val("（入力例）　トミカ　リカちゃん").css("color","#b8b8b8");
		}
		if(this.value != "（入力例）　トミカ　リカちゃん"){
			jQuery(this).css("color","#666666");
		}
	});

});

jQuery(function(){
	jQuery("#srchInput4").val("知りたいキーワードを入れてください")
	   .css("color","#b8b8b8");
	jQuery("#srchInput4").focus(function(){
		if(this.value == "知りたいキーワードを入れてください"){
			jQuery(this).val("").css("color","#666666");
		}
	});
	jQuery("#srchInput4").blur(function(){
		if(this.value == ""){
			jQuery(this).val("知りたいキーワードを入れてください").css("color","#b8b8b8");
		}
		if(this.value != "知りたいキーワードを入れてください"){
			jQuery(this).css("color","#666666");
		}
	});

});



jQuery(function(){  
	var ProductsCol = jQuery(".kyouyu .productsListCol01:first-child div").length;
	if(ProductsCol == 1){
		jQuery(".productsListCol01Wrap").css("width","180px");
	}
	if(ProductsCol == 2){
		jQuery(".productsListCol01Wrap").css("width","360px");
	}
	if(ProductsCol == 3){
		jQuery(".productsListCol01Wrap").css("width","540px");
	}
	if(ProductsCol == 4){
		jQuery(".productsListCol01Wrap").css("width","720px");
	}
}); 






/**
 * 
 * To emulate the submit button on the focus event.
 * 
 */
jQuery(function(){
	var $btn = jQuery("#searchSubmitButton");
	$btn.blur();
	var tid = setTimeout(function(){
		$btn.focus(function(){
			$btn.trigger("mouseover");
		})
		.blur(function(){
			$btn.trigger("mouseout");
		});
	}, 500);
});




