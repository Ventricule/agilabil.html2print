$(function() {
    $('iframe').load(function() {
        var doc = $("iframe").contents().find("html");

        $('[name="preview"]').change(function() {
            if($(this).is(":checked")) {
                doc.addClass("preview");
                doc.removeClass("normal");
            } else {
                doc.removeClass("preview");
                doc.addClass("normal");
            }
        });

        $('[name="debug"]').change(function() {
            if($(this).is(":checked")) {
                doc.addClass("debug");
            } else {
                doc.removeClass("debug");
            }
        });

        $('[name="spread"]').change(function() {
            if($(this).is(":checked")) {
                doc.addClass("spread");
            } else {
                doc.removeClass("spread");
            }
            console.log($(this).is(":checked"));
        });

        //$('[name="hi-res"]').change(function() {
            //if($(this).is(":checked")) {
                //doc.addClass("export");
            //} else {
                //doc.removeClass("export");
            //}
        //});

        $('[name="zoom"]').change(function() {
            zoomLevel = $(this).val() / 100;

            doc.find("#pages").css({
                "-webkit-transform": "scale(" + zoomLevel + ")",
                "-webkit-transform-origin": "0 0"
            });
        });

        //$(".paper").each(function(){
            //page = $(this).attr("id");
            //$("#toc-pages").append("<li><a href='#" + page + "'>" + page.replace("-", " ") + "</a></li>")
        //});

        $('[name="page"]').on('input', function() {
            var pageNumber = $(this).val() - 1;

            var target = doc.find('.paper:eq(' + pageNumber + ')');
            var offsetTop = target.offset().top;

            console.log(offsetTop);

            doc.animate({
                scrollTop: offsetTop
            }, 100);
        });

        /*$('input[name="page"]').change(function(){
            console.log($(this));
            $('html, body').animate({
                scrollTop: $("#page-" + $( this ).val() ).offset().top
            }, 100);
        });*/

        $("#print").on('click', function() {
            $("iframe").get(0).contentWindow.print();
        });
    });

    //// __________________________________ HIGH RESOLUTION __________________________________ //
    //$("#hi-res").click(function(e){
        //e.preventDefault();
        //$(this).toggleClass("button-active");
        //$("html").toggleClass("export");
        //$("img").each(function(){
            //var hires = $(this).attr("data-alt-src");
            //var lores = $(this).attr("src");
            //$(this).attr("data-alt-src", lores)
            //$(this).attr("src", hires)
        //});
        //console.log("Wait for hi-res images to load");
        //window.setTimeout(function(){
            //console.log("Check image resolution");
            //// Redlights images too small for printing
            //$("img").each(function(){
                //if (Math.ceil(this.naturalHeight / $(this).height()) < 3) {
                    //console.log($(this).attr("src") + ": " + Math.floor(this.naturalHeight / $(this).height()) );
                    //if($(this).parent().hasClass("moveable")) {
                        //$(this).parent().toggleClass("lo-res");
                    //} else {
                        //$(this).toggleClass("lo-res");
                    //}
                //}
            //});
        //}, 2000);
    //});


});

//(function($) {
    //'use strict';

    //$('iframe')[0].addEventListener("load", function(event) {
        //console.log(arguments);
    //}, false);
//})(document.querySelectorAll.bind(document));
