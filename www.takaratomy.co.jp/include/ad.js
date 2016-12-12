// JavaScript Document

var link = "http://www.takaratomy.co.jp/?xmas";
var bnr = "head_ad_xmas.png";
var alt = "クリスマス特集";
var category = 'xmas2016_click';


document.write('<style type="text/css">\
.header_ad {\
	position:absolute;\
	top:0px;\
	right:-105px;\
}\
@media screen and (max-width: 639px) {\
.header_ad {\
	position:relative;\
	display:block;\
	top:inherit;\
	right:inherit;\
	padding:5px;\
}\
}\
</style>');


// http接続の時だけ実行
if(link != "") {
	if("http:" == document.location.protocol) {
		document.write('<a href="'+link+'" target="_blank" class="header_ad" onClick="ga(\'send\', \'event\', \''+category+'\', \'click\', \''+link+'\');"><img src="http://www.takaratomy.co.jp/common/img/'+bnr+'" alt="'+alt+'" /></a>');
	}else{
		document.write('<a href="'+link+'" target="_blank" class="header_ad" onClick="ga(\'send\', \'event\', \''+category+'\', \'click\', \''+link+'\');"><img src="https://www.takaratomy.co.jp/common/img/'+bnr+'" alt="'+alt+'" /></a>');
	};
}
