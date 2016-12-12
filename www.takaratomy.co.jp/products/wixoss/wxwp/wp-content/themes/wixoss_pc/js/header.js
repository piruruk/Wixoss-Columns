// JavaScript Document
//グローバルナビ



function writeHeader(rootDir){

	$.ajax({
		url: "http://rokumendo.com/test/yau/wixoss/header.html", 
		cache: false,
		async: false, 
		success: function(html){

			html = html.replace(/\{\$root\}/g, rootDir);
			document.write(html);
		}
	});

}
