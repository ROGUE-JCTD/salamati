/**
 * Add all your dependencies here.
 *
 * @require widgets/Viewer.js
 * @require plugins/LayerTree.js
 * @require plugins/OLSource.js
 * @require plugins/OSMSource.js
 * @require plugins/WMSCSource.js
 * @require plugins/ZoomToExtent.js
 * @require plugins/NavigationHistory.js
 * @require plugins/Zoom.js
 * @require plugins/AddLayers.js
 * @require plugins/RemoveLayer.js
 * @require salamati/plugins/DistanceBearing.js
 * @require RowExpander.js
 * @require widgets/NewSourceDialog.js
 * @require plugins/FeatureManager.js
 * @require plugins/FeatureEditor.js
 * @require plugins/Navigation.js
 * @require plugins/SnappingAgent.js
 * @require OpenLayers/Format/WKT.js
 * @require OpenLayers/Control/MousePosition.js
 * @require OpenLayers/Control/ScaleLine.js
 * @require salamati/plugins/Settings.js
 * @require locale/en.js
 * @require locale/es.js
 * @require salamati/locale/en.js
 * @require salamati/locale/es.js
 */

Ext.lib.Ajax.useDefaultXhrHeader = false;

var nominatimUrl = 'http://192.168.10.168';

Ext.ns("salamati");
salamati.Viewer = Ext.extend(gxp.Viewer, {
	Map: "Default Map",
	Title_Tools: "Default Tools",
	Title_Search: "Default Search",
	Title_Geogit_History: "Default Geogit History",
	Search_Submit: "Default Go",
	ActionTip_Default: "Distance/Bearing of features from click location",
	ActionTip_Edit: "Get feature info"
});

var app;
var addressOfWPS = "http://geoserver.rogue.lmnsolutions.com/";

var WGS84;
var GoogleMercator;

var nameIndex;
var snappingAgent;

var toolWindowSavedPosition = null;

//the tool dock
var toolContainer = new Ext.Container({
    xtype: "container",
    id: "toolcont",
    hidden: true,
    cls: "toolContainer"
});

//the search dock
var searchContainer = new Ext.Container({
	xtype: "container",
	id: "searchcont",
	hidden: true,
	cls: "toolContainer searchContainer"
});

var searchWindow = null;

//the geogit history dock
var geogitHistoryContainer = new Ext.Container({
	xtype: "container",
	id: "geogithistorycont",
	hidden: true,
	cls: "toolContainer geogitHistoryContainer"
});

var geogitHistoryWindow = null;

var win = null;

var showSpinner = function(conn, options){
	console.log("showspinner");
};

var hideSpinner = function(conn, response, options){
	console.log("hidespinner");
};

var addGeogitHistoryToWindow = function(){
	var geogitHistoryPanel = Ext.get("geogitHistoryPanel");
	
	geogitHistoryPanel.createChild('<div id="geogitHistory" ng-controller="GitHistoryCtrl">' +
										'<input class="geogitHistoryQuery" ng-model="query">' +
										'<ul>' +
											'<li class="geogit-commit-history" ng-repeat="commit in history | filter:query">' +
												'<p>author: {{commit.author}}</p>' +
												'<p>commit: {{commit.commit}}</p>' +
												'<p>date: {{commit.date}}</p>' +
												'<p>email: {{commit.email}}</p>' +
												'<p>message: {{commit.message}}</p>' +
											'</li>' +
										'</ul>' +
									'</div>');
	
	angular.bootstrap(document.getElementById('geogitHistory'));
};

var zoomToPlace = function(lon, lat, left, bottom, right, top){
	var bounds = new OpenLayers.Bounds([left, bottom, right, top]);
	
	bounds.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
	console.log("zoomtobounds: ", bounds);
	app.mapPanel.map.zoomToExtent(bounds);
	
//	var lonlat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
//	app.mapPanel.map.panTo(lonlat);
	
	while(app.mapPanel.map.getZoom() > 17){
		app.mapPanel.map.zoomOut();
	}
};

