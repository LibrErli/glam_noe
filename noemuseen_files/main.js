/* FANCYBOX */
$body = $('body');
$window = $('window');


$(document).ready(function () {
    $("a[rel^=fancybox]").each(function () {
        $(this).attr("data-fancybox", $(this).attr("rel"))
        $(this).removeAttr("rel");
    });

    $("img[data-htmlarea-clickenlarge=1]").each(function () {
        $(this).wrap("<a href='" + $(this).attr("src") + "' data-caption='" + $(this).attr("title") + "' class='fancybox'></a>");
    });

    $("a.fancybox").each(function () {
        if (!$(this).attr("data-caption"))
            $(this).attr("data-caption", $(this).find("img").attr("title"));
    });

    $('.fancybox').fancybox({
        transitionDuration: 1500,
    });
    $("body").delegate(".subscribenow", "click", function (event) {
    
        $(this).fancybox({
    
            transitionDuration: 1500,
      
            type: 'inline',
        });
     
    });

    

});



//Meanmenu -> set background on items because double usage of main nav items (navigate and expand)
$(document).ready(function () {
    $(function() {
      $('.mean-container .mean-nav ul li a.mean-expand').hover(function() { //hover
          if($(this).hasClass("mean-clicked")){
              //$(this).css('background-color', '#1d5095');
          }
          else{
              $($(this).closest('li').find('a.main')).css('background-color', '#1d5095');
          }
      }, function() {
        // on mouseout, reset the background colour
        //$('.mean-container .mean-nav ul li a.mean-expand').css('background-color', '');
        $($(this).closest('li').find('a.main')).css('background-color', '');
      });
    });
});

$(document).ready(function () {
    $('.closeFancybox').click(function () {
        parent.jQuery.fancybox.getInstance().close();
    });
});


$(document).ready(function () {
  $(".googleMapLink").fancybox({
  });
});

$(document).ready(function () {
  $(".googleMapRouteLink").fancybox({
            type: 'iframe'
  });
});

$(document).ready(function () {

    var url = location.href;
    if (url.indexOf("coursetitle") > 0) {
        var coursetitle = getParameterByName('coursetitle');

        $('h3:contains("[COURSE TITLE]")').text(coursetitle);
        var action = $("form.powermail_form").attr("action");
        $("form.powermail_form").attr("action", action + '&coursetitle=' + coursetitle);
    }


});
function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


/* MEANMENU */
$(function () {
    $('nav').meanmenu({
        meanScreenWidth: "1023",
        meanRevealPosition: "left"
    });

    //open active level2 menu
    $(".mainNav > li > a.active").each(function () {
        $(this).parent().find(".level2 .mean-expand").trigger("click");
    });

});

/* Nav Extra Adaption */
$(document).ready(function () {
    $(".navExtra").each(function () {

        $(this).parents("li").find(".level2").first().append("<div class='navExtra'>" + $(this).attr("data-content") + "</div>");
        $(this).parents("li").find(".level2").first().find("a.main, a.active").children().unwrap();
    });
});


/* SLIDESHOW */
$(document).ready(function () {
    $(".slideshowContainer").cycle({
        slides: '.slideshowItem',
        timeout: 4000,
        speed: 1400
    });

});

/* TOUCH FRIENDLY NAVIGATION */
$(document).ready(function () {
    $('.navContainer nav ul.mainNav li:has(ul)').doubleTapToGo();
});

/* PARSLEY */
$(document).ready(function () {
    /* change default trigger (change) to focusout */
    $("[data-parsley-trigger]").each(function () {
        $(this).attr("data-parsley-trigger", "focusout");
    });

});

