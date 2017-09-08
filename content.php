<?php
require_once 'assets/lib/Parsedown.php';
require_once 'assets/lib/ParsedownExtra.php';
require_once 'assets/lib/Michelf/SmartyPants.inc.php';
require_once 'assets/lib/Michelf/SmartyPantsTypographer.inc.php';
$Parsedown = new ParsedownExtra();
$SmartyPants = new \Michelf\SmartyPantsTypographer();
$SmartyPants->do_space_colon = 2;
$SmartyPants->do_space_semicolon = -1;
$SmartyPants->do_space_semicolon = 2;
$SmartyPants->do_space_frenchquote = 2;
?>

<!DOCTYPE html>
<html>
    <!--
    This document is used by html2print and loaded into the html page structure.

    jQuery uses the browser's .innerHTML property to parse the document and insert it into the new document. During this process, browsers often filter elements from the document such as <html>, <title>, or <head> elements. As a result, the elements retrieved by .load() may not be exactly the same as if the document were retrieved directly by the browser.
    -->
    <head>
        <meta charset="utf-8" />
    </head>
    <body>
        <?php
				/*
        //$url = "https://app.classeur.io/api/v2/files/zM69X0Rqu9DykVXs2iYL/contentRevs/last";
        //$url = "https://app.classeur.io/api/v2/files/PkzmBl1roNNneqdiEc3d/contentRevs/last";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERPWD, "5SeKS8bvGkCe5UexUnYA:SDbwyWwvGx6rkSjd5rMsbiXrqeES1UJs");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        $output = curl_exec($ch);
        $info = curl_getinfo($ch);
        curl_close($ch);

        $output = json_decode($output);

        $content = $output->{'text'} ;
				*/

				$content = file_get_contents("agilabil.md");

        $content = str_replace("\pagebreak", '<div class="break-after">&nbsp;</div>', $content);

        $content = $Parsedown->setBreaksEnabled(true)->text($content);

        $content = $SmartyPants->transform($content);

        echo $content;

        ?>

        <script type="text/javascript" src="assets/lib/jquery.min.js"></script>
        <script type="text/javascript">
            $(function(){

                /*----------- GIVE CLASS NAMES TO CHAPTERS -------------------*/

                $('h2, h3, h4, h5, h6').each(function(){
                    var title = $(this).text().indexOf(':') > 0 ? $(this).text().substr(0, $(this).text().indexOf(':')) : $(this).text(),
                        name = title.toLowerCase().split(' ').slice(0, 2).join('-').stripAccents().replace(/[^a-z0-9]/gi, '-'),
                        tag = $(this).prop("tagName").toLowerCase(),
                        level = parseInt( tag.substr(1) ),
                        parents = 'h2';
                    for( var i = 2 ; i <= level ; i++) {
                        parents += ', h' + i ;
                    }
                    $(this).nextUntil(parents).andSelf().addClass( tag + '-' + name);
                    if(level == 2) {
                        $(this).nextUntil(parents).attr('data-chapter', title);
                    }
                    // Strip Accents
                    //$(this).html( $(this).html().stripAccents() );
                    // Add ID
                    $(this).attr('id', name);
                });

                /*----------- ADD ICONS TO CHEMINS -------------------*/

                $('.chemin').each(function(){
                    var num = Math.floor(Math.random() * 11) + 1  ;
                    $(this).prepend('<img width="11pt" height="11pt" class="icon-chemin icon-chemin-start" src="/assets/images/planes/departure/plane (' + num + ').svg" />');
                    $(this).parent().addClass('pchemin');
                });

                $('a[id]').each(function(){
                    var num = Math.floor(Math.random() * 9) + 1  ;
                    $(this).html('<img width="11pt" height="11pt" class="icon-chemin icon-chemin-end" src="/assets/images/planes/arrival/plane (' + num + ').svg" />')
                });

                /*----------- ADD PAGEBREAKS -------------------*/

                $('h2, h3, h4, h5.h4-ateliers').prev().addClass('break-after');





            });




            String.prototype.stripAccents = function() {
                var translate_re = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g;
                var translate = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';
                return (this.replace(translate_re, function(match){
                    return translate.substr(translate_re.source.indexOf(match)-1, 1); })
                );
            };

        </script>

    </body>
</html>


<?php

$Parsedown = new Parsedown();
