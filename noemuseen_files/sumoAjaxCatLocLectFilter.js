//filter action ajax

var catsArray = new Array();
var locationArray = new Array();
var lectureArray = new Array();
var dimcatsArray = new Array();
var dimcontsArray = new Array();
var fegrpcatsArray = new Array();
var changedObject = '';
var nextPageNum = 1;
var firstLoadFlag = true;
var nextLinkDynamic = location.href;
var locationUrl = '';
var collectedLink = '';
var dimContentId = '';
var grid;


var uniqueClass='';
var dimContentId = '';
var gridItem ='';
var gridSizer = '';
var paginationNext = '';
var scrollerStatus = '';
var pagination = '';
var newgrid= new Array();
var uniqueClassArray =  new Array();
var indexArray = new Array();
var $newgrid= new Array();
var returnValCache = '';
 
$(window).load(function () {
	
    $grid = '';
    $infiniteScroll = '';
    locationUrl = location.href;
	
    collectedLink = locationUrl.substring(0, locationUrl.indexOf('&'));
	dimContentId = $('.helpinghand').data('dimcontentid');
	
    
    $('.sumoListCats').SumoSelect({
        csvDispCount: 2,
        captionFormat: '{0} ' + $(".optionsselected").html(),
        captionFormatAllSelected: '{0} ' + $(".allselected").html(),
        placeholder: $(".selectcategory").html(),
        triggerChangeCombined: true,
    });
    $('.sumoListLocs').SumoSelect({
        csvDispCount: 2,
        captionFormat: '{0} ' + $(".optionsselected").html(),
        captionFormatAllSelected: '{0} ' + $(".allselected").html(),
        placeholder: $(".selectlocation").html(),
        triggerChangeCombined: true,
    });
    $('.sumoListLecs').SumoSelect({
        csvDispCount: 2,
        captionFormat: '{0} ' + $(".optionsselected").html(),
        captionFormatAllSelected: '{0} ' + $(".allselected").html(),
        placeholder: $(".selectlecturer").html(),
        triggerChangeCombined: true,
    });
    $('.categoriescontdim').SumoSelect({
        csvDispCount: 2,
        captionFormat: '{0} ' + $(".optionsselected").html(),
        captionFormatAllSelected: '{0} ' + $(".allselected").html(),
        placeholder: $(".selectcategory").html(),
        triggerChangeCombined: true,
    });
    $('.contactsdim').SumoSelect({
        csvDispCount: 2,
        captionFormat: '{0} ' + $(".optionsselected").html(),
        captionFormatAllSelected: '{0} ' + $(".allselected").html(),
        placeholder: $(".selectcategory").html(),
        triggerChangeCombined: true,
    });
    $('.feusergropcats').SumoSelect({
        csvDispCount: 2,
        captionFormat: '{0} ' + $(".optionsselected").html(),
        captionFormatAllSelected: '{0} ' + $(".allselected").html(),
        placeholder: $(".selectcategory").html(),
        triggerChangeCombined: true,
    });
	infiscroll();
    var preselcats = $(".preselcats").html();
    var triggerchange = 0;
    if (preselcats) {
        catsArray = preselcats.split(",");
        $(".sumoListCats option").each(function () {
            if ($.inArray($(this).val(), catsArray) != -1) {
                $('select.sumoListCats')[0].sumo.selectItem($(this).index());
                triggerchange = 1;
            }
        });
    }

    var preseloc = $(".preseloc").html();

    if (preseloc) {
        locationArray = preseloc.split(",");
        $(".sumoListLocs option").each(function () {
            if ($.inArray($(this).val(), locationArray) != -1) {
                $('select.sumoListLocs')[0].sumo.selectItem($(this).index());
                triggerchange = 1;
            }
        });

    }

    var preselect = $(".preselect").html();
	
    if (preselect) {
        lectureArray = preselect.split(",");
        $(".sumoListLecs option").each(function () {
            if ($.inArray($(this).val(), lectureArray) != -1) {
                $('select.sumoListLecs')[0].sumo.selectItem($(this).index());
                triggerchange = 1;
            }
        });
        
    }

    var preseldimcats = $(".preseldimcats").html();
	//alert(preseldimcats);
    if (preseldimcats) {
        dimcatsArray = preseldimcats.split(",");
        $(".categoriescontdim option").each(function () {
            if ($.inArray($(this).val(), dimcatsArray) != -1) {
				
                $('select.categoriescontdim')[0].sumo.selectItem($(this).index());
                triggerchange = 1;
            }

        });
    }
	
    var preseldimconts = $(".preseldimconts").html();
	
    if (preseldimconts) {
        dimcontsArray = preseldimconts.split(",");
        $(".contactsdim option").each(function () {
            if ($.inArray($(this).val(), dimcontsArray) != -1) {
				
                $('select.contactsdim')[0].sumo.selectItem($(this).index());
                triggerchange = 1;
            }
        });
    }

    var preselfegrpcats = $(".fegrpcatss").html();
    if (preselfegrpcats) {
        fegrpcatsArray = preselfegrpcats.split(",");
        $(".feusergropcats option").each(function () {
            if ($.inArray($(this).val(), fegrpcatsArray) != -1) {
                $('select.feusergropcats')[0].sumo.selectItem($(this).index());
                triggerchange == 1
            }
        });
    }
	
    // code for sumo select re-direction
    if (triggerchange == 1) {
		
        sumoFilter('');
    }
    $('.sumoListCats').change(function () {
        
        sumoFilter('cat');

    });
    $('.sumoListLocs').change(function () {
        
        sumoFilter('loc');

    });
    $('.sumoListLecs').change(function () {
        
        sumoFilter('lect');

    });
    $('.categoriescontdim').change(function () {
       
        sumoFilter('dimcats');
    });
    $('.contactsdim').change(function () {     
    //$('.categoriescontdim').change(function () {     
        sumoFilter('contacts');
    });
    $('.feusergropcats').change(function () {
        sumoFilter('feusergroup');
    });

    

	
    firstLoadFlag = false;
	
	
	$(document).on("click",".readMore",function(e){		
		e.preventDefault();
		
		Cookies.set('cursorPos', $('html,body').prop('scrollHeight')+'#'+e.pageY);
		
		location.href=$(this).prop('href');
	});	
	
	if(typeof Cookies.get('cursorPos') != 'undefined' && $('.grid')[0]){
		//$('body').css('height', 'auto');
		
		
		var backPos = Cookies.get('cursorPos');
		var backPosArr = backPos.split('#');
		
		console.log(backPosArr);
		console.log('docHightDom'+$(document).height());
		//$(document).offset({top: backPosArr[1], left: backPosArr[0]});
		$('body,html').animate({scrollTop: backPosArr[0]},'slow');
		//$('.grid').scrollTop(backPosArr[1]);
		//document.cookie = 'cursorPos=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		//Cookies.clear('cursorPos');
	}
	
});