/* POWERMAIL */
$(document).ready(function () {
    $(".wrapper .powermail_fieldset").each(function () {
        $(this).find(".powermail_fieldwrap_type_input, .powermail_fieldwrap_type_select").filter(":odd").addClass("right");
    });

    $(".fancyboxContent .powermail_fieldset").each(function () {
        $(this).find(".powermail_fieldwrap_type_input, .powermail_fieldwrap_type_select, .powermail_fieldwrap_type_country").filter(":even").addClass("right");
    });

    $(".fancyboxContent .powermail_fieldset").each(function () {
        $(this).find(".powermail_fieldwrap_type_password").filter(":odd").addClass("right");
    });
});

/* EQUAL HEIGHT FOOTER COLUMNS */
function equalHeight(group) {
    tallest = 0;
    group.each(function () {
        thisHeight = $(this).height();
        if (thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    group.height(tallest);
}
$(window).load(function () {
    equalHeight($(".footerContent"));
    equalHeight($(".equalHeight"));
});

/* TX News Lazy */

/*
 * Requirements: http://www.appelsiini.net/projects/lazyload to access :in-viewport selector, alternative appear plugin
 * Install:
 * (1) Add to main.ts
 *  
 ajaxPage = PAGE
 ajaxPage {
 typeNum = 999
 config {
 disableAllHeaderCode = 1
 xhtml_cleaning = 0
 admPanel = 0
 #additionalHeaders = Content-type: text/plain
 no_cache = 1
 }
 10 = USER
 10.userFunc = tx_templavoila_pi1->main_page
 }
 
 plugin.tx_news.settings.list.paginate.itemsPerPage = 3 
 plugin.tx_news.settings.list.paginate.insertAbove = 0
 plugin.tx_news.settings.list.paginate.insertBelow = 0
 
 * (2) Add custom css style for .lazyLoader
 * (3) Add data-hide-pagination='{settings.hidePagination}' to Templates/News/List.html
 * (4) Add viewport&cookie plugins for ajax filter
 * (5) Configure Plugin Category List Mode AND
 */

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var next = $('<div class="lazyContainerNext"></div>');
$(document).ready(function () {

    /* init */
    if ($(".news-list-view:not(.news-related-wrap)").html()) {
        $('<div class="clearer"></div><div class="lazyLoader"></div>').insertAfter(".news-list-view");
        next.insertBefore(".lazyLoader");
        $(".news-list-view").attr("data-offset", 1);
        if ($(".news-list-view").attr("data-hide-pagination") == 0) {
            if ($(next).is(":in-viewport"))
                lazyLoading();
            
        } else
            $('.lazyLoader').hide();
        

        if (getUrlParameter("category")) {
            $('select#category > option[value="' + getUrlParameter("category") + '"]').attr("selected", "selected");
            next.insertBefore(".lazyLoader");
            $(".news-list-view").attr("data-category", getUrlParameter("category"));
            $(".news-list-view").html("");
            $(".news-list-view").attr("data-offset", 0);
            $(".news-list-view").removeClass("loading");
            lazyLoading();
        } else if (Cookies.get('dimNewsCategory')) {
            $('select#category > option[value="' + Cookies.get('dimNewsCategory') + '"]').attr("selected", "selected");
            next.insertBefore(".lazyLoader");
            $(".news-list-view").attr("data-category", Cookies.get('dimNewsCategory'));
            $(".news-list-view").html("");
            $(".news-list-view").attr("data-offset", 0);
            $(".news-list-view").removeClass("loading");
            lazyLoading();
        }
    }

    $("select#category").on("change", function () {
        $('<div class="lazyContainerNext"></div>').insertBefore(".lazyLoader");
        next = $('.lazyContainerNext');
        $(".news-list-view").attr("data-category", $(this).val());
        $(".news-list-view").html("");
        $(".news-list-view").attr("data-offset", 0);
        $(".news-list-view").removeClass("loading");
        lazyLoading();

        Cookies.set('dimNewsCategory', $(this).val());
    });

});

$(document).ready(function () {

    $(".copyright").on('click',function(){
        $(this).next(".copyright-content").fadeToggle(300, "linear");
    });
    
});



$(window).scroll(function () {
    
    if ($(".news-list-view").html()) {
        if ($(".news-list-view").attr("data-hide-pagination") == 0) {
            if ($(".lazyContainerNext").is(":in-viewport"))
                lazyLoading();
            
        } else
            $('.lazyLoader').hide();
    }
});


function lazyLoading() {

    var loading = $('.lazyLoader');

    if ($(".news-list-view").hasClass("loading"))
        return false;
    next.addClass("loading");
    $(".news-list-view").addClass("loading");
    
    
    

    if ($(".news-list-view").attr("data-offset") != "-1") {
        loading.show();
        
        var offset = $(".news-list-view").attr("data-offset");
        var category = $(".news-list-view").attr("data-category");
        if (category == undefined)
            category = "";
        if (category == -1)
            category = "";
        $.get(document.URL + "?no_cache=1&type=999&tx_news_pi1%5B%40widget_0%5D%5BcurrentPage%5D=" + (offset * 1 + 1) + "&dim_category=" + category, function (data, status) {
            loading.fadeOut();

            if (!$(data).find(".news-list-view").text().trim()) {
                $(".news-list-view").attr("data-offset", -1);
                next.removeClass("loading");
                $(".news-list-view").removeClass("loading");
                return false;
            }

            $(".news-list-view").append($(data).find(".news-list-view").html());

            $(".news-list-view").attr("data-offset", (offset * 1 + 1));
            next.removeClass("loading");
            
            $(".news-list-view").removeClass("loading");

            if ($(".lazyContainerNext").is(":in-viewport"))
                lazyLoading();

        });
    } else {
        next.remove();
        $(".news-list-view").removeClass("loading");

    }
}
if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

/* SUMO SELECT */
$(function () {
    $(document).ready(function () {
        $('.tx-powermail select[multiple]').SumoSelect({placeholder: 'Bitte wählen', csvDispCount: 3, captionFormat: '{0} Optionen ausgewählt'});
        $('#femanager_field_usergroup').SumoSelect({placeholder: 'Bitte wählen', csvDispCount: 3, captionFormat: '{0} Optionen ausgewählt'})
    });
});

$(document).ready(function () {
    $('.content-slider.next').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    });
});

$(document).ready(function () {
    $('.navExtraImg:empty').remove();
    $('.navExtra:empty').remove();
});


/* DIM SIMPLE GALLERY SLIDER */
$(document).ready(function () {
    $(".simpleGallerySlideshow .slick-slider").slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        infinite: true,
    });
});

