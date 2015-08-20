Ext.define('KRF_DEV.view.map.ReachLayerAdmin', {
	map:null, 
	layerId: null,
	selectionToolbar: null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        require([
                 "esri/InfoTemplate",
                 "esri/map",
                 "esri/layers/FeatureLayer",
                 "esri/symbols/SimpleFillSymbol",
                 "esri/symbols/SimpleLineSymbol",
                 "esri/tasks/query",
                 "esri/toolbars/draw",
                 "dojo/dom",
                 "dojo/on",
                 "dojo/parser",
                 "dojo/_base/array",
                 "esri/Color",
                 "dijit/form/Button",
                 "dojo/domReady!"
               ],
                 function (
                   InfoTemplate, Map, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol,
                   Query, Draw, dom, on, parser, arrayUtil, Color
                 ) {
        	
        	parser.parse();
        	
        	var selectionToolbar, featureLayer;
        	
        	me.initSelectToolbar(me);
        	//me.map.on("load", this.initSelectToolbar);
        	alert("ddd");
        });
        
        //KRF_DEV.getApplication().addListener('setSelectedSite', me.setSelectedSiteHandler, me);
    },
    
    initSelectToolbar: function(me){
    	alert("aaa");
    	
    	require([
				"esri/toolbars/draw",
				"esri/tasks/query",
				"dojo/on"
				], function(Draw, Query, on){
    		
    		me.selectionToolbar = new Draw(me.map);
    		
            var selectQuery = new Query();

            on(me.selectionToolbar, "DrawEnd", function (geometry) {
            	me.selectionToolbar.deactivate();
              selectQuery.geometry = geometry;
              featureLayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW);
            });
    	});
    	
    }
});