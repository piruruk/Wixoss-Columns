jQuery(function(){
    var flag = "";
    var _this = jQuery("#subNav .nav div > ul > li > a");
    jQuery(".innerNav").css("display","none");
    jQuery(".on .innerNav").css("display","block");
    _this.hover(function(){
        var naviImg = jQuery(this).find("img").attr("src");
        flag = (naviImg.slice(-6) == "on.gif")? true : false;
        if(!flag){
            thisNaviImg = naviImg.slice(0,31);
            thisNaviImg = thisNaviImg + "over.gif";
            jQuery(this).find("img").attr("src",thisNaviImg);
        }
    },
    function(){
        var naviImg = jQuery(this).find("img").attr("src");
        flag = (naviImg.slice(-6) == "on.gif")? true : false;
        if(!flag){
            thisNaviImg = naviImg.slice(0,31);
            thisNaviImg = thisNaviImg + ".gif";
            jQuery(this).find("img").attr("src",thisNaviImg);
        }
    });
    _this.click(function(){
        var naviImg = jQuery(this).find("img").attr("src");
        if(naviImg){
            flag = (naviImg.slice(-6) == "on.gif")? true : false;
            if(!flag){
                thisNaviImg = naviImg.slice(0,31);
                thisNaviImg = thisNaviImg + "on.gif";
                jQuery(this).find("img").attr("src",thisNaviImg);
                jQuery(this).parent("li").addClass("on");
                jQuery(this).parent("li").find("ul.innerNav").slideDown();
            }
            else {
                thisNaviImg = naviImg.slice(0,31);
                thisNaviImg = thisNaviImg + "over.gif";
                jQuery(this).find("img").attr("src",thisNaviImg);
                jQuery(this).parent("li").removeClass("on");
                jQuery(this).parent("li").find("ul.innerNav").slideUp();
            }
        }
        else{
            flag = (jQuery(this).parent("li").attr("class").slice(-2) == "on")? true : false;
            if(!flag){
                jQuery(this).parent("li").addClass("on");
                jQuery(this).parent("li").find("ul.innerNav").slideDown();
            }
            else {
                jQuery(this).parent("li").removeClass("on");
                jQuery(this).parent("li").find("ul.innerNav").slideUp();
            }
        }
    });
});