$(document).ready(function () {
    $('.simpleGalleryContainer a.fancybox').fancybox({
        transitionDuration: 1000,
        openEffect: 'fade',
        padding: 10,
        caption: function (instance, item) {
            var caption, link, link1, link2, link3;

            if (item.type === 'image') {
                caption = $(this).attr('data-caption');
                if ($(this).data('original') != undefined) {
                    if ($(this).data('originaltext')) {
                        link1 = '<a href="' + $(this).data('original') + '" target="_blank">' + $(this).data('originaltext') + '</a> ';
                    } else {

                        link1 = '<a href="' + $(this).data('original') + '" target="_blank">Original</a> ';
                    }
                } else {
                    link1 = '<a href="' + item.src + '" target="_blank">Original</a> ';
                }
                if ($(this).data('sd')) {
                    if ($(this).data('sdtext')) {
                        link2 = '<a href="' + $(this).data('sd') + '" target="_blank">' + $(this).data('sdtext') + '</a> ';
                    } else {
                        link2 = '<a href="' + $(this).data('sd') + '" target="_blank">SD</a> ';
                    }
                } else {
                    link2 = '';
                }
                if ($(this).data('hd')) {
                    if ($(this).data('hdtext')) {
                        link3 = '<a href="' + $(this).data('hd') + '" target="_blank">' + $(this).data('hdtext') + '</a> ';
                    } else {
                        link3 = '<a href="' + $(this).data('hd') + '" target="_blank">HD</a> ';
                    }
                } else {
                    link3 = '';
                }
                link = '<div class="downloadLinks">' + link1 + link2 + link3 + '</div><div class="clearer"></div>';

                return (caption ? caption : '') + link;
            }
        }

    });
});