var submitSearch = function(params){
	var urlParams = {
		format: 'json',
		q: params,
		callback: ''
	};
	
	nominatimUrl = nominatimURLField.getValue();
	
	var slash = '';
	console.log('last char: ' + nominatimUrl.charAt(nominatimUrl.length - 1));
	
	if(nominatimUrl.charAt(nominatimUrl.length - 1) != '/'){
		slash = '/';
	}
		
	var searchUrl = nominatimUrl + slash + 'search?' + Ext.urlEncode(urlParams);
	
	var spinnerHTML = '<p id="searchSpinner">Please wait while we search.</p>';
	
	var searchPanel = Ext.get("searchPanel");
	searchPanel.createChild(spinnerHTML);
	
	Ext.Ajax.request({
		url: searchUrl,
		timeout: 15000,
		success: function(result, request){
			var results = Ext.util.JSON.decode(result.responseText);
			var oldResults = document.getElementsByClassName('searchResults');
			
			if(oldResults.length){
				oldResults[0].parentNode.removeChild(oldResults[0]);
			}
			
			var spinner = document.getElementById("searchSpinner");
			spinner.parentNode.removeChild(spinner);
			
			if(results && results.length){
				var resultsHTML = '<div class="searchResults">';
				
				for(var i = 0; i < results.length; i++){
					console.log(results[i]);
					resultsHTML += '<div class="searchResult" ' + 
										'onclick="zoomToPlace(' + results[i].lon + ', ' +
										results[i].lat + ', ' + results[i].boundingbox[2] +
										', ' + results[i].boundingbox[0] + ', ' +
										results[i].boundingbox[3] + ', ' +
										results[i].boundingbox[1] + ')">' +
										'<span class="searchResultPlaceName">' +
											
											results[i].display_name + '</span>' +
									'</div>';
				}
				
				resultsHTML += '</div>';
				
				var searchPanel = Ext.get("searchPanel");
				searchPanel.createChild(resultsHTML);
			}
		},
		failure: function(result, request){
			console.log("error", result);
			var oldResults = document.getElementsByClassName('searchResults');
			
			if(oldResults.length){
				oldResults[0].parentNode.removeChild(oldResults[0]);
			}
			
			var spinner = document.getElementById("searchSpinner");
			spinner.parentNode.removeChild(spinner);
			
			var errorHTML = '<div class="searchResults">' +
								'<span class="searchResultsError">Error sending request</span>' +
								'<span class="searchResultsError">Check that your url is valid</span>' +
								'<span class="searchResultsError">ex. http://nominatim.openstreetmap.org</span>' +
							'</div>';
			
			var searchPanel = Ext.get("searchPanel");
			searchPanel.createChild(errorHTML);
		}
	});
};

var searchField = new Ext.form.TextField({
    xtype: "textfield",
    id: "searchField",
 //   cls: "searchFieldClass",
    height: "40",
    width: "400",
    emptyText: "Search",
    enableKeyEvents: true,
    listeners: {
   	 'keyup' : function(element, event){
   		 if(event.button == 12){
   			 submitSearch(element.getValue());
   		 }
   	 }
    }
});

var nominatimURLField = new Ext.form.TextField({
	xtype: "textfield",
	id: "nominatimURL",
	//cls: "nominatimURLClass",
	height: "40",
	width: "400",
	emptyText: "Nominatim Url",
	enableKeyEvents: true,
	listeners: {
		'keyup' : function(element, event){
			if(event.button == 12){
				submitSearch(searchField.getValue());
			}
		},
		'focus' : function(element, event){
			if(element.getValue() == ""){
				element.setValue('http://');
			}
		}
	}
});

