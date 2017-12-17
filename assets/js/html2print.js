// html2print needs CSS regions
// load a ‘polyfill’ if the browser does not support it
//if (window.chrome) {
    /*console.log('running chrome, no support for css regions; loading the polyfill');
    var script = document.createElement('script');
    script.setAttribute('src', 'assets/lib/css-regions.min.js');
    document.getElementsByTagName('head')[0].appendChild(script);*/
//};

$(function() {

		// ________________________________ INIT __________________________________ //
    // Creating crop marks
    $("#master-page").append("<div class='crops'><div class='crop-top-left'><span class='bleed'></span></div><div class='crop-top-right'><span class='bleed'></span></div><div class='crop-bottom-right'><span class='bleed'></span></div><div class='crop-bottom-left'><span class='bleed'></span></div></div>")

		// Defining specifics masters
		var master = {
			"58" : "columns",
			"59" : "columns"
		};

    // Cloning the master page
    for (i = 1; i < nb_page; i++){
			if ( master[i] != null && master[i] != false ) {
				$("#master-page-" + master[i]).clone().attr("id","page-"+i).insertBefore($("#master-page")).addClass(master[i]);
			} else {
        $("#master-page").clone().attr("id","page-"+i).insertBefore($("#master-page"));
			}
    }
    $("#master-page").attr("data-width", $(".paper:first-child").width()).hide();

    // Loads main content into <article id="my-story">
    if (content) {
      $.get(content, function(data){

				$("#my-story").html(data);

				var flow = document.webkitGetNamedFlows().namedItem('myStory');

				// Cross-reference connections
				$('#my-story a[href^="#"]').each(function(){
						var anchor = $(this).attr('href').substr(1);
						var target = $("#my-story [id^='" + anchor + "']").parent();
						var $this = $(this);
						if(target.size()) {
							// Get region by content
							var region = flow.getRegionsByContent(target[0]);
							var pagenum = $(region).closest('.paper').index() + 1;
							$this.html(pagenum);
						}
				});

				// Remove top margins
				/*
				$(flow.getRegions()).each(function(){
					$(this.getRegionFlowRanges()).first().css('margin-top', 0);
				});
				*/

				// Absolute positionned elements
				var elements = $('#my-story > [id], #my-story > [class], #my-story img').filter(function() {
				  return $(this).css('position').indexOf('absolute') > -1;
				});
				elements.each(function(){
          if( $(this).parent().is("#my-story") ) {
            var container = this;
            var content = this;
          } else {
            var container = $(this).parent()[0];
            var content = this;
          }
					$(container).css({ 'position' : 'relative', 'visibility' : 'collapse' });
					var region = flow.getRegionsByContent(container);
					$(content).insertBefore($(region)).css({ 'position' : 'absolute', 'visibility' : 'visible' });
				})

				// Fill page header
				$('.page').each(function(){
					var page = $(this),
							article = page.find("article"),
							chapter = article.children().last().attr('data-chapter');
					page.find('.footer .chapter').html(chapter);
				});

        // Particular page backgrounds
				/*$('.paper:nth-child(n+21):nth-child(-n+35)').addClass('atelier');
				$('.paper:nth-child(n+42):nth-child(-n+54)').addClass('atelier');

				$('.paper:nth-child(13)').addClass('full-page');
				$('.paper:nth-child(16)').addClass('full-page');

				$('.paper:nth-child(17)').addClass('chapitre');
				$('.paper:nth-child(39)').addClass('chapitre');*/

			});

		};


    // ________________________________ PREVIEW __________________________________ //
    $("#preview").click(function(e){
        e.preventDefault();
        $(this).toggleClass("button-active");
        $("html").toggleClass("preview normal");
    });

    // __________________________________ DEBUG __________________________________ //
    $("#debug").click(function(e){
        e.preventDefault();
        $(this).toggleClass("button-active");
        $("html").toggleClass("debug");
    });

    // __________________________________ SPREAD __________________________________ //
    $("#spread").click(function(e){
        e.preventDefault();
        $(this).toggleClass("button-active");
        $("body").toggleClass("spread");
    });

    // __________________________________ HIGH RESOLUTION __________________________________ //
    $("#hi-res").click(function(e){
        e.preventDefault();
        $(this).toggleClass("button-active");
        $("html").toggleClass("export");
        $("img").each(function(){
            var hires = $(this).attr("data-alt-src");
            var lores = $(this).attr("src");
            $(this).attr("data-alt-src", lores)
            $(this).attr("src", hires)
        });
        console.log("Wait for hi-res images to load");
        window.setTimeout(function(){
            console.log("Check image resolution");
            // Redlights images too small for printing
            $("img").each(function(){
                if (Math.ceil(this.naturalHeight / $(this).height()) < 3) {
                    console.log($(this).attr("src") + ": " + Math.floor(this.naturalHeight / $(this).height()) );
                    if($(this).parent().hasClass("moveable")) {
                        $(this).parent().toggleClass("lo-res");
                    } else {
                        $(this).toggleClass("lo-res");
                    }
                }
            });
        }, 2000);
    });


    // __________________________________ TOC __________________________________ //
    /*$(".paper").each(function(){
        page = $(this).attr("id");
        $("#toc-pages").append("<li><a href='#" + page + "'>" + page.replace("-", " ") + "</a></li>")
    });

    $("#goto").click(function(e){
        e.preventDefault();
        $(this).toggleClass("button-active");
        $("#toc-pages").toggle();
    });*/

    // __________________________________ ZOOM __________________________________ //
    $("#zoom").click(function(e){
        e.preventDefault();
        $(this).toggleClass("button-active");
        $("#zoom-list").toggle();
    });
    $("#zoom-list a").click(function(e){
        e.preventDefault();
        zoom = $(this).attr("title") / 100 ;
        unzoom = 1 / zoom;
        $("#pages").css("-webkit-transform", "scale(" + zoom + ")");
        $("#pages").css("-webkit-transform-origin", "0 0");
    });



});

String.prototype.stripAccents = function() {
		var translate_re = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g;
		var translate = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';
		return (this.replace(translate_re, function(match){
				return translate.substr(translate_re.source.indexOf(match)-1, 1); })
		);
};