//filter action ajax
$(document).ready(function () {

    $('#categoryFilter').change(function () {
        $.ajax({
            url: location.href + (location.href.indexOf('?') == -1 ? '?' : '&') + 'type=2000',
            type: 'GET',
            data: {'catId': $.trim($('#categoryFilter option:selected').val()), },
            success: function (data) {
                $('body').append('<div class="temp-no-show">' + data + '</div>');
                var resultHtml = $('.temp-no-show').find('.downloadfilter').detach();
                $('.temp-no-show').remove();
                $('.tx-dim-downloads').find('.downloadfilter').remove();
                $('.tx-dim-downloads').append(resultHtml);
            },
            error: function () {
                $('.downloadfilter').html('!!ERROR!!');
            },
        });
        return false;

    });
});

/* PREFILL NEWSLETTER FORM */
$(document).ready(function () {
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    $(document).ready(function () {
        $("#text3556874").val(getParameterByName("email_prefill"));
    });
});


/* DOWNLOAD */
$(document).ready(function () {

    $('.downloadItem').click(function () {
        var dn = $(this).find('.downloadDownloads');
        var uid = $(this).find('.downloadUid');

        $.ajax({
            url: $('base').attr('href') + 'index.php?eID=dateNavigator',
            type: 'POST',
            data: {'mode': 'download', 'downloads': $.trim(dn.text()), 'uid': $.trim(uid.text())},
            dataType: 'json',
            success: function (data) {
                dn.text(data);
            },
            error: function () {
                // alert('Error occured');
            }
        });
    });
});

/* STICKY NAV */
$(document).ready(function () {
    var element = document.getElementsByClassName("navContainer")[0];
    if(element.classList.contains("microsite") == false){
        if ($('.navContainer').length) {
            var stickyNavTop = $('.navContainer').offset().top;

            var stickyNav = function () {
                if ($(window).width() > 1023) {
                    var scrollTop = $(window).scrollTop();

                    if (scrollTop > stickyNavTop) {
                        $('.navContainer').addClass('sticky');
                        $('body').addClass('stickyBody');
                    } else {
                        $('.navContainer').removeClass('sticky');
                        $('body').removeClass('stickyBody');
                    }
                }
            };

            stickyNav();

            $(window).scroll(function () {
                stickyNav();
            });
        }
    }
});


/* FAQ CATEGORY FILTER */

$(document).ready(function () {
    $('.socialFilterSelectTopicCategories').SumoSelect({
        captionFormat: '{0} ' + $(".optionsselected").html(),
        captionFormatAllSelected: '{0} ' + $(".allselected").html(),
        placeholder: $(".selectcategory").html(),
        csvDispCount: 3,
        triggerChangeCombined: true,
        floatWidth: 100,
    });


    $('.socialFilterSelectTopicCategories').change(function () {
        sumoFilterAjax();
    });

    var preselectedTopics = $('.preselectedTopics').html();
    if (preselectedTopics) {
        var array = preselectedTopics.split(",");
        $(".socialFilterSelectTopicCategories option").each(function () {
            if ($.inArray($(this).val(), array) != -1) {
                $('select#faqcategoryy')[0].sumo.selectItem($(this).index());
            }
        });
        sumoFilterAjax();
    }
    function sumoFilterAjax() {
        var catsArray = new Array();
        $(".socialFilterSelectTopicCategories option:selected").each(function () {
            if ($(this).val() != '') {
                catsArray.push($(this).val());
            }
        });

        $.ajax({
            url: location.href + (location.href.indexOf('?') == -1 ? '?' : '&') + 'type=2000&request=sumo',
            type: 'GET',
            async: true,
            data: {'topicIds': $.trim(catsArray)},
            success: function (data) {

                $('body').append('<div class="temp-no-show">' + data + '</div>');
                var ajaxAllCount = $('.temp-no-show').find('.helpinghand').data('allcount');
                var resultHtml = $('.temp-no-show').find('.faqAccordion').html();
                $('.temp-no-show').remove();
                $('.faqAccordion').html("");
                $('.faqAccordion').accordion('destroy');
                $('.faqAccordion').append(resultHtml);
                $('.faqAccordion').removeClass('active');
                $(".faqAccordion").accordion({
                    collapsible: true,
                    active: false
                });
                $('.faqItemLink a.btnSmallPrimaryNext').each(function () {

                    if ($(this).attr('title')) {
                        var title = $(this).attr('title');
                        $(this).html(title);
                    }
                });
            },
            error: function () {
                //  alert('error');
            },
        });
        return true;
    }
    $('.faqItemLink a.btnSmallPrimaryNext').each(function () {
        if ($(this).attr('title')) {
            var title = $(this).attr('title');
            $(this).html(title);
        }
    });

});