function infiscroll() { 
	var nextpage = $('.helpinghand').data('nextpage');
	var allcount = $('.helpinghand').data('allcount');
	
	if($('.grid').length>1){
		$('.grid').each(function(){
			uniqueClassArray.push($(this).attr('class').split(' ')[2]);
		});

		for(i=0;i<uniqueClassArray.length;i++){			
			//if(i == 0){			
			dimContentId = parseInt($('.'+uniqueClassArray[i]).find('.helpinghand').data('dimcontentid'));
			indexArray[dimContentId] = 1;
			$('.'+uniqueClassArray[i]+' .pagination__next').prop('href', collectedLink + '&no_cache=1&type=2000&catsIds='+$.trim(catsArray)+'&locIds='+$.trim(locationArray)+'&lectIds='+$.trim(lectureArray)+'&dimcatsIds='+$.trim(dimcatsArray)+'&dimcontIds='+$.trim(dimcontsArray)+'&fegrpcatsIds='+$.trim(fegrpcatsArray)+'&changedObject='+$.trim(changedObject)+'&e=3'+'&dimContentId='+dimContentId+'&nextpage='+indexArray[dimContentId]);
			indexArray[dimContentId] ++;
			newgrid[dimContentId] = $('.'+uniqueClassArray[i]).masonry({
				itemSelector: '.'+uniqueClassArray[i]+' '+'.grid-item',
				columnWidth: '.'+uniqueClassArray[i]+' '+'.grid-sizer',
				percentPosition: true,
				gutter: 48
			});
			var msnry = newgrid[dimContentId].data('masonry');
			//console.log(indexArray);
			// init Infinite Scroll
			newgrid[dimContentId].infiniteScroll({
				//path: getNextpath, //'.pagination__next',				
				path: function(){
						return $('.tx_dimcontacts'+dimContentId.toString()+' .pagination__next').prop('href');
					  },					  
				//nextSelector: '.'+uniqueClassArray[i]+' .pagination__next',
				responseType: 'text',
				outlayer: msnry,
				status: '.'+uniqueClassArray[i]+' .scroller-status',
				hideNav: '.'+uniqueClassArray[i]+' .pagination',
				history: true,
				scrollThreshold: 800
			});
			
			newgrid[dimContentId].on( 'request.infiniteScroll', function( event, path ) {
				var xEventClass = event.currentTarget.className.split(' ')[2];
				var xContentId = parseInt(xEventClass.replace('tx_dimcontacts', ''));
				path = collectedLink + '&no_cache=1&type=2000&catsIds='+$.trim(catsArray)+'&locIds='+$.trim(locationArray)+'&lectIds='+$.trim(lectureArray)+'&dimcatsIds='+$.trim(dimcatsArray)+'&dimcontIds='+$.trim(dimcontsArray)+'&fegrpcatsIds='+$.trim(fegrpcatsArray)+'&changedObject='+$.trim(changedObject)+'&dimContentId='+xContentId+'&nextpage='+indexArray[xContentId];
			});
			
			newgrid[dimContentId].on('load.infiniteScroll', function (event, returnVal, path) {
				//console.log('Path >>>'+path+' >>> '+returnVal);				
				var xEventClass = event.currentTarget.className.split(' ')[2];
				var xContentId = parseInt(xEventClass.replace('tx_dimcontacts', ''));
				console.log(xEventClass+' >>> '+path);
				//console.log(xContentId);				
				if(returnValCache != returnVal){
					//console.log('Cache01:: '+returnValCache);
					var returnValParsed = JSON.parse(returnVal);
					$.each(returnValParsed.contacts, function (optIndex, value) {
						$item = $(value);					
						newgrid[xContentId].infiniteScroll('appendItems', $item).masonry('appended', $item);
						newgrid[xContentId].masonry('layout');
					});

					//$('.'+uClass+' '+'.pagination__next').prop('href', collectedLink + '&no_cache=1&type=2000&catsIds=' + $.trim(catsArray) + '&locIds=' + $.trim(locationArray) + '&lectIds=' + $.trim(lectureArray) + '&dimcatsIds=' + $.trim(dimcatsArray) + '&dimcontIds=' + $.trim(dimcontsArray) + '&fegrpcatsIds=' + $.trim(fegrpcatsArray) + '&changedObject=' + $.trim(changedObject) + '&e=3' + '&nextpage=' +nP+ '&dimContentId=' + dimContentId);
					$('.'+xEventClass+' .pagination__next').prop('href', collectedLink + '&no_cache=1&type=2000&catsIds='+$.trim(catsArray)+'&locIds='+$.trim(locationArray)+'&lectIds='+$.trim(lectureArray)+'&dimcatsIds='+$.trim(dimcatsArray)+'&dimcontIds='+$.trim(dimcontsArray)+'&fegrpcatsIds='+$.trim(fegrpcatsArray)+'&changedObject='+$.trim(changedObject)+'&dimContentId='+xContentId+'&nextpage='+indexArray[xContentId]);
					indexArray[xContentId] ++;
					//console.log(indexArray);
					
					returnValCache = returnVal;
					//console.log('Cache02:: '+returnValCache);
				}
				//dimContentId = xContentId;
				//nP++;
				//console.log(nP);

				
				/*
				if (collectedLink){
				console.log('content id--'+dimContentId);
				console.log('unique--'+uClass);
				console.log('path--'+path);
				$('.'+uClass+' '+'.pagination__next').prop('href', collectedLink + '&no_cache=1&type=2000&catsIds=' + $.trim(catsArray) + '&locIds=' + $.trim(locationArray) + '&lectIds=' + $.trim(lectureArray) + '&dimcatsIds=' + $.trim(dimcatsArray) + '&dimcontIds=' + $.trim(dimcontsArray) + '&fegrpcatsIds=' + $.trim(fegrpcatsArray) + '&changedObject=' + $.trim(changedObject) + '&e=3' + '&nextpage=' +nP+ '&dimContentId=' + dimContentId);
				}else{
				//alert('there');
				$('.'+uClass+' '+'.pagination__next').prop('href', locationUrl + '?no_cache=1&type=2000&catsIds=' + $.trim(catsArray) + '&locIds=' + $.trim(locationArray) + '&lectIds=' + $.trim(lectureArray) + '&dimcatsIds=' + $.trim(dimcatsArray) + '&dimcontIds=' + $.trim(dimcontsArray) + '&fegrpcatsIds=' + $.trim(fegrpcatsArray) + '&changedObject=' + $.trim(changedObject) + '&e=3' + '&nextpage=' +nP+ '&dimContentId=' + dimContentId);
				}
				*/
				
				//$('.'+uClass+' '+'.helpinghand').prop('data-nextpage', indexArray[dimContentId]);

			//nextPageNum='';
			}); 
			// j++;

			//}
		}
		//console.log(newgrid);

	}
	else{

	grid = $('.grid').masonry({
	itemSelector: '.grid-item',
	columnWidth: '.grid-sizer',
	percentPosition: true,
	gutter: 48
	});
	var msnry = grid.data('masonry');


	// init Infinite Scroll
	grid.infiniteScroll({
	// Infinite Scroll options...
	path: getNextPagePath, //'.pagination__next',
	nextSelector: '.pagination__next',

	responseType: 'text',

	outlayer: msnry,
	status: '.scroller-status',
	hideNav: '.pagination',
	history: false,
	scrollThreshold: 800
	});

	grid.on('load.infiniteScroll', function (event, returnVal, path) {

	var returnValParsed = JSON.parse(returnVal);

	$.each(returnValParsed.courses, function (optIndex, value) {
		$item = $(value);
		if($item.hasClass("_test")){
			
		}
		else{
			grid.infiniteScroll('appendItems', $item).masonry('appended', $item);
		}
	});
	$.each(returnValParsed.contacts, function (optIndex, value) {
	$item = $(value);
	grid.infiniteScroll('appendItems', $item).masonry('appended', $item);
	});
	$.each(returnValParsed.users, function (optIndex, value) {
	$item = $(value);
	grid.infiniteScroll('appendItems', $item).masonry('appended', $item);
	});  
	$.each(returnValParsed.lectures, function (optIndex, value) {
	$item = $(value);
	grid.infiniteScroll('appendItems', $item).masonry('appended', $item);
	});
	grid.masonry('layout');
	nextPageNum++;



	if (collectedLink) {
	$('.pagination__next').prop('href', collectedLink + '&no_cache=1&type=2000&catsIds=' + $.trim(catsArray) + '&locIds=' + $.trim(locationArray) + '&lectIds=' + $.trim(lectureArray) + '&dimcatsIds=' + $.trim(dimcatsArray) + '&dimcontIds=' + $.trim(dimcontsArray) + '&fegrpcatsIds=' + $.trim(fegrpcatsArray) + '&changedObject=' + $.trim(changedObject) + '&e=3' + '&nextpage=' + nextPageNum);
	} else {
	$('.pagination__next').prop('href', locationUrl + '?no_cache=1&type=2000&catsIds=' + $.trim(catsArray) + '&locIds=' + $.trim(locationArray) + '&lectIds=' + $.trim(lectureArray) + '&dimcatsIds=' + $.trim(dimcatsArray) + '&dimcontIds=' + $.trim(dimcontsArray) + '&fegrpcatsIds=' + $.trim(fegrpcatsArray) + '&changedObject=' + $.trim(changedObject) + '&e=3' + '&nextpage=' + nextPageNum);
	}

	$('.helpinghand').prop('data-nextpage', nextPageNum);

	if(typeof Cookies.get('cursorPos') != 'undefined' && $('.grid')[0]){

	var backPos = Cookies.get('cursorPos');
	var backPosArr = backPos.split('#');

	//console.log('Console01 - Top:: '+backPosArr[0]+' PageH:: '+$(document).height()+' Scroll:: '+backPosArr[1]);

	if(($(document).height()+1) < backPosArr[0]){

	$('body,html').animate({scrollTop: backPosArr[0]},'slow');
	console.log('cookie'+backPosArr[0]);
	console.log('docHight'+$(document).height());
	}else{
	console.log('no'+backPosArr[1]);
	console.log('dochightno'+$(document).height());
	$('body,html').animate({scrollTop: (backPosArr[1] - 400)},'slow');
	//$('body,html').stop().animate();
	document.cookie = 'cursorPos=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}

	}
	});

	}
}

function getNextPagePath() {
    return $('.pagination__next').prop('href');
}
function getNextpath() {
	//alert($('.'+className).find('.pagination_'+dimContentId).prop('href'));
    //return $('.'+className).find('.pagination_'+dimContentId).prop('href'); ,dimContentId
    //console.log('I:: '+i+' Link:: '+$('.'+uniqueClassArray[i]).find('.pagination_'+dimContentId).prop('href'));
    //return $('.'+uniqueClassArray[i]).find('.pagination_'+dimContentId).prop('href');
    return $('.'+uniqueClassArray[i]+' .pagination__next').prop('href');
    //return collectedLink+'&no_cache=1&nextpage='+nextPageNum;
}

function sumoFilter(changedObject) {
	console.log("test");
	catsArray = new Array();
	locationArray = new Array();
	lectureArray = new Array();
	dimcatsArray = new Array();
	dimcontsArray = new Array();
	fegrpcatsArray = new Array();
		
		
	$(".sumoListCats option:selected").each(function () {
		if ($(this).val() != '') {
		  catsArray.push($(this).val());
		}
	});

	$(".sumoListLocs option:selected").each(function () {
		if ($(this).val() != '') {
		  locationArray.push($(this).val());
		}
	});

	$(".sumoListLecs option:selected").each(function () {
		if ($(this).val() != '') {
		  lectureArray.push($(this).val());
		}
	});
	$(".categoriescontdim option:selected").each(function () {
		if ($(this).val() != '') {
		  dimcatsArray.push($(this).val());
		}
	});

	$(".contactsdim option:selected").each(function () {
		if ($(this).val() != '') {
		  dimcontsArray.push($(this).val());
		}
	});
	
	$(".feusergropcats option:selected").each(function () {
		if ($(this).val() != '') {
		  fegrpcatsArray.push($(this).val());
		}
	});
	$.ajax({
		url: location.href + (location.href.indexOf('?') == -1 ? '?' : '&') + 'type=2000&param=catloclect',
		type: 'GET',
		data: {'catsIds': $.trim(catsArray), 'locIds': $.trim(locationArray), 'lectIds': $.trim(lectureArray), 'dimcatsIds': $.trim(dimcatsArray), 'dimcontIds': $.trim(dimcontsArray), 'fegrpcatsIds': $.trim(fegrpcatsArray), 'changedObject': $.trim(changedObject)},
		async: false,
		success: function (returnVal) {

			$(".lehrganggrid").html("");


			nextPageNum = 1;
			if (collectedLink) {
				$('.pagination__next').prop('href', collectedLink + '&no_cache=1&type=2000&catsIds=' + $.trim(catsArray) + '&locIds=' + $.trim(locationArray) + '&lectIds=' + $.trim(lectureArray) + '&dimcatsIds=' + $.trim(dimcatsArray) + '&dimcontIds=' + $.trim(dimcontsArray) + '&fegrpcatsIds=' + $.trim(fegrpcatsArray) + '&changedObject=' + $.trim(changedObject) + '&e=2' + '&nextpage=' + nextPageNum);
			} else {
				$('.pagination__next').prop('href', locationUrl + '?no_cache=1&type=2000&catsIds=' + $.trim(catsArray) + '&locIds=' + $.trim(locationArray) + '&lectIds=' + $.trim(lectureArray) + '&dimcatsIds=' + $.trim(dimcatsArray) + '&dimcontIds=' + $.trim(dimcontsArray) + '&fegrpcatsIds=' + $.trim(fegrpcatsArray) + '&changedObject=' + $.trim(changedObject) + '&e=2' + '&nextpage=' + nextPageNum);
			}

			var catchange = 0;
			var locchange = 0;
			var lecchange = 0;
			var dimcontacts = 0;
			var dimcats = 0;
			// JSON decode
			if (typeof grid != "undefined") { 
				$('.grid-item').each(function () {
				   grid.masonry('remove', this).masonry('layout');
				});
				var returnValParsed = JSON.parse(returnVal);
			   
			   console.log(returnValParsed);
				//category disable
				if (returnValParsed.getvariables.changedObject == 'cat') {
					locchange = 1;
					lecchange = 1;
				}
				if (returnValParsed.getvariables.changedObject == 'loc') {
					catchange = 1;
					lecchange = 1;
				}
				if (returnValParsed.getvariables.changedObject == 'lect') {
					catchange = 1;
					locchange = 1;
				}
				if (returnValParsed.getvariables.changedObject == 'dimcats') {
					dimcontacts = 1;
				}
				if (returnValParsed.getvariables.changedObject == 'contacts') {
					dimcats = 1;
				}
				if (catchange == 1) {
					var tempActiveCatIndex = new Array();
					$.each(returnValParsed.cats, function (optIndex, value) {
						tempActiveCatIndex.push(optIndex);
					});
					var preCats = '' + returnValParsed.getvariables.catsIds;
					var preSelCat = preCats.split(',');
					var captionText = new Array();
					$(".sumoListCats option").each(function () {
						if ($.inArray($(this).val(), tempActiveCatIndex) != -1) {
							$('.sumoListCats')[0].sumo.enableItem($(this).index());
							if ($.inArray($(this).val(), preSelCat) != -1) {
								arrThis = this;
								$('#filterBoxCategory ul.options').find('li').each(function () {
									if ($(this).text() == $(arrThis).text()) {
										$(this).addClass('selected');
										captionText.push($(this).text());
									}
								});
							}

						} else {
							if ($(this).val() != '') {
								$('.sumoListCats')[0].sumo.disableItem($(this).index());
							} else {
								//do nothing
							}
						}
					});
				}
				if (locchange == 1) {
					var tempActiveLocIndex = new Array();
					$.each(returnValParsed.location, function (optIndex, value) {
						tempActiveLocIndex.push(optIndex);
					});
					var preLocs = '' + returnValParsed.getvariables.locIds;
					var preSelLoc = preLocs.split(',');

					var captionText = new Array();
					$(".sumoListLocs option").each(function () {

						if ($.inArray($(this).val(), tempActiveLocIndex) != -1) {
							$('.sumoListLocs')[0].sumo.enableItem($(this).index());
							if ($.inArray($(this).val(), preSelLoc) != -1) {
								arrThis = this;
								$('#filterBoxLocation ul.options').find('li').each(function () {

									if ($(this).text() == $(arrThis).text()) {
										$(this).addClass('selected');
										captionText.push($(this).text());
									}
								});
							}

						} else {
							if ($(this).val() != '') {
								$('.sumoListLocs')[0].sumo.disableItem($(this).index());
							} else {
								//do nothing
							}
						}
					});
				}
				if (lecchange == 1) {
					var tempActiveLecIndex = new Array();
					$.each(returnValParsed.lecture, function (optIndex, value) {
						tempActiveLecIndex.push(optIndex);
					});
					var preLecs = '' + returnValParsed.getvariables.lectIds;
					var preSelLec = preLecs.split(',');

					var captionText = new Array();
					$(".sumoListLecs option").each(function () {
						if ($.inArray($(this).val(), tempActiveLecIndex) != -1) {
							$('.sumoListLecs')[0].sumo.enableItem($(this).index());
							if ($.inArray($(this).val(), preSelLec) != -1) {
								arrThis = this;
								$('#filterBoxLecturer ul.options').find('li').each(function () {
									if ($(this).text() == $(arrThis).text()) {
										$(this).addClass('selected');
										captionText.push($(this).text());
									}
								});
							}

						} else {
							if ($(this).val() != '') {
								$('.sumoListLecs')[0].sumo.disableItem($(this).index());
							} else {
								//do nothing
							}
						}
					});
				}

				if (dimcontacts == 1) {
					var tempActiveContactIndex = new Array();
					$.each(returnValParsed.dimContacts, function (optIndex, value) {
						tempActiveContactIndex.push(optIndex);
					});
					var preDimConts = '' + returnValParsed.getvariables.dimcontIds;
					var preSelDimConts = preDimConts.split(',');

					var captionText = new Array();
					$(".contactsdim option").each(function () {
						if ($.inArray($(this).val(), tempActiveContactIndex) != -1) {
							$('.contactsdim')[0].sumo.enableItem($(this).index());
							if ($.inArray($(this).val(), preSelDimConts) != -1) {
								arrThis = this;
								$('#filterBoxdimContacts ul.options').find('li').each(function () {
									if ($(this).text() == $(arrThis).text()) {
										$(this).addClass('selected');
										captionText.push($(this).text());
									}
								});
							}

						} else {
							if ($(this).val() != '') {
								$('.contactsdim')[0].sumo.disableItem($(this).index());
							} else {
								//do nothing
							}
						}
					});
				}

				if (dimcats == 1) {
					var tempActiveDimCatIndex = new Array();
					$.each(returnValParsed.dimCats, function (optIndex, value) {
						tempActiveDimCatIndex.push(optIndex);
					});
					var preDimCats = '' + returnValParsed.getvariables.dimcatsIds;
					var preSelDimCats = preDimCats.split(',');

					var captionText = new Array();
					$(".categoriescontdim option").each(function () {
						if ($.inArray($(this).val(), tempActiveDimCatIndex) != -1) {
							$('.categoriescontdim')[0].sumo.enableItem($(this).index());
							if ($.inArray($(this).val(), preSelDimCats) != -1) {
								arrThis = this;
								$('#filterBoxdimCategoryusergrp ul.options').find('li').each(function () {
									if ($(this).text() == $(arrThis).text()) {
										$(this).addClass('selected');
										captionText.push($(this).text());
									}
								});
							}

						} else {
							if ($(this).val() != '') {
								$('.categoriescontdim')[0].sumo.disableItem($(this).index());
							} else {
								//do nothing
							}
						}
					});
				}

				$.each(returnValParsed.courses, function (optIndex, value) {
					$item = $(value);
					if($item.hasClass("_test")){
						$(".lehrganggrid").append($item);
					}
					else{
						grid.infiniteScroll('appendItems', $item).masonry('appended', $item);
					}
					
				});
				$.each(returnValParsed.contacts, function (optIndex, value) {
					$item = $(value);
					grid.infiniteScroll('appendItems', $item).masonry('appended', $item);
				});
				$.each(returnValParsed.users, function (optIndex, value) {
					$item = $(value);
					grid.infiniteScroll('appendItems', $item).masonry('appended', $item);
				});


				
			}

		},
		error: function () {
			$('.grid').html('!!ERROR!!');
		}
	});
       
}
