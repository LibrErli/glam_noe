document.domain = 'noemuseen.at';
//Querystring
function encode_utf8(s){
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s){
  return decodeURIComponent( escape(s));
}


function QS(A){this.params={};if(A==null){A=location.search.substring(1,location.search.length)}if(A.length==0){return }A=A.replace(/\+/g," ");var C=A.split(/[&;]/);for(var D=0;D<C.length;D++){var F=C[D].split("=");var B=encodeURIComponent(F[0]);var E=(F.length==2)?encodeURIComponent(F[1]):B;this.params[B]=E}}QS.prototype.get=function(A,B){var C=this.params[A];return(C!=null)?C:B};QS.prototype.contains=function(A){var B=this.params[A];return(B!=null)};



var a = new Date();
var b = new Date();
var swcookies=document.cookie;
a = new Date(a.getTime() +1000*60*60);
b = new Date(b.getTime() -1000*60*60*24);
var mFx;
var map;

function startKarte() {

    map = new google.maps.Map(document.getElementById('dmkarte'), {
           center: {lat: 48.19800212, lng: 15.76196289},
           zoom : 8,
           //mapTypeId : mapTypeIds[ 0 ],
		   mapTypeControl: false,
		   streetViewControl: false,
		   panControl: true,
		   zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE
			}
    });

 
	
	var infowindow = new google.maps.InfoWindow();
	
	
	

	
    var qs = new QS();
    var oids = [];
	var openwindow=false;
    if (parseInt(qs.get('oid')) > 0) {
        oids.include(qs.get('oid'));
		openwindow=true;
    } else {
        var dmListeEl = $$('#dmliste .el')
        dmListeEl.each(function (i, index) {
            oids.include(i.get('oid'));
        });
    }


    //jetzt die koordinaten holen
    var mapreq = new Request({
        url: 'dmajax.asp',
        method: 'get',
        onSuccess: function (T, X) {
            var a = JSON.decode(T);
            var qs = new QS();
            kat = qs.get('kat');
            tt = qs.get('tt');
            a.each(function (o) {
                if (o) {
                    var dmpoint = new google.maps.LatLng(o.lat, o.lng);
                    var dmmarker = new google.maps.Marker({
							position: dmpoint,
							map: map
					  });
					
                    var routenadr = o.adr;
					
                    if (routenadr != "") {
                        routenadr = routenadr.replace(/�/g, "oe");
                        routenadr = routenadr.replace(/�/g, "ss");
                        routenadr = routenadr.replace(/�/g, "ue");
                        routenadr = routenadr.replace(/�/g, "ae");
                    }
					google.maps.event.addListener(dmmarker,"click", function() {
						infowindow.setContent('<div id="blase">'+o.txt + '<br><br><a href="http://maps.google.at/?daddr=' + routenadr + '" target="_blank" class="extlink">zum Routenplaner</a><a href="default.asp?tt='+tt+'&oid='+o.oid+'" class="extlink">Details</a></div>');
						infowindow.open(map, this);	
					});
					if(openwindow==true){
						infowindow.setContent('<div id="blase">'+o.txt + '<br><br><a href="http://maps.google.at/?daddr=' + routenadr + '" target="_blank" class="extlink">zum Routenplaner</a><a href="default.asp?tt='+tt+'&oid='+o.oid+'" class="extlink">Details</a></div>');
						infowindow.open(map, this);
					}

				}
			});//each
		}
	})
	mapreq.send('ci=map&oids=' + oids);

}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


function holeSchlagworte(buchstabe){ //alle schlagworte zur auswahl stellen von tabelle mm_schlagworte
	var swreq = new Request({
		url: 'dmajax.asp',
		method: 'get',
		onSuccess: function (T, X) {
			var swProp,swName;
			$('swinputs').set('html',T);
			
			//Returns all input tags with names ending with 'schlagwort'.
			var inputsListe=$('swinputs').getElements('input[name$=schlagwort]');
			inputsListe.each(function (o) {
				
				if(readCookie(o.getProperty('name'))!=0 && readCookie(o.getProperty('name'))!=null){
					o.setProperty('checked','checked');
				}else{
					o.erase('checked');
				}
				o.addEvent('click',function(x){
					swProp = o.getProperty('checked');
					swName = o.getProperty('name');
					if(swProp){//cookie setzen
						document.cookie = ''+swName+'='+o.getProperty('value')+';  expires='+a.toGMTString()+';'; 
					}else{ //cookie zerst�ren
						document.cookie = ''+swName+'=0;  expires='+b.toGMTString()+';'; 

					}
				
				});
			});
		}
	})
	swreq.send('ci=sw&buchstabe='+buchstabe);


}