/* FAQ ACCORDION */
$(document).ready(function () {
    $(".faqAccordion").accordion({
        active: false,
        collapsible: true,
        heightStyle: 'content',
        activate: function (event, ui) {
            if (ui.newHeader.text() != '') {
                updatePopularMain(ui.newHeader.attr('aria-controls'));

            }
        }
    });
});

/* FAQ POPULAR COUNT */

function updatePopularMain(faqid) {
    $.ajax({
        url: $('base').attr('href') + 'index.php?eID=dimFaq&mode=popular',
        cache: false,
        type: 'GET',
        data: {'faqid': $.trim(faqid)},
        success: function (data) {

        },
        error: function () {
            //alert('error');
        },
    });
    return 1;
}

/* PRELOAD IMAGES */
$.fn.preload = function () {
    this.each(function () {
        $('<img/>')[0].src = this;
    });
}

//Preload Images
$(document).ready(function () {
    $(['/fileadmin/templates/img/arrow-right-gold-nav.png']).preload();
    $(['/fileadmin/templates/img/arrow-right-gold-nav@2x.png']).preload();
    $(['/fileadmin/templates/img/arrow-right-gold.png']).preload();
    $(['/fileadmin/templates/img/arrow-right-gold@2x.png']).preload();
    $(['/fileadmin/templates/img/arrow-left-gold.png']).preload();
    $(['/fileadmin/templates/img/arrow-left-gold@2x.png']).preload();
    $(['/fileadmin/templates/img/arrow-right-gold-small.png']).preload();
    $(['/fileadmin/templates/img/arrow-right-gold-small@2x.png']).preload();
    $(['/fileadmin/templates/img/icon-download-act.png']).preload();
    $(['/fileadmin/templates/img/icon-download-act@2x.png']).preload();
    $(['/fileadmin/templates/img/location-act.png']).preload();
    $(['/fileadmin/templates/img/location-act@2x.png']).preload();
    $(['/fileadmin/templates/img/lecturer-act.png']).preload();
    $(['/fileadmin/templates/img/lecturer-act@2x.png']).preload();
    $(['/fileadmin/templates/img/tag-act.png']).preload();
    $(['/fileadmin/templates/img/tag-act@2x.png']).preload();
    $(['/fileadmin/templates/img/calendar-small-act.png']).preload();
    $(['/fileadmin/templates/img/calendar-small-act@2x.png']).preload();
});

$(".tx_dimexperts .contactItem .readMore").click(function () {
    $(this).parent().parent().parent().find(".back").fadeToggle("slow", "linear");
});

/* OPEN FORM ACTION IN FANCYBOX */
$(document).ready(function () {
    $("#museumSearchForm").submit(function() {
        $form = $(this);
        $.fancybox.open({
                'src': $form.attr("action") + "?" + $form.serialize(),
                'type': 'iframe'
        });
        return false;
    });
    
    $(".btnIframe, .quickSearchIcon a, .topEvents a.internalLink").fancybox({
        type: 'iframe'
    });

});