Ext.onReady(function() {
	
	WGS84 = new OpenLayers.Projection("EPSG:4326");
	GoogleMercator = new OpenLayers.Projection("EPGS:900913");
	
    // load language setting from cookie if available
	var lang = "en";
	if (document.cookie.length > 0) {
		var cookieStart = document.cookie.indexOf("language=");
		
		if (cookieStart != -1) {
			cookieStart += "language".length + 1;
			cookieEnd = document.cookie.indexOf(";", cookieStart);
			
			if (cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}

			var lang2 = document.cookie.substring(cookieStart, cookieEnd);
			
			if (lang2) {
				lang = lang2;
			}
			console.log("---- App.onReady language setting found: ", lang);
		}
	}
	GeoExt.Lang.set(lang);


	win = new Ext.Window({
    	title: salamati.Viewer.prototype.Title_Tools,
    	id: "toolsWindow",
    	closeAction: "hide",
    	xtype: "window",
    	resizable: false,
    	layout: "fit",
    	items: [
        	{
            	xtype: "panel",
            	id: "toolsPanel",
            	cls: "mytoolwindowclass",
            	layout: "hbox",
            	layoutConfig: {
                	align: 'center',
                	padding: '5'
            	}
        	}
    	],
		listeners : {
			"beforehide" : function(element) {
				toolContainer.show();
			},
			"hide" : function(element) {
				document.cookie = "toolsWindowShow=false";
			},
			"show" : function(element) {
				document.cookie = "toolsWindowShow=true";
			},
			"move" : function(element) {
				document.cookie = "toolsWindowXY=" + element.x + "|" + element.y;
			}
		}
	});	

	
	searchWindow = new Ext.Window({
		title: salamati.Viewer.prototype.Title_Search,
		id: "searchWindow",
		closeAction: "hide",
		xtype: "window",
		layout: "fit",
		autoScroll: true,
		items: [
		  {
			  xtype: "panel",
			  id: "searchPanel",
			  cls: "mysearchwindowclass",
			  layout: "form",
			  layoutConfig: {
				  align: 'center',
				  padding: '5'
			  },
			  items: [
			     nominatimURLField, 
			     searchField
			  ]
		  }
		],
		listeners : {
			"beforehide" : function(element) {
				searchContainer.show();
			},
			"hide" : function(element) {
				document.cookie = "searchWindowShow=false";
			},
			"show" : function(element) {
				document.cookie = "searchWindowShow=true";
			},
			"move" : function(element) {
				document.cookie = "searchWindowXY=" + element.x + "|" + element.y;
			}
		}
	});
	
	geogitHistoryWindow = new Ext.Window({
		title: salamati.Title_Geogit_History,
		id: "geogitHistoryWindow",
		closeAction: "hide",
		xtype: "window",
		layout: "fit",
		autoScroll: true,
		items: [
		  {
			  xtype: "panel",
			  id: "geogitHistoryPanel",
			  cls: "geogitHistoryWindowClass",
			  layout: "form",
			  layoutConfig: {
				  align: 'center',
				  padding: '5'
			  },
			  items: [
			  ]
		  }
		],
		listeners : {
			"beforehide" : function(element) {
				geogitHistoryContainer.show();
			},
			"hide" : function(element) {
				document.cookie = "geogitHistoryWindowShow=false";
			},
			"show" : function(element) {
				document.cookie = "geogitHistoryWindowShow=true";
			},
			"move" : function(element) {
				document.cookie = "geogitHistoryWindowXY=" + element.x + "|" + element.y;
			}
		}
	});
	
    app = new salamati.Viewer({
    	//proxy: "/geoserver/rest/proxy?url=",
    	defaultSourceType: "gxp_wmscsource",
        portalConfig: {
            layout: "border",
            
            // by configuring items here, we don't need to configure portalItems
            // and save a wrapping container
            items: [{
                id: "centerpanel",
                xtype: "panel",
                layout: "fit",
                region: "center",
                border: false,
                items: ["mymap",
                    win, toolContainer, searchWindow, searchContainer, geogitHistoryWindow, geogitHistoryContainer]
            }, {
                id: "eastpanel",
                xtype: "panel",
                tooltip: 'Layers', //doesn't seem to work
                collapsible: true,
                layout: "fit",
                region: "east",
                width: 200
            }],
            bbar: {id: "mybbar"}
        },
        
        // configuration of all tool plugins for this application
        tools: [{
            ptype: "gxp_layertree",
            outputConfig: {
                id: "tree",
                border: true,
                tbar: [] // we will add buttons to "tree.bbar" later
            },
            outputTarget: "eastpanel"
        },{
            ptype: "gxp_addlayers",
            actionTarget: "tree.tbar"
        }, {
            ptype: "gxp_removelayer",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        }, {
            ptype: "app_settings",
            actionTarget: "tree.tbar"
        }, {
            ptype: "gxp_zoomtoextent",
            actionTarget: "mymap.tbar"
        }, {
            ptype: "gxp_zoom",
            actionTarget: "mymap.tbar"
        }, {
            ptype: "gxp_navigationhistory",
            actionTarget: "mymap.tbar"
        }, {
            ptype: "gxp_featuremanager",
            id: "feature_manager",
            paging: false,
            autoSetLayer: true
        },{
            ptype: "gxp_snappingagent",
            id: "snapping_agent",
            targets: []
        },{
            ptype: "gxp_featureeditor",
            featureManager: "feature_manager",
            id: "feature_editor",
            autoLoadFeature: true,
            snappingAgent: "snapping_agent",
            iconClsEdit: "gxp-icon-getfeatureinfo",
            editFeatureActionTip: this.ActionTip_Edit,
            actionTarget: "toolsPanel"
        },{
            ptype: "app_distancebearing",
            actionTarget: "toolsPanel",
            toggleGroup: "distanceBearing",
            wpsType: "generic",
            infoActionTip: this.ActionTip_Default,
           // iconCls: "gxp-icon-distance-bearing-generic"
            iconCls: "gxp-icon-getfeatureinfo"
        }, {
            ptype: "app_distancebearing",
            actionTarget: "toolsPanel",
            toggleGroup: "distanceBearing",
            wpsType: "medfordhospitals",
            infoActionTip: this.ActionTip_Default,
           // iconCls: "gxp-icon-distance-bearing-hospitals"
            iconCls: "gxp-icon-getfeatureinfo"
        }, {
            ptype: "app_distancebearing",
            actionTarget: "toolsPanel",
            toggleGroup: "distanceBearing",
            wpsType: "medfordschools",
            infoActionTip: this.ActionTip_Default,
            //iconCls: "gxp-icon-distance-bearing-schools"
            iconCls: "gxp-icon-getfeatureinfo"
        }],
        
        // layer sources
        sources: {
            local: {
                ptype: "gxp_wmscsource",
                url: "/geoserver/wms",
                version: "1.1.1"
            },
            osm: {
                ptype: "gxp_osmsource"
            }
        },
        
        // map and layers
        map: {
            id: "mymap", // id needed to reference map in portalConfig above
            title: this.Map,
            projection: "EPSG:900913",
            center: [-10764594.758211, 4523072.3184791],
            cls: "mymapclass",
            zoom: 3,
            maxExtent: [-20037508, -20037508, 20037508, 20037508],
            restrictedExtent: [-20037508, -20037508, 20037508, 20037508],
            numZoomLevels: 20,
            layers: [{
                source: "osm",
                name: "mapnik",
                group: "background"
            }],
            items: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }],
            tbar: [{
                xtype: 'tbfill'
            }]
        },
        
        listeners: {       	
        	
            "ready": function(){
                //Show the tools window
                
            	/*Ext.Ajax.on('beforerequest', showSpinner, this);
            	Ext.Ajax.on('requestcomplete', hideSpinner, this);
            	Ext.Ajax.on('requestexception', hideSpinner, this);*/
            	
                win.animateTarget = toolContainer;
                searchWindow.animateTarget = searchContainer;
                geogitHistoryWindow.animateTarget = geogitHistoryContainer;
                
                Ext.get("toolcont").addListener('click', function(evtObj, element){
                    win.show();
                    toolContainer.hide();
                });
                
                Ext.get("searchcont").addListener('click', function(evtObj, element){
                    searchWindow.show();
                    searchContainer.hide();
                });
                
                Ext.get("geogithistorycont").addListener('click', function(evtObj, element){
                	geogitHistoryWindow.show();
                	geogitHistoryContainer.hide();
                });
                
                var toolconthtml = document.getElementById("toolcont");
                toolconthtml.innerHTML = '<p class="css-vertical-text">' + this.Title_Tools + '</p>';
                
                var searchconthtml = document.getElementById("searchcont");
                searchconthtml.innerHTML = '<p class="css-vertical-text">' + this.Title_Search + '</p>';
                
                var geogitHistoryContHTML = document.getElementById("geogithistorycont");
                geogitHistoryContHTML.innerHTML = '<p class="css-vertical-text">' + salamati.Title_Geogit_History + '</p>';
                
                // load toolsWindowShow from cookie if available
                var toolsWindowShow = "true";
                var searchWindowShow = "true";
                var geogitHistoryShow = "true";
                
            	if (document.cookie.length > 0) {		
            		var cookieStart = document.cookie.indexOf("toolsWindowShow=");
            		
            		if (cookieStart != -1) {
            			cookieStart += "toolsWindowShow".length + 1;
            			cookieEnd = document.cookie.indexOf(";", cookieStart);
            			
            			if (cookieEnd == -1) {
            				cookieEnd = document.cookie.length;
            			}
            			var toolsWindowShow2 = document.cookie.substring(cookieStart, cookieEnd);
            			
            			if (toolsWindowShow2) {
            				toolsWindowShow = toolsWindowShow2;
            			}
            			console.log("---- App.onReady toolsWindowShow found: ", toolsWindowShow);
            		}
            	}
    			
    			if (toolsWindowShow === "false") {
    				win.hide();
    				toolContainer.show();
    			} else {
    				win.show();
    			}            	
            	
    			searchWindow.show();
    			
    			addGeogitHistoryToWindow();
    			
    			geogitHistoryWindow.show();
    			
    			// load toolsWindowXY from cookie if available
    			var toolsWindowX = 60;
    			var toolsWindowY = 60;
            	if (document.cookie.length > 0) {		
            		var cookieStart = document.cookie.indexOf("toolsWindowXY=");
            		
            		if (cookieStart != -1) {
            			cookieStart += "toolsWindowXY".length + 1;
            			cookieEnd = document.cookie.indexOf(";", cookieStart);
            			
            			if (cookieEnd == -1) {
            				cookieEnd = document.cookie.length;
            			}
            			var toolsWindowXY = document.cookie.substring(cookieStart, cookieEnd);
            			
            			if (typeof toolsWindowXY != 'undefined' && toolsWindowXY) {
    						values = toolsWindowXY.split("|");
    						var x = parseFloat(values[0]);
    						var y = parseFloat(values[1]);
    						
    						if (x && y) {
    							toolsWindowX = x;
    							toolsWindowY = y;
    						}
            			}
            			console.log("---- App.onReady toolsWindowXY found: ", toolsWindowX, toolsWindowY);
            		}
            	}   
            	
				win.setPosition(toolsWindowX, toolsWindowY);
                
                var map = app.mapPanel.map;
                
                map.displayProjection = "EPSG:4326";
                map.addControl(new OpenLayers.Control.ScaleLine());
                map.addControl(new OpenLayers.Control.MousePosition({
                    displayClass: 'mymouseposition'
                }));
                

                // look for cookie
				if (document.cookie.length > 0) {
					cookieStart = document.cookie.indexOf("mapCenter=");
					
					if (cookieStart != -1) {
						cookieStart += "mapCenter".length + 1;
						cookieEnd = document.cookie.indexOf(";", cookieStart);
						
						if (cookieEnd == -1) {
							cookieEnd = document.cookie.length;
						}
						
						cookietext = document.cookie.substring(cookieStart, cookieEnd);

						values = cookietext.split("|");
						lat = parseFloat(values[0]);
						lon = parseFloat(values[1]);
						zoom = parseInt(values[2]);
						
						console.log("---- App.onReady mapCenter found lat: ", lat, ", lon: ", lon, ", zoom: ", zoom);
						
						if (lat && lon && zoom) {
							map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);
						}
					}
				}                
                
				
				var setMapCenterCookie = function(expiredays) {
                    
					mapCenter = new OpenLayers.LonLat(map.getCenter().lon, map.getCenter().lat);
					var cookietext = "mapCenter=" + mapCenter.lat + "|" + mapCenter.lon + "|" + map.getZoom();
					
					if (typeof expiredays != 'undefined' && expiredays) {
						var exdate = new Date();
						exdate.setDate( exdate.getDate() + expiredays);
						cookietext += ";expires=" + exdate.toGMTString();
					}
					
					// write cookie
					document.cookie = cookietext;
				}
  

				//TODO: implement but we also need to cach the sources as by defaut it only tries to parse out local host geoserver
				var setMapLayersCookie = function(expiredays) {
				}
				
				// This is what the UI does to add the layer 
//		        function addLayers() {
//	            	var key = sourceComboBox.getValue(); //local
//	            	var source = this.target.layerSources[key]; //
//	            	var records = capGridPanel.getSelectionModel().getSelections();
//	            	this.addLayers(records, source);
//	        	}
				
				

				// TODO: is this the best place to insert this?
				map.events.on({
					"moveend" : function(e) {
						setMapCenterCookie();
					},
					"zoomend" : function(e) {
						setMapCenterCookie();
					},
					"addlayer" : function(e) {
						setMapLayersCookie();
						console.log("map.events.addlayer: ", e);
					},
					"removelayer" : function(e) {
						setMapLayersCookie();
						console.log("map.events.removelayer: ", e);
					},
					"changelayer" : function(e) {
						setMapLayersCookie();
						console.log("map.events.changelayer: ", e);
					},
					scope : map
				}); 

                
                /** 
                 * Hack to make snapping more dynamic
                 * Whenever a layer is added to the map, it gets added to the snapping targets
                 */
                nameIndex = [];
                snappingAgent = app.tools.snapping_agent;
                
                map.events.register("addlayer", null, function(layer){  	
                    var layerParams = layer.layer.params;
                    
                    if(layerParams && (nameIndex.indexOf(layerParams.LAYERS) == -1))
                    {
                        var target = {
                            source:  "local",
                            name: layerParams.LAYERS
                        };
                        
                        var index = snappingAgent.targets.push(target);
                        snappingAgent.addSnappingTarget(target);
                        nameIndex.push(target.name);
                        app.selectLayer(app.getLayerRecordFromMap(target));
                    }
                });
            }
        }
    });
    	
	
});