function makeClearing(){// die l�schfunktion bei den schlagworten museumsuche hinzuf�gen
	var swListeEl = $$('#swauswahl .clearsw');

	if (swListeEl.length>0){
		var swid = "";
		swListeEl.each(function(i, index){
			i.addEvent('click',function(x){
				swid=i.get('swid')
	
				if($(swid)){
					$(swid).destroy();
				}
				i.destroy();
				document.cookie = ''+swid+'=0;  expires='+b.toGMTString()+';';  //cookie l�schen
				if($('swinputs').getElement('input[name='+swid+']')){
					$('swinputs').getElement('input[name='+swid+']').erase('checked'); //sw in der box weghakerln
				}
			});

		});
	}
}

function setSwfromCookies(){

	var swProp="", cookiename;
	$('swauswahl').set('html',"");

	swcookies=document.cookie;
	while(swcookies.length>0){
		
		cookiename = swcookies.substring(0, swcookies.indexOf('=')).trim();
		if(swcookies.indexOf(';') != -1){
			cookiewert = swcookies.substring(swcookies.indexOf('=')+1,swcookies.indexOf(';'));
			swcookies=swcookies.substring(swcookies.indexOf(';')+1,swcookies.length);
		}else{cookiewert = swcookies.substr(swcookies.indexOf('=')+1,swcookies.length);
		swcookies="";
		}
		if(cookiename.indexOf('schlagwort')>=0){

			$('swauswahl').set('html',$('swauswahl').get('html')+'<div swid="'+cookiename+'" class="clearsw"></div><input id="'+cookiename+'" type="text" name="schlagwort" readonly="readonly" checked="checked" value="'+cookiewert+'" />')
		}
	}
	
	$('swauswahl').set('html',$('swauswahl').get('html')+'<br style="clear:both;"/>');
}

function dmmm(){
	var dmListeEl = $$('#dmliste .el')
	if (dmListeEl.length>0){
	
		var oids = []
		dmListeEl.each(function(i, index){
			oids.include(i.get('oid'));
		});

		var mmreq = new Request({
		    url: 'dmajax.asp',
		    method: 'get',
		    onSuccess: function (T, X) {
		        var a = eval(T)
		      //  var qs = new QS();
		      //  kat = qs.get('kat');
		      //  tt = qs.get('tt');


		        a.each(function (o) {
		            //alert(o.merkmale);
		            var mml = $('merkmale' + o.oid); //.set('html', 'aaa')
		            o.merkmale.each(function (mm) {
		                try {
		                    if (mm.id == 19 || mm.id == 21 || mm.id == 23 || mm.id == 24) if (mm.value != 'Nein') mml.set('html', mml.get('html') + '<div class="mm mm' + mm.id + '" title="' + mm.bez + '"></div>')
		                    
		                   

		                } catch (err) {
		                    //Handle errors here
		                }
		            });
		        });
		        $$('.leer').destroy();

		    } //onSuccess
		})
		mmreq.send('oids=' + oids);
	}//if
	
}



function Umkreissuche() {
    var qs = new QS();
    var qsparams = '', qsparamtt='';
    var umkreis = document.umkreissuche.umkreisR.value;
    var pgst = document.umkreissuche.pgstR.value;

	if (parseInt(qs.get('oid'))>0){
		qsparams = 'oids=' + qs.get('oid');
    }else if (parseInt(qs.get('musid')) > 0) {
		qsparams = 'musid=' + qs.get('musid');
	}
     $('ukdata').set('html', '<img src="img/loading.gif" alt="Daten werden geladen" />')



    if (qs.get('tt') != '') {
        qsparamtt = '&tt=' + qs.get('tt');
    }
    var hgaj = new Request({
		url: 'dmajax.asp', 
		method:'get',
		onSuccess : function(a, b){
			if(a){

			    $('ukdata').set('html', a)
			  			}
		}//function
	}).send('ci=umkreis&umkreis='+umkreis+'&pgst='+pgst+'&' + qsparams + qsparamtt + '&a=' + Math.random() )
	
	
};