/* MAIN NAVIGATION - EXTRA CONTENT */
$(document).ready(function () {
    $( ".level2" ).has( ".navExtra" ).parent().addClass("level2Extra");
});

/* IOS FIXES */
$(document).ready(function () {
    function iOSversion() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
    }

    ver = iOSversion();

    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        if (ver[0] <= 10) {
            $('body').addClass( "oldIos" );
        }
    }
});



    $(document.body).on('click','.copyright',function(){
        $(this).next(".copyright-content").fadeToggle(300, "linear");
    });

    $(document.body).on('click','.copyrightMask',function(){
        $(this).next(".copyrightMask-content").fadeToggle(300, "linear");
    });

    $(document.body).on('click','.copyrightCourseDetail',function(){
        $(this).next(".copyrightCourseDetail-content").fadeToggle(300, "linear");
    });

$(document).ready(function () {
    $(".imageLinkWrapper a").text("");

});


//Add values to top of select (Kursanmeldung)
$(document).ready(function () {
  var output = [];
  output.push('<option value="Österreich">Österreich</option>');
  output.push('<option value="Deutschland">Deutschland</option>');
  output.push('<option value="Schweiz">Schweiz</option>');
  output.push('<option value="Italien">Italien</option>');
  
  $('#powermail_field_country option[value=""]').after(output.join(''));
  
   
     $('#powermail_field_prefillsalutation').each(function () {
          if ($(this).val() == ('0')) {
              $("#powermail_field_salutation").prop("selectedIndex", 1);
          } else {
              $("#powermail_field_salutation").prop("selectedIndex", 0);
          }
      });
      
      $('#powermail_field_prefillcountry').each(function () {
          if ($(this).val() == ('13')) {
              $("#powermail_field_country").prop("selectedIndex", 1);
          } else {
              $("#powermail_field_country").prop("selectedIndex", 0);
          }
      });
  
});


