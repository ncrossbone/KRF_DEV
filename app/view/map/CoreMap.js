Ext.define('KRF_DEV.view.map.CoreMap', {
	extend: 'Ext.Component',
	
	xtype: 'app-map-coreMap',
	
	id: '_mapDiv_',
	
	requires: [
		'KRF_DEV.view.map.DynamicLayerAdmin'
	],
	
	map:null,
	dynamicLayerAdmin:null,
	fullExtent:null,
	initialExtent:null,
	layerInfo: null,
	
	initComponent: function() {
		this.on('render', this.mapRendered, this);
		this.callParent();
	},
	
	mapRendered: function(p){
        var me = this;
        
        var timerId = window.setInterval(function(){
        	me.map = new esri.Map('_mapDiv_', {
    	     	isDoubleClickZoom:false,
    	     	isPan:false,
    	 		logo:false,
    	 		slider: true,
    	 		showAttribution: false,
    	 		sliderPosition: "bottom-right",
    	 		sliderStyle: "large",
    	 		zoom: 8,
    	 		autoResize: true
    		});
            
        	//me.map.resize();
        	me.baseMapInit();
        	me.map.setLevel(8);
        	window.clearInterval(timerId);
        	
        	me.reachLayerAdmin_dim = Ext.create('KRF_DEV.view.map.ReachLayerAdminBackground', me.map); // Dim처리 레이어
        	me.dynamicLayerAdmin = Ext.create('KRF_DEV.view.map.DynamicLayerAdmin', me.map);
        	me.reachLayerAdmin = Ext.create('KRF_DEV.view.map.ReachLayerAdmin', me.map); // 리치노드, 리치라인, 집수구역 레이어
        	me.searchLayerAdmin = Ext.create('KRF_DEV.view.map.SearchLayerAdmin', me.map, me.geometryService);
        	me.featureLayerAdmin = Ext.create('KRF_DEV.view.map.FeatureLayerAdmin1', me.map);
        	me.graphicsLayerAdmin = Ext.create('KRF_DEV.view.map.GraphicsLayerAdmin', me.map);
        	//me.dynamicLayerAdmin = Ext.create('KRF_DEV.view.map.DynamicLayerAdmin_ReachTest', me.map); // 시뮬레이션용 레이어 서비스
        	
        	//dojo.require("esri.dijit.Scalebar");
        	//var scalebar = new esri.dijit.Scalebar({map:me.map, attachTo:"top-right"});
        	
        	// 전역 변수 설정 KRF_DEV.getApplication().coreMap
        	KRF_DEV.getApplication().coreMap = me;
		}, 1);
    },
    
    baseMapInit: function(){
		var me = this;
		dojo.declare('CustomMapsLayer', esri.layers.TiledMapServiceLayer, {
		    constructor: function(opts) {
		      opts = opts || {};
		      this.spatialReference = new esri.SpatialReference({wkid: 102100});
		      this.tileInfo = new esri.layers.TileInfo({
		        rows: 256, cols: 256, dpi: 96,
		        origin: {x: -20037508.342787, y: 20037508.342787},
		        spatialReference: {wkid: 102100},
		        lods: [
						{level:0, resolution:156543.033928,    scale:591657527.591555},
						{level:1, resolution:78271.5169639999, scale:295828763.795777},
						{level:2, resolution:39135.7584820001, scale:147914381.897889},
						{level:3, resolution:19567.8792409999, scale:73957190.948944},
						{level:4, resolution:9783.93962049996, scale:36978595.474472},
						{level:5, resolution:4891.96981024998, scale:18489297.737236},
						{level:6, resolution:2445.98490512499, scale:9244648.868618},
						{level:7, resolution:1222.99245256249, scale:4622324.434309}, //start
						{level:8, resolution:611.49622628138,  scale:2311162.217155},
						{level:9, resolution:305.748113140558, scale:1155581.108577},
						{level:10,resolution:152.874056570411, scale:577790.554289},
						{level:11,resolution:76.4370282850732, scale:288895.277144},
						{level:12,resolution:38.2185141425366, scale:144447.638572},
						{level:13,resolution:19.1092570712683, scale:72223.819286},
						{level:14,resolution:9.55462853563415, scale:36111.909643},
						{level:15,resolution:4.77731426794937, scale:18055.954822},
						{level:16,resolution:2.38865713397468, scale:9027.977411},
						{level:17,resolution:1.19432856685505, scale:4513.988705},
						{level:18,resolution:0.597164283559817,scale:2256.994353}, //end
						{level:19,resolution:0.298582141647617,scale:1128.497176}
		          ]
		      });
		      
		      this.fullExtent = new esri.geometry.Extent({
		    	  xmin: 12928905.446270483,
		    	  ymin: 3309091.461517964,
		    	  xmax: 15766818.698435722,
		    	  ymax: 5341704.9176768325,
		          spatialReference: {
		        	  wkid: 102100
		          }
		      });
		      
		      me.initialExtent = this.initialExtent = new esri.geometry.Extent({
		    	  xmin: 12928905.446270483,
		    	  ymin: 3309091.461517964,
		    	  xmax: 15766818.698435722,
		    	  ymax: 5341704.9176768325,
		          spatialReference: {
		        	  wkid: 102100
		          }
		      });
		      
		      this.loaded = true;
		      this.onLoad(this);
		    },
		    getTileUrl: function(level, row, col) {
		    	var newrow = row + (Math.pow(2, level) * 47);
      			var newcol = col + (Math.pow(2, level) * 107);
		    	return "http://xdworld.vworld.kr:8080/2d/Base/201301/" + level + "/" + col + "/" + row + ".png";
		    }	
		  });
		var baseMap = new CustomMapsLayer();
		this.map.addLayer(baseMap);
	}
});