function VAsuche() {
    var qs = new QS();
    var qsparams = '', qsparamtt = '';

    if (parseInt(qs.get('oid')) > 0) {
        qsparams = 'oids=' + qs.get('oid');
    }else if (parseInt(qs.get('musid')) > 0) {
		qsparams = 'musid=' + qs.get('musid');
	}
    $('vadata').set('html', '<img src="img/loading.gif" alt="Daten werden geladen" />')



    var hgaj = new Request({
        url: 'dmajax.asp',
        method: 'get',
        onSuccess: function (a, b) {
            if (a) {

                $('vadata').set('html', a)
            }
        } //function
    }).send('ci=va&' + qsparams  + '&a=' + Math.random())


};



function startGallery2() {
	var qs = new QS();
	var qsparams = '';
	if (parseInt(qs.get('oid'))>0){
		qsparams = 'oids=' + qs.get('oid');
	} else if (parseInt(qs.get('musid')) > 0) {
		qsparams = 'musid=' + qs.get('musid');
	}	
	
	
	var hgaj = new Request({
		url: 'dmajax.asp', 
		method:'get',
		onSuccess : function(a, b){
			if(a){

				$('dmGallery').set('html', a)
				if($('dmGallery').getChildren().length>1){
					var dmGallery = new gallery($('dmGallery'), {
	                    timed: true,
	                    showArrows: true,
	                    showCarousel: false,
	                    embedLinks: false,
	                    showInfopane: true
                    });
				}
			}
		}//function
	}).send('ci=gallery&' + qsparams + '&a=' + Math.random() )
	
	
};




function setgem(sender, wert, gemnr) {
    //$(txtid).set('value', v)

    $(sender).getParent('.gemListe').retrieve('form').set('value', wert);
    $('gemnr').set('value', gemnr)
}

function setgem2(sender, wert, gemnr) {
    //$(txtid).set('value', v)

    $(sender).getParent('.gemListe').retrieve('form').set('value', wert);
	$('gemnr2').set('value', '')
    $('gemnr2').set('value', gemnr)
}

function LadeGemListe(e) {
    e.stop();
    $('gemnr').set('value', '');
    rsaj = new Request({
        url: 'dmajax.asp',
        link: 'cancel',
        method: 'GET',
        onSuccess: function (html) {
            this.frm.retrieve('Liste').set('html', html);
            this.frm.retrieve('Liste').setStyle('visibility', 'visible')
        }
    })
    rsaj.frm = this
    rsaj.send('ci=gemliste&sstr=' + (this.value))
}

function LadeGemListe2(e) {
    e.stop();
    $('gemnr2').set('value', '');
    rsaj = new Request({
        url: 'dmajax.asp',
        link: 'cancel',
        method: 'GET',
        onSuccess: function (html) {
            this.frm.retrieve('Liste').set('html', html);
            this.frm.retrieve('Liste').setStyle('visibility', 'visible')
        }
    })
    rsaj.frm = this
    rsaj.send('ci=gemliste2&sstr=' + (this.value))
}