/* MUSEUMS MAP EXT */
$(document).ready(function () {
    $('.tx-museums-map .museumsFilter .filterItem select[multiple]').each(function () {       
        $(this).SumoSelect({
            placeholder: $(this).attr('title'), 
            csvDispCount: 3, 
            captionFormat: '{0} '+$('div.selectedText').html(), 
            captionFormatAllSelected: '{0} '+$('div.selectedallText').html()
        });
    });
    
    $(document).on('change','.tx-museums-map .museumsFilter .filterItem select',function(){
        filterContainer = $(this).closest(".museumsFilter");
        var contentElement = filterContainer.parents('.tx-museums-map');
    var contentId = contentElement[0].id;
        var dropdown = $(this);
        var sumoSelect = dropdown.SumoSelect({
            placeholder: dropdown.attr('title'),
            csvDispCount: 3,
            captionFormat: '{0} '+$('div.selectedText').html(),
            captionFormatAllSelected: '{0} '+$('div.selectedallText').html(),
            triggerChangeCombined: true
        });  
        var clicked = dropdown.data('key');
        
        var filterObj = {
            'contentId':contentId,
            'clicked': clicked
    };
    filterContainer.find('select[multiple]').each(function(){
            var singleDropdown = $(this);
            var selected = singleDropdown.val();
            if(selected){
                filterObj[singleDropdown.data('key')] = selected;
            }
    });
        
        var url = contentElement.find('.ajaxCallUrl').data('url');
        console.log(filterObj);
        //location.href + (location.href.indexOf('?') == -1 ? '?' : '&') + 'type=2001'
        //console.log(url);
        $.ajax({
            url: location.href + (location.href.indexOf('?') == -1 ? '?' : '&') + 'type=2000',
            data: {
                "tx_museumsmap_museumsmap[filterObj]":filterObj
            },
            success: function(data){
                //replace sumoresult
                var replacements = $(data).find('.museumsItem');
                var resultContainer = contentElement.find('.museumsContainer.sumoResultContainer');
                resultContainer.find('.museumsItem').remove();
                resultContainer.append(replacements);
                
                if($('.all-map-sections._justMap_') && $('.all-map-tooltips._justMap_')){
                    var allMapSections = $(data).find('.all-map-sections').not("._justMap_");
                    var allMapTooltips = $(data).find('.all-map-tooltips').not("._justMap_");

                    $('.all-map-sections._justMap_').html(allMapSections.html());
                    $('.all-map-tooltips._justMap_').html(allMapTooltips.html());
                }

                //update select - filter
                $(data).find('select[multiple]').each(function(){
                    var resultDropdown = $(this);
                    var column = resultDropdown.data('key');
                    var originalSelect = filterContainer.find('select[data-key="'+column+'"]');
                    originalSelect.html(resultDropdown.html());
                    
                    if(originalSelect[0]){
                        originalSelect[0].sumo.reload();
                    }
                });  
                
                //update filter icons
                filterContainer.find('.filterItem.icons.Type').html($(data).find('.filterItem.icons.Type').children());
                filterContainer.find('.filterItem.icons.Topic').html($(data).find('.filterItem.icons.Topic').children());
                
                //replace locations
                var locations = $(data).find('.all-map-sections:not(._justMap_) .map-locations').html();
                if (locations) contentElement.find('.all-map-sections .map-locations').html(locations);
                
                //replace tooltip data
                var tooltipData = $(data).find('.all-map-tooltips:not(._justMap_)').html();
                if (tooltipData) contentElement.find('.all-map-tooltips').html(tooltipData);
                
                //update map
                initMap(); 


                //Show items
                $('.tx-museums-map').each(function (index, value) {
                    $(this).find('.btnShowMore').show();
                    museumsItem = $(this).find(".museumsItem").length;
                    visibleMuseumsItems = 5;

                    $(this).find('.museumsItem:lt(' + visibleMuseumsItems + ')').show();
                    if (museumsItem <= visibleMuseumsItems) {
                        $(this).find('.btnShowMore').hide();
                    }
                });
            }
    });
    });
    
    /* Filter Icons - Select */
    $('body').on('click', '.tx-museums-map .museumsFilter .filterItem.icons .icon', function() {
        $iconUid = $(this).data('uid');
        $museumsmapid = $(this).parents('.tx-museums-map'); 
        
        if($(this).hasClass('disabled')){
            //do nothing - cause not clickable
        }else{
            if($(this).hasClass('selected')){
                $museumsmapid.find('#filterTag option[value='+$iconUid+']').removeAttr('selected').change();
                $(this).removeClass('selected');
            }
            else{
                $museumsmapid.find('#filterTag option[value='+$iconUid+']').attr('selected','selected').change();
                $(this).addClass('selected');
            }
        }
   });
});

/*SHOW MORE MuseumsItems*/
$(document).ready(function () {
    $('.tx-museums-map').each(function (index, value) {
        museumsItem = $(this).find(".museumsItem").length;
        visibleMuseumsItems = 20;

        $(this).find('.museumsItem:lt(' + visibleMuseumsItems + ')').show();
        if (museumsItem <= visibleMuseumsItems) {
            $(this).find('.btnShowMore').hide();
        }
    });

    $('.tx-museums-map .btnShowMore').click(function () {
        $parentsystemlist = $(this).parent().parent();

        museumsItem = $parentsystemlist.find(".museumsItem").length;

        visibleMuseumsItems = (visibleMuseumsItems + 20 <= museumsItem) ? visibleMuseumsItems + 20 : museumsItem;
        $parentsystemlist.find('.museumsItem:lt(' + visibleMuseumsItems + ')').fadeIn("slow");
        if (visibleMuseumsItems == museumsItem) {
            $parentsystemlist.find('.btnShowMore').hide();
        }
    });

});
