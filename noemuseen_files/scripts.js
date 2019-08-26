function startGallery() {
     if ($('myGallery')) {
	    var myGallery = new gallery($('myGallery'), {
		    timed: true,
		    showArrows: false,
		    showCarousel: false,
		    embedLinks: false,
		    showInfopane: false
	    });
    }
     if ($('myGallery2')) {
	    var myGallery2 = new gallery($('myGallery2'), {
		    timed: true,
		    showArrows: false,
		    showCarousel: false,
		    embedLinks: false,
		    showInfopane: false
        });
    }
    if ($('myGallery3')) {
        var myGallery3 = new gallery($('myGallery3'), {
            timed: true,
            showArrows: false,
            showCarousel: false,
            embedLinks: false,
            showInfopane: false
        });
    }
    if ($('myGallery4')) {
        var myGallery4 = new gallery($('myGallery4'), {
            timed: true,
            showArrows: false,
            showCarousel: false,
            embedLinks: false,
            showInfopane: false
        });
    }
}

 function CryptMailto(omailadr)
    {
	
		var mailadr=omailadr.get('text')
        var n = 0;
        var r = "";
        var s = "mailto:"+mailadr;
        var e = mailadr;

        e = e.replace( /@/, "[at]");
        //e = e.replace( /\./g, " [dot] ");

        for( var i=0; i < s.length; i++ )
        {
            n = s.charCodeAt( i );
            if( n >= 8364 )
            {
                n = 128;
            }
            r += String.fromCharCode(n+1);
        }
	
        omailadr.setProperty('href','javascript:linkTo_UnCryptMailto("'+r+'");');
		omailadr.set('text',e);
      // return "<a href=\"javascript:linkTo_UnCryptMailto('"+ r +"');\">"+ e +"</a>";
    }


 function UnCryptMailto( s )
    {
        var n = 0;
        var r = "";
        for( var i = 0; i < s.length; i++)
        {
            n = s.charCodeAt( i );
            if( n >= 8364 )
            {
                n = 128;
            }
            r += String.fromCharCode( n - 1 );
        }
        return r;
    }

    function linkTo_UnCryptMailto( s )
    {
        location.href=UnCryptMailto( s );
    }

window.addEvent('domready', startGallery);
window.addEvent('domready', function(){
	
//<a href="javascript:linkTo_UnCryptMailto('nbjmup;uftuAuftu/bu');">test [at] test [dot] at</a>
	var emailadr=$('seite').getElements('a[href^=mailto:]');
	emailadr.each(function (o) {
	
		cryptadr=CryptMailto(o);
		//o.setProperty('href','javascript:linkTo_UnCryptMailto("'+cryptadr+'");');
	
	});
	
    if (Cookie.read('ksooe_merkliste')) Cookie.read('ksooe_merkliste').split(",").each(function (i, ind) {
        if (!Merkliste.contains(i.toInt())) Merkliste.include(i.toInt());
    })

 MooTools.lang.set('de-DE', 'Date', {
                months:    ['Januar', 'Februar', 'M&auml;rz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                days:      ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                dateOrder: ['date', 'month', 'year', '/']
        });
        MooTools.lang.setLanguage('de-DE');
        Date.defineParser('%d(.%m(.%Y)?)?')
        Date.defineParser('%H(:%M)')
        $$('input.datumeingabe').each(function(i){
                if(i.get('value')!='') i.set('value', Date.parse(i.get('value')).format('%d.%m.%Y'));
                i.addEvent('change',function(ev){
                       if(this.get('value')) this.set('value', Date.parse(this.get('value')).format('%d.%m.%Y'));
                })
			
                i.addEvent('focus',function(ev){
                        this.set('value', '');
                })

                i.addEvent('blur',function(ev){
                        // todo: restore okld date if date=''
                })


                i.store('kalender', new CalendarEightysix(i,  {  'draggable':false, 'startMonday': true,'prefill': false, 'format': '%d.%m.%Y', 'offsetX':-90,  'offsetY': 17, 'toggler': i.get('id') + '-picker', 'minDate': (new Date()),
                        'pickFunction': function(d){
                                i.set('value', d.format('%d.%m.%Y'));
                        }
                }));
		
        });


		
		
});




var afont = new Date();
afont = new Date(afont.getTime() + 1000 * 60 * 60 * 24 * 365);

function medium() {
    document.getElementById('CSS').href = 'css/medium.css';

    if ($('textplusminus')) {
        $('textplusminus').set('html', '<a href="javascript:large()"><img src="img/text_plus.gif" alt="Text gr��er" /></a><a href="javascript:smaller()"><img src="img/text_minus.gif" alt="Text kleiner" /></a>')
    }
    document.cookie = 'fontsizemuseum=medium; expires=' + afont.toGMTString() + ';';
    //Response.Cookies("fontsize")="medium"

}

function smaller() {
    document.getElementById('CSS').href = 'css/small.css';
    if ($('textplusminus')) {
        $('textplusminus').set('html', '<a href="javascript:medium()"><img src="img/text_plus.gif" alt="Text gr��er" /></a><img src="img/text_minus.gif" alt="Text kleiner" />')
    }
    document.cookie = 'fontsizemuseum=smaller; expires=' + afont.toGMTString() + ';';
    //alert(document.cookie);
    //Response.Cookies("fontsize")="smaller"

}

function large() {
    document.getElementById('CSS').href = 'css/large.css';
    if ($('textplusminus')) {
        $('textplusminus').set('html', '<img src="img/text_plus.gif" alt="Text gr��er" /><a href="javascript:medium()"><img src="img/text_minus.gif" alt="Text kleiner" /></a>')
    }
    document.cookie = 'fontsizemuseum=large; expires=' + afont.toGMTString() + ';';
    //Response.Cookies("fontsize")="large"

}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}


var Merkliste = [];
var MerklisteC;
function EventMerkenUmschalten(sender, vid) {
    sender = $(sender);
    var kontrast;
    var kontrast_zusatz = ""

    kontrast = GetCookie('MUSEUMkontrast');

       
    if (kontrast != "kontrast0") {
        kontrast_zusatz = "_"+kontrast;
    }
    if (Merkliste.contains(vid)) {
        Merkliste.erase(vid);
        MerklisteC = Cookie.write('ksooe_merkliste', Merkliste.join(','));
        sender.set('src', 'img/icon-add-note.png');
    } else {
        Merkliste.include(vid);
        MerklisteC = Cookie.write('ksooe_merkliste', Merkliste.join(','));
        sender.set('src', 'img/icon-note-saved.png');
    }

}


function MerklisteLeeren() {
    Merkliste = [];
    MerklisteC = Cookie.write('ksooe_merkliste', '');
    MerklisteC.dispose();
}



function RefreshImage(valImageId) {
	var objImage = document.images[valImageId];
	if (objImage == undefined) {
		return;
	}
	var now = new Date();
	objImage.src = objImage.src.split('?')[0] + '?x=' + now.toUTCString();
}