window.addEvent('domready', function () {
    //oids ansammeln
    dmmm()
    if ($('dmkarte')) {
        //mFx = new Fx.Morph('dmkarte', {duration: 500, link: 'cancel', transition: Fx.Transitions.linear});
        startKarte()
    }
	if($('swSearchTitel')){//bei museumssuche, schlagworte
		$('swSearchTitel').addEvent('click',function(i){
			//jetzt die schlagworte rausholen
			if($('swSearch')){
				
				$('swSearch').setStyle('display','block');				
			}
			if($('swinputs').get('html')==""){ //aber nur beim 1.mal
				$('swinputs').set('html','<img src="img/loading.gif" alt="wird geladen" />');
				holeSchlagworte('A');
			}
		});
	}
	if($('swauswahl')){
		setSwfromCookies();
		makeClearing();
	}
	
	if($('sw_abbrechen')){
		$('sw_abbrechen').addEvent('click',function(i){
			//ausblenden
			if($('swSearch')){
				$('swSearch').setStyle('display','none');				
			}
		});
		$('sw_fertig').addEvent('click',function(i){//auf Los geklickt
			//fertig gew�hlt
			if($('swSearch')){
				$('swSearch').setStyle('display','none');
			}
		
			setSwfromCookies();
			makeClearing();
		
			
		});
	}
	
	
	if($('lageKarte')){
		$('lageKarte').addEvents({
			'click': function () { 
				var elLage = $('lageKarte')
				var aktiv=(elLage.get('class'));
				if (aktiv=="zoom6"){
					$('lageKarteBild').set('src',elLage.get('zoom10'));
					elLage.set('class','zoom10')
				}
				if (aktiv=="zoom10"){
					$('lageKarteBild').set('src',elLage.get('zoom6'));
					elLage.set('class','zoom6')
				}
				
			}
		});
	
	}
    //wenn bilder vorhanden sind bei einem museum
    if ($('dmGallery')) startGallery2();



    //wenn rechts die box mit aktuellen Veranstaltungen zum Museum da ist
    if ($('vadata')) VAsuche();

    //wenn rechts die box mit umkreissuche da ist
    if ($('ukdata')) Umkreissuche();

    //ortssuche
    $$('input.gemsuche').each(function (i) {
        var c = i.getCoordinates($('content'));
        var gemListe = new Element('div', {
            'class': 'gemListe',
            'html': '',
            'styles': { 'top': c.top + c.height, 'left': c.left, 'width': c.width - 10 },
            'events': {
                'click': function () { this.setStyle('visibility', 'hidden') },
                'mouseenter': function () { this.setStyle('visibility', 'visible') },
                'mouseleave': function () { this.setStyle('visibility', 'hidden') }
            }
        });
        gemListe.inject($('content'));
        i.store('Liste', gemListe);
        gemListe.store('form', i)
        i.addEvent('keyup', LadeGemListe);
        i.addEvent('focus', LadeGemListe);
    })

    //Gemeindenliste f�r Ortsauswahl bei Umkreissuche 
    $$('input.gemsuche2').each(function (i) {
        var c = i.getCoordinates($('content'));
        var gemListe = new Element('div', {
            'class': 'gemListe',
            'html': '',
            'styles': { 'top': c.top + c.height, 'left': c.left, 'width': c.width - 10 },
            'events': {
                'click': function () { this.setStyle('visibility', 'hidden') },
                'mouseenter': function () { this.setStyle('visibility', 'visible') },
                'mouseleave': function () { this.setStyle('visibility', 'hidden') }
            }
        });
        gemListe.inject($('content'));
        i.store('Liste', gemListe);
        gemListe.store('form', i)
        i.addEvent('keyup', LadeGemListe2);
        i.addEvent('focus', LadeGemListe2);
    })


    //bei Auswahl von Umkreissuche rechts
    if ($('umkreisR')) {
        $('umkreisR').addEvents(
			{
			    'change': function () { Umkreissuche(''); }
			});

    }




    //dm_cont1=Besucherinformationen, dm_cont2=Hintergrundinformationen
    if ($('dm_cont1') || $('dm_cont2')) {

        multislide = new multislide('ms_container',
				{
				    slide_duration: 600,
				    slide_transition: 'quint:out',
				    class_toggler: 'control',

				    onExpand: function (el) {

				        el.set('html', el.firstChild.nodeValue + '<div class="toplink2"><img src="img/leer.gif" height="20" width="25" alt="ausblenden" /></div>');
				    },

				    onCollapse: function (el) {
				        el.set('html', el.firstChild.nodeValue + '<div class="toplink1"><img src="img/leer.gif" height="20" width="25" alt="anzeigen" /></div>');
				    }
				});

    }
	
	if($('boxlage')){
		 multislide2 = new multislide2('lagecontainer',
				{
				    slide_duration: 600,
				    slide_transition: 'quint:out',
				    class_toggler: 'control2'
				});
		multislide2.expand_all();

	}
	

});

	

