Ext.define('Report.view.map.rptCoreMap', {
	
	extend: 'Ext.Component',
	
	xtype: 'rpt-map-rptCoreMap',
	
	id: '_rptMapDiv_',
	
	initComponent: function() {
		
		this.on('render', this.mapRendered, this);
		
		this.callParent();
	},
	
	mapRendered: function(p){
		
        var me = this;   
        
        var timerId = window.setInterval(function(){
        	//console.info("aaa");
        	me.map = new esri.Map('_rptMapDiv_', {
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
        	
        	me.baseMapInit();
        	//console.info("ddd");
        	window.clearInterval(timerId);
        	
        	var level = location.search.split("l=")[1].split("&")[0];
        	var x = location.search.split("x=")[1].split("&")[0];
        	var y = location.search.split("y=")[1].split("&")[0];
        	//console.info(level);
        	//console.info(x);
        	//console.info(y);
        	
        	var resolution = me.tileInfo.lods[level].resolution;
        	x = x - (225 * resolution); // center.js map width 2200 -> 2650으로 변경 (450/2만큼 좌측으로)
        	
        	var point = new esri.geometry.Point({ "x": x, "y": y, "spatialReference": { "wkid": 102100} });
        	
        	me.map.setLevel(level);
        	me.map.centerAt(point);
        	
        	// Extent Change Event
    		/*dojo.connect(me.map, "onExtentChange", function(extent, a, b, obj, c){
    			console.info(extent);
    		});*/
        }, 1);
    },
    
    baseMapInit: function(){
    	
		var me = this;
		
		dojo.declare('CustomMapsLayer', esri.layers.TiledMapServiceLayer, {
			
		    constructor: function(opts) {
		    	
		      opts = opts || {};
		      
		      this.spatialReference = new esri.SpatialReference({wkid: 102100});
		      
		      this.tileInfo = me.tileInfo = new esri.layers.TileInfo({
		    	  
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
		      
		      me.tileInfo = this.tileInfo;
		      
		      this.initialExtent = this.fullExtent = new esri.geometry.Extent({
		    	  xmin: 13960784.961116992,
		    	  ymin: 4063066.308522686,
		    	  xmax: 14511131.564770233,
		    	  ymax: 4613412.912175928,
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
      			
      			// http://10.101.95.129/Base/201411/11/11/1747/800.png
      			// 토양지하수 베이스 맵 서비스 URL
      			//return "http://10.101.95.129/Base/201411/" + level + "/" + level + "/" + col + "/" + row + ".png";
      			// 테스트 서버 베이스 맵 서비스 URL
      			//return "http://112.218.1.243:20080/2d/Base/201411/" + level + "/" + level + "/" + col + "/" + row + ".png";
		    	return "http://xdworld.vworld.kr:8080/2d/Base/201301/" + level + "/" + col + "/" + row + ".png";
		    }	
		  });
		
		me.baseMap = new CustomMapsLayer();
		this.map.addLayer(me.baseMap);
	}
});