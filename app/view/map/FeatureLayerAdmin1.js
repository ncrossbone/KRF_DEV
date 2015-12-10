Ext.define('KRF_DEV.view.map.FeatureLayerAdmin1', {
	map:null, 
	layerId: null,
	siteId: null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        // 지점 이동 그래픽 레이어
        me.moveGraphicLayer = new esri.layers.GraphicsLayer();
		me.moveGraphicLayer.id="moveGraphicLayer";
		me.map.addLayer(me.moveGraphicLayer);
		
		// 집수구역 이동 그래픽 레이어
		me.moveCatGraphicLayer = new esri.layers.GraphicsLayer();
		me.moveCatGraphicLayer.id = "moveCatGraphicLayer";
		me.map.addLayer(me.moveCatGraphicLayer);
		
		// 리치라인 이동 그래픽 레이어
		me.moveRchGraphicLayer = new esri.layers.GraphicsLayer();
		me.moveRchGraphicLayer.id = "moveRchGraphicLayer";
		me.map.addLayer(me.moveRchGraphicLayer);
		
		me.movePopGraphicLayer = new esri.layers.GraphicsLayer();
		me.movePopGraphicLayer.id = "movePopGraphicLayer";
		me.map.addLayer(me.movePopGraphicLayer);
        
        KRF_DEV.getApplication().addListener('setSelectedSite', me.setSelectedSiteHandler, me);
        KRF_DEV.getApplication().addListener('setSelectedCatArea', me.setSelectedCatAreaHandler, me);
        KRF_DEV.getApplication().addListener('setSelectedRchLine', me.setSelectedRchLineHandler, me);
        
        KRF_DEV.getApplication().addListener('setSelectedPopSite', me.setSelectedPopSiteHandler, me);
    },
    
    
    
    
    setSelectedPopSiteHandler: function(layerId, siteId){
    	console.info("##");
		
    	var me = this;
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		
		
		
		
		/*var selectedSymbol = new esri.symbol.PictureMarkerSymbol({
		    "angle": 0,
		    //"xoffset": 10,
		    //"yoffset": 35,
		    "type": "esriPMS",
		    //"url": "./resources/images/symbol/symbol_"+layerId+"_42x42.gif",
		    "url": "./resources/images/symbol/spot_09.png",
		    "contentType": "image/png",
		    "width": 25,
		    "height": 61,
		    "yoffset": 16,
		    "xoffset": 4
		});*/
		
		if(layerId == "11"){ // 사업장 TMS
			query.where =  "사업장코드='" + siteId + "'";
		}
		else if(layerId == "25" || layerId == "26" || layerId == "27"
			|| layerId == "28" || layerId == "29" || layerId == "30"
			|| layerId == "31" || layerId == "32"){ // 환경기초시설
			query.where = "시설코드='" + siteId + "'";
		}
		else if(layerId == "15" || layerId == "16" || layerId == "17"
			|| layerId == "18" || layerId == "19" || layerId == "20"
			|| layerId == "21"){ // 기타측정지점
			query.where = "관측소코드='" + siteId + "'";
		}
		else if(layerId == "23"){ // 수생태계조사지점
			query.where = "조사지코드='" + siteId + "'";
		}
		else{
			query.where = "측정소코드='" + siteId + "'";
		}
		
		queryTask.execute(query,  function(results){
			
			Ext.each(results.features, function(obj, index) {
				
				
				me.movePopGraphicLayer.clear();
				me.movePopGraphicLayer.id = "moveGraphicLayer" + siteId;
				
				if(me.map.getLevel() < 12)
					me.map.setLevel(12);
				
				//obj.setSymbol(selectedSymbol);
				
				var dialog, highlightSymbol;
				
				require(["dijit/TooltipDialog"], function(TooltipDialog){
					dialog = new TooltipDialog({
			          //id: "tooltipDialog",
			          style: "position: absolute; width: 377px; font: normal normal normal 10pt Helvetica;z-index:100"
			        });
			        dialog.startup();
				});
				
				
				var t = "testetestewtetet";
				/*me.map.infoWindow =
					setInfo*/
				
				
				me.map.on("click", function(){
					
				});
				
				
				
				require([
				         "esri/map",
				         "esri/InfoTemplate",
				         "esri/layers/ArcGISDynamicMapServiceLayer",
				         "esri/symbols/SimpleFillSymbol",
				         "esri/symbols/SimpleLineSymbol",
				         "esri/tasks/IdentifyTask",
				         "esri/tasks/IdentifyParameters",
				         "esri/dijit/Popup",
				         "dojo/_base/array",
				         "esri/Color",
				         "dojo/dom-construct",
				         "dojo/domReady!"
				       ],function (
				    	        Map, InfoTemplate, ArcGISDynamicMapServiceLayer, SimpleFillSymbol,
				    	        SimpleLineSymbol, IdentifyTask, IdentifyParameters, Popup,
				    	        arrayUtils, Color, domConstruct
				    	      ) {

				    	        var identifyTask, identifyParams;

				    	        var popup = new Popup({
				    	          fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
				    	            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
				    	              new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))
				    	        }, domConstruct.create("div"));

				    	        map = new Map(me.map, {
				    	          basemap: "satellite",
				    	          center: [-83.275, 42.573],
				    	          zoom: 18,
				    	          infoWindow: popup
				    	        });

				    	        map.on("load", mapReady);

				    	        function mapReady () {
				    	          map.on("click", executeIdentifyTask);
				    	          //create identify tasks and setup parameters
				    	          identifyTask = new IdentifyTask(parcelsURL);

				    	          identifyParams = new IdentifyParameters();
				    	          identifyParams.tolerance = 3;
				    	          identifyParams.returnGeometry = true;
				    	          identifyParams.layerIds = [0, 2];
				    	          identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
				    	          identifyParams.width = map.width;
				    	          identifyParams.height = map.height;
				    	        }

				    	        function executeIdentifyTask (event) {
				    	          identifyParams.geometry = event.mapPoint;
				    	          identifyParams.mapExtent = map.extent;

				    	          var deferred = identifyTask.execute(identifyParams).addCallback(function (response) {
				    	              // response is an array of identify result objects
				    	              // Let's return an array of features.
				    	              return arrayUtils.map(response, function (result) {
				    	                var feature = result.feature;
				    	                var layerName = obj.attributes.증권역명;

				    	                feature.attributes.layerName = layerName;
				    	                if (layerName === 'Tax Parcels') {
				    	                  var taxParcelTemplate = new InfoTemplate("",
				    	                    "${Postal Address} <br/> Owner of record: ${First Owner Name}");
				    	                  feature.setInfoTemplate(taxParcelTemplate);
				    	                }
				    	                else if (layerName === 'Building Footprints') {
				    	                  console.log(feature.attributes.PARCELID);
				    	                  var buildingFootprintTemplate = new InfoTemplate("",
				    	                    "Parcel ID: ${PARCELID}");
				    	                  feature.setInfoTemplate(buildingFootprintTemplate);
				    	                }
				    	                return feature;
				    	              });
				    	            });

				    	          // InfoWindow expects an array of features from each deferred
				    	          // object that you pass. If the response from the task execution
				    	          // above is not an array of features, then you need to add a callback
				    	          // like the one above to post-process the response and return an
				    	          // array of features.
				    	          map.infoWindow.setFeatures([deferred]);
				    	          map.infoWindow.show(event.mapPoint);
				    	        }
				    	      });
				
				
				
				
				
				
				
				
				
				
				var content, highlightGraphic;
		          
		          require(["esri/lang"], function(esriLang){
		        	 content = esriLang.substitute(obj.attributes,t);
		        	 console.info(obj);
		        	 console.info(obj.attributes);
		          });
				    
				//me.movePopGraphicLayer.add(obj);
				dialog.setContent(content);
				
				var x = obj.geometry.x;
				var y = obj.geometry.y;
				
				require(["dojo/dom-style", "dijit/popup"], function(domStyle, dijitPopup){
					
			        	  domStyle.set(dialog.domNode, "opacity", 1);
			        	  console.info("open");
	  		          dijitPopup.open({
	  		            popup: dialog, 
	  		            x: x,
	  		            y: y
	  		            /*x: results.features[0].attributes.TM_X,
	  		            y: results.features[0].attributes.TM_Y*/
	  		          });
		          });
				
				
				var point = new esri.geometry.Point(x, y, obj.geometry.spatialReference);
				me.map.centerAt(point);
				
				
				// 10초뒤 레이어(이미지) 제거
				/*Ext.defer(function(){
					me.moveGraphicLayer.clear();
					//me.map.removeLayer(obj);
				}, 10000, this);*/
			});
			
		});
		
    },
    
    
    
    
    
    
    
    
    
    setSelectedSiteHandler: function(layerId, siteId){
		
    	var me = this;
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		var selectedSymbol = new esri.symbol.PictureMarkerSymbol({
		    "angle": 0,
		    //"xoffset": 10,
		    //"yoffset": 35,
		    "type": "esriPMS",
		    //"url": "./resources/images/symbol/symbol_"+layerId+"_42x42.gif",
		    "url": "./resources/images/symbol/spot_09.png",
		    "contentType": "image/png",
		    "width": 25,
		    "height": 61,
		    "yoffset": 16,
		    "xoffset": 4
		});
		
		if(layerId == "11"){ // 사업장 TMS
			query.where =  "사업장코드='" + siteId + "'";
		}
		else if(layerId == "25" || layerId == "26" || layerId == "27"
			|| layerId == "28" || layerId == "29" || layerId == "30"
			|| layerId == "31" || layerId == "32"){ // 환경기초시설
			query.where = "시설코드='" + siteId + "'";
		}
		else if(layerId == "15" || layerId == "16" || layerId == "17"
			|| layerId == "18" || layerId == "19" || layerId == "20"
			|| layerId == "21"){ // 기타측정지점
			query.where = "관측소코드='" + siteId + "'";
		}
		else if(layerId == "23"){ // 수생태계조사지점
			query.where = "조사지코드='" + siteId + "'";
		}
		else{
			query.where = "측정소코드='" + siteId + "'";
		}
		
		queryTask.execute(query,  function(results){
			
			Ext.each(results.features, function(obj, index) {
				
				me.moveGraphicLayer.clear();
				me.moveGraphicLayer.id = "moveGraphicLayer" + siteId;
				
				if(me.map.getLevel() < 12)
					me.map.setLevel(12);
				
				obj.setSymbol(selectedSymbol);
				me.moveGraphicLayer.add(obj);
				
				var x = obj.geometry.x;
				var y = obj.geometry.y;
				var point = new esri.geometry.Point(x, y, obj.geometry.spatialReference);
				console.info(obj.geometry.spatialReference);
				//me.map.centerAndZoom(point, 12);
				me.map.centerAt(point);
				
				//console.info(me.moveGraphicLayer);
				
				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function(){
					me.moveGraphicLayer.clear();
					//me.map.removeLayer(obj);
				}, 10000, this);
			});
			
		});
		
    },
    
    // 집수구역 선택
    setSelectedCatAreaHandler: function(layerId, catId){
    	var me = this;
    	
    	// 집수구역 심볼 설정
		var selectedSymbol = new esri.symbol.SimpleFillSymbol(
			esri.symbol.SimpleFillSymbol.STYLE_SOLID,
			me.smpLineSymbol,
			new dojo.Color([255,0,0,0.5])
		);
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		query.where =  "CAT_ID='" + catId + "'";
		
		queryTask.execute(query,  function(results){
			
			Ext.each(results.features, function(obj, index) {
				
				me.moveCatGraphicLayer.clear();
				me.moveCatGraphicLayer.id = "moveCatGraphicLayer" + catId;
				
				if(me.map.getLevel() < 12)
					me.map.setLevel(12);
				
				obj.setSymbol(selectedSymbol);
				me.moveCatGraphicLayer.add(obj);
				
				var extent = esri.geometry.Polygon(obj.geometry).getExtent();
				//me.map.setExtent(extent, true);
				me.map.centerAt(extent.getCenter());
				
				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function(){
					me.moveCatGraphicLayer.clear();
					//me.map.removeLayer(obj);
				}, 10000, this);
			});
		});
    },
    
    // 리치라인 선택
    setSelectedRchLineHandler: function(layerId, catId){
    	var me = this;
    	
    	// 집수구역 심볼 설정
		var selectedSymbol = new esri.symbol.SimpleLineSymbol(
			esri.symbol.SimpleLineSymbol.STYLE_SOLID,
			new dojo.Color([0, 0, 0, 1]),
			5
		);
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		query.where =  "CAT_ID='" + catId + "'";
		
		queryTask.execute(query,  function(results){
			
			me.moveRchGraphicLayer.clear();
			
			Ext.each(results.features, function(obj, index) {
				
				me.moveRchGraphicLayer.id = "moveRchGraphicLayer" + catId;
				
				if(me.map.getLevel() < 12)
					me.map.setLevel(12);
				
				obj.setSymbol(selectedSymbol);
				me.moveRchGraphicLayer.add(obj);
				
				//var extent = esri.geometry.Polygon(obj.geometry).getExtent();
				//me.map.setExtent(extent, true);
				//me.map.centerAt(extent.getCenter());
				
				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function(){
					me.moveRchGraphicLayer.clear();
					//me.map.removeLayer(obj);
				}, 10000, this);
			});
		});
    }
});