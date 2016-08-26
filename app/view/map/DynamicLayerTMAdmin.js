Ext.define("KRF_DEV.view.map.DynamicLayerTMAdmin", {
	
	map: null,
	layer: null,
	id: "DynamicLayerTMAdmin",
	
	constructor: function(map, inStrCatDids) {
		
        var me = this;
        me.map = map;
        
        me.layer = new esri.layers.FeatureLayer("http://112.217.167.123:20002/arcgis/rest/services/reach_V3_TM/MapServer/2", {
        	outFields: ["*"],
        	showLabels: true
        });
        
        me.layer.id = "DynamicLayerTMAdmin";
        me.layer.visible = true;
        
        //me.layer.setVisibleLayers([2]);
		//var layerDefs = [];
		//layerDefs[2] = "CAT_DID IN (" + inStrCatDids + ")";
		//me.layer.setLayerDefinitions(layerDefs);
        
        me.layer.setDefinitionExpression("CAT_DID IN (" + inStrCatDids + ")");
		console.info(me.layer);
		me.map.addLayer(me.layer);
		
		console.info(me.layer.graphics);
		
		require([
		         "dojo/ready", 
		         "esri/Color",
		         "dojo/_base/array",
		         "esri/arcgis/utils",
		         "esri/config",
		         "esri/graphicsUtils",
		         "esri/symbols/SimpleFillSymbol",
		         "esri/graphic", 
		         "esri/geometry/geometryEngine",
		         "esri/layers/GraphicsLayer",
		         "esri/tasks/QueryTask",
                 "esri/tasks/query",
                 "esri/symbols/SimpleLineSymbol",
                 "esri/geometry/webMercatorUtils",
                 "esri/dijit/analysis/DissolveBoundaries",
                 "esri/geometry/Polyline"
		     ], function(
		         ready, 
		         Color,
		         array,
		         arcgisUtils,
		         config,
		         graphicsUtils,
		         SimpleFillSymbol,
		         Graphic,
		         geometryEngine,
		         GraphicsLayer,
		         QueryTask,
                 Query,
                 SimpleLineSymbol,
                 webMercatorUtils,
                 DissolveBoundaries,
                 Polyline
		     ) {
			
			var featureLayer = me.layer;
			var geometries = graphicsUtils.getGeometries(featureLayer.graphics);
			var bufferedGeometries = geometryEngine.geodesicBuffer(geometries, [0], 9036, true);
			
			var symbol = new SimpleFillSymbol();
	        symbol.setColor(new Color([255,100,100,0.5]));
	        //symbol.setOutline(null);
	        
	        var graphicsLayerCat = new GraphicsLayer({opacity: 0.5});
	        
	        array.forEach(bufferedGeometries,function(geometry){
	        	//console.info(geometry);
	          //map.graphics.add(new Graphic(geometry,symbol));
	        	graphicsLayerCat.add(new Graphic(geometry, symbol));
	        	me.graphicsLayerCat = graphicsLayerCat;
	        	me.map.addLayer(graphicsLayerCat);
	        });
	        
	        //console.info(graphicsLayerCat);
	        me.layer.setVisibility(false);
	        
	        var queryTask = new QueryTask("http://112.217.167.123:20002/arcgis/rest/services/reach_V3_TM/MapServer/10");
			
			var query = new Query();
            query.returnGeometry = true;
            query.outFields = ["*"];
            query.outSpatialReference = {
              "wkid": 102100
            };
            
            query.geometry = graphicsLayerCat.graphics[0].geometry;
            query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
            queryTask.execute(query);
            
            var firstGraphic = null;
            var arrGraphics = [];
            var name = [];
            queryTask.on("complete", function(evt){
            	
            	var features = evt.featureSet.features;
            	
            	for(var i = 0; i < features.length; i++){
            		
            		if($.inArray(evt.featureSet.features[i].attributes.단위유역명, name) === -1){
            			name.push(evt.featureSet.features[i].attributes.단위유역명);
            			firstGraphic = evt.featureSet.features[i];
		                var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([100, 255, 100]), 1), new Color([255, 0, 0, 0.20]));
		                firstGraphic.setSymbol(symbol);
		                //firstGraphic.setInfoTemplate(infoTemplate);
		                arrGraphics.push(firstGraphic);
		                //me.map.graphics.add(firstGraphic);
            		};
            	}
            	
            	//console.info(arrGraphics);
            	
            	var graphicsLayerTMDL = new GraphicsLayer({opacity: 0.5});
            	
            	for(var i = 0; i < arrGraphics.length; i++){
	            	graphicsLayerTMDL.add(arrGraphics[i]);
            	}
            	
            	me.graphicsLayerTMDL = graphicsLayerTMDL;
            	me.map.addLayer(graphicsLayerTMDL);
            	
            	var geometries = graphicsUtils.getGeometries(me.graphicsLayerCat.graphics);
            	var cutter = graphicsUtils.getGeometries(me.graphicsLayerTMDL.graphics);
                //console.info(cutter);
                
                var cutObj = "";
                
                var graphicsLayerCut = new GraphicsLayer({opacity: 0.5});
                
                for(var i = 0; i < cutter.length; i++){
                	
                	//console.info(cutter[i].rings);
	    			//var bufferedGeometries = geometryEngine.convexHull(geometries, false);
                	
                	var singlePathPolyline = new Polyline(cutter[i].rings);
                	//console.info(singlePathPolyline);
	                var bufferedGeometries = geometryEngine.cut(geometries[0], singlePathPolyline);
	    			
	    			//console.info(bufferedGeometries);
	    			
	    			array.forEach(bufferedGeometries,function(geometry){
	    	        	//console.info(geometry);
	    	            //map.graphics.add(new Graphic(geometry,symbol));
	    				var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([100, 255, 255]), 0.5), new Color([255, 255, 0, 0.5]));
	    				graphicsLayerCut.add(new Graphic(geometry, symbol));
	    	        });
                }
                
                me.graphicsLayerCut = graphicsLayerCut;
	        	me.map.addLayer(graphicsLayerCut);
	        	
	        	me.graphicsLayerCat.setVisibility(false);
	        	me.graphicsLayerTMDL.setVisibility(false);
	        	
	        	console.info(me.graphicsLayerCut);
	        	
	        	var labelLayer = new GraphicsLayer({opacity: 1});
	        	
	        	for(var i = 0; i < me.graphicsLayerCut.graphics.length; i++){
	        		
	        		var centerPoint = null;
	        		var graphic = me.graphicsLayerCut.graphics[i];
	        		
	        		switch(graphic.geometry.type){
	        			case "point":
	        				centerPoint = graphic.geometry;
	        				break;
	        			case "extent":
	        				centerPoint = graphic.getCenter();
	        				break;
	        			default:
	        				centerPoint = graphic.geometry.getExtent().getCenter();
	        		}
	        		
	        		console.info(centerPoint);
	        		
	        		var textSymbol =  new esri.symbol.TextSymbol("Hello World" + i).setColor(
	        				new esri.Color([128,0,0])).setAlign(esri.symbol.Font.ALIGN_START).setAngle(0).setFont(
	        						new esri.symbol.Font("12pt").setWeight(esri.symbol.Font.WEIGHT_BOLD));
	        		
	        		var labelGraphic = new Graphic(centerPoint, textSymbol);
	        		labelLayer.add(labelGraphic);
	        	}
	        	
	        	me.labelLayer = labelLayer;
	        	me.map.addLayer(labelLayer);
            });
		});
    }
});